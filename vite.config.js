import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // 1. ОЧЕНЬ ВАЖНО: Добавляем базу для GitHub Pages
  // Если собираем на GitHub, используем /testbook/, иначе корень (для Vercel)
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

  // 2. Проверь, где лежит твой index.html!
  // Если index.html лежит ПРЯМО В КОРНЕ, удали строку root: 'public'.
  // Если index.html лежит ВНУТРИ ПАПКИ public, оставь как есть.
  root: 'public', 
  
  publicDir: 'static', // Если root: 'public', то дополнительные файлы лучше класть в public/static

  build: {
    // 3. Указываем, куда сохранять билд (выходим из public в корень dist)
    outDir: '../dist',
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      // Исправляем алиасы на абсолютные пути
      '/admin': path.resolve(__dirname, 'admin'),
      '@': path.resolve(__dirname, 'public'),
    }
  },
  optimizeDeps: {
    exclude: ['admin-panel.js', 'bridge.js']
  }
});