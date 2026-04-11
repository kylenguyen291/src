# Project 2 — Portfolio Data Points

---

### The Hook

| # | Data Point |
|---|-----------|
| 1 | **5:1 cost ratio** — one missed default wipes out five good loans |
| 2 | **$28B+** SBA loan guarantees issued annually in the U.S. |
| 3 | **~20% default rate** in the SBA dataset, yet most models optimize for the 80% |

---

### Act 1 — The Gap in the Literature

| # | Data Point |
|---|-----------|
| 1 | **98.5% accuracy** (Xu et al., 2021) — but no profit metric reported |
| 2 | **3 prior studies reviewed** — all focused on accuracy, none on cost-sensitive thresholds |
| 3 | **$150B+** in U.S. small business loan originations annually at stake |

---

### Act 2 — Understanding the Data

| # | Data Point |
|---|-----------|
| 1 | **899,164 loans**, 27 variables, spanning 1987–2014 |
| 2 | **~30% default rate** in Real Estate/Leasing — the highest of any industry |
| 3 | **561,756 records, 16 features** after cleaning, dropping, and engineering |

---

### Act 3 — Tackling the Hard Problems

| # | Data Point |
|---|-----------|
| 1 | **81% vs 19%** — class imbalance between PIF and CHGOFF |
| 2 | **4 strategies combined** — class weights, SMOTE, recall tuning, profit optimization |
| 3 | **-25% of disbursement** — the real cost per missed default vs. +5% gain per good call |

---

### Act 4 — The Model Showdown

| # | Data Point |
|---|-----------|
| 1 | **7 models tested** — from Logistic Regression to Neural Networks |
| 2 | **Gradient Boosting: $506.98M profit** — best of all models at 0.27 threshold |
| 3 | **0.97 AUC, 91.6% recall** — top discriminative power with high default capture |

---

### Act 5 — What This Makes Possible

| # | Data Point |
|---|-----------|
| 1 | **$511.70M on test set** — Gradient Boosting generalizes with AUC 0.9684 |
| 2 | **Term = 79.46% feature importance** — loan duration dominates all other predictors |
| 3 | **3.5–4x lift** over random approval in the Gains/Lift chart |

---

### The Depiction

| # | Data Point |
|---|-----------|
| 1 | **$342M → $507M** — profit range across all 7 models; threshold choice matters more than model choice |
| 2 | **0.27 optimal threshold** — approving 73% of loans, rejecting the riskiest 27% |
| 3 | **$660B+** total U.S. small business lending market — the scale this approach can serve |
