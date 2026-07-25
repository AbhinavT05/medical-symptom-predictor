from fastapi import APIRouter, HTTPException
from backend.services.model_service import model_service

router = APIRouter()


@router.get("/symptoms", summary="List all valid symptom names")
def get_symptoms():
    """
    Returns the full list of symptom column names from the training dataset.
    The frontend uses this to populate the symptom selector.
    """
    symptoms = model_service.get_symptoms()
    if not symptoms:
        raise HTTPException(status_code=503, detail="Model not loaded.")
    return {"symptoms": symptoms, "count": len(symptoms)}
