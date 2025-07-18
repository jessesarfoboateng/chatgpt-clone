// src/context/ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#171717' : '#FFFFFF',
      surface: isDarkMode ? '#2D2D30' : '#F7F7F8',
      primary: '#10A37F',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      textSecondary: isDarkMode ? '#8E8EA0' : '#6B6B7D',
      border: isDarkMode ? '#343541' : '#E5E5E5',
      userMessage: '#10A37F',
      aiMessage: isDarkMode ? '#2D2D30' : '#F7F7F8',
    },
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};