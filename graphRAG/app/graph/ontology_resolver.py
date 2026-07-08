from app.bootstrap.ontology import ALL_DEPARTMENTS
from app.models.entities import ExtractedEntities


class OntologyResolver:

    def __init__(self):
        self.categories = {}
        self.assets = {}
        self.issue_types = {}
        self.departments = {}

        self._build_index()

    def _build_index(self):
        for department in ALL_DEPARTMENTS:
            self.departments[
                department.name.lower()
            ] = department.id

            for category in department.categories:
                self.categories[
                    category.lower()
                ] = self._to_id(category)

            for asset in department.assets:
                self.assets[
                    asset.lower()
                ] = self._to_id(asset)

            for issue in department.issue_types:
                self.issue_types[
                    issue.lower()
                ] = self._to_id(issue)

    @staticmethod
    def _to_id(name: str) -> str:
        return (
            name.lower()
            .replace("&", "and")
            .replace("/", " ")
            .replace("-", " ")
            .replace("  ", " ")
            .replace(" ", "_")
        )

    def resolve(
        self,
        entities: ExtractedEntities,
    ) -> ExtractedEntities:

        entities.categories = [
            self.categories.get(
                c.lower(),
                "other_category",
            )
            for c in entities.categories
        ]

        entities.assets = [
            self.assets.get(
                a.lower(),
                "other_asset",
            )
            for a in entities.assets
        ]

        entities.issue_types = [
            self.issue_types.get(
                i.lower(),
                "other_issue",
            )
            for i in entities.issue_types
        ]

        entities.departments = [
            self.departments.get(
                d.lower(),
                "review_required",
            )
            for d in entities.departments
        ]

        return entities