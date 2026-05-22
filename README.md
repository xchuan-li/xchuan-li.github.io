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

Things to swap before going live:

- [ ] Replace `Xiaochuan ___` everywhere with your actual English name
  (`Base.astro` × 1, `index.astro` × 1, every page `title` × ~7, CV header)
- [ ] Replace `xiaochuan.dev` in `astro.config.mjs` and `contact.astro`
- [ ] Replace `github.com/__/__` in `Base.astro` footer
- [ ] Add real email, GitHub username, Scholar URL in `contact.astro`
- [ ] Drop a real `cv.pdf` into `public/`
- [ ] Edit `index.astro` hero paragraph to your own voice
- [ ] Update paper status / dates in `research/sc-certification.astro` as paper1 evolves

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
