import { CourseCatalogOverview } from '../components/course-catalog-overview';
import { EnrollmentOverview } from '../components/enrollment-overview';
import { IdentityOverview } from '../components/identity-overview';

const highlights = [
  'Курсы, потоки и цифровой след',
  'Встроенные вебинары и контроль присутствия',
  'Отчетность и аудит для федерального проекта',
];

const nextSteps = [
  'Auth foundation и bootstrap сессии уже доступны через API',
  'Пользователи и роли уже читаются из SQLite dev persistence',
  'Теперь доступна стартовая запись на поток и сводка enrollment',
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <span className="badge">LSM Platform</span>
        <h1>Платформа для обучения и вебинаров проекта «Код будущего»</h1>
        <p>
          Стартовый интерфейс MVP для платформы с упором на высокую нагрузку,
          встроенные вебинары, цифровой след и государственную отчетность.
        </p>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <article key={item} className="card">
            <h2>{item}</h2>
            <p>
              Базовый модуль уже выделен в архитектуре и будет развиваться как часть
              общей платформы.
            </p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div>
          <span className="section-label">Сейчас доступно</span>
          <h2>Foundation модулей identity, auth и ролей</h2>
          <p>
            В backend уже подняты стартовые endpoint&apos;ы для проверки health,
            обзора платформы, auth bootstrap, demo login и каталога пользователей с ролями.
          </p>
        </div>

        <ul className="timeline">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <IdentityOverview />
      </section>

      <CourseCatalogOverview />

      <EnrollmentOverview />
    </main>
  );
}
