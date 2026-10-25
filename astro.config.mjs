// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * L'URL de production. Surchargeable via la variable d'environnement SITE_URL
 * (Vercel / Cloudflare Pages) sans toucher au code.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://prodbydxt.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Page 404 exclue du sitemap
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    // Les petites feuilles de style sont inlinées -> moins de requêtes
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
