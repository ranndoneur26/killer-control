import React from 'react';
import { X, FileText, Scale } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function LegalNoticeModal({ open, onClose }) {
  const { t } = useLanguage();
  const SECTIONS = t('legal.notice.sections') || [];

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
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-xl flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--border)] shrink-0 text-white">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Scale size={20} className="text-[var(--primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">{t('legal.notice.title')}</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · {t('legal.notice.subtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar text-white">
              <div className="flex items-start gap-3 bg-[var(--primary)]/5 border border-[var(--primary)]/15 rounded-2xl px-4 py-3">
                <FileText size={16} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('legal.notice.intro')}
                </p>
              </div>

              {SECTIONS.map(s => (
                <div key={s.n} className="space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="text-[10px] text-[var(--primary)] bg-[var(--primary)]/10 px-1.5 py-0.5 rounded">{s.n}</span>
                    {s.title}
                  </h3>
                  <div className="text-sm text-gray-400 leading-relaxed pl-6 border-l border-[var(--border)]">
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

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[var(--border)] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 font-bold rounded-2xl py-3.5 hover:bg-[var(--primary)]/20 transition text-sm"
              >
                {t('legal.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}