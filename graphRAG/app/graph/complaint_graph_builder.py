from app.graph.graph_repository import GraphRepository
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities


class ComplaintGraphBuilder:

    def __init__(self):
        self.repo = GraphRepository()

    def build(
        self,
        complaint: Complaint,
        entities: ExtractedEntities,
    ):
        self._create_complaint_node(complaint)

        self._connect_entities(
        complaint.id,
        "Category",
        [complaint.category],
        "BELONGS_TO",
        "other_category",
        )
        self._connect_entities(
            complaint.id,
            "Asset",
            entities.assets,
            "AFFECTS",
            "other_asset",
        )

        self._connect_entities(
            complaint.id,
            "IssueType",
            entities.issue_types,
            "HAS_ISSUE",
            "other_issue",
        )

        self._connect_entities(
            complaint.id,
            "Department",
            entities.departments,
            "ASSIGNED_TO",
            "review_required",
        )

        self._connect_dynamic_nodes(
            complaint.id,
            "Ward",
            [complaint.ward],
            "LOCATED_IN",
        )

        self._connect_dynamic_nodes(
            complaint.id,
            "Locality",
            [complaint.locality],
            "IN_LOCALITY",
        )

        self._connect_dynamic_nodes(
            complaint.id,
            "Landmark",
            [complaint.landmark],
            "NEAR",
        )

    def _create_complaint_node(
    self,
    complaint: Complaint,
):
    self.repo.merge_node(
        label="Complaint",
        node_id=complaint.id,
        properties={
            "id": complaint.id,
            "title": complaint.title,
            "description": complaint.description,
            "status": complaint.status,
            "user_id": complaint.user_id,
            "latitude": complaint.latitude,
            "longitude": complaint.longitude,
            "created_at": complaint.created_at.isoformat(),
            "updated_at": complaint.updated_at.isoformat(),
        },
    )

    def _connect_entities(
        self,
        complaint_id: str,
        label: str,
        values: list[str],
        relationship: str,
        fallback_id: str,
    ):
        if not values:
            values = [fallback_id]

        for value in values:

            node_id = self._to_id(value)

            if not self.repo.node_exists(
                label,
                node_id,
            ):
                node_id = fallback_id

            self.repo.merge_relationship(
                from_label="Complaint",
                from_id=str(complaint_id),
                relationship=relationship,
                to_label=label,
                to_id=node_id,
            )

    def _connect_dynamic_nodes(
        self,
        complaint_id: str,
        label: str,
        values: list[str],
        relationship: str,
    ):
        for value in values:

            node_id = self._to_id(value)

            self.repo.merge_node(
                label=label,
                node_id=node_id,
                properties={
                    "id": node_id,
                    "name": value,
                },
            )

            self.repo.merge_relationship(
                from_label="Complaint",
                from_id=str(complaint_id),
                relationship=relationship,
                to_label=label,
                to_id=node_id,
            )

    @staticmethod
    def _to_id(value: str) -> str:
        return (
            value.lower()
            .replace("&", "and")
            .replace("/", " ")
            .replace("-", " ")
            .replace(" ", "_")
        )