import { CourseCatalogOverview } from '../components/course-catalog-overview';
import { EnrollmentOverview } from '../components/enrollment-overview';
import { IdentityOverview } from '../components/identity-overview';

const trustFacts = [
  'Ролевой доступ и разграничение сценариев работы',
  'Подготовка к аудиту, отчетности и цифровому следу',
  'API-first архитектура для интеграционного контура',
  'Единая среда обучения, вебинаров и управления потоками',
];

const platformStats = [
  { value: '24/7', label: 'доступность сервисов и учебных материалов' },
  { value: '152-ФЗ', label: 'ориентир по защите персональных данных' },
  { value: 'Аудит', label: 'прозрачная фиксация действий и событий' },
];

const userJourneys = [
  {
    title: 'Выберите программу',
    text: 'Участник или его представитель знакомится с доступными направлениями и форматами обучения.',
  },
  {
    title: 'Подайте заявку и запишитесь',
    text: 'Система поддерживает работу с потоками, статусами набора и контролем доступных мест.',
  },
  {
    title: 'Обучайтесь и отслеживайте прогресс',
    text: 'Курсы, вебинары, роли и дальнейшая аналитика собираются в едином цифровом контуре.',
  },
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
          <span>Пилотный контур</span>
          <span>Образовательная платформа</span>
        </div>
      </section>

      <section className="hero">
        <div className="hero__content">
          <span className="badge">LSM Platform</span>
          <h1>Цифровая образовательная платформа для федеральных программ и государственных контуров</h1>
          <p>
            Платформа объединяет программы обучения, потоки, вебинарные сценарии, ролевой доступ
            и будущий цифровой след в едином аккуратном интерфейсе, рассчитанном на доверие,
            прозрачность процессов и масштабирование.
          </p>

          <div className="hero__actions">
            <a href="#foundation" className="primary-link">
              Посмотреть возможности платформы
            </a>
            <a href="#journey" className="secondary-link">
              Как проходит обучение
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

      <section className="proof-strip" aria-label="Ключевые преимущества платформы">
        {trustFacts.map((fact) => (
          <article key={fact} className="proof-item">
            <span className="proof-item__dot" />
            <p>{fact}</p>
          </article>
        ))}
      </section>

      <section className="journey-panel" id="journey">
        <div>
          <span className="section-label">Пользовательский сценарий</span>
          <h2>Понятный путь от выбора программы до обучения и сопровождения</h2>
          <p>
            Главная страница показывает будущую логику цифрового сервиса: от знакомства с
            программами до записи на поток, обучения и дальнейшего контроля прогресса.
          </p>
        </div>

        <div className="journey-grid">
          {userJourneys.map((item, index) => (
            <article key={item.title} className="journey-card">
              <span className="journey-card__step">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
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
