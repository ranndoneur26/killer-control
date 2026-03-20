import React, { createContext, useContext, useEffect, useState } from 'react';

const AppearanceContext = createContext();

export function AppearanceProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [density, setDensity] = useState(() => localStorage.getItem('kc-density') || 'normal');

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply density to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-density', density);
    localStorage.setItem('kc-density', density);
  }, [density]);

  return (
    <AppearanceContext.Provider value={{ theme, setTheme, density, setDensity }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  return useContext(AppearanceContext);
}
