# Project context for Claude

**Read this first before suggesting any changes.** It contains everything an LLM needs to understand the project structure, stack, deployment, and design philosophy.

## What this is

A personal research website for **Xiaochuan Li**, MSc student in Human and AI at UTN Nürnberg. The site exists to support PhD applications (target: late 2026 application window, fall 2027 start) on language, reasoning, and AI, using causal interpretability as the current methodological route.

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
├── layouts/Base.astro              # Shared shell: fixed frosted-glass nav (causal-triad mark +
│                                   # wordmark + page links + theme toggle), footer,
│                                   # IntersectionObserver script (.fade-in / .fade-in-up),
│                                   # pre-paint theme script (localStorage), reading-progress bar.
│                                   # `wide` prop opts out of the 720px container (homepage uses it).
├── components/
│   ├── MzcCards.tsx                # Lightweight M/Z/C variable-type module for Paper 1.
│   ├── Exp1Tweety.tsx              # Lightweight do(Z)/do(C)/do(M) walkthrough for Paper 1.
│   ├── Exp2AgreementTabs.tsx       # Lightweight aligned/control/attractor agreement module.
│   ├── MarginNote.astro            # Tufte-style sidenotes for research prose.
│   ├── HeroFigure.astro            # Static SVG for paper1: two parallel small DAGs
│   │                               # (SC-grounded vs SC-spurious).
│   ├── ProgressTimeline.astro      # Reusable vertical milestone timeline for project pages.
│   │                               # Current milestone shown by default; full version history expands.
│   ├── SCHierarchyFigure.astro     # Homepage About section concept figure — three concentric
│   │                               # rounded panels (accuracy ⊋ stable-correct ⊋ grounded) with
│   │                               # populations of dots in each band; do(C) callout arrow.
│   ├── TrajectoryTimeline.astro     # Homepage Apple-style scroll narrative spine.
│   ├── ProjectGlyph.astro          # Project glyphs reused on the /research index.
│   └── SectionDivider.astro        # (Legacy) horizontal line + tiny SVG mark; no longer used on
│                                   # the new homepage but kept for inner pages.
├── pages/
│   ├── index.astro                 # Home: Hero / scroll research spine / Currently / Writing /
│   │                               # Contact CTA. Uses `<Base wide={true}>`.
│   ├── cv.astro                    # CV page (PDF download link points to /cv.pdf)
│   ├── contact.astro               # Email, GitHub, location, PhD-application note
│   ├── research/
│   │   ├── index.astro             # Research index (core sequence + workbench + extensions)
│   │   ├── sc-certification.astro  # paper1 walkthrough — embeds three lightweight React islands
│   │   ├── isotrace.astro          # Expanded method page — behavioral path tracing
│   │   ├── mini-causal-models.astro # Supporting language-to-causal-graph workbench
│   │   ├── ciy.astro               # Paper 3 — quantitative grading
│   │   ├── latent-control-states.astro  # Mechanistic extension (formerly "LiT")
│   │   └── cross-lingual-protobias.astro
│   └── writing/
│       ├── index.astro             # Writing index (placeholder posts)
│       └── decidability-boundary.mdx  # Sample MDX post showing how to embed React inline
└── styles/global.css               # Design tokens (dark-default, .light override), frosted nav,
                                    # hero/section/about-grid/areas-card/contact-cta,
                                    # buttons (.btn-primary/.btn-secondary), fade-in-up,
                                    # prose, essay-fig, print stylesheet for /cv PDF.
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
  - `TrajectoryTimeline` renders the main program as an Apple-style scroll narrative: Leibniz portrait/question -> Certify -> Localize -> Quantify -> MiniCausalLang foundation.
  - The Leibniz origin uses `/public/images/leibniz-portrait.png`, an artistic historical portrait asset generated for the site.
  - MiniCausalLang is the workbench/foundation; collaborations sit as muted right-side branches.
- **Research focus card** (replaces the reference site's "skills with percentages"). Rows use uppercase label + monospace status tag + thin colored hairline. No numbers — status tags should reflect the roadmap (`Paper 1`, `Paper 2`, `Paper 3`, `Support`, `Extensions`, `Background`).

## The research program (high-level — don't summarize wrong)

Central question: **how does linguistic structure scaffold reasoning in humans and AI, and when do AI systems actually use the structure that licenses an inference?** Do not present the roadmap as six equal projects. It is a core sequence, with a supporting workbench and two extensions.

Core sequence: **Hierarchical Causal Evidence**.

1. **Stable Is Not Grounded** (Paper 1): Binary certification. Establishes `accuracy ⊋ stability ⊋ grounding`; the deepest cut `SC → {grounded, spurious}` requires **two-sided observability** (benchmark graph stipulated + training auditable). The §6.1 controlled demo: TF-IDF + LR classifier reaches 0.912 accuracy, fully stable; `do(class-3)` drops it Δ +.408, negative control `do(class-2)` only Δ +.021. The page status says v2 draft complete, with controlled synthetic evidence, HANS, BoolQ, and zero-shot portability checks integrated.

2. **Isotrace** (Paper 2): Behavioral path tracing in LLMs via synthetic concept labeling. Fictional concept names (Zorb, Veln, Quasp) and path-encoded naming conventions make different hypothesized reasoning paths produce different observable labels. This is behavioral evidence, not direct access to internal reasoning.

3. **Causal Inferential Yield (CIY)** (Paper 3): Quantitative grading. Defined on items whose grounding status is already certified or controlled, not arbitrary benchmark accuracy. The falsifiability test: if CIY cannot distinguish accuracy-matched and grounding-matched models, it collapses into accuracy repackaging.

Supporting workbench:

- **Mini Causal Models / MiniCausalLang**: A language-to-causal-graph workbench for the core program. It provides small grammars whose true generating graph and licensed inference space are known, so structure recovery, Isotrace-style path localization, and CIY-style grading can be tested against a known target.

Extensions:

- **Latent Control States**: Mechanistic extension. If a behavioral intervention reveals a causal control state, can a corresponding state or direction be found in activation space? **Never call this "LiT" publicly** — that is the UTN course name (Learning in Transformation). Do not foreground collaborators or supervision here.
- **Cross-lingual ProtoBias**: Applied multilingual/multimodal stress test. Does an evaluator track semantic content of an image-text pair, or lean on language- and culture-specific prototype shortcuts?

## Editing rules

- **Never reproduce the placeholder `Xiaochuan ___`** — name is always "Xiaochuan Li"
- **Never silently change identity fields** (name, email, monogram, GitHub link) — ask first
- **Never add fake citations or quotes** to writing posts — leave bracketed placeholders if needed
- **Don't propose Tailwind classes that aren't in v4 base** — no plugins are installed, plain utility classes only
- **All colored text on colored backgrounds must use the dark stop from the same color family** (see global.css palette comments)
- **The SC demo's numbers come from paper1 §6.1**; if a different model row is needed (DistilBERT Δ +.429, Qwen LoRA Δ +.501), pass via `regimeB` prop rather than editing the component
- **Reading-progress bar is opt-in** per page via `showProgress={true}` on the Base layout — only use it on long-form research/writing detail pages
- **Section rail is opt-in** per page via `toc={true}` in Astro pages or `toc: true` in MDX frontmatter. Use it for long-form research/writing detail pages with at least two direct `h2`/`h3` headings inside `.prose`; `Base.astro` builds the desktop "On this page" rail automatically, scroll-spies active headings, and falls back to single-column layout on mobile or sparse pages.
- **Project main pages follow one template:** a few-sentence intro → `## Roadmap` (a `ProgressTimeline`) → `## Latest progress` (the most recent milestone, inline), with everything else below. Each `done` milestone gets its own report subpage under the project's path. Full recipe in README "Adding / updating a project page"
- **Don't use HTML `<form>` tags** in React islands (Astro/Tailwind gotcha)

## How updates happen

1. Local edit (VS Code) on `~/Desktop/xchuan-li.github.io/`
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
