from app.graph.graph_repository import GraphRepository


class DepartmentRouter:

    ISSUE_TYPE_WEIGHT = 3
    ASSET_WEIGHT = 2

    def __init__(self):
        self.repo = GraphRepository()

    def route(
        self,
        complaint_id: str,
    ) -> dict | None:

        candidates = self.repo.find_candidate_departments(
            complaint_id=complaint_id,
        )

        if not candidates:
            return None

        scored_candidates = []

        for candidate in candidates:
            matched_assets = candidate["matched_assets"]
            matched_issue_types = candidate["matched_issue_types"]

            score = (
                len(matched_issue_types) * self.ISSUE_TYPE_WEIGHT
                + len(matched_assets) * self.ASSET_WEIGHT
            )

            scored_candidates.append({
                **candidate,
                "score": score,
            })

        scored_candidates.sort(
            key=lambda candidate: candidate["score"],
            reverse=True,
        )

        return scored_candidates[0]