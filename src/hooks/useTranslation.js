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
  // Log untuk melihat apakah useTranslation dipanggil ulang dengan bahasa baru
  console.log(`useTranslation: Hook called. Current language from context: ${language}`);

  const t = (key) => {
    // Log untuk setiap pemanggilan t()
    console.log(`useTranslation: Attempting to translate key: "${key}" for language: "${language}"`);
    const translatedText = translations[language] && translations[language][key];

    if (translatedText === undefined) {
        console.warn(`useTranslation: Translation not found for key: "${key}" in language: "${language}". Returning key.`);
    }
    return translatedText || key; // Kembalikan kunci jika terjemahan tidak ditemukan
  };

  return { t, currentLanguage: language };
}

export default useTranslation;