import React from 'react';
import { X, FileText, Scale } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTIONS = [
  {
    n: '1', title: 'Información General',
    body: `En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos informativos:\n\n• Titular: [TU NOMBRE O EMPRESA]\n• CIF/NIF: [TU NIF]\n• Domicilio: [TU DIRECCIÓN]\n• Email: soporte@killercontrol.app`,
  },
  {
    n: '2', title: 'Propiedad Intelectual',
    body: `Todos los derechos de propiedad intelectual del contenido de este sitio web y su diseño gráfico son propiedad exclusiva de Killer Control, quedando prohibida su reproducción, distribución o comunicación pública sin autorización expresa.`,
  },
  {
    n: '3', title: 'Responsabilidad',
    body: `Killer Control no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos, a pesar de haber adoptado todas las medidas tecnológicas posibles para evitarlo.`,
  }
];

export default function LegalNoticeModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="bg-[#07101E] border border-[#1e293b] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-xl flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1e293b] shrink-0 text-white">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Scale size={20} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">Aviso Legal</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · Cumplimiento LSSI-CE</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar text-white">
              <div className="flex items-start gap-3 bg-purple-500/5 border border-purple-500/15 rounded-2xl px-4 py-3">
                <FileText size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Información legal requerida para la prestación de servicios digitales en el territorio español y la UE.
                </p>
              </div>

              {SECTIONS.map(s => (
                <div key={s.n} className="space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="text-[10px] text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded">{s.n}</span>
                    {s.title}
                  </h3>
                  <div className="text-sm text-gray-400 leading-relaxed pl-6 border-l border-[#1e293b]">
                    {s.body.split('Killer').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-[#F59E0B] font-bold">Killer</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#1e293b] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold rounded-2xl py-3.5 hover:bg-purple-500/20 transition text-sm"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
