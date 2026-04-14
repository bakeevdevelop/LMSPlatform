import { CourseCatalogOverview } from '../../components/course-catalog-overview';
import { PlatformNavigation } from '../../components/platform-navigation';

export default function ProgramsPage() {
  return (
    <main className="page">
      <PlatformNavigation />

      <section className="inner-hero">
        <span className="section-label">Программы</span>
        <h1>Каталог программ и курсов</h1>
        <p>
          Раздел для просмотра доступных программ, форматов обучения и направлений, которые можно
          запускать внутри платформы.
        </p>
      </section>

      <CourseCatalogOverview />
    </main>
  );
}