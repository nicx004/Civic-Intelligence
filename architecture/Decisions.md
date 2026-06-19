# Architecture Decision Log

## D-001

Decision:

Use Next.js for frontend.

Reason:

- Modern
- Scalable
- Fast development

Alternatives:

- React SPA
- Angular
- Vue

Status:

Accepted

---

## D-002

Decision:

Use FastAPI backend.

Reason:

- Strong AI ecosystem
- Easy LLM integration
- Better support for LangGraph

Alternatives:

- Express.js
- NestJS

Status:

Accepted

---

## D-003

Decision:

Use hybrid complaint submission.

Reason:

Citizens may either:

- Write free text
- Confirm extracted information

Improves UX and data quality.

Status:

Accepted

---

## D-004

Decision:

Build MVP before GraphRAG.

Reason:

Need to validate complaint-to-ticket workflow first.

Status:

Accepted

---

## D-005

Decision:

Use structured databases for factual data.

Examples:

- Wards
- Departments
- Officers
- SLAs

Use vector databases only for documents.

Status:

Accepted