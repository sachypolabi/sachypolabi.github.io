import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sachypolabi.cz',
  output: 'static',
  trailingSlash: 'always',
  outDir: './docs',
  compressHTML: false,
  devToolbar: { enabled: false },
});
