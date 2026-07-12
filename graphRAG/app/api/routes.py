from fastapi import APIRouter, HTTPException

from app.ingestion.complaint_reader import ComplaintReader
from app.ingestion.complaint_writer import ComplaintWriter
from app.services.graphrag_service import GraphRAGService

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "healthy"}


@router.post("/process-report/{report_id}")
async def process_report(report_id: str):

    reader = ComplaintReader()
    writer = ComplaintWriter()
    graphrag = GraphRAGService()

    writer.mark_processing(report_id)

    try:
        complaint = reader.get_by_id(report_id)

        if complaint is None:
            writer.mark_failed(report_id)
            raise HTTPException(
                status_code=404,
                detail="Complaint not found.",
            )

        result = graphrag.process_and_route(complaint)

        writer.save_graphrag_result(result)

        return {
            "status": "success",
            "complaint_id": report_id,
            "assigned_department": result.assigned_department_id,
        }

    except Exception as e:
        writer.mark_failed(report_id)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )