// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://xchuan-li.github.io',
  // Removed project pages (Arrowhead/Causal Direction, CIY, SNG, Isotrace, ORDO,
  // HanGL) — send their old URLs to the research index so external links don't 404.
  redirects: {
    // The homepage became the plain, single-column academic page (2026-09), so the
    // old plain mirror is merged into "/".
    '/plain': '/',
    // Writing retired 2026-09-20 (XC): the essays were a pre-publication substitute
    // for output. Files remain in git history; restore with `git revert`.
    '/writing': '/',
    '/writing/logic-of-natural-language': '/',
    '/writing/from-leibniz': '/',
    '/writing/meaning-beneath-language': '/',
    '/writing/inverted-observability': '/',
    '/writing/reading-notes': '/',
    // The long "Motivation" essay moved into Writing (2026-07-16).
    '/motivation': '/',
    // /research is "Current Work"; /approach is "Research Program".
    '/research-program': '/approach',
    '/research/causal-direction': '/research',
    '/research/arrowhead': '/research',
    '/research/ciy': '/research',
    '/research/sc-certification': '/research',
    '/research/isotrace': '/research',
    '/research/gradus': '/research',
    '/research/modus': '/research',
    '/research/typological-grounding': '/research',
    '/research/mini-causal-models': '/research',
    '/research/ordo': '/research',
    '/research/hangl': '/research',
  },
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // light + dark via CSS variables
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
