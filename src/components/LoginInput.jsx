import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTranslation from '../hooks/useTranslation'; 

function LoginInput({ login }) {
  const { t } = useTranslation(); 
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
        placeholder={t('emailInputPlaceholder')}  
        value={email}
        onChange={onEmailChangeHandler}
        aria-label={t('emailInputPlaceholder')} 
      />
      <input
        type="password"
        placeholder={t('passwordInputPlaceholder')} 
        autoComplete='current-password'
        value={password}
        onChange={onPasswordChangeHandler}
        aria-label={t('passwordInputPlaceholder')} 
      />
      <button type="submit">{t('loginButton')}</button> 
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
