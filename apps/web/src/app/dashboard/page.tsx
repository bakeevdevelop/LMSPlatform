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
          Раздел показывает активные курсы, динамику прохождения и ближайшие элементы учебного маршрута.
        </p>
      </section>

      <StudentDashboardOverview />
    </main>
  );
}