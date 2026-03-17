import React, { useState } from 'react';
import { X, Send, Mail, MessageSquare, Check, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ContactModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#111A2C] border border-[#1e293b] rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight">Contacto y Soporte</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">Equipo <span className="text-[#F59E0B]">Killer</span></p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-8 flex gap-3 items-start">
                <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">Escríbenos directamente</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">Estamos aquí para ayudarte con tus suscripciones. Respondemos en menos de 24h.</p>
                  <p className="text-xs text-primary font-black mt-2 uppercase tracking-widest">soporte@killercontrol.app</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Asunto</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej: Problema con una alerta"
                    className="w-full bg-[#07101E] border border-[#1e293b] rounded-2xl py-4 px-5 text-white outline-none focus:border-primary/50 transition font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Mensaje</label>
                  <textarea 
                    required 
                    placeholder="Cuéntanos qué necesitas..."
                    rows={4}
                    className="w-full bg-[#07101E] border border-[#1e293b] rounded-2xl py-4 px-5 text-white outline-none focus:border-primary/50 transition font-medium resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading || sent}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg
                    ${sent ? 'bg-green-500 text-white' : 'bg-primary text-[#07101E] hover:scale-[1.02] shadow-primary/20'}
                    ${loading ? 'opacity-80' : ''}`}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : sent ? <><Check size={20} /> Enviado</> : <><Send size={20} /> Enviar Mensaje</>}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-[#07101E]/50 px-8 py-4 border-t border-[#1e293b] text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Killer Control SL · Barcelona, España</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
