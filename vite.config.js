import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // base: './' — самый универсальный вариант для GitHub Pages и Vercel
  base: './', 
  
  // Если твой index.html лежит в корне проекта (не в папке public),
  // строку root: 'public' НУЖНО УДАЛИТЬ.
  // Судя по твоим прошлым ошибкам, index.html должен быть в корне.
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});