// src/components/LoginInput.jsx
import React, { useState } from 'react'; // Impor useState
import PropTypes from 'prop-types';

function LoginInput({ login }) { // Terima props login
  // Gunakan useState untuk mengelola state email dan password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handler untuk perubahan input email
  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // Handler untuk perubahan input password
  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  // Handler untuk submit form
  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password }); // Panggil fungsi login dari props
  };

  return (
    <form onSubmit={onSubmitHandler} className='login-input'>
      <input
        type="email"
        placeholder='Email'
        value={email}
        onChange={onEmailChangeHandler}
      />
      <input
        type="password"
        placeholder='Password'
        autoComplete='current-password' // Sebaiknya tambahkan autoComplete
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button type="submit">Masuk</button> {/* Tambahkan type="submit" pada button */}
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;