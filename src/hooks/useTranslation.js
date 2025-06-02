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
    const translatedText = translations[language] && translations[language][key];

    if (translatedText === undefined) {
    }
    return translatedText || key; 
  };

  return { t, currentLanguage: language };
}

export default useTranslation;