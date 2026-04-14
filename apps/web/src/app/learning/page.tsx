import { LearningCoreOverview } from '../../components/learning-core-overview';
import { PlatformNavigation } from '../../components/platform-navigation.clean';

export default function LearningPage() {
  return (
    <main className="page">
      <PlatformNavigation />

      <section className="inner-hero">
        <span className="section-label">Учебный контент</span>
        <h1>Модули, структура программ и развитие learning core</h1>
        <p>
          Раздел показывает базовую структуру учебного контента: модули, объем, последовательность и
          основу для следующего этапа развития платформы.
        </p>
      </section>

      <LearningCoreOverview />
    </main>
  );
}