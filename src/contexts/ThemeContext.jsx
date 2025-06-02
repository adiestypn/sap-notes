// src/contexts/ThemeContext.jsx
import React from 'react';

// 1. Buat Context
const ThemeContext = React.createContext();

// 2. Buat ThemeProvider Component
function ThemeProvider({ children }) {
  // State untuk tema saat ini, default ke 'light' atau coba ambil dari localStorage
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light'; // Default ke 'light' jika tidak ada di localStorage
  });

  // Efek untuk menyimpan tema ke localStorage setiap kali berubah
  React.useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Efek untuk menerapkan atribut data-theme ke elemen root HTML
  // Ini akan mengaktifkan variabel CSS di style.css
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fungsi untuk mengganti tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Nilai yang akan disediakan oleh Context
  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]); // Hanya buat objek baru jika theme berubah

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook untuk menggunakan ThemeContext (opsional tapi direkomendasikan)
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useTheme };