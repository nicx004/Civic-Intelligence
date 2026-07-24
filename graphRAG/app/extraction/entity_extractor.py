import json

from ollama import Client

from app.config.settings import settings
from app.models.complaint import Complaint
from app.models.extracted_entities import ExtractedEntities
from app.bootstrap.ontology import ONTOLOGY


SYSTEM_PROMPT = """
You are an expert municipal complaint entity extraction engine.

Your task is to identify ONLY the physical municipal assets and issue types mentioned in a complaint.

Rules:

1. Return ONLY JSON.
2. Do NOT explain anything.
3. Do NOT invent new asset names.
4. Prefer specific physical assets over abstract concepts.
5. Ignore departments.
6. Ignore responsibilities.
7. Ignore infrastructure-level phrases unless no physical asset exists.
8. If the complaint mentions multiple assets, return all of them.
9. If multiple issue types exist, return all.
10. Keywords should contain important searchable terms.

If the complaint mentions categories such as:

Roads
Water Supply
Drainage
Street Lighting
Traffic
Garbage
Parks
Trees
Electricity
Sewerage

map them to the closest physical asset from the ontology.

Never output abstract terms such as:

Infrastructure
Civil Infrastructure
Public Infrastructure
Water Supply Infrastructure
Road Infrastructure
Damaged Infrastructure

Always choose the closest physical asset present in the ontology.

Municipal Ontology

{ontology}

Return ONLY valid JSON.
"""


class EntityExtractor:

    

    def __init__(self):
        print("=" * 60)
        print("OLLAMA URL:", repr(settings.ollama_url))
        print("LLM MODEL :", repr(settings.llm_model))

        self.client = Client(
            host=settings.ollama_url,
        )

        print("CLIENT CREATED")

        self.ontology_prompt = self.build_ontology_prompt()
            

    def extract(
        self,
        complaint: Complaint,
    ) -> ExtractedEntities:

        prompt = f"""Extract municipal entities from this complaint.

        Title:
        {complaint.title}

        Description:
        {complaint.description}

        Return JSON only.
        """

        system_prompt = SYSTEM_PROMPT.format(
            ontology = self.ontology_prompt,
        )

        print("Calling Ollama chat...")
        print("Model:", settings.llm_model)

        response = self.client.chat(
            model=settings.llm_model,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
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
        print("\nLLM Output")
        print(json.dumps(data, indent=2))
        if (
            not data.get("assets")
            and not data.get("issue_types")
        ):
            print("Primary extraction failed. Retrying...")

            retry_prompt = f"""
        Complaint:

        Title:
        {complaint.title}

        Description:
        {complaint.description}

        The previous extraction failed.

        Identify the MOST relevant municipal asset and issue.

        Return JSON only.
        """

            retry = self.client.chat(
                model=settings.llm_model,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                    {
                        "role": "user",
                        "content": retry_prompt,
                    },
                ],
                format="json",
            )

            data = json.loads(
                retry["message"]["content"]
            )
            print("\nRetry Output")
            print(json.dumps(data, indent=2))
           
        assets = data.get("assets", [])
        issues = data.get("issue_types", [])
        keywords = data.get("keywords", [])
        if not keywords:
            keywords = (
                complaint.title + " " + complaint.description
            ).lower().split()
        print("\nFinal Extracted Entities")
        print("Assets:", assets)
        print("Issue Types:", issues)
        print("Keywords:", keywords)
        return ExtractedEntities(
            assets=assets,
            issue_types=issues,
            keywords=keywords,
        )

    def build_ontology_prompt(self):

        lines = []

        for department in ONTOLOGY.departments:

            lines.append(f"Department: {department.name}")

            if department.categories:
                lines.append("Categories:")
                for category in department.categories:
                    aliases = ", ".join(category.aliases)
                    lines.append(
                        f"- {category.name} (aliases: {aliases})"
                    )

            if department.assets:
                lines.append("Assets:")
                for asset in department.assets:
                    aliases = ", ".join(asset.aliases)
                    lines.append(
                        f"- {asset.name} (aliases: {aliases})"
                    )

            if department.issue_types:
                lines.append("Issue Types:")
                for issue in department.issue_types:
                    aliases = ", ".join(issue.aliases)
                    lines.append(
                        f"- {issue.name} (aliases: {aliases})"
                    )

            lines.append("")

        return "\n".join(lines)