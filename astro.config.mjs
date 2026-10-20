import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_ORIGIN, SITE_BASE } from './site.config.mjs';

const outDir = process.env.JOURNAL_OUT_DIR || 'dist';

export default defineConfig({
  site: SITE_ORIGIN,
  base: SITE_BASE,
  outDir,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/szkic/') && !page.includes('/draft/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
    },
  },
});
