import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUTOPLAY_MS = 5000;

const slides = [
  {
    id: 1,
    label: "DETECTA SUBIDAS",
    title: "Netflix subirá su precio",
    body: "Te avisamos de que tu plan Estándar pasará de 12,99€ a 13,99€ el próximo mes.",
    highlight: "+1€/mes",
    badge: "Alerta de precio"
  },
  {
    id: 2,
    label: "EVITA OLVIDOS",
    title: "Periodo de prueba finaliza",
    body: "Tu prueba gratuita de Adobe Creative Cloud termina en 3 días. Cancela a tiempo.",
    highlight: "3 días restantes",
    badge: "Fin de promo"
  },
  {
    id: 3,
    label: "AHORRO INTELIGENTE",
    title: "Suscripción duplicada",
    body: "Parece que tienes Apple Music y Spotify activos. Podrías ahorrar 10,99€/mes.",
    highlight: "Ahorra 130€/año",
    badge: "Oportunidad"
  },
  {
    id: 4,
    label: "VISTA GLOBAL",
    title: "Gasto mensual bajo control",
    body: "Has reducido tus gastos fijos un 15% respecto al mes anterior. ¡Buen trabajo!",
    highlight: "-15% vs mes anterior",
    badge: "Informe mensual"
  }
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

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
              key={activeSlide.id}
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
        <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-slate-900 px-3 py-2 transition-all duration-300 hover:bg-slate-800 border border-slate-800/50">
            <p className="text-[10px] uppercase text-slate-500">GASTO MENSUAL</p>
            <p className="text-base font-semibold text-white">124,50 €</p>
            <p className="text-[11px] text-amber-500">-12,5% vs abril</p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 px-3 py-2 transition-all duration-300 hover:bg-amber-500/20 border border-amber-500/20">
            <p className="text-[10px] uppercase text-amber-500">
              AHORRO POTENCIAL
            </p>
            <p className="text-base font-semibold text-amber-400">45,20 €</p>
            <p className="text-[11px] text-amber-500">Este mes</p>
          </div>
        </div>

        {/* Dots de navegación */}
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-5 bg-amber-500"
                  : "w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={slide.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
