# One Bad Loan Costs Five Good Ones: Building a Profit-Maximizing Default Prediction Engine

**Loan Default Prediction on the U.S. SBA Dataset**

*By Nguyen Duc Phi Long*

---

**You'll learn how to build a machine learning system that doesn't just predict loan defaults — it maximizes the bank's actual profit.**

---

## The Hook

The U.S. Small Business Administration guarantees billions in loans every year. When a borrower defaults, the bank doesn't just lose interest — it loses five times what it would have earned from a good loan. Yet most default prediction models are optimized for accuracy, not dollars. A model that's 90% accurate can still hemorrhage money if it misclassifies the wrong 10%.

This project asks a different question: what if the model's job isn't to be right — but to be profitable?

---

## The Storyline

### Act 1 — The Gap in the Literature

Previous research on loan default prediction — Random Forest hitting 98.5% accuracy (Xu et al., 2021), XGBoost at 85.3% (Robisco & Martinez, 2022) — focused almost entirely on classification accuracy. None of them incorporated the asymmetric cost structure that banks actually face: a missed default costs 5x more than the profit from a good loan. This project bridges that gap by optimizing models on profit, not just prediction scores, and applies it to the unique SBA small business loan dataset.

### Act 2 — Understanding the Data

The dataset contains 899,164 SBA loan records spanning 1987 to 2014, with 27 variables covering borrower information, loan details, business attributes, and outcomes. Exploratory analysis revealed sharp patterns: Real Estate/Leasing had the highest default rate at ~30%, loan disbursements peaked right before the 2008 financial crisis, urban businesses defaulted more than rural ones, and longer-term loans were actually less likely to default. After dropping high-cardinality, leaky, and redundant features and engineering new ones like "Portion" (SBA guarantee ratio) and "RealEstate" (term > 240 months), the final modeling dataset held 561,756 records across 16 features.

### Act 3 — Tackling the Hard Problems

The dataset was heavily imbalanced — 81% paid in full, only 19% defaulted. A naive model could ignore all defaults and still score 81% accuracy while destroying profitability. Four strategies were applied in combination: class weight adjustment (penalizing missed defaults 5x harder), SMOTE oversampling to balance the training set, recall-based tuning to catch more actual defaults, and a profit optimization layer that selects the threshold maximizing net dollars — not just statistical metrics.

### Act 4 — The Model Showdown

Seven models were trained and compared — Logistic Regression (Lasso & Ridge), KNN, Decision Tree, Random Forest, Gradient Boosting, and Neural Network. Each was tuned via GridSearchCV, evaluated on a profit function, and assigned an optimal probability threshold. Gradient Boosting emerged as the winner: $506.98M profit on the validation set at a 0.27 threshold (73% success cut-off), with 91.6% recall and 0.97 AUC. On the test set, it generalized to $511.70M with an AUC of 0.9684.

### Act 5 — What This Makes Possible

The Gains and Lift Chart analysis confirmed the model consistently outperforms random approval (3.5–4x lift). Approving the safest 70.74% of loans yields peak cumulative profit of $499.43M. The top feature driving predictions is loan Term (79.46% importance), followed by RetainedJob and NoEmp. The system gives banks a deployable, profit-aware decision engine — not just a classifier.

---

## The Depiction

This project is a bridge between data science and banking economics. It proves that optimizing for accuracy alone is a trap when costs are asymmetric, and that the right threshold — chosen by profit, not probability — can be worth hundreds of millions in real lending decisions.
