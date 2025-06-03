import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light'; 
  });

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]); 
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useTheme };