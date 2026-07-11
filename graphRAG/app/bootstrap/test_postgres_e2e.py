from pprint import pprint

from app.ingestion.complaint_reader import ComplaintReader
from app.services.graphrag_service import GraphRAGService


def main():
    complaint_id = "cmqrp1kxz0001qgtqhpxfd0c2"

    reader = ComplaintReader()
    graphrag_service = GraphRAGService()

    print("\n1. Loading complaint from PostgreSQL...\n")

    complaint = reader.get_by_id(complaint_id)

    if complaint is None:
        raise ValueError(
            f"Complaint not found in PostgreSQL: {complaint_id}"
        )

    pprint(complaint.model_dump())

    print("\n2. Processing complaint through GraphRAG...\n")

    processing_result = graphrag_service.process_complaint(complaint)

    pprint(processing_result)

    print("\n3. Running hybrid retrieval...\n")

    retrieval_result = graphrag_service.retrieve(
        complaint_id=complaint.id,
        limit=5,
    )

    pprint(retrieval_result)

    print("\nEnd-to-end PostgreSQL → GraphRAG test successful.")


if __name__ == "__main__":
    main()