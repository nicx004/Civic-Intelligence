from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities


class EntityExtractor:

    @staticmethod
    def extract(complaint: Complaint) -> ExtractedEntities:

        return ExtractedEntities(
            categories=[complaint.category],
            wards=[complaint.ward],
            localities=[complaint.locality],
            landmarks=[complaint.landmark],
            keywords=[],
            departments=[],
            issue_types=[],
        )