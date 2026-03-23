import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from './Logo';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-md mx-auto justify-between bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Top spacing to compensate for removed status bar */}
      <div className="h-12 w-full"></div>

      {/* Graphic Area */}
      <div className="flex justify-center flex-1 items-center relative -mt-8">
        <div className="relative w-64 h-80 flex items-center py-6 justify-center">

          {/* Document outline back */}
          <motion.div
            initial={{ x: 20, y: 10, rotate: 10, opacity: 0 }}
            animate={{ x: 30, y: 0, rotate: 15, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-0 w-48 h-64 bg-[var(--bg-surface)]/90 rounded-3xl z-0 shadow-xl overflow-hidden p-4"
          >
            <div className="w-16 h-2 bg-[var(--bg)]/10 rounded-full mb-4 mt-2"></div>
            <div className="w-full h-2 bg-[var(--bg)]/10 rounded-full mb-3"></div>
            <div className="w-4/5 h-2 bg-[var(--bg)]/10 rounded-full mb-3"></div>
            <div className="absolute bottom-4 right-4 left-4 h-4 bg-primary/40 rounded-full"></div>
          </motion.div>

          {/* Abstract Phone Shape */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-48 h-80 bg-[var(--bg-surface)] rounded-[2rem] border-4 border-[var(--border)] z-10 shadow-2xl relative flex flex-col items-center py-4"
          >
            {/* Notch */}
            <div className="w-20 h-4 bg-[var(--bg)] rounded-full top-2 absolute"></div>

            {/* Scan animation */}
            <motion.div
              animate={{ y: [0, 160, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-full h-48 absolute top-8 left-0 rounded-2xl border-2 border-primary/50 bg-primary/5 z-20 pointer-events-none"
            >
              <div className="w-full h-[2px] bg-primary absolute top-1/2 shadow-[0_0_10px_#00ff00]"></div>
            </motion.div>

            {/* Glowing inner element */}
            <div className="w-16 h-8 bg-primary/10 rounded-full mt-auto mb-2 border border-primary/20 flex justify-center items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#00ff00]"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="text-center pb-8">
        <div className="flex justify-center mb-6">
          <Logo className="h-10" />
        </div>

        <p className="text-[var(--text-secondary)] mb-8 mx-auto max-w-[280px]">
          Control your subscriptions, track spending, and eliminate what you don't use.
        </p>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-6 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-[var(--border)] rounded-full"></div>
          <div className="w-2 h-2 bg-[var(--border)] rounded-full"></div>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-[var(--primary)] text-white font-bold rounded-full py-4 flex items-center justify-center gap-2 hover:opacity-90 transition group"
        >
          Next <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}