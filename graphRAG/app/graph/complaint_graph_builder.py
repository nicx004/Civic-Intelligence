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
        self.repo.merge_node(
            label=NodeLabels.COMPLAINT,
            node_id=complaint.id,
            properties={
                "title": complaint.title,
                "description": complaint.description,
                "status": complaint.status,
            },
        )

        for asset_id in entities.assets:
            self.repo.merge_relationship(
                from_label=NodeLabels.COMPLAINT,
                from_id=complaint.id,
                relationship=Relationships.AFFECTS,
                to_label=NodeLabels.ASSET,
                to_id=asset_id,
            )

        for issue_id in entities.issue_types:
            self.repo.merge_relationship(
                from_label=NodeLabels.COMPLAINT,
                from_id=complaint.id,
                relationship=Relationships.HAS_ISSUE_TYPE,
                to_label=NodeLabels.ISSUE_TYPE,
                to_id=issue_id,
            )