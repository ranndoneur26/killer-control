import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';

const AppearanceContext = createContext();

export function AppearanceProvider({ children }) {
  const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'light');
  const [density, setDensityState] = useState(() => localStorage.getItem('kc-density') || 'normal');
  const { profile, updateProfile } = useUserProfile();

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

  // Sync with Firestore profile when it loads
  useEffect(() => {
    if (profile) {
      if (profile.tema && profile.tema !== theme) setThemeState(profile.tema);
      if (profile.densidad && profile.densidad !== density) setDensityState(profile.densidad);
    }
  }, [profile]);

  // Wrappers to update both local state and Firestore
  const setTheme = useCallback(async (newTheme) => {
    setThemeState(newTheme);
    if (profile) {
      try { await updateProfile({ tema: newTheme }); } catch (e) { }
    }
  }, [profile, updateProfile]);

  const setDensity = useCallback(async (newDensity) => {
    setDensityState(newDensity);
    if (profile) {
      try { await updateProfile({ densidad: newDensity }); } catch (e) { }
    }
  }, [profile, updateProfile]);

  const [cookieConsent, setCookieConsentState] = useState(() => {
    const saved = localStorage.getItem('killer_cookie_consent');
    return saved ? JSON.parse(saved) : null;
  });

  const setCookieConsent = useCallback((consent) => {
    setCookieConsentState(consent);
    localStorage.setItem('killer_cookie_consent', JSON.stringify(consent));
    localStorage.setItem('killer_cookie_consent_date', new Date().toISOString());
  }, []);

  return (
    <AppearanceContext.Provider value={{
      theme,
      setTheme,
      density,
      setDensity,
      cookieConsent,
      setCookieConsent
    }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  return useContext(AppearanceContext);
}
