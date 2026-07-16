# Project context for Claude

**Read this first before suggesting any changes.** It contains everything an LLM needs to understand the project structure, stack, deployment, and design philosophy.

## What this is

A personal research website for **Xiaochuan Li**, MSc student in Human and AI at UTN Nürnberg. The site exists to support PhD applications (target: late 2026 application window, fall 2027 start).

**Positioning (restructured 2026-07-16, current).** The identity is **experimental and computational semantics** — *"I work in experimental and computational semantics, studying how linguistic expressions structure reasoning."* The current question: *does an epistemic possibility expression ("It might be a star") merely signal uncertainty, or does it also help maintain **the star** as a live alternative for subsequent reasoning?* The approach: **start from a linguistic question, translate it into testable questions for cognitive science and language models, and use the resulting evidence to refine the original linguistic account.** Two explanatory levels, stated as **questions, never as arms**: the **developmental question** (how does this function become available in human cognition — *developmental realization*) and the **computational question** (is it learnable from linguistic input, and how is it realized — *distributional learnability and computational realization*). The hypothesis is made falsifiable by three **operational criteria** — content-specific / persistent / evidence-sensitive — which live under "Current case", not in the hero. Theoretical foundation stays linguistic: epistemic modality, speaker commitment, discourse update, maintenance of alternatives. **All positioning copy lives in `src/data/program.ts`** and nowhere else; every surface imports it.

**Status reality (do not overstate).** The developmental side is **being scoped** — no experiment is running, no ethics/participants, no collaborator agreed publicly. MODUS is an **exploratory methods pilot** (one model, one evidence family, missing a norm-matched random-direction control), not a finding. The working paper is in preparation. Keep these three tiers visibly distinct on `/research`.

**Removed from the site (2026-07-16):** the long `/motivation` essay moved to **`/writing/logic-of-natural-language`** (a personal motivation essay); the nav slot is now **`/approach`** (short research-approach page). `/motivation` → redirects to the essay; `/research-program` → `/approach`. Also gone: the homepage milestone timeline and `ResearchTimeline` usage, the "two arms" cards, and the developmental project entry in `research.ts` (it is a question on `/research`, not a card). New hero **`HeroAlternatives.astro`** (binary: merely signal uncertainty? / keep the star as a live alternative?) replaces `HeroModality.astro`, which stays orphaned for revert — as do `HeroCaseStudies.astro`, HanGL (`/research/hangl`), and ORDO (`/research/ordo`).

**Red lines — do NOT drift back.** (1) Do NOT reintroduce "one theory, two systems", **"human arm" / "LM arm"**, or anything that reads as a running human experiment. (2) Do NOT claim a model's **internal geometry adjudicates Kratzer-worlds vs. Lassiter-degree** — that framing is retired; behaviour first, representation only if behaviour is there, intervention only to test what it carries. Those two analyses remain the competing explanations, but are separated by what a modal *does* downstream. (3) Identity is **"experimental and computational semantics"**, NOT "experimental linguistics" (implies a running programme of human experiments) and NOT the over-broad *"how information is processed and transmitted in linguistic structure"* (reads as information theory / language processing) or *"language and reasoning"* (no falsifiable criterion). (4) Never frame the site *as* "causal inference" / "grounding certification" / "CIY" — methods, not identity. (5) Do NOT reintroduce the three-case-study framing (modals/compounds/generics). (6) **No collaborator names, no institutions on the developmental side.** (7) **Never write "LiT" publicly** — it is the UTN course name; the project is **Latent Control States · DFKI**. (8) Do not announce the internal work order ("linguistics paper first, then children, then LMs") — the site shows research logic and existing output, not a project-management timeline. (9) No `/writing` or standalone page for the working paper until it has a stable title, a 150–250 word abstract, an explicit theoretical contrast, and preliminary lit positioning.

Live URL: **https://xchuan-li.github.io**
Repo: **https://github.com/xchuan-li/xchuan-li.github.io**

## Stack

- **Astro 5** with MDX + React integrations
- **React 19** islands, used only for interactive demos (loaded via `client:load`)
- **Tailwind 4** via `@tailwindcss/vite`
- **TypeScript** (strict)
- Package manager: **pnpm**
- Deployed via **GitHub Actions** to **GitHub Pages** on every push to `main` (workflow at `.github/workflows/deploy.yml`)
- Dev server: `pnpm dev` → http://localhost:4321
- Build: `pnpm build` → outputs to `dist/`

## File structure

```
src/
├── layouts/Base.astro              # Shared shell: fixed frosted-glass nav (mark + wordmark +
│                                   # page links + theme toggle), footer, IntersectionObserver
│                                   # script (.fade-in / .fade-in-up), pre-paint theme script
│                                   # (localStorage), reading-progress bar, optional "On this page"
│                                   # TOC rail. `wide` prop opts out of the 720px container (homepage).
├── components/                     # Astro figures + a few React islands (interactive demos)
│   ├── HeroCaseStudies.astro       # Homepage hero figure — the three case studies.
│   ├── ResearchTimeline.astro      # Homepage vertical research spine (Leibniz lead-in + timeline).
│   ├── ProgressTimeline.astro      # Reusable vertical milestone timeline for project pages.
│   │                               # Current milestone shown by default; full history expands.
│   ├── ProjectGlyph.astro          # Project glyphs reused on the /research index.
│   ├── CaseFigure.astro, TLFig.astro          # spine/case sub-figures used by ResearchTimeline.
│   ├── HeroWorlds.astro, HeroCausalMatrix.astro, LineageTimeline.astro   # /motivation figures.
│   ├── Leibniz{Freedom,Language,Parallel}Figure.astro                    # /writing/from-leibniz figures.
│   ├── HanGLFigure.astro, HanGLDemo.tsx        # /research/hangl figure + interactive demo.
│   └── ProtoBiasDemo.tsx           # /research/cross-lingual-protobias interactive demo.
├── data/
│   ├── research.ts                 # Single source of truth for the project list (homepage + /research).
│   └── writing.ts                  # Single source of truth for writing posts (index + RSS).
├── pages/
│   ├── index.astro                 # Home: Hero / research spine / Collaborations / Contact CTA.
│   │                               # Uses `<Base wide={true}>`.
│   ├── plain.astro                 # Plain-text version of the homepage (same data sources).
│   ├── motivation.mdx              # The program's origin essay (Leibniz → modality).
│   ├── cv.astro                    # CV page (PDF download link points to /cv.pdf)
│   ├── contact.astro               # Email, GitHub, LinkedIn, PhD-application note
│   ├── 404.astro, rss.xml.ts
│   ├── research/
│   │   ├── index.astro             # Research index (mainline + collaborations)
│   │   ├── modus.astro             # Thesis — the format of modal force
│   │   ├── hangl.astro             # Sino-Korean morphology (has demo)
│   │   ├── ordo.astro              # Generics / defeasibility
│   │   └── cross-lingual-protobias.astro  (+ cross-lingual-protobias/report-1.astro)
│   └── writing/
│       ├── index.astro
│       ├── from-leibniz.mdx
│       ├── inverted-observability.mdx
│       └── meaning-beneath-language.mdx
└── styles/global.css               # Design tokens (dark-default, .light override), frosted nav,
                                    # hero/section/contact-cta, buttons (.btn-primary/.btn-secondary),
                                    # fade-in-up, prose, essay-fig, print stylesheet for /cv PDF.
```

## Identity (do not change without asking)

- Display name: **Xiaochuan Li**
- Email: **xiaochuan.li@utn.de** (UTN, used everywhere — preferred over Gmail for academic context)
- GitHub: **github.com/xchuan-li**
- Domain: `xchuan-li.github.io` (free GitHub Pages; may move to custom domain later)
- Languages: site is in **English only** (international academic audience)
- Undergrad: **B.A. Philosophy, Shenzhen University, College of Humanities (2020–2024)**. Senior thesis on Leibniz's *characteristica universalis* (advisor: Zang Yong). The intellectual bridge from undergrad to current ML/causal-interpretability work is real and explicitly thematized in `/writing/from-leibniz`.
- Graduate: **M.Sc. Human and AI, University of Technology Nuremberg (UTN), 2025–2027.**

## Visual / design philosophy

The homepage uses a dark-default, scroll-portfolio aesthetic — frosted-glass sticky nav, big display headings, fade-in-on-scroll, and a vertical research spine. Inner pages (research detail, writing, cv, contact) keep the narrow 720px container with prose typography. Academic-honest tone throughout: no inflated credentials, no skill-percentage bars, no marketing copy.

- **Theme.** Dark is default (`<html>` ships clean, `:root` carries dark tokens). User toggle adds `.light` and persists to `localStorage('theme')`. The pre-paint script in Base.astro applies the saved class before first paint to avoid flash.
- **Accent.** One warm accent color (`--color-accent`, terracotta in light, soft coral in dark). Project accent colors are scoped to research cards (driven by inline `--proj-color` and `--proj-tint`). Extended palette (deep, used sparingly): `--accent-indigo`, `--accent-deep-purple` (hero pull-quote rule), `--accent-champagne`, `--accent-amber` (load-bearing in the SCHierarchyFigure).
- **Fonts.** Inter (sans, also reused as `--font-display` at large sizes), Crimson Pro (serif — used for the hero pull-quote and margin questions), JetBrains Mono (code, status tags, formula captions in figures).
- **Type scale.** Hero heading `clamp(2.6rem, 9vw, 7.5rem)` / `font-weight: 700` / `line-height: 0.96`. Section heading `clamp(2.1rem, 5.5vw, 3.75rem)`. Body 16px / 1.7. Long-form prose 17px / 1.75, max-width 65ch.
- **Nav.** Fixed top, 60px tall, `backdrop-filter: blur(28px) saturate(1.4)`, 1px bottom border. Brand mark on left, page links centre-right, theme toggle far right. Hides nav-links below 720px.
- **Buttons.** `.btn-primary` (filled — white on dark / black on light), `.btn-secondary` (outline). Uppercase, 0.1em tracking, 12px, slight `translateY` lift on hover.
- **Scroll choreography.** `.fade-in-up` (28px translate + opacity) and `.fade-in` (opacity only); revealed by an IntersectionObserver in Base.astro at `threshold: 0.1`. `.fade-delay-100..600` modifiers stagger entries. `prefers-reduced-motion` disables all of it.
- **Cards.** Use cards only for compact repeated items or small tools. The homepage research section is not a card grid; the vertical spine leads alone.
- **Section rhythm.** Every section opens with: optional `.divider-line` (1px hairline) → `.section-label` (uppercase 0.3em tracking) → `.section-heading` (big bold) → optional `.section-sub`. The pattern is consistent across About / Currently / Research / Writing / Contact.
- **Homepage figures.**
  - `HeroModality.astro` is the hero's right-column figure (the modal *must*: the theory fork — Kratzer's possible worlds vs. Lassiter's degree — read in two systems, the mind and the model). `HeroCaseStudies.astro` is the orphaned former figure, kept for one-line revert.
  - `ResearchTimeline.astro` renders the research program below the hero: the Leibniz lead-in (`spineLeadIn` / `spineOrigin` in `index.astro`) followed by a single reverse-chronological stream of projects and mainline notes, driven by `src/data/research.ts` + `src/data/writing.ts`.
  - The Leibniz origin (on `/motivation`) uses `/public/images/leibniz-portrait.png`, an artistic historical portrait asset generated for the site.
- **Project status tags.** Rows use uppercase label + monospace status tag + thin colored hairline. No numbers / no skill-percentage bars. Status tags reflect each project's real state (e.g. `Ongoing`, `In design`, `Complete`) from `research.ts`, not a fixed paper roadmap.

## The research program (high-level — don't summarize wrong)

Central question: **what must a system's representations be like for it to genuinely grasp possibility and necessity — rather than merely behave as if it does?** Asked of language models, with the formal semantics of modality as the criterion layer. Do not present the roadmap as a list of equal projects, and do not frame it as a causal-inference program — causal/interventional methods are how the question is *measured*, not what it is *about*. It is a modality-centred program with an inherited verdict method, a supporting workbench, and off-mainline collaborations.

**The flagship — modal concepts (the forward center).** The Master's thesis (MODUS) asks whether a learner built from language alone develops rich modal representations (necessity/possibility as quantification over a space of alternatives), and when modal distinctions become load-bearing during training. Modality is where the whole program's structure-vs-surface question gets its sharpest, most falsifiable form (hold the modal word fixed, vary the modal base; sever surface correlates and see whether the capacity survives). Cross-lingual variation (可能/必须/一定 vs. *may/must* vs. *können/müssen/dürfen*) is the natural experiment. The thesis gets **no project card until it has results** — it enters as a milestone note.

**The inherited verdict method (first domain: causal structure).**

- **Stable Is Not Grounded** (workshop paper, in submission): a non-circular certification test — establishes `accuracy ⊋ stability ⊋ grounding`, where the deepest cut `SC → {grounded, spurious}` needs **two-sided observability** (benchmark structure stipulated + model side auditable). The §6.1 controlled demo: TF-IDF + LR reaches 0.912 accuracy, fully stable; `do(class-3)` drops it Δ +.408, negative control `do(class-2)` only Δ +.021. Present this as **the method the modality work inherits, proven in its first (causal-structural) domain** — not as the program's identity.
- **Isotrace** (parked diagnostic): behavioral path-tracing — distinct reasoning paths forced to produce distinct output labels. A hop-level upgrade to the binary verdict; kept on the site but withdrawn from the mainline.

**Supporting workbench.**

- **MiniCausalLang**: a workbench that **stipulates a formal-semantic object and projects it to text**, so structure recovery can be tested against a known target. Its first domain is the causal graph; it is being generalised into a **modal-semantic compiler** (a candidate world-set + a ◇/□ constraint → en/de/zh surfaces → graded for isomorphism to the pre-compilation object). This is what makes the certification cut *decidable* — the space of alternatives is known by construction.

**Off-mainline collaborations / range (kept honestly as such).**

- **Arrowhead** (completed thesis pilot): the mechanistic-tractability proof — a real LLM carries a steerable, genuinely-causal direction. Demonstrated range, not the center.
- **Latent Control States**: mechanistic extension (does prompt framing shift a causally relevant latent state?). **Never call this "LiT" publicly** — that is the UTN course name (Learning in Transformation). Do not foreground collaborators or supervision here.
- **Cross-lingual ProtoBias**: applied multilingual/multimodal stress test (semantic content vs. culture-specific prototype shortcuts).
- **HanGL**: cross-lingual grounding on real LLMs (surface Hangul vs. latent Hanja) — off the modality mainline, but the clearest demonstration of the cross-lingual intervention method the modal-typology stage reuses.

## Editing rules

- **Never reproduce the placeholder `Xiaochuan ___`** — name is always "Xiaochuan Li"
- **Never silently change identity fields** (name, email, monogram, GitHub link) — ask first
- **Never add fake citations or quotes** to writing posts — leave bracketed placeholders if needed
- **Don't propose Tailwind classes that aren't in v4 base** — no plugins are installed, plain utility classes only
- **All colored text on colored backgrounds must use the dark stop from the same color family** (see global.css palette comments)
- **Interactive demos (React islands) take their numbers as props** — keep headline figures in the page/data, not hard-coded inside the component, so the page and the demo update together. Current islands: `HanGLDemo.tsx`, `ProtoBiasDemo.tsx`.
- **Reading-progress bar is opt-in** per page via `showProgress={true}` on the Base layout — only use it on long-form research/writing detail pages
- **Section rail is opt-in** per page via `toc={true}` in Astro pages or `toc: true` in MDX frontmatter. Use it for long-form research/writing detail pages with at least two direct `h2`/`h3` headings inside `.prose`; `Base.astro` builds the desktop "On this page" rail automatically, scroll-spies active headings, and falls back to single-column layout on mobile or sparse pages.
- **Project main pages follow one template:** a few-sentence intro → `## Roadmap` (a `ProgressTimeline`) → `## Latest progress` (the most recent milestone, inline), with everything else below. Each `done` milestone gets its own report subpage under the project's path. Full recipe in README "Adding / updating a project page"
- **Don't use HTML `<form>` tags** in React islands (Astro/Tailwind gotcha)

## How updates happen

1. Local edit (VS Code) on `~/Desktop/PhD_Application/xchuan-li.github.io/`
2. `pnpm dev` for local preview at http://localhost:4321
3. Commit + push via GitHub Desktop
4. GitHub Actions auto-builds + deploys (workflow takes 2-3 min)
5. Live at https://xchuan-li.github.io

For new pages: create the `.astro` or `.mdx` file in `src/pages/`. File path determines URL (`src/pages/foo/bar.astro` → `/foo/bar`).

For new interactive demos: write the React component in `src/components/`, then import it in the page with `client:load`. Always pass paper-specific numbers as props.

## What this site is NOT

- Not a blog with comments / sign-ups / analytics
- Not a portfolio site for client work (the scroll-portfolio aesthetic is the visual chassis; the content is still academic — papers, projects, writing)
- Not a Substack / Medium replacement
- Not a place to host real datasets (Drive / HF for that)
- Not internationalized — English only
- Not a place for inflated credentials: no skill-percentage bars, no "creative developer" copy, no claims about expertise the user doesn't have. The user is an MSc student building toward a PhD; the site reflects that.

## Useful commands

```bash
pnpm dev          # local server
pnpm build        # production build
pnpm preview      # preview production build locally
```

## If asked to make stylistic changes

The site's visual language is established: dark-default scroll-portfolio chassis + academic-honest content. Stay inside it unless the user is explicitly redirecting.

- Reuse the existing tokens and classes (`.section`, `.section-label`, `.section-heading`, `.btn-primary/secondary`, `.fade-in-up`, `.areas-card`, `.contact-cta`) before inventing new ones.
- New homepage figures should match `SCHierarchyFigure`'s level of concept density — boxless, theme-aware via `var(--color-text-*)` and accent CSS vars, captioned with a small monospace footer if needed.
- Hero/section heading scale is `clamp(...)`-based; don't hard-code px sizes for the display layer.
- If you need a new "skills"-shaped block, copy the `.areas-card` pattern (uppercase label + monospace status tag + thin colored hairline). Don't introduce percentages.
- Inner pages stay narrow (720px) by default via `<Base>`; only the homepage uses `<Base wide={true}>`. Long-form detail pages may opt into the documented `toc` layout, which adds a left rail and widens `.prose` to 70ch on desktop.
- `prefers-reduced-motion` must continue to disable fade-ins and the scroll-indicator animation.
- Print stylesheet must stay light-themed so `/cv.pdf` exports cleanly regardless of the screen theme.

Out of scope without explicit ask: parallax, animated gradients, "creative" cursors, AI-art backgrounds, marketing-style social cards, hero stock photos.
