import { StudentDashboardOverview } from '../../components/student-dashboard-overview';
import { PlatformNavigation } from '../../components/platform-navigation.clean';

export default function DashboardPage() {
  return (
    <main className="page">
      <PlatformNavigation />

      <section className="inner-hero">
        <span className="section-label">Кабинет слушателя</span>
        <h1>Личный кабинет и текущий учебный прогресс</h1>
        <p>
          Раздел показывает активные курсы, динамику прохождения, ближайшие уроки и основные действия,
          которые слушателю важно выполнить в рамках учебного маршрута.
        </p>
      </section>

      <StudentDashboardOverview />
    </main>
  );
}