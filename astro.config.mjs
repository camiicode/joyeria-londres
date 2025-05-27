// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/styles.css',
        },
      },
    },
    css: {
      devSourcemap: true
    }
  }
});