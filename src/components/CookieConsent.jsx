import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent({ onOpenPolicy }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none"
      >
        <div className="bg-[#0F172A] text-white p-6 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/10 pointer-events-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Cookie size={24} className="text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">We value your privacy</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                We use our own and third-party cookies to improve your experience and analyze web usage.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenPolicy}
              className="px-6 py-3 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              See policy
            </button>
            <button
              onClick={handleAccept}
              className="px-8 py-3 rounded-xl bg-[#4F46E5] text-sm font-bold text-white hover:bg-[#4338CA] transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap"
            >
              Accept all
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}