import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; 
import { FiSun, FiMoon } from 'react-icons/fi'; 

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--on-background)',
        fontSize: '24px', 
        padding: '8px'
      }}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
}

export default ThemeToggleButton;