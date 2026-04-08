import React from 'react';
import { ArrowLeft, Sparkles, ChevronRight, TrendingDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ALTERNATIVES_DATA = {
  '1': [ // Netflix
    { name: 'HBO Max', price: 9.99, savings: 6, reason: 'Mejor catálogo de cine' },
    { name: 'Disney+', price: 8.99, savings: 7, reason: 'Ideal para familia' },
    { name: 'SkyShowtime', price: 5.99, savings: 10, reason: 'Precio imbatible' },
  ],
  '5': [ // Movistar
    { name: 'O2', price: 44.00, savings: 21, reason: 'Misma red Fibra 1Gb' },
    { name: 'Digi', price: 30.00, savings: 35, reason: 'Ahorro máximo garantizado' },
  ]
};

export default function Alternatives() {
  const navigate = useNavigate();
  const { id } = useParams();
  const options = ALTERNATIVES_DATA[id] || [
    { name: 'Plan Familiar', price: 17.99, savings: 0, reason: 'Divide gastos con 5 personas' },
    { name: 'Plan Estudiante', price: 5.99, savings: 5, reason: 'Verifica tu cuenta .edu' }
  ];

  return (
    <div className="min-h-screen bg-[#07101E] text-white p-6 pb-28">
      <div className="max-w-lg mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-[#111A2C] rounded-xl transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Alternativas de Ahorro</h1>
        </header>

        <div className="bg-gradient-to-r from-primary/20 to-transparent p-6 rounded-3xl border border-primary/20 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-[#F59E0B]" size={24} />
            <span className="font-bold text-lg text-[#F59E0B]">Killer Insight</span>
          </div>
          <p className="text-sm text-gray-300">Hemos analizado el mercado y estos servicios ofrecen lo mismo por menos dinero.</p>
        </div>

        <div className="space-y-4">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111A2C] border border-[#1e293b] p-5 rounded-2xl flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{opt.name}</h3>
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">RECOMENDADO</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{opt.reason}</p>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-white">{opt.price}€<span className="text-[10px] text-gray-500 ml-0.5">/mes</span></span>
                  <div className="flex items-center gap-1 text-primary text-xs font-bold">
                    <TrendingDown size={14} />
                    Ahorras {opt.savings}€
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-10 bg-primary text-[#07101E] font-bold py-4 rounded-2xl hover:bg-[#00e600] transition shadow-lg shadow-primary/20"
        >
          Ver Plan de Optimización Completo
        </button>
      </div>
    </div>
  );
}
