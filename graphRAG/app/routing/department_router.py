from app.graph.graph_repository import GraphRepository


class DepartmentRouter:

    ISSUE_TYPE_WEIGHT = 3
    ASSET_WEIGHT = 2

    def __init__(self):
        self.repo = GraphRepository()

    def route(
        self,
        complaint_id: str,
    ) -> list[dict] | None:

        candidates = self.repo.find_candidate_departments(
            complaint_id=complaint_id,
        )

        if not candidates:
            return None

        scored_candidates = []

        # First calculate all scores
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

        # Then calculate confidence
        total = sum(c["score"] for c in scored_candidates)

        if total > 0:
            for c in scored_candidates:
                c["confidence"] = round(
                    c["score"] / total * 100,
                    1,
                )
        else:
            for c in scored_candidates:
                c["confidence"] = 0.0

        # Highest confidence first
        scored_candidates.sort(
            key=lambda candidate: candidate["score"],
            reverse=True,
        )

        return scored_candidates[:3]