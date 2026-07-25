"""
Loads disease_info.json once and provides lookup by disease name.
"""

import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"

_cache: dict = {}


def load_disease_info() -> dict:
    global _cache
    if not _cache:
        path = DATA_DIR / "disease_info.json"
        with open(path) as f:
            _cache = json.load(f)
    return _cache


def get_disease_info(disease: str) -> dict:
    """Return description and precautions for a disease, or sensible defaults."""
    info = load_disease_info()
    return info.get(disease, {
        "description": "No description available for this condition.",
        "precautions": ["Consult a licensed medical professional for guidance."]
    })
