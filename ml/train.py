"""
Train Decision Tree, KNN, and Random Forest on the disease symptom dataset.
Compares test accuracy and saves the best-performing model + metadata.

Run from project root:
    python ml/train.py
"""

import json
import joblib
from pathlib import Path

from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier

from preprocess import load_data, preprocess

MODELS_DIR = Path(__file__).parent.parent / "models"
MODELS_DIR.mkdir(exist_ok=True)


def build_models():
    return {
        "decision_tree": DecisionTreeClassifier(
            random_state=42,
            max_depth=None,        # let it grow fully — dataset is clean
            criterion="gini",
        ),
        "knn": KNeighborsClassifier(
            n_neighbors=5,
            metric="euclidean",
        ),
        "random_forest": RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            n_jobs=-1,
        ),
    }


def train_and_evaluate():
    print("Loading dataset...")
    train_df, test_df = load_data()
    X_train, y_train, X_test, y_test, symptom_cols = preprocess(train_df, test_df)
    print(f"  Train samples : {len(X_train)}")
    print(f"  Test  samples : {len(X_test)}")
    print(f"  Symptoms      : {len(symptom_cols)}")
    print(f"  Diseases      : {len(set(y_train))}\n")

    models   = build_models()
    results  = {}

    for name, model in models.items():
        model.fit(X_train, y_train)
        accuracy = model.score(X_test, y_test)
        results[name] = {"model": model, "accuracy": round(accuracy, 4)}
        print(f"  {name:<20} accuracy = {accuracy:.4f}")

    return results, symptom_cols, list(set(y_train))


def save_best(results: dict, symptom_cols: list, disease_labels: list):
    best_name  = max(results, key=lambda k: results[k]["accuracy"])
    best_model = results[best_name]["model"]

    print(f"\nBest model : {best_name}  ({results[best_name]['accuracy']:.4f})\n")

    # Save model
    joblib.dump(best_model, MODELS_DIR / "best_model.joblib")

    # Save symptom columns so the API can build the feature vector
    with open(MODELS_DIR / "symptom_cols.json", "w") as f:
        json.dump(symptom_cols, f)

    # Save metadata for /model-info endpoint
    metadata = {
        "best_model": best_name,
        "accuracies": {k: v["accuracy"] for k, v in results.items()},
        "num_symptoms": len(symptom_cols),
        "num_diseases": len(disease_labels),
        "diseases": sorted(disease_labels),
    }
    with open(MODELS_DIR / "metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

    print("Saved:")
    print(f"  models/best_model.joblib")
    print(f"  models/symptom_cols.json")
    print(f"  models/metadata.json")


if __name__ == "__main__":
    results, symptom_cols, disease_labels = train_and_evaluate()
    save_best(results, symptom_cols, disease_labels)
