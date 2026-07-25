from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator

from backend.services.model_service import model_service
from backend.services.disease_service import get_disease_info

router = APIRouter()


class PredictRequest(BaseModel):
    symptoms: list[str]

    @field_validator("symptoms")
    @classmethod
    def must_have_symptoms(cls, v):
        if not v:
            raise ValueError("At least one symptom must be provided.")
        return v


@router.post("/predict", summary="Predict disease from selected symptoms")
def predict(request: PredictRequest):
    """
    Accepts a list of symptom names, runs the trained classifier,
    and returns the predicted disease with confidence and info.
    """
    try:
        result = model_service.predict(request.symptoms)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))

    disease = result["disease"]
    info    = get_disease_info(disease)

    return {
        "disease":      disease,
        "confidence":   result["confidence"],
        "description":  info["description"],
        "precautions":  info["precautions"],
        "symptoms_used": request.symptoms,
    }
