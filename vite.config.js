import { defineConfig } from 'vite'

export default defineConfig({
  // Это позволит сайту работать на GitHub Pages в папке /testbook/
  // А на Vercel он будет работать в корне (Vercel сам это умеет)
  base: '/testbook/', 
  build: {
    outDir: 'dist',
  }
})