"""
Loads the saved best model and prints a full classification report.

Run from project root:
    python ml/evaluate.py
"""

import json
import joblib
import numpy as np
from pathlib import Path
from sklearn.metrics import classification_report, confusion_matrix

from preprocess import load_data, preprocess

MODELS_DIR = Path(__file__).parent.parent / "models"


def evaluate():
    model_path = MODELS_DIR / "best_model.joblib"
    cols_path  = MODELS_DIR / "symptom_cols.json"

    if not model_path.exists():
        print("No saved model found. Run ml/train.py first.")
        return

    model = joblib.load(model_path)
    with open(cols_path) as f:
        symptom_cols = json.load(f)

    train_df, test_df = load_data()
    _, _, X_test, y_test, _ = preprocess(train_df, test_df)

    y_pred = model.predict(X_test)

    print("=" * 60)
    print("Classification Report")
    print("=" * 60)
    print(classification_report(y_test, y_pred))

    correct   = np.sum(y_pred == y_test)
    total     = len(y_test)
    print(f"Overall accuracy : {correct}/{total} = {correct/total:.4f}")


if __name__ == "__main__":
    evaluate()
