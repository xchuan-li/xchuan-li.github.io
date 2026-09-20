# Project context for Claude

**Read this first before suggesting any changes.** It contains everything an LLM needs to understand the project structure, stack, deployment, and design philosophy.

## Current project descriptions (17 September 2026)

This update supersedes older instructions that present the MA as a committed computational-training project. Public project questions, summaries, connections, and statuses now live in `src/data/projects.ts`, shared by the homepage, Current Work, and CV. The common question is how linguistic meaning guides inference and how to identify the information used by people and language models.

- ProtoBias: completed controlled model evaluation; first-author revision in preparation. The author approved this framing on 17 September: the original benchmark asks whether models follow explicit semantic constraints despite prototypicality; the cross-lingual extension asks whether this ability and its failure patterns vary with prompt language. Connect it to the broader question of how linguistic information interacts with prior expectations. Choices, error rates, and score margins are behavioural evidence; they do not separately measure semantic strength and typicality strength or identify an internal mechanism. Typicality is benchmark-defined, not measured for each language community. Use the corrected August course-manuscript results, not the superseded June analysis. Do not claim back-translation eliminated translation effects or that correlation established a prototype mechanism.
- Three Ways: formal analysis and diagnostic materials are in development; draft comparative derivations exist; independent judgments are pending.
- MA / Epistemic possibilities in use: an adult behavioural direction is being considered, with the final empirical focus and any computational comparison still under discussion. No human experiment or training result is established. Preserve `/research/learnability` as the existing project URL.
- Latent Control States: behavioural pilots and controlled materials exist; mechanistic tests are being developed. The author explicitly frames this as training in explaining model decisions: behavioural contrasts, competing explanations, candidate internal representations, and controlled interventions. The method can transfer to future language research. Do not turn a proposed intervention into an established mechanism or equate model mechanisms with human cognition.
- Private exploratory work must remain off the public website, including project lists, research-program copy, and both CV versions. The author's 17 September instruction supersedes the previous permission to list it. Internal research notes remain in the Vault.

**Homepage structure (17 September 2026).** Header → Research program → Selected research → Background timeline → Writing → Playground → Contact. The formal analysis and proposed human thesis must remain two distinct entries, each with its own title, description, status, and link, enclosed together by one subtle outer border to show their relationship. Below them, list Cross-lingual ProtoBias as completed model evaluation and Latent Control States as ongoing mechanistic interpretability training. Use short descriptions and honest status lines. Avoid numbered stage cards, duplicate project-group introductions, and a separate exploratory-work section. Retain the original ProtoBias cover and the Connection/Motive margin annotations. On wide screens, notes sit in the outer margins; on intermediate screens, in the existing left column; on phones, below the associated entry.

**Research-card interaction (17 September 2026).** The author explicitly requested the original cards and their motion back. Each of the four projects is a rounded, clickable card using the original 3px hover lift, soft shadow, border transition, title colour change, and 1.03 cover zoom. Keep the shared outer frame around the two related projects still and subtle. Keyboard focus provides equivalent feedback; reduced-motion preferences disable translation and zoom. Do not flatten the cards into static list rows again.

Present each project's scientific question and contribution to the research trajectory in natural academic prose. Application strategy, internal B-numbers, and private supervisor negotiations are not public website content. Keep the English language and existing visual design. The downloadable CV must match the HTML CV.

## What this is

A personal research website for **Xiaochuan Li**, MSc student in Human and AI at UTN Nürnberg. The site exists to support PhD applications (target: late 2026 application window, fall 2027 start).

**Two faces of one question (added 2026-09-20, XC).** The programme question is **how linguistic structure settles what stays available in later processing, and what revises it**. It has two faces at different stages, measuring different parts of the same event: **typicality in referent choice** — a superordinate description narrowing to one candidate — is the **earlier** face, and the published work (ProtoBias evaluation; the working paper at `lingbuzz/010343`, Zenodo concept DOI `10.5281/zenodo.22855036`, CC BY 4.0) concerns **where the narrowing lands**; **epistemic modality** is the **current** face, asking whether the possibility is **held open in between and revised by later evidence**. Present them as endpoint and course of one event, never as two parallel phenomena — parallel phenomena is what red line 5 rules out. ⚠️ **The "course" reading is a direction, not a result.** The paper states plainly that it has an endpoint but no course, and the behavioural study has not begun; no page may imply the process reading has been tested. Data lives in `src/data/projects.ts` as `projects.typicality`; the paper has a page at `/research/typicality-in-referent-choice` and its own section "A second case" on `/research`.

**Positioning (updated 2026-09-14).** Central question: **how structured meaning is represented, processed, and learned**, connecting formal semantics with psycholinguistics and computational language research. Experimental and computational semantics remains the disciplinary anchor; cognitive psychology, experimental methods, and language-model research broaden the forms of evidence and the PhD application range. The **current case study** (Current Work page + homepage Current-work block, NOT the header) is the three-way distinction — *might p* / *might p or might not p* / *I don't know whether p* — and how each changes the discourse and which replies it licenses. It is at the **construct stage**: the brief is under review by a formal semanticist, with no behavioural or model result yet. Falsifiability rests on three criteria — content-specific / persistent / evidence-sensitive. **Shared positioning copy lives in `src/data/program.ts`**; page-specific framing and project records live in the relevant pages. `src/data/research.ts` was retired (2026-09).

**Homepage and IA rebuilt 2026-09-20 (XC), after comparing sites at the same career stage.** Measured homepages: Hening Wang (PhD candidate, Tübingen) 165 words, Sebastian Walter (postdoc) 395, Leonie Weißweiler (assistant professor) 514, Guifu Liu (PhD student) 811 — against 997 here. Their homepages are an index plus a news feed; none explains a research programme on the front page, because the substance is in listed output. This site was compensating for missing output with exposition. Changes: **Writing retired entirely** (5 essays, index, `writing.ts`, RSS; old routes redirect to `/`, files stay in git history); **Playground moved off the homepage** to `/playground` and into the nav; the duplicated "Research program" block removed from the homepage, since the header already states the question and the method in 35 words and `/approach` carries the long version; **a `Latest` section added** — one line per real event, never padded. Homepage is now header → Latest → Selected research → Background → Contact, 723 words. **Nav: Current Work · Research Program · Playground · CV · Contact.** Do not reintroduce a homepage programme essay, and do not pad `Latest`: an empty list is better than an invented one.

**Information architecture (A3g §4–5).** Nav: **Current Work** (`/research`) · **Research Program** (`/approach`) · Writing · CV · Contact. Each page has one job. Home = orientation + evidence, ordered header → current work → selected work → research program → writing → timeline → playground → contact (research evidence before biography). Current Work (`/research`, displayed H1 "Current Work", route unchanged) = the present problem, evidence criteria, two empirical questions, honest status, selected work. Research Program (`/approach`) = how the work proceeds in general — must not repeat the whole modality case. CV = conventional, scannable verification, not a second research essay.

**Status reality (do not overstate).** Current stage is the **construct**: the linguistic construct brief (target + diagnostics) is under review by a formal semanticist, before any model or behavioural study — the modality mainline has **no results yet**, so it stays a narrative "Current case", never a project card. The developmental side is **being scoped** — no experiment running, no ethics/participants, no collaborator named publicly. **MODUS** (an earlier exploratory methods pilot) has been **removed from the site** (2026-09): it is not one of the current B1–B4 projects and no longer has a page; `/research/modus` redirects to `/research`. **Cross-lingual ProtoBias** is a **first-author paper** with public code (revised version in prep for arXiv) — the strongest concrete output, but capability/methods evidence, not the research identity. Keep these tiers visibly distinct on `/research`. (Last synced to the vault 2026-09-08.)

**Redirects & retired routes.** `/motivation` → `/writing/logic-of-natural-language`; `/research-program` → `/approach`; older project routes (HanGL, ORDO, SNG, Isotrace, Arrowhead, CIY, etc.) → `/research` (see `astro.config.mjs`). Retired in 2026-09: the scroll-portfolio hero, the `/plain` mirror, and `src/data/research.ts`. Many homepage figure components (`HeroAlternatives`, `ResearchMap`, `DecryptedText`, `HeroModality`, …) are now orphaned; they are kept for possible revert but are not imported by any current page.

**Visual register rebuilt 2026-09-20 (XC): flat, print-like, mono-skeletoned.** Prose is **Source Serif 4**; **IBM Plex Sans was dropped entirely** — it carried most of the product feel. **IBM Plex Mono** is kept for the skeleton only: nav, section rules (`// LATEST`), field labels, dates, status lines, DOIs and identifiers. Counts before → after: `border-radius` 36 → 0 (the single exception is `50%` on timeline dots), `box-shadow` 13 → rings only (`0 0 0 Npx`, which mask the line behind a dot), hover `translateY` 13 → 0, `backdrop-filter` 4 → 0 (the nav is a plain rule). Research entries are separated by hairline top rules, not boxed; the nested `research-pair` frame is gone. One link accent (`#17457a`); the twelve `--accent-*` variables survive only because figures use them, and site chrome must not. **Do not reintroduce cards, shadows, rounded corners, hover lift or frosted glass.** ⚠️ Astro scoped styles cannot reach elements injected with `set:html` — those need `:global()`, which is why `.latest-text :global(a)` exists. ⚠️ The ProtoBias cover PNG still has rounding and a drop shadow baked into the image; it is an asset, not CSS, and is the one thing still out of register.

**Voice (A3g §13).** Prose should read like a careful early-career researcher, not generated academic branding. Avoid the phrases A3g lists — `throughline`, `the point is`, `the order matters`, `what is actually built`, `the current case, not the boundary`, `a mirror, not a blueprint`, `a model organism` (unless argued), serial em-dashes, repeated adjective triples, dramatic headings that make a claim instead of naming the section. British `behaviour` spelling. Before shipping copy, grep public source for these.

**Red lines — do NOT drift back.** (1) Do NOT reintroduce "one theory, two systems", **"human arm" / "LM arm"**, or anything that reads as a running human experiment. (2) Do NOT claim a model's **internal geometry adjudicates Kratzer-worlds vs. Lassiter-degree** — that framing is retired; behaviour first, representation only if behaviour is there, intervention only to test what it carries. Those two analyses remain the competing explanations, but are separated by what a modal *does* downstream. (3) Keep the identity anchored in **structured linguistic meaning** and the methods in formal semantics, psycholinguistics, and computational language research. Do not use "experimental linguistics" (implies a running programme of human experiments) or a generic list such as "language, cognition, AI, and philosophy". (4) Never frame the site *as* "causal inference" / "grounding certification" / "CIY" — methods, not identity. (5) Do NOT reintroduce the three-case-study framing (modals/compounds/generics). (6) **No collaborator names, no institutions on the developmental side.** (7) **Never write "LiT" publicly** — it is the UTN course name; the project is **Latent Control States · DFKI**. (8) Do not announce the internal work order ("linguistics paper first, then children, then LMs") — the site shows research logic and existing output, not a project-management timeline. (9) ~~No `/writing` or standalone page for the working paper until…~~ **Lifted 2026-09-20 by XC, for the typicality paper only.** It is now published (`lingbuzz/010343`; Zenodo DOI) and has a page. Its abstract is 148 words, just under the old 150 floor, and its theoretical contrast — against Kobrock et al. 2024's specificity manipulation — is explicit, while the I/M opposition stays flagged as an untested application hypothesis and the page must keep saying so. **Still in force for the modality paper and anything else pre-publication.**

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
│   │   ├── index.astro             # Current Work page (B1–B4 projects)
│   │   ├── hangl.astro             # (orphaned) Sino-Korean morphology
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

> **Superseded (2026-09-08) — legacy, do not restore to the live site.** The paragraphs below are from the pre-2026-07 framing: MODUS-as-thesis-flagship, an "inherited verdict method", **Stable Is Not Grounded**, **Isotrace**, **MiniCausalLang**, **Arrowhead**, **HanGL**, **ORDO**. Those axes are **archived** and off the current mainline (see the vault's §9.7). The authoritative positioning is the top of this file plus `src/data/program.ts`: identity = **structured meaning across formal semantics, psycholinguistics, and computational language research**; the current case is **epistemic modality / alternative-maintenance**; the computational question is **learnability from linguistic input**, not internal-geometry adjudication. The current mainline sits at the **construct stage** (brief under review), and the strongest concrete output is the **first-author Cross-lingual ProtoBias paper**. Kept only as historical context.

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
