from datetime import datetime

from sqlalchemy import text

from app.database.postgres import SessionLocal
from app.models.graphrag_result import GraphRAGResult
from psycopg2.extras import Json


class ComplaintWriter:

    def mark_processing(self, complaint_id: str):

        with SessionLocal() as session:
            session.execute(
                text(
                    """
                    UPDATE "Report"
                    SET
                        "graphStatus" = 'PROCESSING'
                    WHERE id = :complaint_id
                    """
                ),
                {"complaint_id": complaint_id},
            )

            session.commit()

    def mark_failed(self, complaint_id: str):

        with SessionLocal() as session:
            session.execute(
                text(
                    """
                    UPDATE "Report"
                    SET
                        "graphStatus" = 'FAILED'
                    WHERE id = :complaint_id
                    """
                ),
                {"complaint_id": complaint_id},
            )

            session.commit()

    def save_graphrag_result(
        self,
        result: GraphRAGResult,
    ):

        with SessionLocal() as session:

            session.execute(
                text(
                    """
                    UPDATE "Report"
                    SET
                        "graphStatus" = 'COMPLETED',

                        "assignedDepartmentId" = :department,

                        "routingConfidence" = :confidence,

                        "processedAt" = :processed_at,

                        "extractedEntities" = :extracted_entities,

                        "normalizedEntities" = :normalized_entities,

                        "matchedOntologyNodes" = :matched_nodes,

                        "similarComplaintIds" = :similar_ids,

                        "routingExplanation" = :routing_explanation

                    WHERE id = :complaint_id
                    """
                ),
                {
                    "complaint_id": result.complaint_id,
                    "department": result.assigned_department_id,
                    "confidence": result.routing_confidence,
                    "processed_at": result.processed_at,

                    "extracted_entities":
                        Json(result.extracted_entities.model_dump()),

                    "normalized_entities":
                        Json(result.normalized_entities.model_dump()),

                    "matched_nodes":
                        Json(result.matched_ontology_nodes),

                    "similar_ids":
                        result.similar_complaint_ids,

                    "routing_explanation":
                        Json(result.routing_explanation),
                },
            )

            session.commit()