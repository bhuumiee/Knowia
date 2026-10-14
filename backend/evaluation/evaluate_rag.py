
import json
import csv
from pathlib import Path
from datetime import datetime

import requests

# Paths
EVALUATION_DIR = Path(__file__).parent
DATASET_FILE = EVALUATION_DIR / "test_dataset.json"
RESULTS_FILE = EVALUATION_DIR / "evaluation_results.csv"

API_URL = "http://127.0.0.1:8000/api/tutor"

def main():
    with open(DATASET_FILE, "r", encoding="utf-8") as file:
        dataset = json.load(file)

    results = []

    for item in dataset:
        print(f"\nTesting {item['id']}: {item['question']}")

        payload = {
            "question": item["question"],
            "subject": "Data Fundamentals",
            "topic": "Power BI",
            "language": "English",
            "filename": item["expected_source"] or ""
        }

        try:
            response = requests.post(API_URL, json=payload, timeout=120)
            response.raise_for_status()
            answer_data = response.json()

            answer = answer_data.get("content", "")
            citations = answer_data.get("citations", [])
            covered = answer_data.get("covered", False)
            contexts = answer_data.get("contexts", [])

            print("Answer:", answer)
            print("Citations:", citations)
            print("Covered:", covered)

            results.append({
                "id": item["id"],
                "question": item["question"],
                "reference_answer": item["reference_answer"] or "",
                "answer": answer,
                "expected_source": item["expected_source"] or "",
                "citations": json.dumps(citations, ensure_ascii=False),
                "covered": covered,
                "is_in_scope": item["is_in_scope"],
                "timestamp": datetime.now().isoformat(timespec="seconds"),
                "contexts": json.dumps(contexts, ensure_ascii=False),
                "error": ""

            })

        except Exception as error:
            print("Request failed:", error)
            results.append({
                "id": item["id"],
                "question": item["question"],
                "reference_answer": item["reference_answer"] or "",
                "answer": "",
                "expected_source": item["expected_source"] or "",
                "citations": "[]",
                "covered": "",
                "is_in_scope": item["is_in_scope"],
                "timestamp": datetime.now().isoformat(timespec="seconds"),
                "contexts": "[]",
                "error": str(error)
            })

    fieldnames = [
    "id", "question", "reference_answer", "answer",
    "expected_source", "citations", "covered",
    "is_in_scope", "contexts", "timestamp", "error"
    ]

    with open(RESULTS_FILE, "w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    print(f"\nEvaluation responses saved to: {RESULTS_FILE}")
    print("Note: These are raw responses, not RAGAS metric scores.")

if __name__ == "__main__":
    main()
