import Link from 'next/link';
import type { Route } from 'next';

type NavigationLink = {
  href: Route;
  label: string;
};

const links: NavigationLink[] = [
  { href: '/', label: 'Главная' },
  { href: '/dashboard', label: 'Кабинет' },
  { href: '/programs', label: 'Программы' },
  { href: '/cohorts', label: 'Потоки' },
  { href: '/learning', label: 'Обучение' },
  { href: '/roles', label: 'Роли' },
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
