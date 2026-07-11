from pprint import pprint

from app.services.graphrag_service import GraphRAGService


def main():
    service = GraphRAGService()

    result = service.retrieve(
        complaint_id="graphrag-test-1",
        limit=5,
    )

    print("\nHybrid retrieval result:\n")
    pprint(result)


if __name__ == "__main__":
    main()