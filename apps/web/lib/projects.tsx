import React from "react";

export interface ScrapCardConfig {
  rotation?: number;
  width?: number;
  height?: number;
  content?: React.ReactNode;
}

export interface Chapter {
  id: string;
  heading: string;
  body: string;
  highlights?: string[];
  scrapCards?: ScrapCardConfig[];
  annotation?: {
    svg: string[];
    label?: string;
    position: "left" | "right" | "top";
  };
  stat?: {
    value: string;
    label: string;
  };
  stats?: {
    value: string;
    label: string;
  }[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  tags: string[];

  card: {
    rotation: number;
    width: number;
    height: number;
    accent: string;
    stackDepth?: number;
  };

  story: {
    opening: {
      hook: string;
      bigQuestion: string;
      highlights?: string[];
    };
    chapters: Chapter[];
    depiction?: {
      title: string;
      body: string;
      highlights: string[];
    };
    closing: {
      insight: string;
      cta?: string;
      ctaHref?: string;
    };
  };
}

export const projects: Project[] = [
  {
    slug: "football-sponsorship-analytics",
    title: "Football Sponsorship Analytics",
    subtitle: "Building the Database That Football Sponsors Never Had",
    category: "Sports Analytics",
    date: "December 2025",
    tags: ["SQL", "Relational Database", "Data Engineering", "Marketing Analytics"],

    card: {
      rotation: -4,
      width: 520,
      height: 380,
      accent: "#C54B3E",
      stackDepth: 0,
    },

    story: {
      opening: {
        hook: "Every year, roughly $8.7 billion pours into sponsorship deals across Europe's top five football leagues. Yet the decision is still largely driven by reputation, hype, and gut instinct.",
        bigQuestion: "What if a single, governed database could replace that guesswork with evidence?",
        highlights: [
          "$8.7B/year — Big 5 league sponsorship market",
          ">39% — share of club revenue from sponsorships",
          "$75M/year — Etihad's shirt deal with Manchester City",
        ],
      },
      chapters: [
        {
          id: "act-1",
          heading: "The Problem No One Was Solving",
          body: "The gap was clear: raw football statistics and the commercial outcomes that investors care about lived in completely different worlds. No bridge existed between them.",
          scrapCards: [
            {
              width: 400,
              height: 280,
              rotation: -4,
              content: (
                <div className="absolute inset-0 overflow-hidden">
                  <img src="/images/messi-and-ronaldo.avif" alt="Messi and Ronaldo" className="w-full h-full object-cover" />
                </div>
              ),
            },
          ],
          stat: {
            value: "0",
            label: "commercial bridges",
          },
          stats: [
            {
              value: "7",
              label: "raw csvs",
            },
            {
              value: "155M",
              label: "annual deal",
            },
          ],
          annotation: {
            svg: ["M 10 30 Q 50 50 100 30 T 190 20"],
            label: "Disconnected",
            position: "right",
          },
        },
        {
          id: "act-2",
          heading: "Designing the Bridge",
          body: "The architecture followed a deliberate four-step pipeline: Raw Ingestion, Profiling and Validation, Core Schema Structuring, and Data Normalization. It transformed messy CSV source files into a governed, sponsor-ready analytical platform.",
          stats: [
            {
              value: "4",
              label: "step pipeline",
            },
            {
              value: "14",
              label: "governed entities",
            },
            {
              value: "726K",
              label: "rows",
            },
          ],
          scrapCards: [
            { 
              width: 300, 
              height: 200, 
              rotation: 6,
              content: (
                <div className="absolute inset-0 overflow-hidden">
                  <img src="/images/football-data.png" alt="Football Data" className="w-full h-full object-cover" />
                </div>
              )
            },
            { 
              width: 320, 
              height: 220, 
              rotation: -3,
              content: (
                <div className="absolute inset-0 overflow-hidden">
                  <img src="/images/database.jpg" alt="Database" className="w-full h-full object-cover" />
                </div>
              )
            },
          ],
        },
        {
          id: "act-3",
          heading: "Asking the Right Questions",
          body: "With a trustworthy, normalized database in place, the project posed 15 commercial questions organized around five analytical pillars: Audience Exposure, Narrative Impact, Reliability, Risk Management, and Value Identification.",
          stats: [
            {
              value: "15",
              label: "commercial questions",
            },
            {
              value: "5",
              label: "analytical pillars",
            },
            {
              value: "8.4",
              label: "action index",
            },
          ],
          scrapCards: [
            {
              width: 380,
              height: 260,
              rotation: 5,
              content: (
                <div className="absolute inset-0 overflow-hidden">
                  <img src="/images/mesut-ozil.avif" alt="Mesut Ozil" className="w-full h-full object-cover" />
                </div>
              ),
            },
          ],
          annotation: {
            svg: ["M 20 20 C 80 10 90 80 50 90 C 10 80 20 30 50 30"],
            label: "15 Key Metrics",
            position: "left",
          },
        },
        {
          id: "act-4",
          heading: "What This Makes Possible",
          body: "Brands can now choose where to invest by comparing league-level action intensity, volatility, and seasonal predictability. They can pick who to back by screening players for involvement, discipline, playing-time reliability, and hidden value.",
          stats: [
            {
              value: "15",
              label: "sql queries",
            },
            {
              value: "4.5",
              label: "involvement rate",
            },
            {
              value: "50%",
              label: "lower fees",
            },
          ],
          scrapCards: [
            {
              width: 400,
              height: 280,
              rotation: -5,
              content: (
                <div className="absolute inset-0 overflow-hidden">
                  <img src="/images/champion.jpg" alt="Champion" className="w-full h-full object-cover" />
                </div>
              ),
            },
          ],
        },
      ],
      depiction: {
        title: "The Architecture",
        body: "The system spans across 6 seasons (2014–2020), mapping the performance of 146 clubs across 12,680 games to provide the most comprehensive commercial view of European football.",
        highlights: [
          "2-layer architecture — `football_raw` → `football_core`",
          "12,680 games, 146 clubs — 6 seasons (2014–2020)",
          "3.5 billion football fans globally — the base audience",
        ],
      },
      closing: {
        insight: "It bridges the world of football analytics and the world of brand strategy, proving that the same data powering match previews and fantasy leagues can power million-dollar sponsorship decisions.",
        cta: "Read Full Report",
        ctaHref: "/projects/football-sponsorship-analytics/var2",
      },
    },
  },
  {
    slug: "loan-default-prediction",
    title: "One Bad Loan Costs Five Good Ones",
    subtitle: "Building a Profit-Maximizing Default Prediction Engine",
    category: "Machine Learning · Banking",
    date: "March 2026",
    tags: ["Python", "Gradient Boosting", "SMOTE", "Profit Optimization", "SBA Dataset"],

    card: {
      rotation: 6,
      width: 500,
      height: 360,
      accent: "#8B5CF6",
      stackDepth: 0,
    },

    story: {
      opening: {
        hook: "The U.S. SBA guarantees over $28 billion in loans every year. When a borrower defaults, the bank doesn't just lose interest — it loses five times what it would have earned from a good loan.",
        bigQuestion: "What if the model's job isn't to be right — but to be profitable?",
        highlights: [
          "5:1 cost ratio — one missed default wipes five good loans",
          "$28B+ SBA loan guarantees issued annually",
          "~20% default rate — yet most models optimize for the 80%",
        ],
      },
      chapters: [
        {
          id: "act-1",
          heading: "The Gap in the Literature",
          body: "Previous research on loan default prediction focused almost entirely on classification accuracy. None incorporated the asymmetric cost structure banks actually face: a missed default costs 5x more than the profit from a good loan.",
          stat: {
            value: "98.5%",
            label: "accuracy — no profit metric",
          },
          stats: [
            {
              value: "3",
              label: "prior studies",
            },
            {
              value: "150B",
              label: "market at stake",
            },
          ],
          scrapCards: [
            {
              width: 400,
              height: 280,
              rotation: -5,
              content: (
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-rose-700/30 p-5 font-mono overflow-hidden">
                  <div className="text-xs leading-tight">
                    <p className="text-red-300 mb-2">// EXISTING LITERATURE</p>
                    <div className="space-y-1">
                      <p className="text-white/70">Xu et al. (2021)</p>
                      <p className="text-green-400">Accuracy: 98.5% ✓</p>
                      <p className="text-red-400">Profit metric: MISSING ✗</p>
                    </div>
                    <div className="mt-3 border-t border-red-800 pt-2 space-y-1">
                      <p className="text-white/70">Robisco & Martinez (2022)</p>
                      <p className="text-green-400">Accuracy: 85.3% ✓</p>
                      <p className="text-red-400">Cost-sensitivity: NONE ✗</p>
                    </div>
                    <div className="mt-3 border-t border-red-800 pt-2">
                      <p className="text-orange-400">⚠️ 3 STUDIES REVIEWED</p>
                      <p className="text-orange-400">⚠️ 0 PROFIT-OPTIMIZED</p>
                      <p className="text-orange-400">⚠️ ASYMMETRIC COST IGNORED</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ],
          annotation: {
            svg: ["M 10 30 Q 50 50 100 30 T 190 20"],
            label: "Wrong metric",
            position: "right",
          },
        },
        {
          id: "act-2",
          heading: "Understanding the Data",
          body: "The SBA dataset contains 899,164 loan records spanning 1987 to 2014 across 27 variables. Exploratory analysis revealed sharp patterns: Real Estate/Leasing had the highest default rate at ~30%, and longer-term loans were actually less likely to default.",
          stat: {
            value: "899K",
            label: "loan records",
          },
          stats: [
            {
              value: "27",
              label: "variables",
            },
            {
              value: "561K",
              label: "after cleaning",
            },
          ],
          scrapCards: [
            {
              width: 360,
              height: 240,
              rotation: 7,
              content: (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-700/30 p-4 font-mono overflow-hidden">
                  <div className="text-xs leading-tight">
                    <p className="text-emerald-200 mb-2">// SBA LOAN DATASET</p>
                    <p className="text-teal-300">Records: 899,164</p>
                    <p className="text-teal-300">Period: 1987–2014</p>
                    <p className="text-teal-300">Variables: 27 raw</p>
                    <div className="mt-3 border-t border-emerald-800 pt-2 space-y-1">
                      <p className="text-yellow-400">⚡ Real Estate: ~30% default</p>
                      <p className="text-yellow-400">⚡ Urban {">"} Rural default</p>
                      <p className="text-yellow-400">⚡ 2008 crisis peak</p>
                    </div>
                    <div className="mt-3 text-emerald-400">
                      <p>→ 561,756 final records</p>
                      <p>→ 16 engineered features</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ],
        },
        {
          id: "act-3",
          heading: "Tackling the Hard Problems",
          body: "The dataset was heavily imbalanced — 81% paid in full, only 19% defaulted. Four strategies were applied in combination: class weight adjustment, SMOTE oversampling, recall-based tuning, and a profit optimization layer selecting the threshold that maximizes net dollars.",
          stat: {
            value: "81%",
            label: "paid in full — 19% defaulted",
          },
          stats: [
            {
              value: "4",
              label: "mitigation strategies",
            },
            {
              value: "5x",
              label: "cost of missed default",
            },
          ],
          scrapCards: [
            {
              width: 380,
              height: 260,
              rotation: -4,
              content: (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-700/30 p-5 font-mono overflow-hidden">
                  <div className="text-xs leading-tight">
                    <p className="text-blue-200 mb-2">// IMBALANCE STRATEGIES</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">①</span>
                        <span className="text-white/80">Class weight (5x penalty)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">②</span>
                        <span className="text-white/80">SMOTE oversampling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">③</span>
                        <span className="text-white/80">Recall-based tuning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">④</span>
                        <span className="text-white/80">Profit optimization layer</span>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-blue-700 pt-2">
                      <p className="text-cyan-400">Good loan: +5% gain</p>
                      <p className="text-red-400">Bad loan: -25% loss</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ],
          annotation: {
            svg: ["M 20 20 C 80 10 90 80 50 90 C 10 80 20 30 50 30"],
            label: "Imbalanced",
            position: "left",
          },
        },
        {
          id: "act-4",
          heading: "The Model Showdown",
          body: "Seven models were trained and compared — from Logistic Regression to Neural Networks. Each was tuned via GridSearchCV and evaluated on a profit function. Gradient Boosting emerged as the winner with $506.98M profit on the validation set at a 0.27 threshold.",
          stat: {
            value: "$507M",
            label: "profit — gradient boosting wins",
          },
          stats: [
            {
              value: "7",
              label: "models tested",
            },
            {
              value: "0.97",
              label: "AUC score",
            },
          ],
          scrapCards: [
            {
              width: 400,
              height: 290,
              rotation: 5,
              content: (
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-purple-700/30 p-4 font-mono overflow-hidden">
                  <div className="text-xs leading-tight">
                    <p className="text-violet-200 mb-2">// MODEL LEADERBOARD</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/60">Logistic Reg.</span>
                        <span className="text-white/50">$342M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">KNN</span>
                        <span className="text-white/50">$389M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Decision Tree</span>
                        <span className="text-white/50">$421M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Random Forest</span>
                        <span className="text-white/50">$478M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Neural Network</span>
                        <span className="text-white/50">$491M</span>
                      </div>
                      <div className="flex justify-between border-t border-violet-600 pt-1 mt-1">
                        <span className="text-yellow-300 font-bold">Gradient Boost</span>
                        <span className="text-yellow-300 font-bold">$507M 🏆</span>
                      </div>
                    </div>
                    <div className="mt-3 text-purple-300">
                      <p>Threshold: 0.27 (73% approved)</p>
                      <p>Recall: 91.6% • AUC: 0.97</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ],
        },
        {
          id: "act-5",
          heading: "What This Makes Possible",
          body: "The Gains and Lift Chart analysis confirmed the model consistently outperforms random approval 3.5–4x. The top feature driving predictions is loan Term at 79.46% importance. The system gives banks a deployable, profit-aware decision engine — not just a classifier.",
          stat: {
            value: "4x",
            label: "lift over random approval",
          },
          stats: [
            {
              value: "79.46%",
              label: "term importance",
            },
            {
              value: "$512M",
              label: "on test set",
            },
          ],
          scrapCards: [
            {
              width: 400,
              height: 280,
              rotation: -6,
              content: (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-yellow-700/30 p-5 font-mono overflow-hidden">
                  <div className="text-xs leading-tight">
                    <p className="text-amber-200 mb-2">// FEATURE IMPORTANCE</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-white/80">Term</span>
                          <span className="text-yellow-300">79.46%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: "79%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-white/80">RetainedJob</span>
                          <span className="text-amber-300">8.2%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: "8%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-white/80">NoEmp</span>
                          <span className="text-orange-300">5.1%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full">
                          <div className="h-full bg-orange-400 rounded-full" style={{ width: "5%" }} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-amber-700 pt-2">
                      <p className="text-green-400">✅ Test AUC: 0.9684</p>
                      <p className="text-green-400">✅ Generalizes to $511.70M</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ],
        },
      ],
      depiction: {
        title: "The Architecture",
        body: "This project bridges data science and banking economics — proving that optimizing for accuracy alone is a trap when costs are asymmetric, and that the right threshold chosen by profit can be worth hundreds of millions in real lending decisions.",
        highlights: [
          "899,164 records — 1987 to 2014, U.S. SBA loans",
          "0.27 optimal threshold — approving 73%, rejecting the riskiest 27%",
          "$660B+ total U.S. small business lending market at scale",
        ],
      },
      closing: {
        insight: "The right question isn't 'which borrowers will default?' — it's 'which approval decision maximizes profit?' Threshold choice matters more than model choice: the gap between worst and best model is $165M, but the gap between wrong and right threshold can be even larger.",
        cta: "Read Full Report",
        ctaHref: "/projects/loan-default-prediction/var2",
      },
    },
  },
];
