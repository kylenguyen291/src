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
          highlights: [
            "7 raw CSVs — zero enforced relationships",
            "4 structural failures — no model, no integrity, no analytical layer",
            "$155M/year — Nike × Barcelona kit deal, zero data backing it",
          ],
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
          highlights: [
            "4-step pipeline — Ingest → Validate → Structure → Normalize",
            "14 governed entities in `football_core`",
            "726,000+ rows — zero orphan records, zero blank IDs",
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
          highlights: [
            "15 commercial questions across 5 analytical pillars",
            "Bundesliga Action Index: 8.4 — highest of all 5 leagues",
            "Premier League Stability Index: 0.17 — most consistent year-on-year",
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
          highlights: [
            "15 repeatable SQL queries replacing expensive agency audits",
            "\"Safe Stars\" — >4.5 involvement/90 + <0.15 card risk/90",
            "30–50% lower fees contracting Hidden Stars before valuations peak",
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
          stat: {
            value: "100%",
            label: "auditable insights",
          },
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
];
