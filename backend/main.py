"""
Medical Symptom Disease Predictor — FastAPI Backend

Start server:
    uvicorn backend.main:app --reload --port 8000

API docs:
    http://localhost:8000/docs
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.services.model_service import model_service
from backend.routes import symptoms, predict, model_info


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model once when the server starts
    model_service.load()
    print("Model loaded successfully.")
    yield
    # Nothing to clean up


app = FastAPI(
    title="Medical Symptom Disease Predictor",
    description="Predict diseases from symptoms using a trained Random Forest classifier.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(symptoms.router,   prefix="/api")
app.include_router(predict.router,    prefix="/api")
app.include_router(model_info.router, prefix="/api")


@app.get("/", include_in_schema=False)
def root():
    return {"status": "running", "docs": "/docs"}
