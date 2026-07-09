import json

from ollama import Client

from app.config.settings import settings
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities


SYSTEM_PROMPT = """
You are an information extraction engine.

Extract ONLY:

1. assets
2. issue_types
3. keywords

Return STRICT JSON.

Example:

{
    "assets": ["Road"],
    "issue_types": ["Pothole"],
    "keywords": [
        "road",
        "traffic",
        "pothole"
    ]
}

Do not include explanations.
"""


class EntityExtractor:

    def __init__(self):
        self.client = Client(
            host=settings.ollama_url,
        )

    def extract(
        self,
        complaint: Complaint,
    ) -> ExtractedEntities:

        prompt = f"""
Title:
{complaint.title}

Description:
{complaint.description}
"""

        response = self.client.chat(
            model=settings.llm_model,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            format="json",
        )

        data = json.loads(
            response["message"]["content"]
        )

        return ExtractedEntities(
            assets=data.get("assets", []),
            issue_types=data.get("issue_types", []),
            keywords=data.get("keywords", []),
        )