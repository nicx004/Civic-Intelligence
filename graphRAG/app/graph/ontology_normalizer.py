

from app.bootstrap.ontology import ONTOLOGY
from app.graph.constants import FallbackNodeIds
from app.models.extracted_entities import ExtractedEntities
import re


ENTITY_SYNONYMS = {
    # Street lighting
    "street lights": "street light",
    "streetlights": "street light",
    "street lamps": "street light",
    "street lamp": "street light",
    "road lights": "street light",
    "road light": "street light",
    "lamp posts": "lamp post",
    "light poles": "light pole",

    # Traffic
    "traffic lights": "traffic signal",
    "traffic light": "traffic signal",
    "signals": "traffic signal",
    "signal lights": "traffic signal",

    # Water
    "water pipes": "water pipeline",
    "water pipe": "water pipeline",
    "pipes": "pipeline",

    # Sewer
    "sewer pipe": "sewer pipeline",
    "sewer pipes": "sewer pipeline",
    "sewage pipe": "sewer pipeline",

    # Garbage
    "garbage bin": "dustbin",
    "trash bin": "dustbin",
    "waste bin": "dustbin",
    "dust bins": "dustbin",

    "water supply infrastructure": "water pipeline",
    "water infrastructure": "water pipeline",
    "water distribution": "water pipeline",
    "water supply": "water pipeline",
}





ISSUE_SYNONYMS = {
    # Generic
    "malfunction": "failure",
    "not working": "failure",
    "stopped working": "failure",
    "broken": "damage",
    "damaged": "damage",

    # Lights
    "street light malfunction": "street light failure",
    "street lights malfunction": "street light failure",
    "traffic light malfunction": "traffic signal failure",
    "traffic lights malfunction": "traffic signal failure",

    "traffic light not working": "traffic signal failure",
    "traffic lights not working": "traffic signal failure",

    "street light not working": "street light failure",
    "street lights not working": "street light failure",

    "blinking": "flickering",
    "blinking lights": "street light flickering",
    "flashing": "flickering",

    # Water
    "pipe leak": "water leakage",
    "water leak": "water leakage",
    "pipeline leak": "water leakage",

    "pipe burst": "burst pipeline",
    "pipeline burst": "burst pipeline",

    # Drainage
    "clogged drain": "blocked drain",
    "drain clogged": "blocked drain",
    "drain blockage": "blocked drain",

    "overflowing sewer": "sewer overflow",
    "sewage overflow": "sewer overflow",


    "damaged infrastructure": "damage",
    "infrastructure damage": "damage",
    "damaged pipeline": "burst pipeline",
    "water supply damaged": "water leakage",
}
class OntologyNormalizer:

    def __init__(self):
        self.assets = {}
        self.issue_types = {}

        self._build_indices()

    def _build_indices(self):
        for department in ONTOLOGY.departments:

            for asset in department.assets:
                self.assets[self._canonicalize(asset.name)] = asset.id

                for alias in asset.aliases:
                    self.assets[self._canonicalize(alias)] = asset.id

            for issue in department.issue_types:
                self.issue_types[self._canonicalize(issue.name)] = issue.id

                for alias in issue.aliases:
                    self.issue_types[self._canonicalize(alias)] = issue.id

    def normalize(
    self,
    entities: ExtractedEntities,
) -> ExtractedEntities:

        normalized_assets = []

        for asset in entities.assets:

            key = self._normalize_asset(asset)

            asset_id = self.assets.get(key)

            if asset_id is None:
                print(f"[Ontology] Unknown asset: {asset}")
                asset_id = FallbackNodeIds.OTHER_ASSET

            normalized_assets.append(asset_id)

        entities.assets = normalized_assets

        normalized_issue_types = []

        for issue in entities.issue_types:

            key = self._normalize_issue(issue)

            issue_id = self.issue_types.get(key)

            if issue_id is None:
                print(f"[Ontology] Unknown issue: {issue}")
                issue_id = FallbackNodeIds.OTHER_ISSUE

            normalized_issue_types.append(issue_id)

        entities.issue_types = normalized_issue_types

        return entities
    
    @staticmethod
    def _canonicalize(text: str) -> str:
        text = text.lower().strip()

        text = text.replace("-", " ")

        text = re.sub(r"\s+", " ", text)

        # basic plural normalization
        replacements = {
            "lights": "light",
            "roads": "road",
            "drains": "drain",
            "poles": "pole",
            "pipes": "pipe",
            "wires": "wire",
        }

        words = [
            replacements.get(word, word)
            for word in text.split()
        ]

        return " ".join(words)

    @staticmethod
    def _normalize_asset(asset: str) -> str:
        asset = OntologyNormalizer._canonicalize(asset)

        return ENTITY_SYNONYMS.get(asset, asset)


    @staticmethod
    def _normalize_issue(issue: str) -> str:
        issue = OntologyNormalizer._canonicalize(issue)

        return ISSUE_SYNONYMS.get(issue, issue)
    