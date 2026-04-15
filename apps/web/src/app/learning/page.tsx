import { LearningCoreOverview } from '../../components/learning-core-overview';
import { LearningLessonOverview } from '../../components/learning-lesson-overview';
import { LearningProgressOverview } from '../../components/learning-progress-overview';
import { PlatformNavigation } from '../../components/platform-navigation.clean';

export default function LearningPage() {
  return (
    <main className="page">
      <PlatformNavigation />

      <section className="inner-hero">
        <span className="section-label">Учебный контент</span>
        <h1>Learning Core: модули, уроки и персональный прогресс</h1>
        <p>
          Раздел объединяет структуру учебного контента и персональную сводку прохождения, чтобы
          слушатель и команда сопровождения видели текущий статус и следующий шаг обучения.
        </p>
      </section>

      <LearningProgressOverview />

      <LearningCoreOverview />

      <LearningLessonOverview />
    </main>
  );
}