// src/components/LanguageToggleButton.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Impor custom hook useLanguage
import useTranslation from '../hooks/useTranslation'; // Untuk mendapatkan teks tombol jika diperlukan
import { RiTranslate } from "react-icons/ri";

function LanguageToggleButton() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation(); // Untuk teks pada tombol jika Anda mau

  return (
    <button
      onClick={toggleLanguage}
      title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      className="language-toggle-button"
    >
      <RiTranslate size={28} />
    </button>
  );
}

export default LanguageToggleButton;