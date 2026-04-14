import Link from 'next/link';

const links = [
  { href: '/' as const, label: 'Главная' },
  { href: '/programs' as const, label: 'Программы' },
  { href: '/cohorts' as const, label: 'Потоки' },
  { href: '/learning' as const, label: 'Обучение' },
  { href: '/roles' as const, label: 'Роли' },
];

export function PlatformNavigation() {
  return (
    <nav className="page-nav" aria-label="Основная навигация по платформе">
      <div className="page-nav__brand">
        <span className="page-nav__logo">LSM</span>
        <div>
          <strong>Платформа обучения</strong>
          <span>Частная LMS для организаций</span>
        </div>
      </div>

      <div className="page-nav__links">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}