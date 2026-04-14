'use client';

import { useEffect, useState } from 'react';

type LearningModuleSummary = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  position: number;
  lessonsTotal: number;
  durationMinutes: number;
  status: string;
};

type LearningModuleCatalogResponse = {
  totalModules: number;
  modules: LearningModuleSummary[];
};

export function LearningCoreOverview() {
  const [data, setData] = useState<LearningModuleCatalogResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/catalog/modules', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as LearningModuleCatalogResponse;
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
    return <p className="error-box">Не удалось загрузить структуру учебного контента: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка структуры учебного контента…</p>;
  }

  return (
    <section className="catalog-panel">
      <div className="catalog-header">
        <div>
          <span className="section-label">Структура обучения</span>
          <h3>{data.totalModules} учебных модулей в базовом контуре</h3>
          <p className="catalog-description">
            Модули формируют основу для следующего этапа: уроков, прогресса, заданий и сценариев обучения.
          </p>
        </div>
      </div>

      <div className="catalog-grid">
        {data.modules.slice(0, 4).map((module) => (
          <article key={module.id} className="catalog-card">
            <div className="catalog-card__meta">
              <span>{module.courseId}</span>
              <span>модуль {module.position}</span>
              <span>{module.status}</span>
            </div>
            <h4>{module.title}</h4>
            <p>{module.description}</p>
            <strong className="metric-line">
              {module.lessonsTotal} уроков · {module.durationMinutes} минут
            </strong>
          </article>
        ))}
      </div>

      <p className="panel-footnote">Этот блок показывает основу будущего learning core внутри платформы.</p>
    </section>
  );
}