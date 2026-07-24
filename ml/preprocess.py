import pandas as pd
import numpy as np
from pathlib import Path

DATASET_DIR = Path(__file__).parent.parent / "dataset"


def load_data():
    """Load Training.csv and Testing.csv from dataset/."""
    train_path = DATASET_DIR / "Training.csv"
    test_path  = DATASET_DIR / "Testing.csv"

    if not train_path.exists() or not test_path.exists():
        raise FileNotFoundError(
            "Dataset not found. Place Training.csv and Testing.csv inside dataset/"
        )

    train_df = pd.read_csv(train_path)
    test_df  = pd.read_csv(test_path)

    return train_df, test_df


def preprocess(train_df: pd.DataFrame, test_df: pd.DataFrame):
    """
    Clean and split into features/labels.
    - Drops unnamed/duplicate columns
    - Separates symptom columns (X) from prognosis column (y)
    """
    # Drop unnamed trailing column if present (common in this dataset)
    train_df = train_df.loc[:, ~train_df.columns.str.contains("^Unnamed")]
    test_df  = test_df.loc[:, ~test_df.columns.str.contains("^Unnamed")]

    target = "prognosis"
    symptom_cols = [col for col in train_df.columns if col != target]

    X_train = train_df[symptom_cols].values.astype(np.int8)
    y_train = train_df[target].values

    X_test  = test_df[symptom_cols].values.astype(np.int8)
    y_test  = test_df[target].values

    return X_train, y_train, X_test, y_test, symptom_cols


def get_symptom_list():
    """Return sorted list of symptom column names."""
    train_df, _ = load_data()
    train_df = train_df.loc[:, ~train_df.columns.str.contains("^Unnamed")]
    return sorted([col for col in train_df.columns if col != "prognosis"])
