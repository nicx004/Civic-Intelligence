from fastapi import FastAPI

from app.api.routes import router

app = FastAPI(
    title="Civic Intelligence GraphRAG",
    description="GraphRAG service for civic complaint intelligence.",
    version="1.0.0",
)

app.include_router(router)


@app.get("/")
async def root():
    return {
        "service": "GraphRAG",
        "status": "running",
        "version": "1.0.0",
    }