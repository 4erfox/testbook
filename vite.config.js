import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // ЗАМЕНИ НА НАЗВАНИЕ СВОЕГО РЕПОЗИТОРИЯ!
  base: '/testbook/tree/gh-pages/',  // например: '/etiquette-book/'

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7778',
        changeOrigin: true,
      }
    },
    fs: { allow: [path.resolve(__dirname)] }
  },
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html'),
        page: path.resolve(__dirname, 'public/page.html'),
      }
    }
  },
  resolve: {
    alias: { '/admin': path.resolve(__dirname, 'admin') }
  }
});