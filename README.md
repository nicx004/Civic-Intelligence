Civic Intelligence

AI-powered civic complaint management platform using GraphRAG forintelligent department routing.

Overview

Civic Intelligence is an end-to-end civic grievance management platformconsisting of:

Citizen Portal (Next.js) for complaint submission and tracking.

Admin Dashboard (Next.js) for complaint monitoring.

GraphRAG Backend (FastAPI) for AI-powered processing.

PostgreSQL as the system of record.

Neo4j knowledge graph for ontology-based routing.

Qdrant for semantic similarity search.

Ollama + Qwen3 for local entity extraction.

High-level Flow

Citizen
   │
Next.js
   │
PostgreSQL (source of truth)
   │
FastAPI GraphRAG
 ├── Entity Extraction (Qwen3)
 ├── Ontology Normalization
 ├── Neo4j Department Routing
 └── Qdrant Similar Complaint Retrieval
   │
PostgreSQL (updated routing)
   │
Admin Dashboard

Features

Complaint submission with authentication

Complaint tracking

AI-powered entity extraction

Knowledge-graph department routing

Semantic retrieval of similar complaints

Admin dashboard with routing results

Dockerized local deployment

Tech Stack

Layer             Technology

Frontend          Next.js 16, React, TypeScript, Tailwind CSSBackend           FastAPI, SQLAlchemyDatabase          PostgreSQL, PrismaKnowledge Graph   Neo4jVector Store      QdrantLLM               Ollama + Qwen3Embeddings        bge-m3Auth              NextAuth

Prerequisites

Node.js 20+

Python 3.10+

Docker Desktop

Git

Environment

Create .env from .env.example.

Typical variables:

DATABASE_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=

GraphRAG variables are documented in graphRAG/README.md.

Installation

git clone <repo>
cd Civic-Intelligence
npm install

Generate Prisma client:

npx prisma generate
npx prisma migrate dev

Run frontend:

npm run dev

Run GraphRAG backend (see backend README):

cd graphRAG
uvicorn app.main:app --reload

Complaint Lifecycle

Citizen submits complaint.

Stored in PostgreSQL.

FastAPI asynchronously processes report.

Qwen extracts entities.

Entities normalized against ontology.

Neo4j determines responsible department.

Qdrant retrieves similar complaints.

Results written back to PostgreSQL.

Admin dashboard displays enriched complaint.

Repository Structure

src/
prisma/
graphRAG/
public/

Deployment

Frontend: - Vercel

Backend: - VM / Docker host containing: - FastAPI - PostgreSQL - Neo4j -Qdrant - Ollama

Future Work

Multi-city ontology

Multi-language complaints

Image-based issue detection

Automated status notifications

Analytics and forecasting

License

MIT (or your preferred license).