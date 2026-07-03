from neo4j import Session

from app.database.neo4j import get_session


class GraphRepository:

    def __init__(self):
        self.session: Session = get_session()

    def close(self):
        self.session.close()

    def create_complaint_node(
        self,
        complaint_id: str,
        title: str,
        description: str,
        status: str,
    ):
        self.session.run(
            """
            MERGE (c:Complaint {id: $id})

            SET
                c.title = $title,
                c.description = $description,
                c.status = $status
            """,
            id=complaint_id,
            title=title,
            description=description,
            status=status,
        )

    def create_entity_node(
        self,
        label: str,
        name: str,
    ):
        query = f"""
        MERGE (n:{label} {{name: $name}})
        """

        self.session.run(
            query,
            name=name,
        )

    def create_relationship(
        self,
        complaint_id: str,
        entity_label: str,
        entity_name: str,
        relationship: str,
    ):
        query = f"""
        MATCH (c:Complaint {{id:$complaint_id}})
        MATCH (e:{entity_label} {{name:$entity_name}})

        MERGE (c)-[:{relationship}]->(e)
        """

        self.session.run(
            query,
            complaint_id=complaint_id,
            entity_name=entity_name,
        )