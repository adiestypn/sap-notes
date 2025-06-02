// src/hooks/useTranslation.js
import { useLanguage } from '../contexts/LanguageContext';
import idTranslations from '../locales/id.json';
import enTranslations from '../locales/en.json';

const translations = {
  id: idTranslations,
  en: enTranslations,
};

function useTranslation() {
  const { language } = useLanguage();

  const t = (key) => {
    return translations[language][key] || key; // Kembalikan key jika terjemahan tidak ditemukan
  };

  return { t, currentLanguage: language };
}

export default useTranslation;