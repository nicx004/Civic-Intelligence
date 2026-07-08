from pydantic import BaseModel, Field


class ExtractedEntities(BaseModel):
    categories: list[str] = Field(default_factory=list)

    assets: list[str] = Field(default_factory=list)

    issue_types: list[str] = Field(default_factory=list)

    departments: list[str] = Field(default_factory=list)

    wards: list[str] = Field(default_factory=list)

    localities: list[str] = Field(default_factory=list)

    landmarks: list[str] = Field(default_factory=list)

    keywords: list[str] = Field(default_factory=list)