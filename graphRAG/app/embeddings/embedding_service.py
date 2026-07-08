from openai import OpenAI

from app.config.settings import settings
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities


class EmbeddingService:

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.llm_api_key,
        )

    def embed_complaint(
        self,
        complaint: Complaint,
        entities: ExtractedEntities,
    ) -> list[float]:

        text = self._build_text(
            complaint,
            entities,
        )

        response = self.client.embeddings.create(
            model=settings.embedding_model,
            input=text,
        )

        return response.data[0].embedding

    def _build_text(
        self,
        complaint: Complaint,
        entities: ExtractedEntities,
    ) -> str:

        sections = [
            f"Title: {complaint.title}",
            f"Description: {complaint.description}",
            f"Category: {complaint.category}",
            f"Ward: {complaint.ward}",
            f"Locality: {complaint.locality}",
            f"Landmark: {complaint.landmark}",
        ]

        if entities.assets:
            sections.append(
                "Assets: " + ", ".join(entities.assets)
            )

        if entities.issue_types:
            sections.append(
                "Issue Types: " + ", ".join(entities.issue_types)
            )

        if entities.departments:
            sections.append(
                "Departments: " + ", ".join(entities.departments)
            )

        if entities.keywords:
            sections.append(
                "Keywords: " + ", ".join(entities.keywords)
            )

        return "\n".join(sections)