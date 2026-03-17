import React, { useState } from 'react';
import { User, Mail, Shield, Check, Loader2 } from 'lucide-react';

export default function PersonalDataSettings() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Usuario Killer',
    email: 'usuario@killercontrol.app',
    phone: '+34 600 000 000'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
      <div>
        <h2 className="text-xl font-black mb-1 text-[#0F172A]">Datos Personales</h2>
        <p className="text-sm text-[#64748B] font-medium">Actualiza tu información de contacto y cómo te vemos en la app.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E2E8F0] rounded-3xl p-6 space-y-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-2 ml-1">Nombre Completo</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl py-3.5 pl-12 pr-4 text-[#0F172A] focus:outline-none focus:border-[#4F46E5] transition font-bold shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-2 ml-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl py-3.5 pl-12 pr-4 text-[#0F172A] focus:outline-none focus:border-[#4F46E5] transition font-bold shadow-inner"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-[#10B981] text-white' : 'bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:scale-[1.02] shadow-indigo-100'
          }`}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : saved ? <><Check size={18} /> Cambios guardados</> : 'Actualizar Perfil'}
        </button>
      </form>

      <div className="bg-[#EEF2FF] border border-[#4F46E5]/20 p-5 rounded-2xl flex gap-4 items-start shadow-sm">
        <Shield size={20} className="text-[#4F46E5] shrink-0 mt-1" />
        <div>
          <p className="text-sm text-[#0F172A] font-bold mb-1">Privacidad de datos</p>
          <p className="text-xs text-[#64748B] leading-relaxed font-medium">Tus datos están cifrados de extremo a extremo. Solo tú puedes ver tu historial de gastos y suscripciones.</p>
        </div>
      </div>
    </section>
  );
}
