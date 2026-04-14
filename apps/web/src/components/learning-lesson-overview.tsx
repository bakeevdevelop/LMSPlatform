'use client';

import { useEffect, useMemo, useState } from 'react';

type LearningLessonSummary = {
  id: string;
  moduleId: string;
  title: string;
  position: number;
  durationMinutes: number;
  lessonType: string;
  status: string;
};

type LearningLessonCatalogResponse = {
  totalLessons: number;
  lessons: LearningLessonSummary[];
};

export function LearningLessonOverview() {
  const [data, setData] = useState<LearningLessonCatalogResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/catalog/lessons', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as LearningLessonCatalogResponse;
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

  const groupedLessons = useMemo(() => {
    if (!data) {
      return [] as Array<[string, LearningLessonSummary[]]>;
    }

    const groups = new Map<string, LearningLessonSummary[]>();
    for (const lesson of data.lessons) {
      const bucket = groups.get(lesson.moduleId) ?? [];
      bucket.push(lesson);
      groups.set(lesson.moduleId, bucket);
    }

    return Array.from(groups.entries());
  }, [data]);

  if (error) {
    return <p className="error-box">Не удалось загрузить уроки: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка уроков…</p>;
  }

  return (
    <section className="catalog-panel">
      <div className="catalog-header">
        <div>
          <span className="section-label">Уроки</span>
          <h3>{data.totalLessons} уроков в учебном контуре</h3>
          <p className="catalog-description">
            Уроки показывают последовательность прохождения внутри модулей и готовят основу для заданий,
            тестов и детального прогресса.
          </p>
        </div>
      </div>

      <div className="lesson-groups">
        {groupedLessons.map(([moduleId, lessons]) => (
          <article key={moduleId} className="lesson-group-card">
            <div className="catalog-card__meta">
              <span>{moduleId}</span>
              <span>{lessons.length} уроков</span>
            </div>

            <ul className="lesson-list">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="lesson-list__item">
                  <div>
                    <strong>{lesson.position}. {lesson.title}</strong>
                    <small>{lesson.lessonType}</small>
                  </div>
                  <span className="status-chip">{lesson.durationMinutes} мин</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}