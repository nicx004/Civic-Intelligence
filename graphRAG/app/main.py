from fastapi import FastAPI

app = FastAPI(
    title="Civic Intelligence GraphRAG",
    description="GraphRAG service for civic complaint intelligence.",
    version="1.0.0",
)


@app.get("/")
async def root():
    return {
        "service": "GraphRAG",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}