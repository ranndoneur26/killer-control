import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import esMessages from '../messages/es.json';
import enMessages from '../messages/en.json';

const LanguageContext = createContext();

const messages = {
  es: esMessages,
  en: enMessages
};

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => localStorage.getItem('locale') || 'en');
  const { profile, updateProfile } = useUserProfile();

  useEffect(() => {
    if (profile && profile.idioma && profile.idioma !== locale) {
      setLocaleState(profile.idioma);
      localStorage.setItem('locale', profile.idioma);
    }
  }, [profile, locale]);

  const setLocale = useCallback(async (newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
    if (profile) {
      try { await updateProfile({ idioma: newLocale }); } catch (e) { }
    }
  }, [profile, updateProfile]);

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = messages[locale];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return key if translation missing
      }
    }

    // Interpolation
    if (typeof value === 'string') {
      return value.replace(/{(\w+)}/g, (_, k) => params[k] !== undefined ? params[k] : `{${k}}`);
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
