import { defineConfig } from 'vite';
import path from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'fs';

function copyStaticPlugin() {
  return {
    name: 'copy-static',
    buildStart() {
      // Очищаем dist перед сборкой (если нужно)
      const distDir = path.resolve(__dirname, 'dist');
      if (existsSync(distDir)) {
        rmSync(distDir, { recursive: true, force: true });
      }
    },
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const distDir = path.resolve(__dirname, 'dist');
      
      // Создаём dist если нет
      if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
      
      // Папки для копирования
      const foldersToCopy = ['docs', 'pages', 'styles', 'scripts', 'images', 'data'];
      
      console.log('\n📦 Копирование статических файлов...');
      
      for (const folder of foldersToCopy) {
        const src = path.join(publicDir, folder);
        const dest = path.join(distDir, folder);
        
        if (existsSync(src)) {
          if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
          
          const copyFolder = (s, d) => {
            const entries = readdirSync(s, { withFileTypes: true });
            for (const entry of entries) {
              const srcPath = path.join(s, entry.name);
              const destPath = path.join(d, entry.name);
              
              if (entry.isDirectory()) {
                if (!existsSync(destPath)) mkdirSync(destPath, { recursive: true });
                copyFolder(srcPath, destPath);
              } else {
                copyFileSync(srcPath, destPath);
                console.log(`  ✓ ${folder}/${entry.name}`);
              }
            }
          };
          
          copyFolder(src, dest);
        } else {
          console.log(`  ⚠️ Папка ${folder} не найдена, пропускаем`);
        }
      }
      
      // Копируем favicon
      const faviconSrc = path.join(publicDir, 'favicon.png');
      const faviconDest = path.join(distDir, 'favicon.png');
      if (existsSync(faviconSrc)) {
        copyFileSync(faviconSrc, faviconDest);
        console.log('  ✓ favicon.png');
      }
      
      console.log('✅ Готово! Все файлы скопированы в dist/\n');
    }
  };
}

export default defineConfig({
  base: '/testbook/',
  
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
        path.resolve(__dirname, 'public'),
        path.resolve(__dirname, 'admin'),
      ]
    }
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
    alias: {
      '/admin': path.resolve(__dirname, 'admin'),
      '@': path.resolve(__dirname, 'public'),
    }
  },
  
  plugins: [copyStaticPlugin()]
});