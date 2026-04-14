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
  const [actionError, setActionError] = useState<string | null>(null);
  const [activeCohortId, setActiveCohortId] = useState<string | null>(null);

  async function enroll(cohortId: string) {
    setActionError(null);
    setActiveCohortId(cohortId);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/catalog/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'demo-student',
          cohortId,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { detail?: string };
        throw new Error(payload.detail ?? `HTTP ${response.status}`);
      }

      const payload = (await response.json()) as {
        cohort: CohortSummary;
        enrollment: EnrollmentSummary;
      };

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          totalEnrollments: current.totalEnrollments + 1,
          cohorts: current.cohorts.map((cohort) =>
            cohort.id === payload.cohort.id ? payload.cohort : cohort,
          ),
          enrollments: [...current.enrollments, payload.enrollment],
        };
      });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setActiveCohortId(null);
    }
  }

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
    return <p className="error-box">Не удалось загрузить enrollment foundation: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка enrollment foundation…</p>;
  }

  return (
    <section className="enrollment-panel">
      <div>
        <span className="section-label">Enrollment foundation</span>
        <h2>Запись на потоки и стартовый контур набора</h2>
        <p>
          Появились dev-данные по потокам, слотам и текущим enrollment-записям. Это база для
          дальнейших сценариев записи, progress tracking и управления cohort lifecycle.
        </p>
      </div>

      <div className="enrollment-summary">
        <article className="summary-tile">
          <span className="section-label">Потоки</span>
          <strong>{data.totalCohorts}</strong>
        </article>
        <article className="summary-tile">
          <span className="section-label">Открытые</span>
          <strong>{data.openCohorts}</strong>
        </article>
        <article className="summary-tile">
          <span className="section-label">Записи</span>
          <strong>{data.totalEnrollments}</strong>
        </article>
      </div>

      <div className="enrollment-grid">
        {data.cohorts.map((cohort) => {
          const matchingEnrollments = data.enrollments.filter((item) => item.cohortId === cohort.id);
          const studentAlreadyEnrolled = matchingEnrollments.some((item) => item.userId === 'demo-student');
          const canEnroll = cohort.status === 'open' && cohort.availableSlots > 0 && !studentAlreadyEnrolled;

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

              <ul className="cohort-list">
                {matchingEnrollments.map((enrollment) => (
                  <li key={enrollment.id}>
                    {enrollment.userId}: {enrollment.status}, progress {enrollment.progressPercent}%
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="action-button"
                onClick={() => enroll(cohort.id)}
                disabled={!canEnroll || activeCohortId === cohort.id}
              >
                {studentAlreadyEnrolled
                  ? 'demo-student уже записан'
                  : activeCohortId === cohort.id
                    ? 'Записываем…'
                    : canEnroll
                      ? 'Записать demo-student'
                      : 'Запись недоступна'}
              </button>
            </article>
          );
        })}
      </div>

      {actionError ? <p className="error-box">Ошибка записи: {actionError}</p> : null}
    </section>
  );
}