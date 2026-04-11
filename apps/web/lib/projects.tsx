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
    };
    chapters: Chapter[];
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
      },
      chapters: [
        {
          id: "act-1",
          heading: "The Problem No One Was Solving",
          body: "The gap was clear: raw football statistics and the commercial outcomes that investors care about lived in completely different worlds. No bridge existed between them.",
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
          scrapCards: [
            { 
              width: 300, 
              height: 200, 
              rotation: 6,
              content: (
                <div className="w-full h-full relative overflow-hidden bg-white">
                  <div className="absolute inset-0 z-10" />
                  <iframe 
                    src="/pdf/Project%201.pdf#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0" 
                    className="w-full h-full absolute scale-110 pointer-events-none"
                    style={{ top: '-5%', left: '-5%' }}
                    title="Slide 1" 
                  />
                </div>
              )
            },
            { 
              width: 320, 
              height: 220, 
              rotation: -3,
              content: (
                <div className="w-full h-full relative overflow-hidden bg-white">
                  <div className="absolute inset-0 z-10" />
                  <iframe 
                    src="/pdf/Project%201.pdf#page=2&view=Fit&toolbar=0&navpanes=0&scrollbar=0" 
                    className="w-full h-full absolute scale-110 pointer-events-none"
                    style={{ top: '-5%', left: '-5%' }}
                    title="Slide 2" 
                  />
                </div>
              )
            },
          ],
        },
        {
          id: "act-3",
          heading: "Asking the Right Questions",
          body: "With a trustworthy, normalized database in place, the project posed 15 commercial questions organized around five analytical pillars: Audience Exposure, Narrative Impact, Reliability, Risk Management, and Value Identification.",
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
          stat: {
            value: "100%",
            label: "auditable insights",
          },
        },
      ],
      closing: {
        insight: "It bridges the world of football analytics and the world of brand strategy, proving that the same data powering match previews and fantasy leagues can power million-dollar sponsorship decisions.",
        cta: "Read Full Report",
        ctaHref: "/projects/football-sponsorship-analytics/var2",
      },
    },
  },
];
