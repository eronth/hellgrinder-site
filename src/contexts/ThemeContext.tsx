import React, { createContext, useEffect, useState } from 'react';
import { ColorMode, FactionTheme, ThemeContextType } from '../types/theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('colorMode');
    return (saved as ColorMode) || 'system';
  });
  
  const [factionTheme, setFactionTheme] = useState<FactionTheme>(() => {
    const saved = localStorage.getItem('factionTheme');
    return (saved as FactionTheme) || 'ashborn';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const isDarkMode = colorMode === 'dark' || (colorMode === 'system' && systemPrefersDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
    localStorage.setItem('factionTheme', factionTheme);
    
    // Apply theme classes to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-faction', factionTheme);
  }, [colorMode, factionTheme, isDarkMode]);

  return (
    <ThemeContext.Provider value={{
      colorMode,
      factionTheme,
      setColorMode,
      setFactionTheme,
      isDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
