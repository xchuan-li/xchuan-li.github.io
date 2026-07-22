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
    // The long "Motivation" essay moved into Writing (2026-07-16); `/approach`
    // now carries the short research-approach statement in the nav.
    '/motivation': '/writing/logic-of-natural-language',
    '/research-program': '/approach',
    '/research/causal-direction': '/research',
    '/research/arrowhead': '/research',
    '/research/ciy': '/research',
    '/research/sc-certification': '/research',
    '/research/isotrace': '/research',
    '/research/gradus': '/research/modus',
    '/research/typological-grounding': '/research',
    '/research/mini-causal-models': '/research',
    '/research/latent-control-states': '/research',
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
