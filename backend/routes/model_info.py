from fastapi import APIRouter, HTTPException
from backend.services.model_service import model_service

router = APIRouter()


@router.get("/model-info", summary="Model metadata and accuracy comparison")
def model_info():
    """
    Returns training metadata: best model name, accuracy of all three
    models, dataset stats, and why Random Forest was chosen.
    """
    meta = model_service.get_metadata()
    if not meta:
        raise HTTPException(status_code=503, detail="Model metadata not available.")

    explanation = (
        "Random Forest was selected as the primary model because it is an ensemble "
        "method that builds multiple decision trees and merges their results, reducing "
        "overfitting compared to a single Decision Tree. It handles binary feature "
        "vectors (symptom present/absent) very well and provides reliable probability "
        "estimates through predict_proba, which is used for the confidence score."
    )

    return {
        "best_model":    meta.get("best_model"),
        "accuracies":    meta.get("accuracies", {}),
        "num_symptoms":  meta.get("num_symptoms"),
        "num_diseases":  meta.get("num_diseases"),
        "diseases":      meta.get("diseases", []),
        "dataset":       "Disease Symptom Prediction — Kaggle (Training.csv / Testing.csv)",
        "algorithms":    ["Decision Tree", "KNN (k=5)", "Random Forest (100 estimators)"],
        "why_best":      explanation,
    }
