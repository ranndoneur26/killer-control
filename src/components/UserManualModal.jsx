import React from 'react';
import { 
  X, BookOpen, Zap, TrendingUp, ShieldCheck, 
  MousePointer2, BellRing, Sparkles, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADVANTAGES = [
  {
    icon: Zap,
    title: 'Control Total e Instantáneo',
    desc: 'Centraliza todas tus suscripciones en un solo panel. Olvida revisar extractos bancarios para saber qué estás pagando.'
  },
  {
    icon: BellRing,
    title: 'Alertas Inteligentes',
    desc: 'Te avisamos antes de que acaben tus promociones y detectamos subidas de precio inesperadas para que no pagues de más.'
  },
  {
    icon: TrendingUp,
    title: 'Oportunidades de Ahorro',
    desc: 'Nuestro motor encuentra alternativas más baratas con las mismas prestaciones, ahorrándote cientos de euros al año.'
  },
  {
    icon: ShieldCheck,
    title: 'Guías de Baja Real',
    desc: 'No más laberintos para cancelar. Te damos los pasos exactos y trucos para darte de baja en segundos.'
  }
];

const STEPS = [
  { title: 'Añade tus servicios', desc: 'Registra tus suscripciones actuales indicando el precio y la fecha de renovación.' },
  { title: 'Vigila las alertas', desc: 'Revisa las notificaciones de inteligencia en tu Dashboard sobre subidas o promociones.' },
  { title: 'Optimiza y ahorra', desc: 'Usa nuestras comparativas para encontrar mejores planes o guías para cancelar lo que no usas.' }
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
          className="relative w-full max-w-2xl bg-[#111A2C] border border-[#1e293b] rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#111A2C]/80 backdrop-blur-xl border-b border-[#1e293b] px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Guía de Usuario</h2>
                <p className="text-xs text-gray-400">Domina tu libertad financiera</p>
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
                <span>¿Por qué utilizar <span className="text-[#F59E0B]">Killer</span> Control?</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADVANTAGES.map((adv, i) => (
                  <div key={i} className="bg-[#07101E] border border-[#1e293b] p-5 rounded-3xl group hover:border-primary/30 transition shadow-lg shadow-black/20">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition">
                      <adv.icon size={20} />
                    </div>
                    <h3 className="font-bold text-white mb-2">{adv.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to use */}
            <section className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-[2rem] border border-primary/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MousePointer2 size={20} className="text-primary" />
                Cómo empezar en 3 pasos
              </h3>
              <div className="space-y-6">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-[#07101E] font-black flex items-center justify-center text-xs shrink-0">
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
            <section className="bg-[#07101E] border border-dashed border-[#1e293b] p-6 rounded-3xl flex items-center gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-2xl text-yellow-500">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Consejo PRO</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Revisa el apartado de "Inteligencia" en tu Dashboard semanalmente. Es donde nuestro motor detecta subidas silenciosas de precios de plataformas como Netflix o Adobe.
                </p>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="p-6 bg-[#07101E]/50 border-t border-[#1e293b] flex justify-center">
            <button 
              onClick={onClose}
              className="bg-primary text-[#07101E] px-8 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition shadow-lg shadow-primary/20"
            >
              ¡Entendido, vamos allá!
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
