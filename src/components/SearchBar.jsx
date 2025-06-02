// src/components/RegisterInput.jsx (Class Component dimodifikasi)
import React from 'react';
import PropTypes from 'prop-types';

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    // ... (binding lainnya)
  }

  // ... (handler lainnya)

  render() {
    const { t } = this.props; // Ambil 't' dari props

    return (
      <form onSubmit={this.onSubmitHandler} className='register-input'>
        <input
          type="text"
          placeholder={t ? t('nameInputPlaceholder') : "Nama"} // Gunakan t() jika ada
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="email"
          placeholder={t ? t('emailInputPlaceholder') : "Email"} // Gunakan t() jika ada
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <input
          type="password"
          placeholder={t ? t('passwordInputPlaceholder') : "Password"} // Gunakan t() jika ada
          autoComplete='new-password' // Sebaiknya 'new-password' untuk registrasi
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <button type="submit">{t ? t('registerButton') : "Register"}</button> {/* Gunakan t() jika ada */}
      </form>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  t: PropTypes.func, 
};

export default RegisterInput;