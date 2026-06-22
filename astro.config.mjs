// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://xchuan-li.github.io',
  // Project renamed "Causal Direction" -> "Arrowhead"; keep the old URL working.
  // CIY page removed; send its old URL to the research index.
  redirects: {
    '/research/causal-direction': '/research/arrowhead',
    '/research/ciy': '/research',
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
