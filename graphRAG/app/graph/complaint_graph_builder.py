from app.graph.constants import NodeLabels, Relationships
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
        # 1. Create complaint node
        self.repo.merge_node(
            label=NodeLabels.COMPLAINT,
            node_id=complaint.id,
            properties={
                "title": complaint.title,
                "description": complaint.description,
                "status": complaint.status,
            },
        )

        # 2. Connect complaint to normalized Asset nodes
        for asset_id in entities.assets:
            self.repo.merge_relationship(
                from_label=NodeLabels.COMPLAINT,
                from_id=complaint.id,
                relationship=Relationships.AFFECTS,
                to_label=NodeLabels.ASSET,
                to_id=asset_id,
            )

        # 3. Connect complaint to normalized IssueType nodes
        for issue_id in entities.issue_types:
            self.repo.merge_relationship(
                from_label=NodeLabels.COMPLAINT,
                from_id=complaint.id,
                relationship=Relationships.HAS_ISSUE_TYPE,
                to_label=NodeLabels.ISSUE_TYPE,
                to_id=issue_id,
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
    def _connect_assets(
        self,
        complaint: Complaint,
        entities: ExtractedEntities,
    ):
        for asset_id in entities.assets:
            self.repo.merge_relationship(
                from_label=NodeLabels.COMPLAINT,
                from_id=complaint.id,
                relationship=Relationships.AFFECTS,
                to_label=NodeLabels.ASSET,
                to_id=asset_id,
            )


    def _connect_issue_types(
        self,
        complaint: Complaint,
        entities: ExtractedEntities,
    ):
        for issue_id in entities.issue_types:
            self.repo.merge_relationship(
                from_label=NodeLabels.COMPLAINT,
                from_id=complaint.id,
                relationship=Relationships.HAS_ISSUE_TYPE,
                to_label=NodeLabels.ISSUE_TYPE,
                to_id=issue_id,
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