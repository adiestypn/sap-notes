import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; 
import useTranslation from '../hooks/useTranslation'; 
import { RiTranslate } from "react-icons/ri";

function LanguageToggleButton() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation(); 

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