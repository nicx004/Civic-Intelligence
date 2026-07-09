from datetime import datetime

from app.models.complaint import Complaint
from app.services.graphrag_service import GraphRAGService


def main():
    complaint = Complaint(
        id="graphrag-test-1",
        title="Pothole on main road",
        description=(
            "A large pothole is causing traffic issues "
            "near Sector 17 Bus Stand."
        ),
        category="Roads",
        status="Pending",
        ward="Ward 17",
        locality="Sector 17",
        landmark="Sector 17 Bus Stand",
        phone=None,
        latitude=30.7333,
        longitude=76.7794,
        user_id="user-1",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    service = GraphRAGService()

    print("Processing complaint through GraphRAG pipeline...\n")

    normalized_entities = service.process_complaint(complaint)

    print("\nGraphRAG processing successful.")
    print(f"Complaint ID: {complaint.id}")
    print(f"Normalized assets: {normalized_entities.assets}")
    print(f"Normalized issue types: {normalized_entities.issue_types}")
    print(f"Keywords: {normalized_entities.keywords}")


if __name__ == "__main__":
    main()