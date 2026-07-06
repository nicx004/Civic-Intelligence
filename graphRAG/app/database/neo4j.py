from neo4j import GraphDatabase, Driver, Session

from app.config.settings import settings


_driver: Driver = GraphDatabase.driver(
    settings.neo4j_uri,
    auth=(settings.neo4j_username, settings.neo4j_password),
)


def get_driver() -> Driver:
    return _driver


def get_session() -> Session:
    return _driver.session()


def close_driver() -> None:
    _driver.close()