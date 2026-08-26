import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  // Don't let Vite watch/scan the huge game collection
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: {
      ignored: [
        '**/Gmfiles/**',
        '**/node_modules/**',
        '**/.git/**',
      ],
    },
  },

  // Don't allow these files to be pulled into the Vite bundle
  build: {
    rollupOptions: {
      external: [
        /^\/Gmfiles\//,
      ],
    },
  },
});