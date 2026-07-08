from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    # PostgreSQL
    postgres_url: str

    # Neo4j
    neo4j_uri: str
    neo4j_username: str
    neo4j_password: str

    # Qdrant
    qdrant_url: str

    # LLM
    llm_provider: str
    llm_api_key: str
    llm_model: str

    # Embeddings
    embedding_provider: str
    embedding_model: str = "text-embedding-3-small"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding = "utf-8",
        extra="ignore",
    )


settings = Settings()