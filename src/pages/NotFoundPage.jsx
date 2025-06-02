// src/pages/NotFoundPage.jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation'; 

function NotFoundPage() {
  const { t } = useTranslation(); 
  return (
    <main>
      <h2>{t('notFoundTitle')}</h2> 
      <p>{t('notFoundMessage')}</p> 
    </main>
  );
}

export default NotFoundPage;