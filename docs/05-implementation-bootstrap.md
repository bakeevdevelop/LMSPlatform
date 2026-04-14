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
- базовый settings layer через `pydantic-settings`;
- smoke test через `pytest`.

### Frontend
- `Next.js` app router;
- стартовая landing page;
- базовые стили;
- готовность к дальнейшему развитию на TypeScript.

### Infra & CI
- `.github/workflows/ci.yml`;
- `infra/docker/docker-compose.yml`;
- запуск frontend через стандартный `npm` без зависимости от `corepack`.

## Что еще не реализовано
- доменные модули;
- аутентификация и роли;
- база данных и миграции;
- цифровой след;
- встроенный вебинарный модуль;
- интеграции;
- production-ready observability.

## Подтвержденная проверка
- backend tests: `1 passed`.

## Ограничения текущего bootstrap
- frontend использует `npm`, поэтому требуется только установленный Node.js;
- для локального запуска web-части достаточно выполнить установку зависимостей в `apps/web`.
