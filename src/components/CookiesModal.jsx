import React from 'react';
import { X, Cookie, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function CookiesModal({ open, onClose }) {
  const { t } = useLanguage();
  const SECTIONS = t('legal.cookies.sections') || [];

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
            className="bg-[#07101E] border border-[#1e293b] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-xl flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1e293b] shrink-0">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                <Cookie size={20} className="text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight text-white">{t('legal.cookies.title')}</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · {t('legal.cookies.subtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar">
              <div className="flex items-start gap-3 bg-orange-500/5 border border-orange-500/15 rounded-2xl px-4 py-3 text-white">
                <ShieldCheck size={16} className="text-orange-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('legal.cookies.intro')}
                </p>
              </div>

              {SECTIONS.map((s, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="text-[10px] text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">0{idx + 1}</span>
                    {s.title}
                  </h3>
                  <div className="text-sm text-gray-400 leading-relaxed pl-6 border-l border-[#1e293b]">
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
            <div className="px-6 py-4 border-t border-[#1e293b] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 font-bold rounded-2xl py-3.5 hover:bg-[#F59E0B]/20 transition text-sm"
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