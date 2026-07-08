from neo4j import Session

from app.database.neo4j import get_session


class GraphRepository:

    def __init__(self):
        self.session: Session = get_session()

    def close(self):
        self.session.close()

    def merge_node(
        self,
        label: str,
        node_id: str,
        properties: dict,
    ):
        query = f"""
        MERGE (n:{label} {{id: $id}})
        SET n += $properties
        """

        self.session.run(
            query,
            id=node_id,
            properties=properties,
        )

    def merge_relationship(
        self,
        from_label: str,
        from_id: str,
        relationship: str,
        to_label: str,
        to_id: str,
    ):
        query = f"""
        MATCH (a:{from_label} {{id:$from_id}})
        MATCH (b:{to_label} {{id:$to_id}})

        MERGE (a)-[:{relationship}]->(b)
        """

        self.session.run(
            query,
            from_id=from_id,
            to_id=to_id,
        )

    def node_exists(
        self,
        label: str,
        node_id: str,
    ) -> bool:
        query = f"""
        MATCH (n:{label} {{id:$id}})
        RETURN count(n) > 0 AS exists
        """

        result = self.session.run(
            query,
            id=node_id,
        )

        return result.single()["exists"]