import React from 'react';

function HeroCopy({ onStart, onDemo }) {
  return (
    <div className="max-w-xl space-y-6">
      <p className="text-sm font-semibold tracking-[0.2em] text-amber-500">
        NUEVA ERA EN CONTROL DE GASTOS
      </p>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-white">
        Controla tus suscripciones{" "}
        <span className="text-amber-500">antes de que ellas controlen tu cuenta</span>
      </h1>

      <p className="text-slate-300">
        Detecta subidas de precio, promociones que terminan y servicios que ya no compensan. 
        Todo en un solo lugar.
      </p>

      <ul className="space-y-1 text-sm text-slate-300">
        <li>• Detecta subidas de precio al instante.</li>
        <li>• Centraliza todos tus próximos cargos.</li>
        <li>• Encuentra qué puedes cancelar o cambiar para ahorrar.</li>
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button 
          onClick={onStart}
          className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-colors"
        >
          Empezar gratis
        </button>
        <button 
          onClick={onDemo}
          className="flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold hover:border-slate-500 text-white transition-colors"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
            ▶
          </span>
          Ver demostración
        </button>
      </div>

      <p className="text-xs text-slate-400">Sin tarjeta para empezar.</p>
    </div>
  );
}

export default HeroCopy;
