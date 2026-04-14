import { CourseCatalogOverview } from '../components/course-catalog-overview';
import { EnrollmentOverview } from '../components/enrollment-overview';
import { IdentityOverview } from '../components/identity-overview';

const platformStats = [
  { value: '24/7', label: 'доступ к учебным материалам и сервисам платформы' },
  { value: 'LMS', label: 'единая среда для программ, потоков и вебинаров' },
  { value: 'Roles', label: 'гибкая ролевая модель для команд и участников' },
];

const workspaceSignals = [
  { label: 'Программы в работе', value: '12+' },
  { label: 'Открытые потоки', value: '04' },
  { label: 'Средний прогресс', value: '68%' },
];

const highlights = [
  {
    title: 'Каталог программ',
    text: 'Публикация курсов, описание форматов обучения и быстрый доступ к актуальным направлениям.',
  },
  {
    title: 'Управление потоками',
    text: 'Набор на обучение, контроль мест, статусы записи и прозрачная работа с учебными группами.',
  },
  {
    title: 'Роли и сопровождение',
    text: 'Единая платформа для слушателей, преподавателей, администраторов и организаторов обучения.',
  },
];

const capabilities = [
  'Каталог программ и курсов',
  'Запись на обучение и работа с потоками',
  'Встроенные вебинары и blended-сценарии',
  'Роли, доступы и организационная структура',
  'Основа для аналитики и контроля прогресса',
  'Единый интерфейс для ежедневной работы',
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <span className="badge">LSM Platform</span>
          <h1>Частная LMS-платформа для организаций, программ обучения и вебинарных форматов</h1>
          <p>
            Платформа помогает запускать обучение в единой цифровой среде: публиковать программы,
            управлять потоками, назначать роли, сопровождать участников и развивать онлайн-форматы
            без перегруженного интерфейса.
          </p>

          <div className="hero__actions">
            <a href="#catalog" className="primary-link">
              Смотреть программы
            </a>
            <a href="#capabilities" className="secondary-link">
              Возможности платформы
            </a>
          </div>
        </div>

        <aside className="hero__aside">
          <span className="section-label">Что уже есть в платформе</span>
          <div className="stat-grid">
            {platformStats.map((item) => (
              <article key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className="workspace-preview">
            <div className="workspace-preview__header">
              <div>
                <span className="workspace-preview__eyebrow">Рабочее пространство</span>
                <strong>Сводка по обучению</strong>
              </div>
              <span className="status-chip status-chip--light">Online</span>
            </div>

            <div className="workspace-preview__grid">
              {workspaceSignals.map((item) => (
                <article key={item.label} className="workspace-preview__card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>

            <ul className="workspace-preview__list">
              <li>
                <span>Ближайший вебинар</span>
                <strong>сегодня, 18:00</strong>
              </li>
              <li>
                <span>Новые заявки</span>
                <strong>8 за сутки</strong>
              </li>
              <li>
                <span>Активные роли</span>
                <strong>слушатели, преподаватели, администраторы</strong>
              </li>
            </ul>
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

      <section className="journey-panel" id="capabilities">
        <div>
          <span className="section-label">Возможности платформы</span>
          <h2>Все ключевые процессы обучения собраны в одной системе</h2>
          <p>
            Платформа подходит для учебных центров, академий, корпоративного обучения и частных
            образовательных проектов, где нужны каталог, набор, роли, вебинары и единая точка управления.
          </p>
        </div>

        <div className="journey-grid">
          {capabilities.map((item, index) => (
            <article key={item} className="journey-card">
              <span className="journey-card__step">0{index + 1}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <div className="overview-stack">
        <section id="catalog">
          <CourseCatalogOverview />
        </section>

        <EnrollmentOverview />

        <IdentityOverview />
      </div>
    </main>
  );
}
