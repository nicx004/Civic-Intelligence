from app.bootstrap.ontology import ONTOLOGY
from app.graph.constants import FallbackNodeIds
from app.models.extracted_entities import ExtractedEntities


class OntologyNormalizer:

    def __init__(self):
        self.assets = {}
        self.issue_types = {}

        self._build_indices()

    def _build_indices(self):
        for department in ONTOLOGY.departments:

            for asset in department.assets:
                self.assets[asset.name.lower()] = asset.id

                for alias in asset.aliases:
                    self.assets[alias.lower()] = asset.id

            for issue in department.issue_types:
                self.issue_types[issue.name.lower()] = issue.id

                for alias in issue.aliases:
                    self.issue_types[alias.lower()] = issue.id

    def normalize(
        self,
        entities: ExtractedEntities,
    ) -> ExtractedEntities:

        entities.assets = [
            self.assets.get(
                asset.lower(),
                FallbackNodeIds.OTHER_ASSET,
            )
            for asset in entities.assets
        ]

        entities.issue_types = [
            self.issue_types.get(
                issue.lower(),
                FallbackNodeIds.OTHER_ISSUE,
            )
            for issue in entities.issue_types
        ]

        return entities