from qdrant_client import QdrantClient
from qdrant_client.http.models import (
    Distance,
    VectorParams,
    PointStruct,
)

from app.database.qdrant import get_qdrant_client


class QdrantRepository:

    COLLECTION_NAME = "complaints"

    def __init__(self):
        self.client: QdrantClient = get_qdrant_client()

    def create_collection(
        self,
        vector_size: int,
    ):
        collections = self.client.get_collections().collections

        if any(
            c.name == self.COLLECTION_NAME
            for c in collections
        ):
            return

        self.client.create_collection(
            collection_name=self.COLLECTION_NAME,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE,
            ),
        )

    def upsert(
        self,
        complaint_id: str,
        embedding: list[float],
        payload: dict,
    ):
        self.client.upsert(
            collection_name=self.COLLECTION_NAME,
            points=[
                PointStruct(
                    id=complaint_id,
                    vector=embedding,
                    payload=payload,
                )
            ],
        )