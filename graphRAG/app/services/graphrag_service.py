from copy import deepcopy
from unittest import result

from app.embeddings.embedding_service import EmbeddingService
from app.extraction.entity_extractor import EntityExtractor
from app.graph.complaint_graph_builder import ComplaintGraphBuilder
from app.graph.ontology_normalizer import OntologyNormalizer
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities
from app.retrieval.qdrant_repository import QdrantRepository
from app.routing.department_router import DepartmentRouter
from app.models.graphrag_result import GraphRAGResult
from datetime import datetime, timezone

class GraphRAGService:

    def __init__(self):
        self.entity_extractor = EntityExtractor()
        self.ontology_normalizer = OntologyNormalizer()
        self.complaint_graph_builder = ComplaintGraphBuilder()
        self.embedding_service = EmbeddingService()
        self.qdrant_repository = QdrantRepository()
        self.department_router = DepartmentRouter()

    def process_complaint(
        self,
        complaint: Complaint,
    ) -> ExtractedEntities:

        raw_entities = self.entity_extractor.extract(complaint)

        normalized_entities = deepcopy(raw_entities)

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

    def new_method(self, raw_entities):
        normalized_entities = deepcopy(raw_entities)

        normalized_entities = self.ontology_normalizer.normalize(
            normalized_entities
        )
        
        return normalized_entities
    def retrieve(
        self,
        complaint_id: str,
        limit: int = 5,
    ) -> dict:

        routing_result = self.department_router.route(
            complaint_id=complaint_id,
        )

        stored_point = self.qdrant_repository.get_by_complaint_id(
            complaint_id=complaint_id,
        )

        if stored_point is None:
            raise ValueError(
                f"Complaint '{complaint_id}' was not found in Qdrant."
            )

        similar_points = self.qdrant_repository.search(
            query_embedding=stored_point.vector,
            limit=limit,
            exclude_complaint_id=complaint_id,
        )

        similar_complaints = [
            {
                "complaint_id": point.payload.get("complaint_id"),
                "title": point.payload.get("title"),
                "description": point.payload.get("description"),
                "category": point.payload.get("category"),
                "score": point.score,
            }
            for point in similar_points
        ]

        return {
            "complaint_id": complaint_id,
            "routing": routing_result,
            "similar_complaints": similar_complaints,
        }
    
    from app.models.graphrag_result import GraphRAGResult

    def process_and_route(
        self,
        complaint: Complaint,
    ) -> GraphRAGResult:

        print("1. Extracting entities...")
        raw_entities = self.entity_extractor.extract(complaint)
        print("printing raw entities:")
        print(raw_entities)
        print("✓ Entity extraction complete")

        print("2. Normalizing...")
        normalized_entities = deepcopy(raw_entities)
        normalized_entities = self.ontology_normalizer.normalize(normalized_entities)
        print("Normalized entities:")
        print(normalized_entities.assets)
        print(normalized_entities.issue_types)
        print("✓ Normalization complete")

        print("3. Building graph...")
        self.complaint_graph_builder.build(
            complaint=complaint,
            entities=normalized_entities,
        )
        print("✓ Graph build complete")

        print("4. Generating embedding...")
        embedding = self.embedding_service.embed_complaint(
            complaint=complaint,
            entities=raw_entities,
        )
        print(f"✓ Embedding generated ({len(embedding)} dimensions)")

        print("5. Creating Qdrant collection...")
        self.qdrant_repository.create_collection(
            vector_size=len(embedding),
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
            "assets": normalized_entities.assets,
            "issue_types": normalized_entities.issue_types,
            "keywords": raw_entities.keywords,
        }

        print("✓ Collection ready")

        print("6. Upserting vector...")
        self.qdrant_repository.upsert(
            complaint_id=complaint.id,
            embedding=embedding,
            payload=payload,
        )
        print("✓ Upsert complete")

        print("7. Retrieving routing...")
        retrieval = self.retrieve(complaint_id=complaint.id)
        print(retrieval)

        print("8. Building result...")

        routing = retrieval.get("routing")
        if routing is None:
            raise RuntimeError(
                "Routing engine returned None."
            )

        return GraphRAGResult(
            complaint_id=complaint.id,
            extracted_entities=raw_entities,
            normalized_entities=normalized_entities,
            assigned_department_id=routing["department_id"],
            routing_confidence=routing["score"],
            matched_ontology_nodes={
                "assets": routing["matched_assets"],
                "issue_types": routing["matched_issue_types"],
            },
            routing_explanation=routing,
            similar_complaint_ids=[
                c["complaint_id"]
                for c in retrieval["similar_complaints"]
            ],
            processed_at= datetime.now(timezone.utc),
        )