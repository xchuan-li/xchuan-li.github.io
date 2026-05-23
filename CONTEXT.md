# Project context for Claude

**Read this first before suggesting any changes.** It contains everything an LLM needs to understand the project structure, stack, deployment, and design philosophy.

## What this is

A personal research website for **Xiaochuan Li**, MSc student in Human and AI at UTN Nürnberg. The site exists to support PhD applications (target: late 2026 application window, fall 2027 start) at the intersection of causal inference and interpretability.

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
├── layouts/Base.astro              # Shared header (with XL monogram), footer, nav, reading-progress bar
├── components/
│   ├── SCDemo.tsx                  # Interactive demo for paper1: SC-grounded vs SC-spurious.
│   │                               # Includes three integrated figures:
│   │                               #   - DAG (M, Y, color, name) with severable arrows that respond to do()
│   │                               #   - Regime A vs B bar chart across baseline/do(3)/do(2)
│   │                               #   - §6.1 three-model Δ table (TF-IDF, DistilBERT, Qwen LoRA)
│   │                               # Props-configurable so paper revs swap numbers without code changes.
│   └── SectionDivider.astro        # Horizontal line + tiny SVG mark (dots/arrow/node/x).
│                                   # Used between sections on the homepage.
├── pages/
│   ├── index.astro                 # Home: hero + project cards + "Currently" + writing
│   ├── cv.astro                    # CV page (PDF download link points to /cv.pdf)
│   ├── contact.astro               # Email, GitHub, location, PhD-application note
│   ├── research/
│   │   ├── index.astro             # Research index (list of all projects)
│   │   ├── sc-certification.astro  # paper1 detail page — embeds <SCDemo client:load />
│   │   ├── isotrace.astro          # Stub — needs interactive demo eventually
│   │   ├── ciy.astro               # Stub — needs falsifiability widget eventually
│   │   └── lit.astro               # Stub — team project at DFKI
│   └── writing/
│       ├── index.astro             # Writing index (placeholder posts)
│       └── decidability-boundary.mdx  # Sample MDX post showing how to embed React inline
└── styles/global.css               # Design tokens (CSS variables), prose typography, dark mode,
                                    # monogram, reading-progress, hero-accent, project color bars
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

The look is intentionally restrained — academic-personal, not portfolio-flashy. References: Cosma Shalizi, Lena Voita, Maria Antoniak, Andy Matuschak's now page. **Not** Apple keynote, not Vercel marketing site, not al-folio.

- One warm accent color (`--color-accent`, terracotta in light mode, soft coral in dark)
- Four project accent colors (coral / teal / purple / amber) used only as 2px left-border on research cards — one color per paper, consistent everywhere
- Light + dark mode via `prefers-color-scheme` (CSS variables in `global.css`)
- Fonts: Inter (sans), Crimson Pro (serif, used in monogram + select editorial moments), JetBrains Mono (code)
- Body: 16px / 1.7. Long-form prose: 17px / 1.75, max-width 65ch.
- No gradients, no drop shadows, no decorative effects. 0.5px borders. Generous whitespace.
- Single accent visual elements:
  - Vertical accent bar left of homepage h1 (`.hero-accent`)
  - Section dividers between homepage sections (`<SectionDivider mark="..." />`)
  - Project color bars on research cards (`.proj-card`, color set via inline `--proj-color`)
  - Reading-progress bar at top of long-form pages (`<Base showProgress={true}>`)
  - `.now-list` for the "Currently" section (arrow bullets)

## The research papers (high-level — don't summarize wrong)

1. **Stable is not grounded** (paper1, target Aug 2026 deadline): An acyclic certification framework. Hierarchy is `accuracy ⊋ stability ⊋ grounding`; the deepest cut `SC → {grounded, spurious}` requires **two-sided observability** (benchmark graph stipulated + training auditable). The §6.1 controlled demo: TF-IDF + LR classifier reaches 0.912 accuracy, fully stable; `do(class-3)` drops it Δ +.408, negative control `do(class-2)` only Δ +.021. This is what the live SCDemo on /research/sc-certification reproduces interactively.

2. **Isotrace**: Behavioral tracing of multi-hop reasoning. Fictional concept names (Zorb, Veln, Quasp) with path-encoded naming conventions locate where shortcut substitution fires, hop-by-hop, without opening the model. Complementary to mech interp.

3. **CIY (causal inferential yield)**: A graded measure over SC-grounded items. The falsifiability test: if you cannot construct two models matched on accuracy + grounding but with opposing CIY, CIY collapses into accuracy repackaging.

4. **LiT** (team project, May–Dec 2026): Mechanistic interpretability of prompt-framing effects. DFKI collaboration. Supervised by Simon Ostermann; primary UTN contact Michael Roth.

## Editing rules

- **Never reproduce the placeholder `Xiaochuan ___`** — name is always "Xiaochuan Li"
- **Never silently change identity fields** (name, email, monogram, GitHub link) — ask first
- **Never add fake citations or quotes** to writing posts — leave bracketed placeholders if needed
- **Don't propose Tailwind classes that aren't in v4 base** — no plugins are installed, plain utility classes only
- **All colored text on colored backgrounds must use the dark stop from the same color family** (see global.css palette comments)
- **The SC demo's numbers come from paper1 §6.1**; if a different model row is needed (DistilBERT Δ +.429, Qwen LoRA Δ +.501), pass via `regimeB` prop rather than editing the component
- **Reading-progress bar is opt-in** per page via `showProgress={true}` on the Base layout — only use it on long-form research/writing detail pages
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
- Not a portfolio site for client work
- Not a Substack / Medium replacement
- Not a place to host real datasets (Drive / HF for that)
- Not internationalized — English only

## Useful commands

```bash
pnpm dev          # local server
pnpm build        # production build
pnpm preview      # preview production build locally
```

## If asked to make stylistic changes

Default to subtraction over addition. The site is already at the visual density it should be. Things that *would* be appropriate to add: micro-interactions on demos, better typography on prose pages, accessibility improvements, performance tweaks. Things that *would not*: hero images, parallax, animated gradients, decorative SVGs, "creative" cursors, social-media-style cards, AI-art backgrounds.
