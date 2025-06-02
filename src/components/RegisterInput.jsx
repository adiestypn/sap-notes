// src/components/RegisterInput.jsx
import React, { useState } from 'react'; // Impor useState
import PropTypes from 'prop-types';

function RegisterInput({ register }) { // Terima props register
  // Gunakan useState untuk setiap input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Opsional: Jika Anda ingin menambahkan confirmPassword
  // const [confirmPassword, setConfirmPassword] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Opsional: Handler untuk confirmPassword
  // const onConfirmPasswordChange = (event) => {
  //   setConfirmPassword(event.target.value);
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Opsional: Tambahkan validasi confirm password di sini jika ada
    // if (password !== confirmPassword) {
    //   alert("Password dan konfirmasi password tidak cocok!");
    //   return;
    // }
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='register-input'>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={onNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password" // Gunakan new-password untuk registrasi
        value={password}
        onChange={onPasswordChange}
      />
      <button type="submit">Daftar</button> {/* Tambahkan type="submit" */}
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;