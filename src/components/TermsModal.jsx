import React from 'react';
import { X, Shield, ScrollText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function TermsModal({ open, onClose }) {
  const { t } = useLanguage();
  const SECTIONS = t('legal.terms.sections') || [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl flex flex-col max-h-[92vh] overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--border)] shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ScrollText size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">{t('legal.terms.title')}</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · {t('legal.terms.subtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar">
              {/* Intro badge */}
              <div className="flex items-start gap-3 bg-[var(--primary)]/5 border border-[var(--primary)]/15 rounded-2xl px-4 py-3">
                <Shield size={16} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('legal.terms.intro')}
                </p>
              </div>

              {/* Sections */}
              {SECTIONS.map((s, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full shrink-0">
                      Art. {idx + 1}
                    </span>
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                  </div>
                  <div className="pl-0 text-sm text-gray-400 leading-relaxed whitespace-pre-line border-l-2 border-[var(--border)] pl-4">
                    {s.body.split('Killer').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-[#F59E0B] font-bold">Killer</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="px-6 py-4 border-t border-[var(--border)] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[var(--primary)] text-[var(--bg)] font-bold rounded-2xl py-3.5 hover:opacity-90 transition text-sm"
              >
                {t('legal.understood')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
