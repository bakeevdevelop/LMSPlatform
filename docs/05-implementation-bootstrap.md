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
- endpoint `GET /api/v1/auth/student/dashboard`;
- endpoint `GET /api/v1/catalog/courses`;
- endpoint `GET /api/v1/catalog/enrollments`;
- endpoint `POST /api/v1/catalog/enroll`;
- endpoint `GET /api/v1/catalog/modules` (Learning Core);
- endpoint `GET /api/v1/catalog/lessons` (Learning Core);
- endpoint `GET /api/v1/catalog/learning/progress` (Learning Core);
- `SQLite + SQLAlchemy` dev persistence для ролей и пользователей;
- `SQLite + SQLAlchemy` dev persistence для стартового каталога курсов;
- `SQLite + SQLAlchemy` dev persistence для потоков и записей на них;
- базовый settings layer через `pydantic-settings`;
- smoke test через `pytest`.

### Frontend
- `Next.js` app router;
- стартовая landing page с навигацией по всем модулям;
- раздел `/dashboard` с личным кабинетом слушателя;
- раздел `/learning` (Learning Core) с модулями, уроками и персональным прогрессом;
- компоненты для отображения курсов, записей, модулей, уроков и прогресса;
- базовые стили и отзывчивая верстка;
- demo-действие записи `demo-student` на открытые потоки;
- готовность к дальнейшему развитию на TypeScript.

### Infra & CI
- `.github/workflows/ci.yml`;
- `infra/docker/docker-compose.yml`;
- запуск frontend через стандартный `npm` без зависимости от `corepack`.

## Что еще не реализовано
- assignments и tests (Phase 2);
- notifications (Phase 2);
- certificates (Phase 2);
- полноценная аутентификация (вместо demo tokens);
- production-ready база данных миграции (PostgreSQL);
- цифровой след и аудит (Phase 3);
- встроенный вебинарный модуль (Phase 3);
- интеграции с Госуслугами, Leader-ID и другие (Phase 3);
- аналитика и отчеты (Phase 3);
- production-ready observability и мониторинг.

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
- backend tests: `15 passed` (включая 2 новых теста для `learning/progress`).
- frontend build: `9 маршрутов`, size ~103 KB First Load JS.
- frontend `/learning` строится и отвечает `200` с полной компиляцией (681 модулей).
- backend endpoints `health`, `auth/session`, `auth/directory`, `auth/student/dashboard`, `catalog/courses`, `catalog/modules`, `catalog/lessons`, `catalog/learning/progress`, `catalog/enrollments` отвечают `200`.
- `npm run build:web` проходит успешно из корня проекта.
- dev server frontend готов на `http://localhost:3000` с горячей перезагрузкой.

## Ограничения текущего bootstrap
- frontend использует `npm`, поэтому требуется только установленный Node.js;
- для локального запуска web-части команды нужно выполнять из каталога `apps/web` или из корня через `npm run dev:web`, чтобы Next.js корректно раздавал dev-ассеты;
- Learning Core endpoints требуют запущенного backend (FastAPI на 127.0.0.1:8000);
- frontend временно использует hardcoded student_id = "demo-student" для запросов /learning/progress, позже будет заменено на аутентифицированного пользователя.

## Правило проверки на каждом этапе
- после каждого изменения backend перезапускать API dev server и прогонять `pytest apps/api/tests`;
- после каждого изменения frontend проверять `http://localhost:3000` и выполнять `cd apps/web && npm run build` или `npm run build:web` из корня;
- при странных runtime ошибках Next.js сначала очищать `.next` cache (`rm -rf apps/web/.next`) и только потом повторять проверку.
- dev server frontend запускать через `npm run dev:web` из корня или `npm run dev` из `apps/web`, иначе Next.js может открыть HTML, но отдавать CSS/JS ассеты `404`.
- тесты backend написаны на pytest и запускаются через `pytest apps/api/tests` или `.venv/bin/python -m pytest apps/api/tests`.
