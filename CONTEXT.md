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
├── layouts/Base.astro              # Shared shell: fixed frosted-glass nav (causal-triad mark +
│                                   # wordmark + page links + theme toggle), footer,
│                                   # IntersectionObserver script (.fade-in / .fade-in-up),
│                                   # pre-paint theme script (localStorage), reading-progress bar.
│                                   # `wide` prop opts out of the 720px container (homepage uses it).
├── components/
│   ├── SCDemo.tsx                  # Interactive demo for paper1: SC-grounded vs SC-spurious.
│   │                               # Includes three integrated figures:
│   │                               #   - DAG (M, Y, color, name) with severable arrows that respond to do()
│   │                               #   - Regime A vs B bar chart across baseline/do(3)/do(2)
│   │                               #   - §6.1 three-model Δ table (TF-IDF, DistilBERT, Qwen LoRA)
│   │                               # Props-configurable so paper revs swap numbers without code changes.
│   ├── HeroFigure.astro            # Static SVG for paper1: two parallel small DAGs
│   │                               # (SC-grounded vs SC-spurious).
│   ├── SCHierarchyFigure.astro     # Homepage About section concept figure — three concentric
│   │                               # rounded panels (accuracy ⊋ stable-correct ⊋ grounded) with
│   │                               # populations of dots in each band; do(C) callout arrow.
│   ├── ProjectGlyph.astro          # The six per-project glyphs; reused as 16:10-card centerpieces
│   │                               # on the homepage research grid.
│   └── SectionDivider.astro        # (Legacy) horizontal line + tiny SVG mark; no longer used on
│                                   # the new homepage but kept for inner pages.
├── pages/
│   ├── index.astro                 # Home: scroll-portfolio sections — Hero / About (figure+bio
│   │                               # +Research-focus card) / Currently / Research grid / Writing /
│   │                               # Contact CTA. Uses `<Base wide={true}>`.
│   ├── cv.astro                    # CV page (PDF download link points to /cv.pdf)
│   ├── contact.astro               # Email, GitHub, location, PhD-application note
│   ├── research/
│   │   ├── index.astro             # Research index (list of all projects)
│   │   ├── sc-certification.astro  # paper1 detail page — embeds <SCDemo client:load />
│   │   ├── isotrace.astro          # Stub — needs interactive demo eventually
│   │   ├── mini-causal-models.astro # Stub — synthetic ground-truth sandbox; needs interactive sandbox eventually
│   │   ├── ciy.astro               # Stub — needs falsifiability widget eventually
│   │   ├── latent-control-states.astro  # Stub — mech interp project (formerly "LiT")
│   │   └── cross-lingual-protobias.astro
│   └── writing/
│       ├── index.astro             # Writing index (placeholder posts)
│       └── decidability-boundary.mdx  # Sample MDX post showing how to embed React inline
└── styles/global.css               # Design tokens (dark-default, .light override), frosted nav,
                                    # hero/section/about-grid/proj-grid/areas-card/contact-cta,
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

The homepage uses a dark-default, scroll-portfolio aesthetic — frosted-glass sticky nav, big display headings, fade-in-on-scroll, project grid with hover overlays. Inner pages (research detail, writing, cv, contact) keep the narrow 720px container with prose typography. Academic-honest tone throughout: no inflated credentials, no skill-percentage bars, no marketing copy.

- **Theme.** Dark is default (`<html>` ships clean, `:root` carries dark tokens). User toggle adds `.light` and persists to `localStorage('theme')`. The pre-paint script in Base.astro applies the saved class before first paint to avoid flash.
- **Accent.** One warm accent color (`--color-accent`, terracotta in light, soft coral in dark). Project accent colors are scoped to research cards (driven by inline `--proj-color` and `--proj-tint`). Extended palette (deep, used sparingly): `--accent-indigo`, `--accent-deep-purple` (hero pull-quote rule), `--accent-champagne`, `--accent-amber` (load-bearing in the SCHierarchyFigure).
- **Fonts.** Inter (sans, also reused as `--font-display` at large sizes), Crimson Pro (serif — used for the hero pull-quote and the timeline's "idea" lines), JetBrains Mono (code, status tags, formula captions in figures).
- **Type scale.** Hero heading `clamp(2.6rem, 9vw, 7.5rem)` / `font-weight: 700` / `line-height: 0.96`. Section heading `clamp(2.1rem, 5.5vw, 3.75rem)`. Body 16px / 1.7. Long-form prose 17px / 1.75, max-width 65ch.
- **Nav.** Fixed top, 60px tall, `backdrop-filter: blur(28px) saturate(1.4)`, 1px bottom border. Brand mark on left, page links centre-right, theme toggle far right. Hides nav-links below 720px.
- **Buttons.** `.btn-primary` (filled — white on dark / black on light), `.btn-secondary` (outline). Uppercase, 0.1em tracking, 12px, slight `translateY` lift on hover.
- **Scroll choreography.** `.fade-in-up` (28px translate + opacity) and `.fade-in` (opacity only); revealed by an IntersectionObserver in Base.astro at `threshold: 0.1`. `.fade-delay-100..600` modifiers stagger entries. `prefers-reduced-motion` disables all of it.
- **Cards.** Subtle `var(--card-bg)` background, `var(--card-border)` 1px border, 8–12px radius, hover bumps to `var(--card-hover-bg)` + `var(--card-hover-border)`. No drop shadows.
- **Section rhythm.** Every section opens with: optional `.divider-line` (1px hairline) → `.section-label` (uppercase 0.3em tracking) → `.section-heading` (big bold) → optional `.section-sub`. The pattern is consistent across About / Currently / Research / Writing / Contact.
- **Homepage figures.**
  - `SCHierarchyFigure` is load-bearing in the About section — concentric containment of `accuracy ⊋ stable-correct ⊋ grounded` with dot populations and a `do(C)` callout arrow. Boxless, no card chrome.
  - `ProjectGlyph` is reused at large size as the centerpiece of each 16:10 research card; the card visual cell has a project-tinted radial gradient behind it.
  - Hero background is a faint node-constellation SVG anchored top-right; `opacity: 0.55`.
- **Research focus card** (replaces the reference site's "skills with percentages"). Five rows of uppercase label + monospace status tag + thin colored hairline. No numbers — status tags are honest text: `Primary`, `Active`, `Exploratory`, `2026`, `Background`.

## The research projects (high-level — don't summarize wrong)

1. **Stable is not grounded** (paper1, target Aug 2026 deadline): An acyclic certification framework. Hierarchy is `accuracy ⊋ stability ⊋ grounding`; the deepest cut `SC → {grounded, spurious}` requires **two-sided observability** (benchmark graph stipulated + training auditable). The §6.1 controlled demo: TF-IDF + LR classifier reaches 0.912 accuracy, fully stable; `do(class-3)` drops it Δ +.408, negative control `do(class-2)` only Δ +.021. This is what the live SCDemo on /research/sc-certification reproduces interactively.

2. **Isotrace**: Behavioral tracing of multi-hop reasoning. Fictional concept names (Zorb, Veln, Quasp) with path-encoded naming conventions locate where shortcut substitution fires, hop-by-hop, without opening the model. Complementary to mech interp.

3. **Mini causal models** (project, exploratory): A synthetic sandbox for the minimum-licensing-structure question raised in `/writing/inferential-productivity`. Plant a small causal model with known structure, simulate data, train a model on it, then recover the minimal structure from behavior alone. Because the truth is *planted*, the recovery can be scored against ground truth — this is "both": developing the recovery method and validating it. Sits between Isotrace (*where* a shortcut fires) and CIY (*how much* of a structure is used) — a mini causal model is exactly the structure CIY reads a yield over. Lives at `/research/mini-causal-models`.

4. **CIY (causal inferential yield)**: A graded measure over SC-grounded items. The falsifiability test: if you cannot construct two models matched on accuracy + grounding but with opposing CIY, CIY collapses into accuracy repackaging.

5. **Latent control states** (project, May–Dec 2026): Mechanistic interpretability of prompt-framing effects. **Never call this "LiT" publicly** — that is the UTN course name (Learning in Transformation); refer to the project only by its full descriptive name. Lives at `/research/latent-control-states`. Do not foreground collaborators or supervision here.

6. **Cross-lingual ProtoBias** (Topic 6, in progress): Multilingual ProtoBias study of prototypicality bias in multimodal AI evaluation. Frame it as part of the grounding/shortcut research line: semantic image-text alignment is tested against prototype-driven, culturally variable shortcuts.

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

- Reuse the existing tokens and classes (`.section`, `.section-label`, `.section-heading`, `.btn-primary/secondary`, `.fade-in-up`, `.areas-card`, `.proj-grid-card`, `.contact-cta`) before inventing new ones.
- New homepage figures should match `SCHierarchyFigure`'s level of concept density — boxless, theme-aware via `var(--color-text-*)` and accent CSS vars, captioned with a small monospace footer if needed.
- Hero/section heading scale is `clamp(...)`-based; don't hard-code px sizes for the display layer.
- If you need a new "skills"-shaped block, copy the `.areas-card` pattern (uppercase label + monospace status tag + thin colored hairline). Don't introduce percentages.
- Inner pages stay narrow (720px) by default via `<Base>`; only the homepage uses `<Base wide={true}>`. Don't widen prose pages.
- `prefers-reduced-motion` must continue to disable fade-ins and the scroll-indicator animation.
- Print stylesheet must stay light-themed so `/cv.pdf` exports cleanly regardless of the screen theme.

Out of scope without explicit ask: parallax, animated gradients, "creative" cursors, AI-art backgrounds, marketing-style social cards, hero stock photos.
