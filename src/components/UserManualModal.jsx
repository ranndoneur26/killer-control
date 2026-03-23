import React from 'react';
import {
  X, BookOpen, Zap, TrendingUp, ShieldCheck,
  MousePointer2, BellRing, Sparkles, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

export default function UserManualModal({ open, onClose }) {
  const { t } = useLanguage();
  if (!open) return null;

  const ADVANTAGES = [
    {
      icon: Zap,
      title: t('manual.feature1_title'),
      desc: t('manual.feature1_desc')
    },
    {
      icon: BellRing,
      title: t('manual.feature2_title'),
      desc: t('manual.feature2_desc')
    },
    {
      icon: TrendingUp,
      title: t('manual.feature3_title'),
      desc: t('manual.feature3_desc')
    },
    {
      icon: ShieldCheck,
      title: t('manual.feature4_title'),
      desc: t('manual.feature4_desc')
    }
  ];

  const STEPS = [
    { title: t('manual.step1_title'), desc: t('manual.step1_desc') },
    { title: t('manual.step2_title'), desc: t('manual.step2_desc') },
    { title: t('manual.step3_title'), desc: t('manual.step3_desc') }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[var(--bg-surface)]/80 backdrop-blur-xl border-b border-[var(--border)] px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                <BookOpen size={24} />
              </div>
              <div>
                <Logo className="h-6 mb-1" darkBackground={true} />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">User Guide</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">

            {/* Intro / Advantage Section */}
            <section>
              <div className="flex items-center gap-2 mb-6 text-[#F59E0B] uppercase tracking-widest text-[10px] font-black">
                <Sparkles size={14} />
                <span>Why use <span className="text-[#F59E0B]">Killer</span> Control?</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADVANTAGES.map((adv, i) => (
                  <div key={i} className="bg-[var(--bg)] border border-[var(--border)] p-5 rounded-3xl group hover:border-[var(--primary)]/30 transition shadow-lg shadow-black/20">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mb-4 group-hover:scale-110 transition">
                      <adv.icon size={20} />
                    </div>
                    <h3 className="font-bold text-white mb-2">{adv.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to use */}
            <section className="bg-gradient-to-br from-[var(--primary)]/10 to-transparent p-8 rounded-[2rem] border border-[var(--primary)]/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MousePointer2 size={20} className="text-[var(--primary)]" />
                How to start in 3 steps
              </h3>
              <div className="space-y-6">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--bg)] font-black flex items-center justify-center text-xs shrink-0">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-sm text-white">{step.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pro Tip */}
            <section className="bg-[var(--bg)] border border-dashed border-[var(--border)] p-6 rounded-3xl flex items-center gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-2xl text-yellow-500">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{t('manual.pro_tip_title')}</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {t('manual.pro_tip_desc')}
                </p>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="p-6 bg-[var(--bg)]/50 border-t border-[var(--border)] flex justify-center">
            <button
              onClick={onClose}
              className="bg-[var(--primary)] text-[var(--bg)] px-8 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition shadow-lg shadow-[var(--primary)]/20"
            >
              {t('manual.cta')}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}