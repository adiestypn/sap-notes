// src/pages/RegisterPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data'; 
import useTranslation from '../hooks/useTranslation'; 

function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/login'); 
    }
  }

  return (
    <section className='register-page'>
      <h2>{t('registerTitle')}</h2> 
      <RegisterInput register={onRegisterHandler} t={t} />
      <p>
        {t('toLoginPagePrompt')} 
        {' '}
        <Link to="/login">{t('toLoginPageLink')}</Link> 
      </p>
    </section>
  )
}

export default RegisterPage;