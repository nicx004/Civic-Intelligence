from datetime import datetime

from app.embeddings.embedding_service import EmbeddingService
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities
from app.retrieval.qdrant_repository import QdrantRepository


def create_complaint(
    complaint_id: str,
    title: str,
    description: str,
    category: str,
    ward: str,
    locality: str,
    landmark: str,
) -> Complaint:
    return Complaint(
        id=complaint_id,
        title=title,
        description=description,
        category=category,
        status="Pending",
        ward=ward,
        locality=locality,
        landmark=landmark,
        phone=None,
        latitude=None,
        longitude=None,
        user_id="test-user",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )


def main():
    embedding_service = EmbeddingService()
    qdrant_repository = QdrantRepository()

    test_data = [
        (
            create_complaint(
                complaint_id="test-1",
                title="Pothole on main road",
                description=(
                    "A large pothole is causing traffic issues "
                    "near Sector 17 Bus Stand."
                ),
                category="Roads",
                ward="Ward 17",
                locality="Sector 17",
                landmark="Sector 17 Bus Stand",
            ),
            ExtractedEntities(
                assets=["Road"],
                issue_types=["Pothole"],
                departments=[],
                keywords=["road", "pothole", "traffic"],
            ),
        ),
        (
            create_complaint(
                complaint_id="test-2",
                title="Garbage pile near residential houses",
                description=(
                    "A large amount of household waste has been "
                    "accumulating near residential houses for several days."
                ),
                category="Garbage",
                ward="Ward 22",
                locality="Sector 22",
                landmark="Community Park",
            ),
            ExtractedEntities(
                assets=["Garbage"],
                issue_types=["Garbage Accumulation"],
                departments=[],
                keywords=["garbage", "waste", "residential"],
            ),
        ),
        (
            create_complaint(
                complaint_id="test-3",
                title="Water pipe leaking onto road",
                description=(
                    "A damaged water supply pipe is continuously leaking "
                    "clean water onto the road."
                ),
                category="Water Supply",
                ward="Ward 15",
                locality="Sector 15",
                landmark="Main Market",
            ),
            ExtractedEntities(
                assets=["Water Pipeline"],
                issue_types=["Water Leakage"],
                departments=[],
                keywords=["water", "pipe", "leakage"],
            ),
        ),
        (
            create_complaint(
                complaint_id="test-4",
                title="Streetlight not working",
                description=(
                    "The streetlight has stopped working and the entire "
                    "road becomes dark after sunset."
                ),
                category="Street Lighting",
                ward="Ward 35",
                locality="Sector 35",
                landmark="Residential Lane",
            ),
            ExtractedEntities(
                assets=["Streetlight"],
                issue_types=["Streetlight Failure"],
                departments=[],
                keywords=["streetlight", "dark", "night"],
            ),
        ),
        (
            create_complaint(
                complaint_id="test-5",
                title="Blocked sewage drain overflowing",
                description=(
                    "A blocked sewage line is causing dirty wastewater "
                    "to overflow onto the street."
                ),
                category="Sewage",
                ward="Ward 20",
                locality="Sector 20",
                landmark="Local Market",
            ),
            ExtractedEntities(
                assets=["Sewer Line"],
                issue_types=["Sewage Overflow"],
                departments=[],
                keywords=["sewage", "blocked", "overflow"],
            ),
        ),
    ]

    # Create collection using the known bge-m3 vector dimension.
    qdrant_repository.create_collection(vector_size=1024)

    print("Upserting test complaints...\n")

    for complaint, entities in test_data:
        embedding = embedding_service.embed_complaint(
            complaint,
            entities,
        )

        payload = {
            "complaint_id": complaint.id,
            "title": complaint.title,
            "description": complaint.description,
            "category": complaint.category,
            "status": complaint.status,
            "ward": complaint.ward,
            "locality": complaint.locality,
            "landmark": complaint.landmark,
            "assets": entities.assets,
            "issue_types": entities.issue_types,
            "keywords": entities.keywords,
        }

        qdrant_repository.upsert(
            complaint_id=complaint.id,
            embedding=embedding,
            payload=payload,
        )

        print(
            f"Upserted: {complaint.id} | "
            f"{complaint.title} | "
            f"Dimension: {len(embedding)}"
        )

    queries = [
        (
            "Cars are struggling because of a huge hole in the street.",
            "test-1",
        ),
        (
            "Waste has been lying near our homes for several days.",
            "test-2",
        ),
        (
            "Clean water is continuously flowing from a damaged underground pipe.",
            "test-3",
        ),
        (
            "The road becomes completely dark after sunset.",
            "test-4",
        ),
        (
            "Dirty wastewater is overflowing because the drainage line is clogged.",
            "test-5",
        ),
    ]

    print("\n" + "=" * 80)
    print("SEMANTIC SEARCH TESTS")
    print("=" * 80)

    passed = 0

    for query_text, expected_id in queries:
        query_embedding = embedding_service.embed_text(query_text)

        results = qdrant_repository.search(
            query_embedding=query_embedding,
            limit=5,
        )

        top_result = results[0]
        actual_id = top_result.payload.get("complaint_id")

        success = actual_id == expected_id

        if success:
            passed += 1

        print(f"\nQuery: {query_text}")
        print(f"Expected top result: {expected_id}")
        print(f"Actual top result:   {actual_id}")
        print(f"Result: {'PASS' if success else 'FAIL'}")

        print("\nRanking:")

        for rank, result in enumerate(results, start=1):
            print(
                f"{rank}. "
                f"Score: {result.score:.4f} | "
                f"ID: {result.payload.get('complaint_id')} | "
                f"Title: {result.payload.get('title')}"
            )

    print("\n" + "=" * 80)
    print(f"FINAL RESULT: {passed}/{len(queries)} tests passed")
    print("=" * 80)


if __name__ == "__main__":
    main()