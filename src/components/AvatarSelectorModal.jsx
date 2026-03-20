import React from 'react';
import { X, Users, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AVATARS = [
  { id: 'jason',    name: 'Jason',    url: '/avatars/jason.png' },
  { id: 'freddy',   name: 'Freddy',   url: '/avatars/freddy.png' },
  { id: 'michael',  name: 'Michael',  url: '/avatars/michael.png' },
  { id: 'hannibal', name: 'Hannibal', url: '/avatars/hannibal.png' },
  { id: 'ghostfac', name: 'Ghost',    url: '/avatars/ghostface.png' },
  { id: 'samara',   name: 'Samara',   url: '/avatars/samara.png' },
  { id: 'tiffany',  name: 'Tiffany',  url: '/avatars/tiffany.png' },
  { id: 'carrie',   name: 'Carrie',   url: '/avatars/carrie.png' },
  { id: 'pearl',    name: 'Pearl',    url: '/avatars/pearl.png' },
  { id: 'esther',   name: 'Esther',   url: '/avatars/esther.png' },
];

export default function AvatarSelectorModal({ open, currentAvatar, onSelect, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[var(--bg-surface)]/80 backdrop-blur-xl border-b border-[var(--border)] px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">Elige tu Avatar</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-0.5">Colección <span className="text-[#F59E0B]">Killer</span> Legends</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Combined Grid */}
          <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8 custom-scrollbar">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {AVATARS.map(avatar => (
                <button
                  key={avatar.id}
                  onClick={() => { onSelect(avatar.url); onClose(); }}
                  className={`group relative flex flex-col items-center gap-2 p-1.5 transition-all
                    ${currentAvatar === avatar.url ? 'scale-105' : 'hover:scale-103'}`}
                >
                  <div className={`
                    relative w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all
                    ${currentAvatar === avatar.url 
                      ? 'border-[var(--primary)] ring-4 ring-[var(--primary)]/20 bg-[var(--primary)]/10 shadow-[var(--primary)]/30' 
                      : 'border-[var(--border)] bg-[var(--bg)] group-hover:border-[var(--primary)]/50 group-hover:shadow-lg'}
                  `}>
                    <img 
                      src={avatar.url} 
                      alt={avatar.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + avatar.name + '&background=random'; }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold truncate w-full text-center ${currentAvatar === avatar.url ? 'text-[var(--primary)]' : 'text-gray-500 font-medium'}`}>
                    {avatar.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-[var(--bg)]/50 px-8 py-5 border-t border-[var(--border)]">
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic text-center">
              "En <span className="text-[#F59E0B]">Killer</span> Control, tú eres el protagonista de tu libertad financiera. Elige el rostro que mejor te represente."
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
