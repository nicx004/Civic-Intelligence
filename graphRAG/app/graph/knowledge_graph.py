from app.bootstrap.ontology import ONTOLOGY
from app.graph.graph_repository import GraphRepository


class KnowledgeGraphBuilder:

    def __init__(self):
        self.repo = GraphRepository()

    def build(self):
        self._build_departments()
        self._build_categories()
        self._build_assets()
        self._build_issue_types()

    # -------------------------
    # DEPARTMENTS
    # -------------------------
    def _build_departments(self):
        for dept in ONTOLOGY.departments:
            self.repo.merge_node(
                label="Department",
                node_id=dept.id,
                properties={
                    "name": dept.name
                }
            )

    # -------------------------
    # CATEGORIES
    # -------------------------
    def _build_categories(self):
        for dept in ONTOLOGY.departments:
            for cat in dept.categories:

                self.repo.merge_node(
                    label="Category",
                    node_id=cat.id,
                    properties={
                        "name": cat.name,
                        "aliases": cat.aliases
                    }
                )

                self.repo.merge_relationship(
                    from_label="Department",
                    from_id=dept.id,
                    relationship="MANAGES",
                    to_label="Category",
                    to_id=cat.id,
                )

    # -------------------------
    # ASSETS
    # -------------------------
    def _build_assets(self):
        for dept in ONTOLOGY.departments:
            for asset in dept.assets:

                self.repo.merge_node(
                    label="Asset",
                    node_id=asset.id,
                    properties={
                        "name": asset.name,
                        "aliases": asset.aliases
                    }
                )

                self.repo.merge_relationship(
                    from_label="Department",
                    from_id=dept.id,
                    relationship="MAINTAINS",
                    to_label="Asset",
                    to_id=asset.id,
                )

    # -------------------------
    # ISSUE TYPES
    # -------------------------
    def _build_issue_types(self):
        for dept in ONTOLOGY.departments:
            for issue in dept.issue_types:

                self.repo.merge_node(
                    label="IssueType",
                    node_id=issue.id,
                    properties={
                        "name": issue.name,
                        "aliases": issue.aliases
                    }
                )

                self.repo.merge_relationship(
                    from_label="Department",
                    from_id=dept.id,
                    relationship="HAS_ISSUE",
                    to_label="IssueType",
                    to_id=issue.id,
                )

    def close(self):
        self.repo.close()