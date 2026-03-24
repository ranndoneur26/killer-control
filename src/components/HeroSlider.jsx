import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const AUTOPLAY_MS = 5000;

export default function HeroSlider() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = t('hero_slides') || [];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Halo / fondo “vivo” */}
      <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.25),_transparent_60%)]" />

      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-amber-500/10 backdrop-blur transition-all duration-300">
        {/* Cabecera tipo app */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-500" />
            APP PREVIEW
          </span>
          <AnimatePresence mode="wait">
            {activeSlide.highlight && (
              <motion.span
                key={activeSlide.highlight}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-500"
              >
                {activeSlide.highlight}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Tarjeta principal */}
        <div className="space-y-2 h-[130px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-500">
                {activeSlide.label}
              </p>
              <h2 className="text-lg font-semibold text-white">
                {activeSlide.title}
              </h2>
              <p className="text-sm text-slate-300">{activeSlide.body}</p>

              {activeSlide.badge && (
                <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-[11px] font-medium text-amber-500 mt-2">
                  {activeSlide.badge}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini resumen inferior tipo dashboard */}
        <div className="mt-6 flex items-center justify-around rounded-2xl border border-slate-800/50 bg-slate-900 px-3 py-2 text-xs transition-all duration-300 hover:bg-slate-800">
          <div>
            <div className="text-[10px] text-gray-500 font-medium">{t('hero_slider.stats_monthly')}</div>
            <div className="text-sm font-bold text-white">42,97€</div>
            <div className="text-[8px] text-gray-500 mt-0.5">{t('hero_slider.this_month')}</div>
          </div>
          <div className="w-px h-8 bg-white/5" />
          <div>
            <div className="text-[10px] text-[var(--primary)] font-medium">{t('hero_slider.stats_potential')}</div>
            <div className="text-sm font-bold text-white">10,99€</div>
            <div className="text-[8px] text-[var(--primary)]/70 mt-0.5">{t('hero_slider.vs_prev')}</div>
          </div>
        </div>

        {/* Dots de navegación */}
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex
                ? "w-5 bg-amber-500"
                : "w-2.5 bg-slate-600 hover:bg-slate-400"
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
