// src/pages/NotFoundPage.jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation'; // Impor hook

function NotFoundPage() {
  const { t } = useTranslation(); // Panggil hook
  return (
    <main>
      <h2>{t('notFoundTitle')}</h2> {/* Kunci baru */}
      <p>{t('notFoundMessage')}</p> {/* Kunci baru */}
    </main>
  );
}

export default NotFoundPage;