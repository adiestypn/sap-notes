// src/components/LoginInput.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTranslation from '../hooks/useTranslation'; // Pastikan path ini benar

function LoginInput({ login }) {
  const { t } = useTranslation(); // Panggil hook untuk mendapatkan fungsi t
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='login-input'>
      <input
        type="email"
        placeholder={t('emailInputPlaceholder')} // Pastikan 'emailInputPlaceholder' ada
        value={email}
        onChange={onEmailChangeHandler}
        aria-label={t('emailInputPlaceholder')} // Untuk aksesibilitas
      />
      <input
        type="password"
        placeholder={t('passwordInputPlaceholder')} // Pastikan 'passwordInputPlaceholder' ada
        autoComplete='current-password'
        value={password}
        onChange={onPasswordChangeHandler}
        aria-label={t('passwordInputPlaceholder')} // Untuk aksesibilitas
      />
      <button type="submit">{t('loginButton')}</button> {/* Pastikan 'loginButton' ada */}
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
