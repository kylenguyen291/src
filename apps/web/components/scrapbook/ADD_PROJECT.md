# 📋 Scrapbook Portfolio — Add a Project

> Hand this file to the AI agent. It knows exactly what to build.

---

## 🗺️ System Architecture

The portfolio uses a **Desk + Editorial** hybrid pattern:

```
/app/
├── scrapbook/              ← "The Desk" hub — all projects as scattered cards
│   └── page.tsx            ← Entry point for hiring teams
│
└── projects/
    └── [slug]/
        └── page.tsx        ← One full editorial scroll page per project
```

**Flow for hiring team:**
1. Land on `/scrapbook` → see all project cards on a desk scene
2. Click a card → it zooms/expands → navigates to `/projects/[slug]`
3. Read the full editorial story for that project

---

## 📦 Data Contract — How to Register a New Project

All projects are defined in a single source of truth:

```
/apps/web/lib/projects.ts
```

Each project entry follows this interface:

```typescript
export interface Project {
  // Identity
  slug: string;           // URL: /projects/[slug]
  title: string;          // Main headline
  subtitle: string;       // One-line summary shown on the desk card
  category: string;       // e.g. "Sports Analytics", "Climate Data", "Finance"
  date: string;           // e.g. "March 2025"
  tags: string[];         // e.g. ["SQL", "Python", "Tableau"]

  // Desk card appearance
  card: {
    rotation: number;     // Tilt in degrees. Alternate + and - (e.g. -6, 8, -3)
    width: number;        // Card width in px. Recommended: 380–550
    height: number;       // Card height in px. Recommended: 280–400
    accent: string;       // Hex color for the card's accent line. Default: "#C54B3E"
    stackDepth?: number;  // 0 = front, higher = pushed back (z-index and blur)
  };

  // The editorial story — rendered as sections on the /projects/[slug] page
  story: {
    opening: {
      hook: string;       // 1 powerful sentence. E.g. "$8.7B spent on gut feel."
      bigQuestion: string; // The question the project answers
    };
    chapters: Chapter[];  // Ordered narrative sections (see below)
    closing: {
      insight: string;    // The "so what" — what did the data reveal?
      cta?: string;       // Optional link text + href for GitHub/demo
      ctaHref?: string;
    };
  };
}

export interface Chapter {
  id: string;             // Unique identifier, used as scroll anchor
  heading: string;        // Section title
  body: string;           // 2–4 sentences of narrative
  scrapCards?: ScrapCardConfig[]; // Optional decorative cards in this section
  annotation?: {          // Optional hand-drawn SVG annotation
    svg: string[];        // Array of SVG path `d` strings
    label?: string;       // Optional cursive label text
    position: "left" | "right" | "top";
  };
  stat?: {                // Optional hero stat (big number moment)
    value: string;        // e.g. "$8.7B" or "94%"
    label: string;        // e.g. "annual sponsorship spend"
  };
}

export interface ScrapCardConfig {
  rotation?: number;
  width?: number;
  height?: number;
  content?: React.ReactNode; // If omitted, renders as decorative blank card
}
```

---

## ✍️ Step-by-Step: Adding a New Project

### Step 1 — Add the project to `lib/projects.ts`

Open `/apps/web/lib/projects.ts` and add a new entry to the `projects` array.

**Rotation rules for the desk:**
- Alternate sign: if previous card is `-6`, make this one `+5` or `+8`
- Keep range between `-12` and `+12`
- Slightly different magnitude each time to feel organic

**Chapter count:** Aim for 3 chapters minimum (Problem → Process → Insight)

### Step 2 — The desk card appears automatically

The `/scrapbook` hub reads `lib/projects.ts` dynamically. No file changes needed.

### Step 3 — The project page is generated automatically

`/app/projects/[slug]/page.tsx` is a dynamic route that reads the project config and renders the full editorial scroll using `story.chapters`.

No new page files needed.

---

## 🎨 Design System — Scrapbook Tokens

These are the established visual tokens. Do NOT deviate.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#121212` | Page background |
| Paper | `#F9F6F0` | ScrapCard surface |
| Accent red | `#C54B3E` | Borders, annotations, cursor |
| Muted text | `#A0B0C0` | Secondary text, captions |
| Body font | `font-serif` | All headings |
| Code/meta font | `font-mono` | Tags, dates, categories |
| Grid lines | `rgba(160,176,192,0.2)` | Fixed background grid |

---

## 🧩 Available Components

All live in `/apps/web/components/scrapbook/`:

### `<ScrapCard />`
The physical paper card with physics, tape effect, and hover reveal.

```tsx
<ScrapCard
  rotation={-6}        // Tilt in degrees
  width={500}          // px
  height={350}         // px
  delay={0.2}          // Framer Motion entrance delay
  href="/projects/slug" // Navigates on click
  content={<div>...</div>} // Custom inner content
/>
```

### `<LiveSVG />`
Animated hand-drawn path that draws itself on scroll into view.

```tsx
<LiveSVG
  paths={["M 10 20 Q 50 40 100 25 T 190 10"]} // SVG path d strings
  viewBox="0 0 200 40"
  className="absolute -bottom-6 right-0 w-64 h-12"
  delay={0.5}      // Seconds before drawing starts
  duration={1.5}   // Drawing duration
/>
```

**Common path patterns:**
- Underline: `"M 10 30 Q 50 50 100 30 T 190 20"`
- Scribble circle: `"M 20 20 C 80 10 90 80 50 90 C 10 80 20 30 50 30"`
- Arrow down: `"M 50 10 Q 50 50 50 80"`, `"M 50 80 L 40 65"`, `"M 50 80 L 60 65"`
- Arrow curving: `"M 90 10 Q 50 20 20 80"`, `"M 20 80 L 10 60"`, `"M 20 80 L 40 70"`

### `<CustomCursor />`
Full-page custom cursor. Include once per page, already on `/projects/[slug]`.
Activates `VIEW` label on hover over `.interactive` class or any `a`/`button`.

---

## 📐 Page Layout Blueprint — `/projects/[slug]`

Each editorial scroll page follows this exact section order:

```
┌──────────────────────────────────────────────┐
│  [Fixed] Red margin lines (left + right)     │
│  [Fixed] Grid background                     │
│  [Fixed] Noise grain overlay                 │
│  [Fixed] Custom cursor                       │
│  [Fixed] Home button → /scrapbook            │
├──────────────────────────────────────────────┤
│  SECTION 1: HERO                             │
│  • Category label (mono, muted)              │
│  • Title (serif, 6xl–8xl)                    │
│  • LiveSVG underline under title             │
│  • 2 decorative ScrapCards (parallax)        │
├──────────────────────────────────────────────┤
│  SECTION 2: OPENING HOOK                     │
│  • story.opening.hook (large, bold)          │
│  • story.opening.bigQuestion (body text)     │
│  • Stat block if chapter has stat            │
├──────────────────────────────────────────────┤
│  SECTION 3+: CHAPTERS (one per story.chapter)│
│  • Alternating left/right text + cards layout│
│  • ScrapCards rendered per chapter config    │
│  • LiveSVG annotation if configured          │
├──────────────────────────────────────────────┤
│  FINAL SECTION: CLOSING                      │
│  • story.closing.insight                     │
│  • CTA button (GitHub / Demo) if provided    │
│  • LiveSVG flourish                          │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
│  • Project title + date                      │
└──────────────────────────────────────────────┘
```

---

## 📐 Page Layout Blueprint — `/scrapbook` (The Desk Hub)

```
┌──────────────────────────────────────────────┐
│  [Fixed] Background, grid, grain, cursor     │
├──────────────────────────────────────────────┤
│  HERO                                        │
│  • "My Work" or your name                    │
│  • Short tagline                             │
├──────────────────────────────────────────────┤
│  THE DESK                                    │
│  • All projects rendered as ScrapCards       │
│  • Positioned based on card.rotation         │
│  • Cards use href="/projects/[slug]"         │
│  • Cards contain: title, category, date      │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
└──────────────────────────────────────────────┘
```

---

## 🚦 Agent Instructions (Read This When Adding a Project)

When the user says "add [Project Name] to the scrapbook":

1. **ASK** for the following if not provided:
   - `title` and `subtitle`
   - `category` and `tags`
   - `story.opening.hook` — the one dramatic sentence
   - `story.opening.bigQuestion` — what the project answers
   - At least 3 chapter headings + brief body for each
   - `story.closing.insight` — the key finding
   - GitHub/demo link (optional)
   - Any key stats (numbers, percentages, etc.)

2. **THEN**:
   - Add entry to `lib/projects.ts`
   - Assign rotation that alternates sign from last project
   - The dynamic route handles the rest — no new page files

3. **DO NOT**:
   - Create a new `page.tsx` per project manually
   - Add placeholder chapters — only real content
   - Change the design tokens above

---

## 📁 File Map

```
apps/web/
├── lib/
│   └── projects.ts              ← ONLY file to edit when adding a project
├── app/
│   ├── scrapbook/
│   │   └── page.tsx             ← Hub page (reads projects.ts automatically)
│   └── projects/
│       └── [slug]/
│           └── page.tsx         ← Dynamic editorial page (reads projects.ts)
└── components/
    └── scrapbook/
        ├── ScrapCard.tsx        ← Paper card component
        ├── LiveSVG.tsx          ← Hand-drawn animated SVG
        ├── CustomCursor.tsx     ← Custom cursor (include once per page)
        └── ADD_PROJECT.md       ← This file
```

---

*Last updated: April 2026 · Architecture: Desk Hub + Editorial Scroll*
