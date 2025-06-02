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
  t: PropTypes.func, // Tambahkan prop type untuk 't' (opsional tapi baik)
};

// Berikan default prop untuk 't' jika tidak di-pass, agar tidak error
// Meskipun lebih baik memastikan 't' selalu di-pass jika terjemahan adalah fitur inti.
// Alternatifnya, berikan fallback di dalam pemanggilan t(), misal t('nameInputPlaceholder', 'Nama')
// jika hook useTranslation Anda mendukung fallback. Hook yang kita buat mengembalikan key jika tidak ditemukan.

export default RegisterInput;