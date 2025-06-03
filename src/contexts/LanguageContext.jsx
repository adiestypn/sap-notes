import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

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
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === 'id' ? 'en' : 'id';
      console.log('LanguageProvider: Toggling language to:', newLanguage);
      return newLanguage;
    });
  };

  const contextValue = useMemo(() => {
    console.log('LanguageProvider: contextValue re-created for language:', language);
    return {
      language,
      toggleLanguage,
    };
  }, [language]); 

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { LanguageProvider, useLanguage, LanguageContext };