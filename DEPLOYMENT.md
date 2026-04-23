# 🚀 Развертывание на GitHub Pages

## Способ 1: Автоматический деплой (рекомендуется)

### Подготовка репозитория

1. **Создайте репозиторий на GitHub** (если еще не создали)
   - Назовите его `your-repo` (замените на нужное имя)

2. **Обновите переменную `base` в `vite.config.js`**:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/your-repo/' : '/',
   ```
   Если это репозиторий с названием `etiquette-book`, используйте `/etiquette-book/`

3. **Включите GitHub Pages в настройках репозитория**:
   - Перейдите в Settings → Pages
   - Source: выберите "GitHub Actions"
   - Сохраните настройки

4. **Закоммитьте и запушьте код в main/master**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push -u origin main
   ```

5. **Проверьте статус деплоя**:
   - Перейдите на вкладку "Actions" в вашем репозитории
   - Дождитесь завершения workflow
   - После успеха, сайт будет доступен по адресу:
     ```
     https://your-username.github.io/your-repo/
     ```

---

## Способ 2: Ручной деплой с помощью `gh-pages`

Если вы хотите использовать пакет `gh-pages`:

1. **Установите `gh-pages`**:
   ```bash
   npm install -D gh-pages
   ```

2. **Обновите `package.json`**:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "npm run build && npx gh-pages -d dist"
   }
   ```

3. **Добавьте поле `homepage` в `package.json`**:
   ```json
   "homepage": "https://your-username.github.io/your-repo"
   ```

4. **Соберите и опубликуйте**:
   ```bash
   npm run deploy
   ```

---

## Способ 3: Ручной деплой напрямую в gh-pages ветку

1. **Соберите проект**:
   ```bash
   npm install
   npm run build
   ```

2. **Создайте ветку gh-pages** (если ее еще нет):
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   ```

3. **Скопируйте файлы из dist**:
   ```bash
   git checkout main -- dist/
   mv dist/* .
   rmdir dist
   rm -rf .git/index.orig
   ```

4. **Закоммитьте и запушьте**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push -u origin gh-pages
   ```

5. **Вернитесь в main**:
   ```bash
   git checkout main
   ```

---

## ⚙️ Важные замечания

### Для проекта с админ-панелью и API

Если вы используете админ-панель с API (`server.js`):

- **GitHub Pages** — это статический хостинг, он не может запускать Node.js backend
- Для полной функциональности нужен отдельный backend (например, Vercel, Heroku, Railway и т.д.)
- Опции:
  1. **Только фронтенд на GitHub Pages** — деплойте сайт-портал без API функциональности
  2. **API на отдельном сервисе** — используйте environment переменные для указания базового URL API
  3. **Используйте Vercel** — они поддерживают полные Node.js приложения

### Структура файлов

После `npm run build` структура должна быть:
```
dist/
├── index.html
├── page.html
├── assets/
├── docs/
├── images/
├── scripts/
└── styles/
```

---

## 🔗 Полезные ссылки

- [Vite Documentation](https://vitejs.dev/config/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

