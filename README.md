# Xiaochuan's personal site

A research-focused personal website built with Astro 5, MDX, React (for interactive demos), and Tailwind 4.

## What's here

```
src/
├── layouts/Base.astro         # shared header / footer / meta tags
├── components/
│   └── SCDemo.tsx             # the SC-grounded vs spurious interactive demo
├── pages/
│   ├── index.astro            # home — research narrative + project list
│   ├── cv.astro
│   ├── contact.astro
│   ├── research/
│   │   ├── index.astro
│   │   ├── sc-certification.astro   # paper1 detail page, embeds <SCDemo />
│   │   ├── isotrace.astro
│   │   ├── ciy.astro
│   │   └── lit.astro
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

3. For demos with paper-specific numbers, accept them as props (see `SCDemo.tsx`). When the paper revs, only the props change.

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

## Design notes

- **Restraint over ornament.** Single accent color (warm red-orange), generous whitespace, no decorative gradients or shadows. The visual language is closer to Cosma Shalizi / Lena Voita than to portfolio sites — appropriate for a research audience.
- **Light by default, dark via `prefers-color-scheme`.** Add a manual toggle if you want — the tokens are already set up for it.
- **Reading width capped at 65ch in `.prose`.** Long-form text stays comfortable; landing-page-style content uses the full 720px container width.

## Updating the SC demo numbers

The demo defaults to the paper1 §6.1 TF-IDF + LR row (`Δ +.408 / Δ +.021`). To show a different model:

```astro
<SCDemo
  client:load
  modelLabel="DistilBERT (66M, full FT)"
  regimeB={{
    desc: "...",
    base_acc: 0.912, base_stab: 1.0,
    d3_acc: 0.483,   // Δ +.429
    d2_acc: 0.891
  }}
/>
```

Or drop multiple demos on the page, one per model.
