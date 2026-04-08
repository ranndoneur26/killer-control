import React, { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useAppearance } from '../../contexts/AppearanceContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AppearanceSettings() {
  const { theme, setTheme } = useAppearance();
  const { t, locale, setLocale } = useLanguage();

  const THEMES = [
    {
      id: 'light',
      label: t('appearance.light').toUpperCase(),
      icon: Sun,
      preview: 'bg-white border-gray-200',
      dot: 'bg-indigo-600',
    },
    {
      id: 'dark',
      label: t('appearance.dark').toUpperCase(),
      icon: Moon,
      preview: 'bg-[#0f0f14] border-[#1e1e2e]',
      dot: 'bg-indigo-600',
    },
  ];

  const LANGUAGES = [
    { code: 'es', label: '🇪🇸 Español', active: true },
    { code: 'en', label: '🇬🇧 English', active: true },
    { code: 'fr', label: '🇫🇷 Français', active: false },
    { code: 'de', label: '🇩🇪 Deutsch', active: false },
    { code: 'ca', label: '🏳️ Català', active: false },
  ];


  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-[var(--text-primary)]">{t('appearance.title')}</h2>
        <p className="text-sm text-[var(--text-secondary)] font-medium">
          {t('appearance.subtitle')}
        </p>
      </div>

      {/* ── THEME ── */}
      <div>
        <h3 className="font-black text-[var(--text-primary)] text-lg mb-4">{t('appearance.theme_title')}</h3>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map(t_item => {
            const isActive = theme === t_item.id;
            return (
              <button
                key={t_item.id}
                onClick={() => setTheme(t_item.id)}
                role="radio"
                aria-checked={isActive}
                className={`relative flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl transition-all duration-200 ${isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-600'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                )}
                {/* Mini preview */}
                <div className={`w-full h-10 rounded-xl border ${t_item.preview} flex items-center justify-center gap-1.5`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${t_item.dot}`} />
                  <span className={`w-5 h-1 rounded-full ${t_item.dot} opacity-60`} />
                </div>
                {/* Label */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400 dark:text-gray-500'}`}>
                    <t_item.icon size={20} />
                  </div>
                  <p className={`text-xs font-black leading-none uppercase tracking-widest ${isActive ? 'text-indigo-600' : 'text-gray-600 dark:text-gray-300'}`}>
                    {t_item.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>



      {/* ── LANGUAGE ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 shadow-sm">
        <h3 className="font-black text-[var(--text-primary)] mb-4">{t('appearance.language_title')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(lang => {
            const isActive = locale === lang.code;

            if (!lang.active) {
              return (
                <div
                  key={lang.code}
                  title={`${t('appearance.coming_soon')} / Coming soon`}
                  className="py-3 px-4 rounded-xl text-sm font-black border bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)] opacity-40 cursor-not-allowed flex items-center justify-center"
                >
                  {lang.label}
                </div>
              );
            }

            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`py-3 px-4 rounded-xl text-sm font-black transition-all duration-150 border flex items-center justify-center ${isActive
                    ? 'border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-indigo-300'
                  }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
