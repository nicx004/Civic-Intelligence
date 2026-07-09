from qdrant_client import QdrantClient

from app.config.settings import settings


client = QdrantClient(
    url=settings.qdrant_url,
)


def get_qdrant_client() -> QdrantClient:
    return client