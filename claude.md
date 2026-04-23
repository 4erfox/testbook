# Claude Context for Admin Panel Project

## Цель
Добавить админ-панель и безопасность к существующему сайту-учебнику на JavaScript + HTML + CSS с markdown-контентом.

## Текущее состояние проекта
- Сайт работает на Vite.
- Контент хранится в `public/docs/*.md`.
- Есть `public/scripts/md-renderer.js` — рендерит markdown и парсит frontmatter.
- Есть `public/admin/` — ванильный JS админ-панель с WebSocket-бириджем.
- Есть `admin-server.js` — сервер на чистом Node.js `http` + WebSocket, работающий как админ-bridge.
- Есть `admin.env` с JWT-конфигом и bcrypt-хэшем.
- `package.json` содержит `jsonwebtoken`, `bcryptjs`, `vite` и зависимости React/MD-редактора, которые находятся в проекте, но frontend админки реализован без React.
- `vite.config.js` имеет плагин для раздачи `.md` файлов как `text/plain`.

## Что реализовано
- JWT-аутентификация через `admin-server.js`.
- WebSocket API: `login`, `verifyToken`, `readDoc`, `writeDoc`, `listDocs`, `listNav`, `saveNav`, `readContacts`, `writeContacts`, asset upload.
- `public/scripts/md-renderer.js` может парсить простой YAML frontmatter и рендерить markdown.
- Админ-панель уже поддерживает редактирование raw markdown в `PagesPanel.js`.

## Что не хватает для полного задания
1. Backend на `Express` (требуется REST API):
   - `GET /api/docs`
   - `GET /api/docs/:slug`
   - `POST /api/docs/:slug`
   - `POST /api/docs`
   - `DELETE /api/docs/:slug`
   - `POST /api/auth/login`
   - `POST /api/auth/verify`

2. Редактор frontmatter и UI поля для `title`, `description`, `author`, `tags` и т.д.
3. Полная утилита для парсинга и сериализации YAML frontmatter.
4. Валидация входящих данных и защита от XSS/инъекций.
5. Rate limiting и безопасность API.
6. Более удобное готовое решение с `npm install`/`npm run` и инструкцией.
7. Документация запуска для дипломного проекта.

## Важные файлы
- `admin-server.js`
- `admin.env`
- `public/admin/admin-panel.js`
- `public/admin/bridge.js`
- `public/admin/panels/PagesPanel.js`
- `public/scripts/md-renderer.js`
- `vite.config.js`
- `generate-pages.js`
- `package.json`
- `README-JWT.md`

## Рекомендованный путь развития
1. Реализовать `Express` backend.
2. Перенести frontmatter-работу в `scripts/docUtils.js`.
3. Обновить админ-панель: login, список разделов, редактирование frontmatter, сохранение и удаление.
4. Добавить API security: CORS, rate limit, path validation.
5. Написать инструкцию по установке и запуску.

## Контекст для нового репозитория Claude
- В проекте уже есть начальный admin UI и backend bridge.
- Однако нужно переписать или расширить сервер на Express, чтобы обеспечить REST API и frontmatter-редактор.
- Следующий шаг: двигаться от текущего WebSocket-бриджа к готовому REST API + utility-функциям.

## Метаданные
- Дата контекста: 8 апреля 2026 г.
- Стек: JavaScript + HTML + CSS + Node.js + Vite.
- Основная задача: админ-панель + безопасность + markdown/frontmatter.

## Готовые промпты для ИИ
Используй этот файл как единый набор контекста и задач. Поочерёдно передавай ИИ следующие промпты.

### 1. Анализ текущего проекта
Ты — инженер, который анализирует текущую структуру проекта.

- Исследуй файлы `admin-server.js`, `public/admin/*`, `public/scripts/md-renderer.js`, `vite.config.js`, `package.json`.
- Определи, что уже работает и какие функции реализованы.
- Выяви недостатки: отсутствие Express, REST API, полный редактор frontmatter, rate limiting, валидация, YAML-сериализация.
- Составь план, какие файлы нужно изменить и какие добавить.

### 2. Реализация backend на Node.js + Express 
Ты — fullstack-разработчик.

- Создай `server.js` или перепиши `admin-server.js` под Express.
- Подключи `cors`, `express.json()`, `helmet`, `express-rate-limit`.
- Реализуй JWT-аутентификацию: `POST /api/auth/login`, `POST /api/auth/verify`.
- Реализуй API для markdown:
  - `GET /api/docs`
  - `GET /api/docs/:slug`
  - `POST /api/docs/:slug`
  - `POST /api/docs`
  - `DELETE /api/docs/:slug`
- Защити пути от path traversal и проверяй slug.
- Верни понятные ошибки и код состояния.

### 3. Утилиты для markdown и frontmatter
Ты — разработчик утилит.

- Напиши `scripts/docUtils.js`.
- Функция `parseFrontMatter(text)`:
  - возвращает `{ meta, body }`
  - поддерживает поля `title`, `description`, `author`, `tags`, `section`, `date`.
- Функция `serializeFrontMatter(meta, body)`.
- Функция `validateDocPayload(payload)` для входных данных.
- Используй утилиты в backend и при сохранении.

### 4. Админ-панель на ванильном JS
Ты — frontend-разработчик.

- Обнови `public/admin/admin-panel.js` и `public/admin/panels/PagesPanel.js`.
- Реализуй login-форму, список документов, редактирование `title`, `description`, `author`, `tags`, `content`.
- Кнопки: `Сохранить`, `Создать новый раздел`, `Удалить`.
- Показывай toast-уведомления. - есть
- При загрузке документа парсь frontmatter и заполняй поля форм.
- При сохранении собирай YAML + markdown.

### 5. Документация и запуск
Ты — технический писатель.

- Опиши, как установить зависимости и запустить проект.
- Укажи env-переменные: `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `JWT_EXPIRES_IN`.
- Приведи команды `npm install`, `npm run dev`, `node server.js`.
- Опиши, как пользоваться админ-панелью и как создавать новые разделы.

### Важное примечание
Проект сейчас не требует Astro или React для админки — основной стек должен оставаться JavaScript + HTML + CSS. Backend должен быть на Node.js + Express.
