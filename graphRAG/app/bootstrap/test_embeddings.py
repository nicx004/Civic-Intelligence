from app.embeddings.embedding_service import EmbeddingService
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities

from datetime import datetime


complaint = Complaint(
    id="test-1",
    title="Pothole on main road",
    description="A large pothole is causing traffic issues near Sector 17 Bus Stand.",
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

entities = ExtractedEntities(
    assets=["Road"],
    issue_types=["Pothole"],
    departments=["Engineering Department"],
    keywords=["road", "pothole", "traffic"],
)

service = EmbeddingService()

embedding = service.embed_complaint(
    complaint,
    entities,
)

print(f"Embedding dimension: {len(embedding)}")
print(embedding[:10])