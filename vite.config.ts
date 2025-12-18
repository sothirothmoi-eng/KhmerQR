import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using relative base path allows deployment to any subfolder (like GitHub Pages)
  // without needing to hardcode the repository name.
  base: './', 
});