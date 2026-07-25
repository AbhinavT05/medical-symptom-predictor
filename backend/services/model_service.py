"""
Loads the trained model and symptom columns once at startup.
All prediction logic lives here, keeping routes thin.
"""

import json
import joblib
import numpy as np
from pathlib import Path

MODELS_DIR = Path(__file__).parent.parent.parent / "models"


class ModelService:
    def __init__(self):
        self.model        = None
        self.symptom_cols = []
        self.metadata     = {}
        self._loaded      = False

    def load(self):
        """Load model artifacts from models/. Called once on FastAPI startup."""
        model_path = MODELS_DIR / "best_model.joblib"
        cols_path  = MODELS_DIR / "symptom_cols.json"
        meta_path  = MODELS_DIR / "metadata.json"

        if not model_path.exists():
            raise RuntimeError(
                "Model not found. Run  python ml/train.py  before starting the server."
            )

        self.model = joblib.load(model_path)

        with open(cols_path) as f:
            self.symptom_cols = json.load(f)

        with open(meta_path) as f:
            self.metadata = json.load(f)

        self._loaded = True

    def predict(self, symptoms: list[str]) -> dict:
        """
        Build a binary feature vector from selected symptoms,
        run prediction, and return disease + confidence.
        """
        if not self._loaded:
            raise RuntimeError("Model not loaded.")

        # Build binary feature vector aligned to training columns
        feature_vector = np.zeros(len(self.symptom_cols), dtype=np.int8)
        unknown = []

        for symptom in symptoms:
            if symptom in self.symptom_cols:
                idx = self.symptom_cols.index(symptom)
                feature_vector[idx] = 1
            else:
                unknown.append(symptom)

        if unknown:
            raise ValueError(f"Unknown symptoms: {unknown}")

        X = feature_vector.reshape(1, -1)

        disease    = self.model.predict(X)[0]
        proba      = self.model.predict_proba(X)[0]
        confidence = round(float(np.max(proba)) * 100, 2)

        return {"disease": disease, "confidence": confidence}

    def get_symptoms(self) -> list[str]:
        return self.symptom_cols

    def get_metadata(self) -> dict:
        return self.metadata


# Single shared instance — imported by routes
model_service = ModelService()
