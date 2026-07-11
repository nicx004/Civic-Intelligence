from uuid import uuid5, NAMESPACE_URL

from qdrant_client import QdrantClient
from qdrant_client.http.models import (
    Distance,
    VectorParams,
    PointStruct,
    Filter,
    FieldCondition,
    MatchValue,
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
        point_id = str(
            uuid5(
                NAMESPACE_URL,
                f"complaint:{complaint_id}",
            )
        )

        self.client.upsert(
            collection_name=self.COLLECTION_NAME,
            points=[
                PointStruct(
                    id=point_id,
                    vector=embedding,
                    payload=payload,
                )
            ],
        )
    
    def search(
        self,
        query_embedding: list[float],
        limit: int = 5,
        exclude_complaint_id: str | None = None,
    ):
        query_filter = None

        if exclude_complaint_id is not None:
            query_filter = Filter(
                must_not=[
                    FieldCondition(
                        key="complaint_id",
                        match=MatchValue(
                            value=exclude_complaint_id,
                        ),
                    )
                ]
            )

        response = self.client.query_points(
            collection_name=self.COLLECTION_NAME,
            query=query_embedding,
            query_filter=query_filter,
            limit=limit,
            with_payload=True,
        )

        return response.points
    def get_by_complaint_id(
        self,
        complaint_id: str,
    ):
        from uuid import uuid5, NAMESPACE_URL

        point_id = str(
            uuid5(
                NAMESPACE_URL,
                f"complaint:{complaint_id}",
            )
        )

        points = self.client.retrieve(
            collection_name=self.COLLECTION_NAME,
            ids=[point_id],
            with_payload=True,
            with_vectors=True,
        )

        if not points:
            return None

        return points[0]