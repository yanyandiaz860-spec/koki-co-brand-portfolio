import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps asset URLs relative so the build works on Vercel, Netlify
// and GitHub Pages project sub-paths without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
});
