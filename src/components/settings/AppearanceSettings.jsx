import React, { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useAppearance } from '../../contexts/AppearanceContext';

const THEMES = [
  {
    id: 'dark',
    label: 'Oscuro',
    description: 'Fondo profundo, ideal para trabajar de noche.',
    icon: Moon,
    preview: 'bg-[#0F172A] border-slate-700',
    dot: 'bg-slate-800',
  },
  {
    id: 'light',
    label: 'Claro',
    description: 'Interfaz luminosa para entornos bien iluminados.',
    icon: Sun,
    preview: 'bg-white border-slate-200',
    dot: 'bg-slate-100',
  },
  {
    id: 'system',
    label: 'Sistema',
    description: 'Sigue automáticamente los ajustes de tu SO.',
    icon: Monitor,
    preview: 'bg-gradient-to-br from-[#0F172A] to-slate-200 border-slate-300',
    dot: 'bg-slate-400',
  },
];

const LANGUAGES = [
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'ca', label: '🏳️ Català' },
];

const DENSITIES = [
  { id: 'compact',     label: 'Compacta',  description: 'Más contenido en menos espacio.' },
  { id: 'normal',      label: 'Normal',    description: 'Balance óptimo entre espacio y legibilidad.' },
  { id: 'comfortable', label: 'Cómoda',    description: 'Más espacio en blanco, lectura relajada.' },
];

export default function AppearanceSettings() {
  const { theme, setTheme, density, setDensity } = useAppearance();
  const [language, setLanguage] = useState('es');

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-[#0F172A]">Apariencia</h2>
        <p className="text-sm text-[#64748B] font-medium">
          Los cambios son inmediatos y se guardan automáticamente.
        </p>
      </div>

      {/* ── THEME ── */}
      <div>
        <h3 className="font-black text-[#0F172A] text-lg mb-4">Tema de la Interfaz</h3>
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map(t => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                role="radio"
                aria-checked={isActive}
                className={`relative flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-[#EEF2FF] border-[#4F46E5] shadow-lg shadow-indigo-100'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] active:scale-95 shadow-sm'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#4F46E5] flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                )}
                {/* Mini preview */}
                <div className={`w-full h-10 rounded-xl border ${t.preview} flex items-center justify-center gap-1.5`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
                  <span className={`w-5 h-1 rounded-full ${t.dot} opacity-60`} />
                </div>
                {/* Label */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`${isActive ? 'text-[#4F46E5]' : 'text-[#64748B]'}`}>
                    <t.icon size={14} />
                  </div>
                  <p className={`text-xs font-black leading-none uppercase tracking-widest ${isActive ? 'text-[#4F46E5]' : 'text-[#0F172A]'}`}>
                    {t.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-[#64748B] font-medium mt-2 pl-1">
          {THEMES.find(t => t.id === theme)?.description}
        </p>
      </div>

      {/* ── DENSITY ── */}
      <div>
        <h3 className="font-black text-[#0F172A] text-lg mb-4">Densidad de Interfaz</h3>
        <div className="space-y-2">
          {DENSITIES.map(d => {
            const isActive = density === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setDensity(d.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.99] shadow-sm ${
                  isActive
                    ? 'bg-[#EEF2FF] border-[#4F46E5]/30'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                {/* Radio circle */}
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
                  isActive ? 'border-[#4F46E5]' : 'border-slate-300'
                }`}>
                  {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />}
                </div>
                {/* Density visual preview */}
                <div className="w-10 shrink-0 space-y-1">
                  {d.id === 'compact' && (
                    <>
                      <div className="h-0.5 bg-slate-300 rounded w-full" />
                      <div className="h-0.5 bg-slate-300 rounded w-full" />
                      <div className="h-0.5 bg-slate-300 rounded w-3/4" />
                      <div className="h-0.5 bg-slate-300 rounded w-full" />
                    </>
                  )}
                  {d.id === 'normal' && (
                    <>
                      <div className="h-1 bg-slate-300 rounded w-full" />
                      <div className="h-1 bg-slate-300 rounded w-3/4" />
                      <div className="h-1 bg-slate-300 rounded w-full" />
                    </>
                  )}
                  {d.id === 'comfortable' && (
                    <>
                      <div className="h-1.5 bg-slate-300 rounded w-full" />
                      <div className="h-1.5 bg-slate-300 rounded w-2/3" />
                    </>
                  )}
                </div>
                <div>
                  <p className={`font-black text-sm leading-none ${isActive ? 'text-[#4F46E5]' : 'text-[#0F172A]'}`}>
                    {d.label}
                  </p>
                  <p className="text-xs text-[#64748B] font-medium mt-1">{d.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── LANGUAGE ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
        <h3 className="font-black text-[#0F172A] mb-4">Idioma</h3>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`py-3 px-4 rounded-xl text-sm font-black transition active:scale-95 border ${
                language === lang.code
                  ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]'
                  : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
