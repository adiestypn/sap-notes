// src/contexts/LanguageContext.jsx
import React, { useState, useEffect, useMemo, useContext } from 'react';

const LanguageContext = React.createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    console.log('LanguageProvider: Initial language from localStorage:', savedLanguage);
    return savedLanguage || 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    console.log('LanguageProvider: Language saved to localStorage and state:', language);
    // Anda bisa menambahkan dispatch event kustom di sini jika diperlukan untuk kasus yang sangat kompleks,
    // tapi biasanya perubahan context sudah cukup.
    // window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === 'id' ? 'en' : 'id';
      console.log('LanguageProvider: Toggling language to:', newLanguage);
      return newLanguage;
    });
  };

  // useMemo memastikan objek contextValue hanya dibuat ulang jika language berubah.
  const contextValue = useMemo(() => {
    console.log('LanguageProvider: contextValue re-created for language:', language);
    return {
      language,
      toggleLanguage,
    };
  }, [language]); // Dependency array yang benar adalah [language]

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  // console.log('useLanguage hook: Consuming language:', context.language); // Bisa sangat verbose
  return context;
}

export { LanguageProvider, useLanguage, LanguageContext };