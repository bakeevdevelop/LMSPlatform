'use client';

import { useEffect, useState } from 'react';

type StudentCourseProgress = {
  courseId: string;
  courseTitle: string;
  cohortTitle: string;
  progressPercent: number;
  status: string;
  nextModuleTitle?: string | null;
  nextLessonTitle?: string | null;
};

type StudentDashboardResponse = {
  studentId: string;
  fullName: string;
  totalActiveCourses: number;
  totalWebinarsThisWeek: number;
  completedLessons: number;
  totalLessonsPlanned: number;
  inProgressCourses: StudentCourseProgress[];
};

export function StudentDashboardOverview() {
  const [data, setData] = useState<StudentDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/student/dashboard', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as StudentDashboardResponse;
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
    return <p className="error-box">Не удалось загрузить кабинет слушателя: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка кабинета слушателя…</p>;
  }

  return (
    <section className="enrollment-panel">
      <div>
        <span className="section-label">Кабинет слушателя</span>
        <h2>{data.fullName}</h2>
        <p>
          Кабинет показывает активные курсы, текущий прогресс, ближайший модуль и следующий урок в
          учебном маршруте.
        </p>
      </div>

      <div className="enrollment-summary">
        <article className="summary-tile">
          <span className="section-label">Активные курсы</span>
          <strong>{data.totalActiveCourses}</strong>
          <p>Курсы, по которым сейчас идет обучение.</p>
        </article>
        <article className="summary-tile">
          <span className="section-label">Вебинары на неделе</span>
          <strong>{data.totalWebinarsThisWeek}</strong>
          <p>Запланированные синхронные занятия в ближайшие дни.</p>
        </article>
        <article className="summary-tile">
          <span className="section-label">Пройдено уроков</span>
          <strong>{data.completedLessons}</strong>
          <p>Из {data.totalLessonsPlanned} уроков в базовом учебном контуре.</p>
        </article>
      </div>

      <div className="enrollment-grid">
        {data.inProgressCourses.map((course) => (
          <article key={course.courseId} className="cohort-card">
            <div className="cohort-meta">
              <span>{course.courseId}</span>
              <span>{course.status}</span>
            </div>
            <h4>{course.courseTitle}</h4>
            <p>{course.cohortTitle}</p>
            <p>Прогресс: {course.progressPercent}%</p>

            <div className="cohort-progress" aria-hidden="true">
              <span style={{ width: `${course.progressPercent}%` }} />
            </div>

            <p className="panel-footnote">
              Следующий модуль: {course.nextModuleTitle ?? 'будет назначен позже'}
            </p>
            <p className="panel-footnote">
              Следующий урок: {course.nextLessonTitle ?? 'будет назначен позже'}
            </p>
          </article>
        ))}
      </div>

      <p className="panel-footnote">Кабинет станет основой для персонального маршрута обучения и ежедневной учебной работы.</p>
    </section>
  );
}
