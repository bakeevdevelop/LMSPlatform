const highlights = [
  'Курсы, потоки и цифровой след',
  'Встроенные вебинары и контроль присутствия',
  'Отчетность и аудит для федерального проекта',
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
    </main>
  );
}
