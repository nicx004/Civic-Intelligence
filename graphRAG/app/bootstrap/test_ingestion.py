from datetime import datetime

from app.embeddings.embedding_service import EmbeddingService
from app.extraction.entity_extractor import EntityExtractor
from app.graph.complaint_graph_builder import ComplaintGraphBuilder
from app.graph.ontology_normalizer import OntologyNormalizer
from app.models.complaint import Complaint


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

extractor = EntityExtractor()
normalizer = OntologyNormalizer()
graph_builder = ComplaintGraphBuilder()
embedding_service = EmbeddingService()

entities = extractor.extract(complaint)

entities = normalizer.normalize(entities)

graph_builder.build(
    complaint,
    entities,
)

embedding = embedding_service.embed_complaint(
    complaint,
    entities,
)

print(f"Embedding dimension: {len(embedding)}")
print(entities)
print("Complaint successfully inserted into Neo4j.")