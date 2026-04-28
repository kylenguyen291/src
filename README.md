# 🗂️ The Desk. — Portfolio of Nguyen Duc Phi Long

**The Desk.** is a personal portfolio built as an immersive, scrapbook-style data investigation platform. Rather than a traditional resume site, it presents real analytical case files — each a complete data investigation with a narrative arc, key findings, and rich visual storytelling.

🔗 **Live:** [data-portfolio-pi.vercel.app](https://data-portfolio-pi.vercel.app/)

---

## 🧠 What Is This?

> *"Without data, you're just another person with an opinion."* — W. Edwards Deming

This portfolio is framed as **"The Desk"** — a detective's desk filled with case files. Each case file is a real data project: a dataset, a hypothesis, and a deep analytical dive. Visitors don't browse a list of projects — they *open case files*.

The experience begins with a split-curtain reveal animation before landing on the main desk, where project cards are styled as physical scrap cards with tape strips and photo overlays.

---

## 📁 Case Files (Projects)

### 01 — Football Sponsorship Analytics · *Sports Analytics*
> **Building the Database That Football Sponsors Never Had**

$8.7 billion pours into European football sponsorship deals every year — yet decisions are still driven by gut instinct. This project built a two-layer relational database (`football_raw` → `football_core`) to bridge raw match statistics and commercial strategy.

- **726,000+ rows** across 12,680 games, 146 clubs, 6 seasons (2014–2020)
- **14 governed entities**, 15 SQL-powered commercial queries
- **5 analytical pillars**: Audience Exposure, Narrative Impact, Reliability, Risk, Value
- Stack: `SQL`, `Relational Database`, `Data Engineering`, `Marketing Analytics`

---

### 02 — One Bad Loan Costs Five Good Ones · *Banking Models*
> **Building a Profit-Maximizing Default Prediction Engine**

Most loan default models optimize for accuracy. This one optimizes for **profit**. Using the U.S. SBA dataset (899,164 records, 1987–2014), the project trained 7 ML models and selected thresholds based on a real asymmetric cost function: one missed default wipes out five good loans.

- **$507M profit** on validation set — Gradient Boosting at 0.27 threshold
- **0.97 AUC**, 4x lift over random approval
- Techniques: `SMOTE`, `GridSearchCV`, `Profit Optimization`, `Class Weighting`
- Stack: `Python`, `Gradient Boosting`, `SMOTE`, `SBA Dataset`

---

## 🏗️ Architecture

This is a **Turborepo monorepo** with a single Next.js web app and shared packages.

```
src/
├── apps/
│   └── web/                  # Next.js 16 app (main portfolio)
│       ├── app/
│       │   ├── page.tsx              # Homepage — "The Desk" landing
│       │   └── projects/[slug]/      # Dynamic project detail pages
│       ├── components/
│       │   └── scrapbook/            # ScrapCard, CustomCursor, etc.
│       └── lib/
│           └── projects.tsx          # All case file content & metadata
├── packages/
│   ├── ui/                   # Shared shadcn/ui component library
│   ├── eslint-config/        # Shared ESLint config
│   └── typescript-config/    # Shared TypeScript config
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Monorepo | [Turborepo](https://turbo.build/) |
| UI Library | [shadcn/ui](https://ui.shadcn.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Language | TypeScript |
| Package Manager | [pnpm](https://pnpm.io/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## ✨ Design Highlights

- **Split-curtain reveal** — animated blue curtain opens on first load
- **ScrapCard system** — project cards styled as physical scrap paper with rotation, tape, and photo overlays
- **Custom cursor** — cursor follows mouse with smooth spring physics
- **Scrollytelling** — project detail pages scroll through chapters with animated stats, scrap cards, and annotations
- **Dark space aesthetic** — radial gradient background with `#0D1F4A` → `#060810`
- **PDF viewer** — full report accessible via embedded PDF reader per project

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Install & Run

```bash
# Install all dependencies
pnpm install

# Start the dev server (runs the web app)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Commands

```bash
pnpm build        # Build all apps
pnpm lint         # Lint all packages
pnpm typecheck    # TypeScript check across monorepo
```

### Adding UI Components

To add shadcn/ui components to the web app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components will be placed in `packages/ui/src/components/` and imported via:

```tsx
import { Button } from "@workspace/ui/components/button";
```

---

## 👤 Author

**Nguyen Duc Phi Long** — Business Analytics student with a focus on Product Management and Data Analytics.

- Interests: Sports, Finance, and building things that turn data into decisions.
