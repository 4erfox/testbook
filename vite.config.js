// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // 1. Умная настройка базового пути
  // На GitHub Pages будет /testbook/, на Vercel — корень /
  base: process.env.GITHUB_ACTIONS ? '/testbook/' : '/',

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7778',
        changeOrigin: true,
      }
    },
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'admin'),
        path.resolve(__dirname, 'public'),
      ]
    }
  },

  // Корень проекта (где лежит index.html)
  root: 'public',
  
  // Откуда брать статические файлы (картинки и т.д.)
  // Если у тебя index.html внутри public, то publicDir обычно называют по-другому,
  // либо оставляют пустым. Попробуем оставить как есть, но вынести билд наружу.
  publicDir: 'public',

  build: {
    // 2. Выносим папку сборки из public в корень проекта
    outDir: '../dist',
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      // Исправленные алиасы
      '/admin': path.resolve(__dirname, 'admin'),
      '@': path.resolve(__dirname, 'public'),
    }
  },
  
  optimizeDeps: {
    exclude: ['admin-panel.js', 'bridge.js']
  }
});