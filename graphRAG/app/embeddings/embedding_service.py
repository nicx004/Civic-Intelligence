from ollama import Client

from app.config.settings import settings
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities


class EmbeddingService:

    def __init__(self):
        self.client = Client(
            host=settings.ollama_url,
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

        response = self.client.embed(
            model=settings.embedding_model,
            input=text,
        )

        return response["embeddings"][0]

    def _build_text(
        self,
        complaint: Complaint,
        entities: ExtractedEntities,
    ) -> str:

        parts = [
            f"Title: {complaint.title}",
            f"Description: {complaint.description}",
            f"Category: {complaint.category}",
            f"Ward: {complaint.ward}",
            f"Locality: {complaint.locality}",
            f"Landmark: {complaint.landmark}",
        ]

        if entities.assets:
            parts.append("Assets: " + ", ".join(entities.assets))

        if entities.issue_types:
            parts.append("Issue Types: " + ", ".join(entities.issue_types))

        if entities.departments:
            parts.append("Departments: " + ", ".join(entities.departments))

        if entities.keywords:
            parts.append("Keywords: " + ", ".join(entities.keywords))

        return "\n".join(parts)