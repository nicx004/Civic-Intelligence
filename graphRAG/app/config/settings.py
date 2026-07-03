from pydantic_settings import BaseSettings, SettingsConfigDict


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
    embedding_model: str = "text-embedding-3-small"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()