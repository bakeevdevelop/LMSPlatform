# Архитектурный черновик

## Целевые принципы
- modular monolith или service-based architecture с выделением доменов;
- API-first;
- event-driven слой для цифрового следа;
- безопасная обработка персональных данных;
- наблюдаемость по умолчанию.

## Предлагаемые домены
- Identity & Access;
- User Profiles;
- Programs & Enrollment;
- Learning Content;
- Assignments & Testing;
- Progress Tracking;
- Notifications;
- Certificates;
- Reporting;
- Audit & Event Trail;
- Integration Gateway;
- Admin Console.

## Ключевые хранилища
- OLTP БД для транзакционных данных;
- объектное хранилище для файлов и медиа;
- event store / event log для цифрового следа;
- аналитическое хранилище или витрина для отчетов;
- кэш и очередь сообщений.

## Ключевые технические решения, требующие уточнения
- frontend: web app + admin app;
- backend: typed API framework;
- storage: PostgreSQL + S3-compatible + Redis + message broker;
- analytics/reporting: ClickHouse или PostgreSQL-реплики/витрины в зависимости от нагрузки;
- video/webinars: внешняя интеграция.

## Архитектурные риски
- сложность госинтеграций и нестабильность внешних API;
- рост требований к отчетности после запуска;
- большие пиковые нагрузки;
- высокая цена ошибок в учете цифрового следа;
- требования по локализации и защите персональных данных.
