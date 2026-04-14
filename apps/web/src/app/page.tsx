import { CourseCatalogOverview } from '../components/course-catalog-overview';
import { EnrollmentOverview } from '../components/enrollment-overview';
import { IdentityOverview } from '../components/identity-overview';

const platformStats = [
  { value: '24/7', label: 'доступность сервисов и учебных материалов' },
  { value: '152-ФЗ', label: 'ориентир по защите персональных данных' },
  { value: 'API-first', label: 'подход к интеграциям и отчетности' },
];

const highlights = [
  {
    title: 'Учебный контур',
    text: 'Курсы, потоки, цифровой след и единая точка входа для слушателей, преподавателей и администраторов.',
  },
  {
    title: 'Встроенные коммуникации',
    text: 'Нативные вебинары, контроль присутствия и единые правила взаимодействия внутри платформы.',
  },
  {
    title: 'Государственная отчетность',
    text: 'Прозрачные данные, аудит действий и подготовка к интеграциям с внешними федеральными контурами.',
  },
];

const nextSteps = [
  'Auth foundation и bootstrap сессии уже доступны через API.',
  'Пользователи, роли, курсы и потоки читаются из dev persistence слоя.',
  'На главной доступна демонстрация записи на открытый поток.',
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="topbar">
        <div>
          <span className="topbar__eyebrow">Федеральная LMS-платформа</span>
          <strong>Проект «Код будущего»</strong>
        </div>
        <div className="topbar__meta">
          <span>Статус: MVP foundation</span>
          <span>Среда: dev</span>
        </div>
      </section>

      <section className="hero">
        <div className="hero__content">
          <span className="badge">LSM Platform</span>
          <h1>Современная цифровая платформа обучения для государственных и образовательных контуров</h1>
          <p>
            Интерфейс собран в спокойной официальной стилистике: чистая структура, аккуратная
            визуальная иерархия, понятные статусы и готовность к развитию в сторону нагрузки,
            аудита и межсистемных интеграций.
          </p>

          <div className="hero__actions">
            <a href="#foundation" className="primary-link">
              Смотреть foundation-модули
            </a>
            <a href="http://127.0.0.1:8000/docs" className="secondary-link">
              Открыть API документацию
            </a>
          </div>
        </div>

        <aside className="hero__aside">
          <span className="section-label">Ключевые ориентиры</span>
          <div className="stat-grid">
            {platformStats.map((item) => (
              <article key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <article key={item.title} className="card card--feature">
            <span className="card__accent" />
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="panel" id="foundation">
        <div>
          <span className="section-label">Сейчас доступно</span>
          <h2>Foundation-модули для запуска пилотного цифрового контура</h2>
          <p>
            Базовые сервисы уже дают целостную демонстрацию будущей платформы: есть каталог ролей,
            стартовый каталог курсов, потоки, запись на обучение и опорные API для следующего этапа.
          </p>
        </div>

        <ul className="timeline timeline--official">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <IdentityOverview />
      </section>

      <CourseCatalogOverview />

      <EnrollmentOverview />

      <section className="trust-panel">
        <div>
          <span className="section-label">Подход к интерфейсу</span>
          <h2>Спокойный визуальный стиль для образовательной и государственной среды</h2>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <h3>Сдержанная палитра</h3>
            <p>Сине-графитовая гамма без визуального шума, пригодная для длительной ежедневной работы.</p>
          </article>
          <article className="trust-card">
            <h3>Четкая структура</h3>
            <p>Блоки разделены по смыслу: идентификация, учебный каталог, набор на потоки и дальнейшие шаги.</p>
          </article>
          <article className="trust-card">
            <h3>Готовность к масштабированию</h3>
            <p>Компоненты оформлены как единая дизайн-база, которую можно развивать для кабинетов и отчетных экранов.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
