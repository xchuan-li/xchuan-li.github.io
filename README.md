# Xiaochuan's personal site

A research-focused personal website built with Astro 5, MDX, React (for interactive demos), and Tailwind 4. Live at **https://xchuan-li.github.io**.

The site presents one research program — *experimental and computational semantics: how linguistic expressions structure reasoning* — organised as identity → current case (epistemic modality) → approach → selected work, plus writing and a CV. The current question is whether epistemic possibility expressions merely weaken commitment or also keep content-specific alternatives available for subsequent evidence updating.

**Before editing any positioning copy, read `CONTEXT.md`** — it carries the red lines (no "two arms", no "internal geometry adjudicates Kratzer vs. Lassiter", no collaborator names, never "LiT"). **All positioning copy lives in `src/data/program.ts`** and is imported everywhere; never hand-write it into a page.

## What's here

```
src/
├── layouts/Base.astro          # shared shell: frosted nav, footer, theme toggle,
│                               # fade-in observer, reading-progress bar, optional TOC rail
├── components/                 # Astro figures + a few React islands (interactive demos)
│   ├── HeroAlternatives.astro  # homepage hero figure — the binary: merely signal
│   │                           # uncertainty? / keep the star as a live alternative?
│   ├── HeroModality.astro      # (orphaned) former hero — the worlds-vs-degree fork
│   ├── HeroCaseStudies.astro   # (orphaned) former three-case-study hero
│   ├── ResearchTimeline.astro  # (unused) former homepage research spine
│   ├── ProgressTimeline.astro  # reusable per-project roadmap timeline
│   ├── ProjectGlyph.astro / CaseFigure.astro / TLFig.astro
│   ├── HeroWorlds.astro / LineageTimeline.astro   # /writing/logic-of-natural-language figures
│   ├── HeroCausalMatrix.astro  # (orphaned)
│   ├── Leibniz{Freedom,Language,Parallel}Figure.astro   # /writing/from-leibniz figures
│   ├── HanGLFigure.astro
│   ├── HanGLDemo.tsx           # interactive demo — /research/hangl (orphaned)
│   └── ProtoBiasDemo.tsx       # interactive demo — /research/cross-lingual-protobias
├── data/
│   ├── program.ts              # SINGLE SOURCE OF TRUTH for positioning copy —
│   │                           # identity, current question, criteria, approach,
│   │                           # the two questions, meta description
│   ├── research.ts             # single source of truth for the project list
│   └── writing.ts              # single source of truth for writing posts
├── pages/
│   ├── index.astro             # home — hero / current case / approach / work / writing / contact
│   ├── plain.astro             # plain version of the homepage (same data sources)
│   ├── approach.astro          # the research approach, short (nav slot; was /motivation)
│   ├── cv.astro / contact.astro / 404.astro / rss.xml.ts
│   ├── research/
│   │   ├── index.astro         # current case → hypothesis → two questions → work
│   │   ├── modus.astro         # exploratory LM methods pilot
│   │   ├── hangl.astro         # (orphaned) Sino-Korean morphology
│   │   ├── ordo.astro          # (orphaned) generics / defeasibility
│   │   └── cross-lingual-protobias.astro  (+ cross-lingual-protobias/report-1.astro)
│   └── writing/
│       ├── index.astro
│       ├── logic-of-natural-language.mdx   # the motivation essay (was /motivation)
│       ├── from-leibniz.mdx
│       ├── inverted-observability.mdx
│       └── meaning-beneath-language.mdx
└── styles/global.css           # design tokens (dark default), frosted nav, prose typography
```

## Run locally

```bash
pnpm install
pnpm dev         # http://localhost:4321
pnpm build       # production build → dist/
pnpm preview     # preview the production build
```

## Deploy

The GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-builds and deploys to GitHub Pages on every push to `main`. The `site` in `astro.config.mjs` is set to `https://xchuan-li.github.io`; Pages source is set to **GitHub Actions** in the repo settings. A push to `main` is all that's needed to publish.

## Adding / updating a project

Projects have two touch-points: the data record and the page.

1. **Data record** — add or edit an entry in `src/data/research.ts`. This single source feeds both the rich homepage (`src/pages/index.astro`) and the plain one (`src/pages/plain.astro`), plus the `/research` index. The homepage timeline only shows the projects squarely on the modality mainline; the rest live on `/research`.
2. **Page** — each project main page under `src/pages/research/` follows one template:

```
1. A few-sentence intro      — what the project is, in 3–4 sentences
2. ## Roadmap                — the milestone timeline (ProgressTimeline)
3. ## Latest progress        — the most recent milestone's content, inline
   (research questions, data, references, demos follow below)
```

The roadmap is `src/components/ProgressTimeline.astro`. Each milestone is a dated node; `done` nodes may link to their own standalone report page (e.g. `cross-lingual-protobias/report-1.astro`), `active`/`planned` nodes don't.

```astro
---
import ProgressTimeline from "../../components/ProgressTimeline.astro";

const roadmap = [
  {
    date: "Jun 2026",
    phase: "Experiment 1 · Report 1",       // small mono kicker
    title: "One-line finding or milestone",
    summary: "A sentence or two of what this milestone is.",
    href: "/research/<project>/report-1",   // omit for non-clickable nodes
    status: "done",                          // "done" | "active" | "planned"
  },
];
---
<h2>Roadmap</h2>
<ProgressTimeline items={roadmap} accent="var(--accent-coral)" />
```

**To add a milestone:** push a new object to the roadmap array, and (for a `done` node) create its report page at `src/pages/research/<project>/<slug>.astro`. Astro lets a `foo.astro` page and a `foo/` directory of subpages coexist, so the report lives under the project's own path. Report pages reuse `<article class="prose">` and open with a `← <Project>` back-link.

## Adding a new interactive demo

1. Write the React component in `src/components/` (e.g. `HanGLDemo.tsx`, `ProtoBiasDemo.tsx` as worked examples). Use Tailwind classes and pull theme colors from CSS variables (`var(--color-bg)` etc.) so dark mode works. Pass any project-specific numbers as props.
2. Import it in a page with `client:load` (or `client:visible` for below-the-fold):

```astro
---
import MyDemo from '../../components/MyDemo.tsx';
---
<MyDemo client:load />
```

## Adding a writing post

Add an entry to `src/data/writing.ts` (so it appears in the index and RSS), then drop a `.mdx` file into `src/pages/writing/`. Front-matter:

```yaml
---
layout: ../../layouts/Base.astro
title: Your title
description: Short description
toc: true        # optional — adds the "On this page" rail for long-form posts
---
```

Wrap the body in `<div class="prose">` for typography; React components can be imported and used inline. With `toc: true`, `Base.astro` builds a left "On this page" rail on desktop from the direct `h2`/`h3` headings inside `.prose`, scroll-spies the active one, and collapses to a single column on mobile or when there are fewer than two headings.

## Design notes

See `CONTEXT.md` for the full design philosophy. In short:

- **Dark by default**, with a manual toggle persisted to `localStorage` and applied pre-paint to avoid a flash.
- **Restraint over ornament.** A single warm accent color, generous whitespace, no decorative gradients — a visual language for a research audience.
- **Reading width** capped at 65ch in `.prose`; long-form pages with `toc: true` widen to 70ch; the homepage uses the full-width container via `<Base wide={true}>`.
- **Motion** (`.fade-in` / `.fade-in-up`) is disabled under `prefers-reduced-motion`.
