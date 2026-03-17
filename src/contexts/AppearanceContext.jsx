import React, { createContext, useContext, useEffect, useState } from 'react';

const AppearanceContext = createContext();

export function AppearanceProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('kc-theme') || 'dark');
  const [density, setDensity] = useState(() => localStorage.getItem('kc-density') || 'normal');

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      // system: respect OS preference
      root.classList.remove('light', 'dark');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    }

    localStorage.setItem('kc-theme', theme);
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
