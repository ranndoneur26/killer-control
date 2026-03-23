import React from 'react';
import { useTranslations } from 'next-intl';

function HeroCopy({ onStart, onDemo }) {
  const t = useTranslations('hero');

  return (
    <div className="max-w-xl space-y-6">
      <p className="text-sm font-semibold tracking-[0.2em] text-amber-500 uppercase">
        {t('badge')}
      </p>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-white">
        {t('title')}
      </h1>

      <p className="text-slate-300">
        {t('subtitle')}
      </p>

      <ul className="space-y-1 text-sm text-slate-300">
        <li>• {t('bullet1')}</li>
        <li>• {t('bullet2')}</li>
        <li>• {t('bullet3')}</li>
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={onStart}
          className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-colors"
        >
          {t('cta_primary')}
        </button>
        <button
          onClick={onDemo}
          className="flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold hover:border-slate-500 text-white transition-colors"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
            ▶
          </span>
          {t('cta_secondary')}
        </button>
      </div>

      <p className="text-xs text-slate-400">{t('no_card')}</p>
    </div>
  );
}

export default HeroCopy;
