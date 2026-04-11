import React from "react";

export interface ScrapCardConfig {
  rotation?: number;
  width?: number;
  height?: number;
  content?: React.ReactNode;
  offsetY?: number;
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
              offsetY: -350,
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
              offsetY: -400,
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
    category: "Banking Models",
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
              width: 380,
              height: 270,
              rotation: 4,
              offsetY: -200,
              content: (
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <img src="/images/income-statement.png" alt="Income Statement" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <p className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70 uppercase tracking-widest">// cost structure</p>
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
              offsetY: -320,
              content: (
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <img src="/images/sba-logo.png" alt="SBA Dataset" className="w-full h-full object-contain bg-white p-4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <p className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70 uppercase tracking-widest">// SBA dataset</p>
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
              offsetY: -450,
              content: (
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <img src="/images/tackling-problems.png" alt="Tackling the Hard Problems" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70 uppercase tracking-widest">// profit optimization</p>
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
              offsetY: -400,
              content: (
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <img src="/images/model-showdown.png" alt="The Model Showdown" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70 uppercase tracking-widest">// model showdown</p>
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
              width: 360,
              height: 260,
              rotation: 5,
              offsetY: -280,
              content: (
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <img src="/images/bank-possible.png" alt="Bank" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70 uppercase tracking-widest">// deployable engine</p>
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
