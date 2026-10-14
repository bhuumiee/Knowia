
import csv
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from openai import AsyncOpenAI
from ragas.llms import llm_factory
from ragas.embeddings import GoogleEmbeddings
from ragas.metrics.collections import (
    Faithfulness,
    AnswerRelevancy,
    ContextPrecision,
    ContextRecall,
)

EVALUATION_DIR = Path(__file__).parent
INPUT_FILE = EVALUATION_DIR / "evaluation_results.csv"
OUTPUT_FILE = EVALUATION_DIR / "ragas_scores.csv"

# Load the same environment variables used by the backend.
load_dotenv(EVALUATION_DIR.parent / ".env")
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY was not found. Check the backend .env file."
    )

MODEL = "gemini-3.5-flash-lite"

# RAGAS uses LiteLLM to call Gemini.
client = AsyncOpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

evaluator_llm = llm_factory(
    MODEL,
    provider="openai",
    client=client,
    adapter="instructor",
)


# Use Google's embedding model for answer relevancy.
from google import genai
embedding_client = genai.Client(api_key=api_key)
embeddings = GoogleEmbeddings(client=embedding_client)

faithfulness_metric = Faithfulness(llm=evaluator_llm)
answer_relevancy_metric = AnswerRelevancy(
    llm=evaluator_llm,
    embeddings=embeddings,
)
context_precision_metric = ContextPrecision(llm=evaluator_llm)
context_recall_metric = ContextRecall(llm=evaluator_llm)


def score_metric(metric, **kwargs):
    result = metric.score(**kwargs)
    value = getattr(result, "value", None)
    if value is None:
        value = getattr(result, "score", None)
    return value


def main():
    with open(INPUT_FILE, "r", encoding="utf-8-sig", newline="") as file:
        rows = list(csv.DictReader(file))

    output_rows = []

    for row in rows:
        question = row["question"]
        answer = row["answer"]
        contexts = json.loads(row.get("contexts") or "[]")
        reference = row.get("reference_answer", "").strip()
        in_scope = row.get("is_in_scope", "").strip().lower() == "true"

        print(f"\nScoring {row['id']}: {question}")

        scores = {
            "faithfulness": "",
            "answer_relevancy": "",
            "context_precision": "",
            "context_recall": "",
            "scoring_error": "",
        }

        try:
            if not answer.strip() or not contexts:
                raise ValueError("Answer or retrieved contexts are empty.")

            scores["faithfulness"] = score_metric(
                faithfulness_metric,
                user_input=question,
                response=answer,
                retrieved_contexts=contexts,
            )

            scores["answer_relevancy"] = score_metric(
                answer_relevancy_metric,
                user_input=question,
                response=answer,
            )

            # Context precision/recall need a reference answer.
            # We only have references for in-scope questions.
            if in_scope and reference:
                scores["context_precision"] = score_metric(
                    context_precision_metric,
                    user_input=question,
                    reference=reference,
                    retrieved_contexts=contexts,
                )
                scores["context_recall"] = score_metric(
                    context_recall_metric,
                    user_input=question,
                    retrieved_contexts=contexts,
                    reference=reference,
                )

            print("Scores:", scores)

        except Exception as error:
            scores["scoring_error"] = str(error)
            print("Scoring error:", error)

        output_rows.append({
            "id": row["id"],
            "question": question,
            "is_in_scope": row["is_in_scope"],
            **scores,
        })

    fieldnames = [
        "id",
        "question",
        "is_in_scope",
        "faithfulness",
        "answer_relevancy",
        "context_precision",
        "context_recall",
        "scoring_error",
    ]

    with open(OUTPUT_FILE, "w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(output_rows)

    print(f"\nRAGAS scores saved to: {OUTPUT_FILE}")
    print("Blank context precision/recall values for Q3 are intentional:")
    print("Q3 is off-topic and has no reference answer.")


if __name__ == "__main__":
    main()
