import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Использование относительных путей — самый надежный способ для работы и в Vercel, и в GitHub Pages
  build: {
    outDir: 'dist',
  }
})