from pydantic import BaseModel


class ExtractedEntities(BaseModel):
    categories: list[str] = []

    wards: list[str] = []

    localities: list[str] = []

    landmarks: list[str] = []

    departments: list[str] = []

    keywords: list[str] = []

    issue_types: list[str] = []