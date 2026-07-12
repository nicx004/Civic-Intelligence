from dataclasses import dataclass
import datetime
from typing import Any

from app.models.extracted_entities import ExtractedEntities


@dataclass
class GraphRAGResult:
    complaint_id: str

    extracted_entities: ExtractedEntities
    normalized_entities: ExtractedEntities

    assigned_department_id: str
    routing_confidence: int

    matched_ontology_nodes: dict[str, Any]

    routing_explanation: dict[str, Any]

    similar_complaint_ids: list[str]

    processed_at : datetime