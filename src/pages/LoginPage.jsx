// src/pages/LoginPage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import useTranslation from '../hooks/useTranslation'; // Pastikan path ini benar

function LoginPage({ loginSuccess }) {
  const { t } = useTranslation(); // Panggil hook untuk mendapatkan fungsi t

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
    // else {
    //   alert(t('loginFailedMessage') || 'Login gagal, periksa email dan password Anda.'); // Contoh pesan error
    // }
  }

  return (
    <section className='login-page'>
      <h2>{t('loginTitle')}</h2>
      <LoginInput login={onLogin} />
      <p>
        {t('toRegisterPagePrompt')} {/* Teks sebelum link */}
        {' '} {/* Spasi jika diperlukan antara prompt dan link */}
        <Link to="/register">{t('toRegisterPageLink')}</Link> {/* Teks link di dalam komponen Link */}
        {/* Pastikan tidak ada {t('toRegisterPageLink')} lagi setelah ini */}
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
