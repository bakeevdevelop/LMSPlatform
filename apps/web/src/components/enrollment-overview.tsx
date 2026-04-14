'use client';

import { useEffect, useState } from 'react';

type CohortSummary = {
  id: string;
  courseId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  enrolledCount: number;
  availableSlots: number;
  status: string;
};

type EnrollmentSummary = {
  id: string;
  userId: string;
  courseId: string;
  cohortId: string;
  status: string;
  progressPercent: number;
  enrolledAt: string;
};

type EnrollmentDirectory = {
  totalCohorts: number;
  openCohorts: number;
  totalEnrollments: number;
  cohorts: CohortSummary[];
  enrollments: EnrollmentSummary[];
};

export function EnrollmentOverview() {
  const [data, setData] = useState<EnrollmentDirectory | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/catalog/enrollments', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as EnrollmentDirectory;
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
    return <p className="error-box">Не удалось загрузить данные о потоках: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка данных о потоках…</p>;
  }

  return (
    <section className="enrollment-panel">
      <div>
        <span className="section-label">Потоки и набор</span>
        <h2>Управление потоками, наборами и заполнением учебных групп</h2>
        <p>
          Платформа позволяет работать с потоками, контролировать доступные места, видеть текущую
          загрузку групп и управлять логикой набора на программы.
        </p>
      </div>

      <div className="enrollment-summary">
        <article className="summary-tile">
          <span className="section-label">Потоки</span>
          <strong>{data.totalCohorts}</strong>
          <p>Активные и планируемые потоки по программам.</p>
        </article>
        <article className="summary-tile">
          <span className="section-label">Открытые</span>
          <strong>{data.openCohorts}</strong>
          <p>Потоки, где в настоящий момент открыт набор.</p>
        </article>
        <article className="summary-tile">
          <span className="section-label">Записи</span>
          <strong>{data.totalEnrollments}</strong>
          <p>Текущие записи участников в выбранные потоки.</p>
        </article>
      </div>

      <div className="enrollment-grid">
        {data.cohorts.slice(0, 2).map((cohort) => {
          const matchingEnrollments = data.enrollments.filter((item) => item.cohortId === cohort.id);

          return (
            <article key={cohort.id} className="cohort-card">
              <div className="cohort-meta">
                <span>{cohort.courseId}</span>
                <span>{cohort.status}</span>
              </div>

              <h4>{cohort.title}</h4>
              <p>
                {cohort.startsAt} — {cohort.endsAt}
              </p>
              <p>
                Заполнено: {cohort.enrolledCount}/{cohort.capacity}, свободно {cohort.availableSlots}
              </p>

              <div className="cohort-progress" aria-hidden="true">
                <span style={{ width: `${(cohort.enrolledCount / cohort.capacity) * 100}%` }} />
              </div>

              <ul className="cohort-list">
                {matchingEnrollments.map((enrollment) => (
                  <li key={enrollment.id}>
                    <div>
                      <strong>{enrollment.userId}</strong>
                      <small>{enrollment.status}</small>
                    </div>
                    <span className="status-chip">{enrollment.progressPercent}%</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="panel-footnote">На главной показана обзорная сводка по потокам и текущему набору.</p>
    </section>
  );
}