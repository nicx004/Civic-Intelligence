GraphRAG Backend

Overview

The GraphRAG backend enriches complaints stored in PostgreSQL using anAI pipeline.

Pipeline:

PostgreSQL
    │
Complaint Reader
    │
Qwen3 Entity Extraction
    │
Ontology Normalizer
    │
Neo4j Department Router
    │
Qdrant Similarity Search
    │
Complaint Writer
    │
PostgreSQL

Responsibilities

Read pending complaints

Extract structured entities

Normalize entities

Route to department

Retrieve similar complaints

Persist routing metadata

Tech Stack

FastAPI

SQLAlchemy

Neo4j

Qdrant

Ollama

Qwen3

bge-m3 embeddings

Environment

DATABASE_URL=
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=
QDRANT_URL=
OLLAMA_BASE_URL=
EMBEDDING_MODEL=bge-m3
LLM_MODEL=qwen3:8b

Installation

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

Bootstrap

Populate ontology and vector store:

python -m app.bootstrap.bootstrap_ontology
python -m app.bootstrap.bootstrap_qdrant

Run

uvicorn app.main:app --reload

Processing Flow

Read complaint

Entity extraction

Ontology normalization

Department routing

Hybrid retrieval

Persist results

API

POST /process-report/{reportId}
GET /health

Testing

Examples:

python -m app.bootstrap.test_hybrid_retrieval
python -m app.bootstrap.test_graphrag_service

Troubleshooting

Verify Docker services are running.

Ensure Neo4j ontology is populated.

Ensure Qdrant collection exists.

Confirm Ollama model is downloaded.

Notes

PostgreSQL remains the single source of truth. Neo4j and Qdrant are usedexclusively for reasoning and retrieval; the frontend reads only fromPostgreSQL.