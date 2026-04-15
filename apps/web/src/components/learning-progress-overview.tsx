'use client';

import { useEffect, useState } from 'react';

type CourseProgress = {
  courseId: string;
  courseTitle: string;
  status: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  nextModuleTitle?: string | null;
  nextLessonTitle?: string | null;
};

type LearningProgressResponse = {
  studentId: string;
  fullName: string;
  totalEnrolledCourses: number;
  completedLessons: number;
  totalLessonsPlanned: number;
  completionPercent: number;
  courses: CourseProgress[];
};

export function LearningProgressOverview() {
  const [data, setData] = useState<LearningProgressResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/catalog/learning/progress', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as LearningProgressResponse;
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
    return <p className="error-box">Не удалось загрузить прогресс обучения: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка прогресса обучения…</p>;
  }

  return (
    <section className="enrollment-panel">
      <div>
        <span className="section-label">Learning Core</span>
        <h2>Прогресс слушателя: {data.fullName}</h2>
        <p className="catalog-description">
          Блок показывает сводку по прохождению: сколько уроков завершено, общий процент выполнения и
          следующий шаг по каждому курсу.
        </p>
      </div>

      <div className="enrollment-summary">
        <article className="summary-tile">
          <span className="section-label">Курсы в обучении</span>
          <strong>{data.totalEnrolledCourses}</strong>
          <p>Количество активных учебных треков у слушателя.</p>
        </article>

        <article className="summary-tile">
          <span className="section-label">Пройдено уроков</span>
          <strong>{data.completedLessons}</strong>
          <p>Из {data.totalLessonsPlanned} уроков в назначенных курсах.</p>
        </article>

        <article className="summary-tile">
          <span className="section-label">Общий прогресс</span>
          <strong>{data.completionPercent}%</strong>
          <p>Интегральный процент выполнения по всем курсам.</p>
        </article>
      </div>

      <div className="enrollment-grid">
        {data.courses.map((course) => (
          <article key={course.courseId} className="cohort-card">
            <div className="cohort-meta">
              <span>{course.courseId}</span>
              <span>{course.status}</span>
            </div>
            <h4>{course.courseTitle}</h4>
            <p>
              Уроки: {course.completedLessons}/{course.totalLessons}
            </p>
            <p>Прогресс: {course.progressPercent}%</p>

            <div className="cohort-progress" aria-hidden="true">
              <span style={{ width: `${course.progressPercent}%` }} />
            </div>

            <p className="panel-footnote">Следующий модуль: {course.nextModuleTitle ?? 'будет назначен позже'}</p>
            <p className="panel-footnote">Следующий урок: {course.nextLessonTitle ?? 'будет назначен позже'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}