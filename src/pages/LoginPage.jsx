import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import useTranslation from '../hooks/useTranslation'; 

function LoginPage({ loginSuccess }) {
  const { t } = useTranslation(); 

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className='login-page'>
      <h2>{t('loginTitle')}</h2>
      <LoginInput login={onLogin} />
      <p>
        {t('toRegisterPagePrompt')} 
        {' '} 
        <Link to="/register">{t('toRegisterPageLink')}</Link> 
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
