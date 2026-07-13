from app.graph.graph_repository import GraphRepository


class OntologyService:

    def get_departments(self):
        repo = GraphRepository()

        try:
            return repo.get_departments()
        finally:
            repo.close()