// src/components/Navigation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import ThemeToggleButton from './ThemeToggleButton';
import LanguageToggleButton from './LanguageToggleButton'; 
import useTranslation from '../hooks/useTranslation'; 

function Navigation({ logout, name }) {
  return (
    <nav className="navigation" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <Link
        to="/archive"
        className="nav-link nav-link--lg"
      >
        Arsip
      </Link>

      <ThemeToggleButton />
      <LanguageToggleButton />

      {name && (
        <>
          <button
            onClick={logout}
            title="Logout"
            className="logout-button" // Tambahkan kelas CSS di sini
            // Inline style yang masih relevan atau sangat spesifik bisa dipertahankan jika ada,
            // atau pindahkan semuanya ke CSS jika memungkinkan.
            // Untuk contoh ini, kita pindahkan semua yang terkait tampilan utama.
            // style={{ marginRight: '8px' }} // Contoh jika hanya margin yang mau dipertahankan inline
          >
            <FiLogOut size={28} />
          </button>

          <span
            style={{ color: 'var(--on-surface)', marginLeft: '8px' }} // Sesuaikan margin jika tombol tidak lagi punya marginRight
          >
            {name}
          </span>
        </>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;