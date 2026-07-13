from fastapi import APIRouter, HTTPException

from app.ingestion.complaint_reader import ComplaintReader
from app.ingestion.complaint_writer import ComplaintWriter
from app.services.graphrag_service import GraphRAGService
from app.services.ontology_service import OntologyService

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "healthy"}


import traceback

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

    except Exception:
        writer.mark_failed(report_id)

        traceback.print_exc()   # <-- prints full traceback

        raise
    
@router.get("/ontology/departments")
async def get_departments():

    service = OntologyService()

    try:
        departments = service.get_departments()

        return {
            "departments": departments
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )