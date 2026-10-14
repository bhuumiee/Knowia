# Knowvia — System Evaluation Summary

## 1. Objective
Evaluate the basic functionality of Knowvia's source-grounded AI tutor using a small test dataset.

## 2. Test Setup
- Test cases: 3
- In-scope questions: 2
- Off-topic question: 1
- Evaluation method: API-based testing against the running Knowvia backend
- Results source: `evaluation_results.csv`

## 3. Observed Results

| Metric | Result |
|---|---:|
| Total test cases | 3 |
| Answers present | 3/3 (100%) |
| Citations present | 3/3 (100%) |
| Expected source named for in-scope questions | 2/2 (100%) |
| Recorded API errors | 0 |

These are basic functional checks. They measure the presence of answers and citations, not answer correctness, factual faithfulness, or citation accuracy.

## 4. Test Scenarios
1. Power BI: checked whether the tutor produced an answer and named the expected source.
2. Power BI data modeling: checked whether the tutor produced an answer and named the expected source.
3. Photosynthesis: used as an off-topic question to examine behavior outside the uploaded study material. Its response requires manual review.

## 5. RAGAS Evaluation Results

RAGAS scoring completed successfully for the three test cases. Faithfulness and answer relevancy were evaluated for all three questions. Context precision and context recall were evaluated for the two in-scope questions with reference answers.

| Metric | Q1: Power BI | Q2: Data Modeling | Q3: Photosynthesis |
|---|---:|---:|---:|
| Faithfulness | 0.900 | 0.727 | 0.000 |
| Answer relevancy | 0.880 | 0.964 | 0.904 |
| Context precision | 0.986 | 0.482 | N/A |
| Context recall | 1.000 | 1.000 | N/A |

Average scores for the two in-scope questions:
- Faithfulness: 0.814
- Answer relevancy: 0.922
- Context precision: 0.734
- Context recall: 1.000

Q3 was an off-topic question without a reference answer; context precision and recall were therefore not calculated. Its faithfulness score of 0.000 indicates that the generated response was not supported by the retrieved context according to the metric and warrants manual review.

These results are preliminary because the test set contains only three questions. They should not be interpreted as a comprehensive benchmark of Knowvia's overall performance.

## 6. Limitations
- Only three test cases were used; results are preliminary.
- Citation presence does not establish citation correctness.
- The off-topic response needs manual assessment for appropriate handling and grounding.
- Faithfulness, answer relevancy, context precision, and context recall remain unmeasured.

## 7. Supporting Files
- `test_dataset.json`: evaluation questions and references
- `evaluate_rag.py`: API evaluation script
- `evaluation_results.csv`: raw tutor responses and contexts
- `fallback_system_checks.csv`: basic automated checks
- `report_metrics.csv`: summary of measurable functional checks
- `score_ragas.py`: RAGAS scoring script; currently blocked by client compatibility
- `ragas_scores.csv`: scoring attempt output; not valid metric results

## 8. Conclusion
The initial functional evaluation confirmed that all three test cases returned answer text and citation information, and both in-scope cases named the expected source. These preliminary checks do not establish overall answer quality. A larger benchmark, manual citation review, and successful RAGAS scoring are needed for a more complete evaluation.
