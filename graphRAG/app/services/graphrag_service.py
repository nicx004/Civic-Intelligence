from copy import deepcopy

from app.embeddings.embedding_service import EmbeddingService
from app.extraction.entity_extractor import EntityExtractor
from app.graph.complaint_graph_builder import ComplaintGraphBuilder
from app.graph.ontology_normalizer import OntologyNormalizer
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities
from app.retrieval.qdrant_repository import QdrantRepository


class GraphRAGService:

    def __init__(self):
        self.entity_extractor = EntityExtractor()
        self.ontology_normalizer = OntologyNormalizer()
        self.complaint_graph_builder = ComplaintGraphBuilder()
        self.embedding_service = EmbeddingService()
        self.qdrant_repository = QdrantRepository()

    def process_complaint(
        self,
        complaint: Complaint,
    ) -> ExtractedEntities:

        # 1. Extract human-readable semantic entities using Qwen.
        raw_entities = self.entity_extractor.extract(complaint)

        # 2. Preserve raw semantic entities for embedding.
        normalized_entities = deepcopy(raw_entities)

        # 3. Convert assets and issue types to canonical ontology IDs.
        normalized_entities = self.ontology_normalizer.normalize(
            normalized_entities
        )

        # 4. Merge complaint into Neo4j using canonical ontology IDs.
        self.complaint_graph_builder.build(
            complaint=complaint,
            entities=normalized_entities,
        )

        # 5. Generate semantic complaint embedding using raw entities.
        embedding = self.embedding_service.embed_complaint(
            complaint=complaint,
            entities=raw_entities,
        )

        # 6. Ensure the Qdrant collection exists.
        self.qdrant_repository.create_collection(
            vector_size=len(embedding),
        )

        # 7. Build searchable Qdrant payload.
        payload = {
            "complaint_id": complaint.id,
            "title": complaint.title,
            "description": complaint.description,
            "category": complaint.category,
            "status": complaint.status,
            "ward": complaint.ward,
            "locality": complaint.locality,
            "landmark": complaint.landmark,
            "assets": normalized_entities.assets,
            "issue_types": normalized_entities.issue_types,
            "keywords": raw_entities.keywords,
        }

        # 8. Upsert semantic representation into Qdrant.
        self.qdrant_repository.upsert(
            complaint_id=complaint.id,
            embedding=embedding,
            payload=payload,
        )

        return normalized_entities