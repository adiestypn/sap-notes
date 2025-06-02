// src/components/ThemeToggleButton.jsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Impor custom hook useTheme
import { FiSun, FiMoon } from 'react-icons/fi'; // Contoh menggunakan react-icons

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme(); // Dapatkan tema dan fungsi toggle dari context

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--on-background)', // Sesuaikan dengan warna ikon yang diinginkan
        fontSize: '24px', // Sesuaikan ukuran ikon
        padding: '8px'
      }}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
}

export default ThemeToggleButton;