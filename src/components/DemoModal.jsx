import React from 'react';
import { X, PlayCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DemoModal({ open, onClose }) {
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
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl aspect-video bg-[#07101E] border border-[#1e293b] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 group"
        >
          {/* Header/Close */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition z-20 text-white"
          >
            <X size={24} />
          </button>

          {/* Video Placeholder Content */}
          <div className="text-center relative z-10 max-w-md">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30"
            >
              <PlayCircle size={48} className="text-primary ml-1" />
            </motion.div>
            
            <h2 className="text-3xl font-black text-white mb-4">
              Descubre <span className="text-[#F59E0B]">Killer</span> Control en Acción
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Estamos preparando un vídeo interactivo para mostrarte cómo dominamos tus suscripciones 24/7.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-[10px] text-white font-black uppercase tracking-widest">Seguridad Total</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-[10px] text-white font-black uppercase tracking-widest">IA Inteligente</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4F46E5 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 filter blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 filter blur-[100px] rounded-full"></div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
