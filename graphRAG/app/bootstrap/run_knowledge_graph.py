from app.graph.knowledge_graph import KnowledgeGraphBuilder


if __name__ == "__main__":
    builder = KnowledgeGraphBuilder()
    builder.build()
    builder.close()

    print("Knowledge Graph successfully built in Neo4j")