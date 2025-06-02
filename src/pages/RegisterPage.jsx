// src/pages/RegisterPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data'; // Direkomendasikan menggunakan network-data.js jika sudah disesuaikan
import useTranslation from '../hooks/useTranslation'; // Impor hook

function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Panggil hook di sini

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/login'); // Arahkan ke login setelah register, bukan '/' jika itu halaman catatan
    }
  }

  return (
    <section className='register-page'>
      <h2>{t('registerTitle')}</h2> {/* Judul halaman diterjemahkan */}
      {/* Teruskan fungsi 't' sebagai prop ke RegisterInput */}
      <RegisterInput register={onRegisterHandler} t={t} />
      <p>
        {t('toLoginPagePrompt')} {/* Teks prompt */}
        {' '}
        <Link to="/login">{t('toLoginPageLink')}</Link> {/* Teks link */}
      </p>
    </section>
  )
}

export default RegisterPage;