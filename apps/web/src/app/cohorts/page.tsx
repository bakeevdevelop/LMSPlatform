import { EnrollmentOverview } from '../../components/enrollment-overview';
import { PlatformNavigation } from '../../components/platform-navigation';

export default function CohortsPage() {
  return (
    <main className="page">
      <PlatformNavigation />

      <section className="inner-hero">
        <span className="section-label">Потоки</span>
        <h1>Набор, группы и управление потоками</h1>
        <p>
          Раздел для контроля учебных потоков, свободных мест, статусов набора и текущей загрузки
          групп по программам.
        </p>
      </section>

      <EnrollmentOverview />
    </main>
  );
}