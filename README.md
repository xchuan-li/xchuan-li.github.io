# Xiaochuan's personal site

A research-focused personal website built with Astro 5, MDX, React (for interactive demos), and Tailwind 4.

## What's here

```
src/
├── layouts/Base.astro         # shared header / footer / meta tags
├── components/
│   ├── MzcCards.tsx           # lightweight M/Z/C click-to-reveal module
│   ├── Exp1Tweety.tsx         # lightweight do(Z)/do(C)/do(M) walkthrough
│   └── Exp2AgreementTabs.tsx  # agreement aligned/control/attractor module
├── pages/
│   ├── index.astro            # home — hero + vertical research spine
│   ├── cv.astro
│   ├── contact.astro
│   ├── research/
│   │   ├── index.astro
│   │   ├── sc-certification.astro   # paper1 walkthrough, embeds lightweight React islands
│   │   ├── isotrace.astro
│   │   ├── ciy.astro
│   │   └── latent-control-states.astro
│   └── writing/
│       ├── index.astro
│       └── decidability-boundary.mdx
└── styles/global.css          # design tokens, dark mode, .prose typography
```

## Run locally

```bash
pnpm install     # or npm / yarn
pnpm dev         # http://localhost:4321
```

## Deploy

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on every push to `main`. To set up:

1. Create a GitHub repo, push this code.
2. Repo settings → Pages → Source: **GitHub Actions**.
3. Edit `astro.config.mjs` — set `site` to your final URL (e.g. `https://yourname.github.io` or your custom domain).
4. Push to `main`. Done.

For Vercel/Netlify instead: just connect the repo, no config needed (Astro is auto-detected).

## Editing checklist

Things already filled in:

- [x] Name: **Xiaochuan Li**
- [x] Email: **xiaochuan.li@utn.de**
- [x] GitHub: **github.com/xchuan-li**

Still to do before going live:

- [ ] Add a real Google Scholar URL in `src/pages/contact.astro` (currently a generic placeholder)
- [ ] Buy a domain or use `username.github.io`, then update `site` in `astro.config.mjs` (currently `xiaochuanli.com`)
- [ ] Drop a real `cv.pdf` into `public/` for the CV download button
- [ ] Rewrite the `src/pages/index.astro` hero paragraph in your own voice
- [ ] Keep paper status / dates in `src/pages/research/sc-certification.astro` up to date as paper1 evolves

## Adding / updating a project page

Every project main page (under `src/pages/research/`) follows one template:

```
1. A few-sentence intro      — what the project is, in 3–4 sentences
2. ## Roadmap                — the milestone timeline (ProgressTimeline)
3. ## Latest progress        — the most recent milestone's content, inline
   (everything else — research questions, data, references, demos — follows below)
```

The roadmap is a reusable component, `src/components/ProgressTimeline.astro`. Each milestone is a dated node; "done" nodes link to their own standalone report page, "planned"/"active" nodes don't.

```astro
---
import ProgressTimeline from "../../components/ProgressTimeline.astro";

const roadmap = [
  {
    date: "Jun 2026",                       // shown in the node's accent colour
    phase: "Experiment 1 · Report 1",       // small mono kicker
    title: "One-line finding or milestone",
    summary: "A sentence or two of what this milestone is.",
    href: "/research/<project>/report-1",   // omit for non-clickable nodes
    status: "done",                          // "done" | "active" | "planned"
    // color: "var(--accent-coral)",         // optional per-node override
  },
  {
    date: "Planned",
    phase: "Experiment 2",
    title: "What comes next",
    summary: "…",
    status: "planned",                       // dimmed, hollow dot, not a link
  },
];
---

<h2>Roadmap</h2>
<ProgressTimeline items={roadmap} accent="var(--accent-coral)" />
```

Per-project accent colours match the homepage spine: Stable Is Not Grounded → `--accent-coral`, Isotrace → `--accent-teal`, CIY → `--accent-purple`, ProtoBias → `--accent-deep-purple`.

**To add a milestone:** push a new object to the `roadmap`/`progress` array, and (for a `done` node) create its report page at `src/pages/research/<project>/<slug>.astro`. Astro allows a `foo.astro` page and a `foo/` directory of subpages to coexist, so the report lives under the project's own path. Report pages reuse `<article class="prose">`, open with a `← <Project>` back-link, and carry their own dated kicker + tables. See `cross-lingual-protobias/report-1.astro` and `sc-certification/v1.astro` as worked examples.

## Adding a new interactive demo

1. Write the React component in `src/components/`. Use Tailwind classes; pull theme colors from CSS variables (`var(--color-bg)` etc.) so dark mode works.
2. Import it in any `.astro` page with `client:load` (or `client:visible` for below-the-fold):

   ```astro
   ---
   import MyDemo from '../../components/MyDemo.tsx';
   ---
   <MyDemo client:load />
   ```

3. Keep interactive modules small and page-specific unless the same interaction is reused elsewhere.

## Adding a writing post

Drop a `.mdx` file into `src/pages/writing/`. Front-matter:

```yaml
---
layout: ../../layouts/Base.astro
title: Your title
description: Short description
---
```

Wrap the body in `<div class="prose">` for typography. You can import and use React components inline:

```mdx
import MyComponent from '../../components/MyComponent.tsx';

<MyComponent client:load />
```

For long-form writing or research detail pages, enable the reusable section rail:

```yaml
---
layout: ../../layouts/Base.astro
title: Your title
description: Short description
toc: true
---
```

With `toc: true`, `Base.astro` renders a left "On this page" rail on desktop, builds it from direct
`h2` and `h3` children inside `.prose`, highlights the active section while scrolling, and collapses
back to a single centered column on smaller screens. Pages with fewer than two `h2`/`h3` headings
also fall back to the normal single-column layout.

## Design notes

- **Restraint over ornament.** Single accent color (warm red-orange), generous whitespace, no decorative gradients or shadows. The visual language is closer to Cosma Shalizi / Lena Voita than to portfolio sites — appropriate for a research audience.
- **Light by default, dark via `prefers-color-scheme`.** Add a manual toggle if you want — the tokens are already set up for it.
- **Reading width capped at 65ch in `.prose`.** Long-form pages with `toc: true` use the documented section-rail layout and widen the reading measure to 70ch; landing-page-style content uses the full 720px container width.

## Updating the Stable walkthrough

The current Paper 1 page uses three lightweight React islands:
`MzcCards.tsx`, `Exp1Tweety.tsx`, and `Exp2AgreementTabs.tsx`.
Update the page prose and the small in-component constants together when the
paper framing or headline numbers change.
