'use client';

import { useEffect, useState } from 'react';

type CourseSummary = {
  id: string;
  title: string;
  level: string;
  format: string;
  status: string;
  description: string;
  webinarHours: number;
};

type CourseCatalogResponse = {
  totalCourses: number;
  courses: CourseSummary[];
};

export function CourseCatalogOverview() {
  const [data, setData] = useState<CourseCatalogResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/catalog/courses', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as CourseCatalogResponse;
        if (!cancelled) {
          setData(payload);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="error-box">Не удалось загрузить каталог курсов: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка каталога курсов…</p>;
  }

  return (
    <section className="catalog-panel">
      <div className="catalog-header">
        <div>
          <span className="section-label">Каталог курсов</span>
          <h3>{data.totalCourses} стартовых программ</h3>
          <p className="catalog-description">
            Набор пилотных программ для демонстрации учебного каталога и управления потоками.
          </p>
        </div>
      </div>

      <div className="catalog-grid">
        {data.courses.map((course) => (
          <article key={course.id} className="catalog-card">
            <div className="catalog-card__meta">
              <span>{course.level}</span>
              <span>{course.format}</span>
              <span>{course.status}</span>
            </div>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <strong className="metric-line">{course.webinarHours} ч вебинаров</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
