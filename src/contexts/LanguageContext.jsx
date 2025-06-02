// src/contexts/LanguageContext.jsx
import React, { useState, useEffect, useMemo, useContext } from 'react';

// 1. Buat Context
const LanguageContext = React.createContext();

// 2. Buat LanguageProvider Component
function LanguageProvider({ children }) {
  // State untuk bahasa saat ini, default ke 'id' (Indonesia) atau coba ambil dari localStorage
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'id'; // Default ke 'id'
  });

  // Efek untuk menyimpan bahasa ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Fungsi untuk mengganti bahasa
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'id' ? 'en' : 'id'));
  };

  // Nilai yang akan disediakan oleh Context
  const contextValue = useMemo(() => ({
    language,
    toggleLanguage,
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Custom Hook untuk menggunakan LanguageContext
function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { LanguageProvider, useLanguage, LanguageContext }; // Ekspor juga LanguageContext jika diperlukan di tempat lain