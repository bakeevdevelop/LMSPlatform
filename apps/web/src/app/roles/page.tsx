import { IdentityOverview } from '../../components/identity-overview';
import { PlatformNavigation } from '../../components/platform-navigation';

export default function RolesPage() {
  return (
    <main className="page">
      <PlatformNavigation />

      <section className="inner-hero">
        <span className="section-label">Роли и доступ</span>
        <h1>Участники платформы и модель доступа</h1>
        <p>
          Раздел описывает роли, распределение ответственности и базовую структуру доступа внутри
          учебной платформы.
        </p>
      </section>

      <IdentityOverview />
    </main>
  );
}