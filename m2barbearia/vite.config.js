import { defineConfig } from 'vite';

// Em produção (GitHub Pages) usa o nome do repo como base.
// Localmente usa '/' para funcionar com npm run dev.
export default defineConfig({
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
});

