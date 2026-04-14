'use client';

import { useEffect, useState } from 'react';

type UserSummary = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
};

type RoleSummary = {
  code: string;
  name: string;
  description: string;
};

type IdentityDirectory = {
  totalUsers: number;
  totalRoles: number;
  users: UserSummary[];
  roles: RoleSummary[];
};

export function IdentityOverview() {
  const [data, setData] = useState<IdentityDirectory | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/directory', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as IdentityDirectory;
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
    return <p className="error-box">Не удалось загрузить каталог identity: {error}</p>;
  }

  if (!data) {
    return <p className="loading-box">Загрузка данных identity…</p>;
  }

  return (
    <section className="identity-grid">
      <article className="identity-card">
        <span className="section-label">Пользователи</span>
        <h3>{data.totalUsers}</h3>
        <ul className="mini-list">
          {data.users.map((user) => (
            <li key={user.id}>
              <strong>{user.fullName}</strong>
              <span>{user.role}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="identity-card">
        <span className="section-label">Роли</span>
        <h3>{data.totalRoles}</h3>
        <ul className="mini-list">
          {data.roles.map((role) => (
            <li key={role.code}>
              <strong>{role.name}</strong>
              <span>{role.code}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}