import React from 'react';
import { 
  X, BookOpen, Zap, TrendingUp, ShieldCheck, 
  MousePointer2, BellRing, Sparkles, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADVANTAGES = [
  {
    icon: Zap,
    title: 'Instant Total Control',
    desc: 'Centralize all your subscriptions in one dashboard. Forget checking bank statements to know what you are paying for.'
  },
  {
    icon: BellRing,
    title: 'Smart Alerts',
    desc: 'We warn you before your promotions end and detect unexpected price hikes so you don\'t overpay.'
  },
  {
    icon: TrendingUp,
    title: 'Savings Opportunities',
    desc: 'Our engine finds cheaper alternatives with the same features, saving you hundreds of dollars a year.'
  },
  {
    icon: ShieldCheck,
    title: 'Real Cancellation Guides',
    desc: 'No more mazes to cancel. We give you the exact steps and tricks to unsubscribe in seconds.'
  }
];

const STEPS = [
  { title: 'Add your services', desc: 'Register your current subscriptions indicating the price and renewal date.' },
  { title: 'Watch the alerts', desc: 'Check the intelligence notifications on your Dashboard about hikes or promotions.' },
  { title: 'Optimize and save', desc: 'Use our comparisons to find better plans or guides to cancel what you don\'t use.' }
];

export default function UserManualModal({ open, onClose }) {
  if (!open) return null;

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
                <h2 className="text-xl font-bold text-white">User Guide</h2>
                <p className="text-xs text-gray-400">Master your financial freedom</p>
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
                <p className="text-xs font-bold text-white">PRO Tip</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Check the "Intelligence" section in your Dashboard weekly. It's where our engine detects silent price hikes from platforms like Netflix or Adobe.
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
              Got it, let's go!
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}