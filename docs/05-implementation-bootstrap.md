# Bootstrap implementation

## Что создано

### Monorepo
- `apps/api` — backend API;
- `apps/web` — frontend web app;
- `packages/config` — зарезервировано под общие конфиги;
- `infra/docker` — локальная docker-конфигурация.

### Backend
- `FastAPI` приложение с точкой входа `app.main`;
- endpoint `GET /api/v1/health`;
- endpoint `GET /api/v1/overview`;
- endpoint `GET /api/v1/auth/session`;
- endpoint `POST /api/v1/auth/login`;
- endpoint `GET /api/v1/auth/directory`;
- endpoint `GET /api/v1/catalog/courses`;
- endpoint `GET /api/v1/catalog/enrollments`;
- endpoint `POST /api/v1/catalog/enroll`;
- `SQLite + SQLAlchemy` dev persistence для ролей и пользователей;
- `SQLite + SQLAlchemy` dev persistence для стартового каталога курсов;
- `SQLite + SQLAlchemy` dev persistence для потоков и записей на них;
- базовый settings layer через `pydantic-settings`;
- smoke test через `pytest`.

### Frontend
- `Next.js` app router;
- стартовая landing page;
- базовые стили;
- demo-действие записи `demo-student` на открытые потоки с обновлением enrollment summary;
- готовность к дальнейшему развитию на TypeScript.

### Infra & CI
- `.github/workflows/ci.yml`;
- `infra/docker/docker-compose.yml`;
- запуск frontend через стандартный `npm` без зависимости от `corepack`.

## Что еще не реализовано
- доменные модули, кроме стартового auth foundation;
- полноценная аутентификация и роли;
- production-ready база данных и миграции;
- цифровой след;
- встроенный вебинарный модуль;
- интеграции;
- production-ready observability.

## Что доступно для ручной проверки
- `http://localhost:3000` — стартовая web-страница;
- `http://localhost:8000/docs` — Swagger UI backend;
- `http://localhost:8000/api/v1/auth/session` — bootstrap auth;
- `http://localhost:8000/api/v1/auth/directory` — demo каталог пользователей и ролей.
- `http://localhost:8000/api/v1/catalog/courses` — demo каталог стартовых программ.
- `http://localhost:8000/api/v1/catalog/enrollments` — demo список потоков и записей.
- `POST http://localhost:8000/api/v1/catalog/enroll` — demo запись пользователя на открытый поток.

## Статус текущего DB-этапа
- identity foundation переведен с in-memory demo данных на `SQLite` через `SQLAlchemy`;
- каталог пользователей и ролей теперь читается из dev БД;
- каталог стартовых курсов теперь также читается из dev БД;
- стартовые потоки и enrollments также читаются из dev БД;
- это временный dev-слой, который позже должен быть заменен на `PostgreSQL`.

## Подтвержденная проверка
- backend tests: `5 passed`.
- backend tests после enrollment foundation: `8 passed`.
- backend tests после валидации enrollment flow: `10 passed`.
- frontend `http://localhost:3000` отвечает `200` после очистки stale `.next` cache и перезапуска dev server.
- backend endpoints `health`, `auth/session`, `auth/directory`, `catalog/courses`, `catalog/enrollments` отвечают `200` после перезапуска API.
- `npm run build` для frontend проходит после добавления enrollment action.

## Ограничения текущего bootstrap
- frontend использует `npm`, поэтому требуется только установленный Node.js;
- для локального запуска web-части команды нужно выполнять из каталога `apps/web`, чтобы Next.js корректно раздавал dev-ассеты.

## Правило проверки на каждом этапе
- после каждого изменения backend перезапускать API dev server и прогонять `pytest apps/api/tests`;
- после каждого изменения frontend проверять `http://localhost:3000` и выполнять `cd apps/web && npm run build` под Node 22;
- при странных runtime ошибках Next.js сначала очищать `.next` cache и только потом повторять проверку.
- dev server frontend запускать только из каталога `apps/web`, иначе Next.js может открыть HTML, но отдавать CSS/JS ассеты `404`.
