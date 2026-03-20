import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ShieldAlert, CreditCard, CalendarDays, Wallet, Sparkles } from 'lucide-react';

// Minidiccionario de servicios populares
const popularServices = [
  { name: 'Netflix', price: '15.99', category: 'Entretenimiento', cycle: 'Mensual', cancelUrl: 'https://www.netflix.com/cancelplan', currency: 'EUR' },
  { name: 'Spotify Premium', price: '10.99', category: 'Entretenimiento', cycle: 'Mensual', cancelUrl: 'https://www.spotify.com/account/cancel/', currency: 'EUR' },
  { name: 'Amazon Prime', price: '49.90', category: 'Hogar', cycle: 'Anual', cancelUrl: 'https://www.amazon.es/mc/pipeline/cancellation', currency: 'EUR' },
  { name: 'Adobe Creative Cloud', price: '60.49', category: 'Software', cycle: 'Mensual', cancelUrl: 'https://account.adobe.com/plans', currency: 'EUR' },
  { name: 'HBO Max', price: '9.99', category: 'Entretenimiento', cycle: 'Mensual', cancelUrl: 'https://play.hbomax.com/profile/settings', currency: 'EUR' },
  { name: 'Disney+', price: '8.99', category: 'Entretenimiento', cycle: 'Mensual', cancelUrl: 'https://www.disneyplus.com/account/cancel', currency: 'EUR' },
  { name: 'ChatGPT Plus', price: '20.00', category: 'Software', cycle: 'Mensual', cancelUrl: 'https://chat.openai.com/#settings', currency: 'USD' },
  { name: 'PlayStation Plus', price: '71.99', category: 'Gaming', cycle: 'Anual', cancelUrl: 'https://store.playstation.com/', currency: 'EUR' }
];

export default function SubscriptionForm({ initialData, onSave, onCancel, title = "Añadir Suscripción" }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    cycle: initialData?.cycle || 'Mensual',
    nextBillingDate: initialData?.nextBillingDate || initialData?.nextChargeDate || '',
    category: initialData?.category || 'streaming',
    currency: initialData?.currency?.replace(' (€)', '') || 'EUR',
    paymentMethod: initialData?.paymentMethod || initialData?.card || '',
    isShared: initialData?.isShared || false,
    myShare: initialData?.myShare || '',
    isFreeTrial: initialData?.isFreeTrial || false,
    trialEndDate: initialData?.trialEndDate || '',
    alertDays: initialData?.alertDays || initialData?.noticeDays?.split(' ')[0] || '3',
    cancelUrl: initialData?.cancelUrl || initialData?.webUrl || '',
    notes: initialData?.notes || ''
  });

  // Estados de Revelación Progresiva
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showKiller, setShowKiller] = useState(!!initialData?.cancelUrl || !!initialData?.webUrl);

  // Estados del Autocompletado
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'name') {
      if (value.length > 1) {
        const filtered = popularServices.filter(service => 
          service.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleSelectSuggestion = (service) => {
    setFormData(prev => ({
      ...prev,
      name: service.name,
      price: service.price,
      category: service.category,
      cycle: service.cycle,
      cancelUrl: service.cancelUrl,
      currency: service.currency
    }));
    setShowSuggestions(false);
    if (service.cancelUrl) setShowKiller(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="w-full bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[2.5rem] shadow-2xl border border-[var(--border)] overflow-hidden">
      <div className="p-8 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{title}</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium">Busca un servicio popular o añádelo manualmente.</p>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="p-2 hover:bg-[var(--bg-elevated)] rounded-full transition text-[var(--text-secondary)]">
            <ChevronDown size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        
        {/* NIVEL 1: LO VITAL */}
        <div className="space-y-4 bg-[var(--bg-elevated)] p-6 rounded-3xl border border-[var(--border)]">
          
          <div ref={wrapperRef} className="relative">
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Nombre *</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder="Ej. Netflix, Gimnasio..."
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl py-3.5 px-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all font-bold placeholder-[var(--text-muted)] relative z-10 shadow-sm"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 w-full mt-2 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-xl max-h-48 overflow-auto py-2">
                {suggestions.map((service, index) => (
                  <li 
                    key={index}
                    onClick={() => handleSelectSuggestion(service)}
                    className="flex items-center justify-between px-5 py-3 hover:bg-[var(--primary)]/10 cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-[var(--text-primary)] text-sm">{service.name}</span>
                    <span className="text-[10px] text-[var(--primary)] font-black uppercase tracking-tighter flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Autocompletar
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Precio *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-bold">€</span>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  placeholder="15.99"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl py-3.5 pl-10 pr-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] font-bold text-lg shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Ciclo *</label>
              <select
                name="cycle"
                value={formData.cycle}
                onChange={handleChange}
                className="w-full h-[58px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl px-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] font-bold shadow-sm"
              >
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
                <option value="Unico">Pago Único</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Próximo Cobro *</label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
              <input
                type="date"
                name="nextBillingDate"
                required
                value={formData.nextBillingDate}
                onChange={handleChange}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl py-3.5 pl-12 pr-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] font-bold shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* NIVEL 2: DETALLES DE CONTROL */}
        <div className="border border-[var(--border)] rounded-[2rem] overflow-hidden bg-[var(--bg-surface)] shadow-sm">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-5 text-sm font-black text-[var(--primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5" />
              <span>Detalles de Control <span className="text-[#F59E0B]">Killer</span></span>
            </div>
            {showAdvanced ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          {showAdvanced && (
            <div className="p-6 bg-[var(--bg-elevated)] space-y-5 border-t border-[var(--border)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Categoría</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-[var(--text-primary)] text-sm font-bold focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                  >
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Música">Música</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Salud">Salud/Deporte</option>
                    <option value="Software">Software</option>
                    <option value="Telecom">Telecom</option>
                    <option value="Prensa">Prensa</option>
                    <option value="Otras">Otras</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Moneda</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-[var(--text-primary)] text-sm font-bold focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Método de Pago</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    name="paymentMethod"
                    placeholder="Ej. Tarjeta N26..."
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-2.5 pl-10 pr-4 text-[var(--text-primary)] text-sm font-bold shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isShared"
                    checked={formData.isShared}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-[var(--primary)] rounded-lg bg-[var(--bg-elevated)] border-[var(--border)] transition-all"
                  />
                  <span className="text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">Comparto este gasto con alguien</span>
                </label>
                {formData.isShared && (
                  <div className="mt-4 pl-8 animate-in slide-in-from-left-2">
                    <label className="block text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] mb-1.5 font-bold">Mi parte del pago</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-bold">€</span>
                      <input
                        type="number"
                        name="myShare"
                        step="0.01"
                        value={formData.myShare}
                        onChange={handleChange}
                        className="w-32 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 pl-7 pr-3 text-[var(--text-primary)] text-sm font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* NIVEL 3: MODO KILLER */}
        <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 shadow-sm ${showKiller ? 'border-[var(--primary)]/30 bg-[var(--primary)]/5' : 'border-[var(--border)] bg-[var(--bg-surface)]'}`}>
          <button
            type="button"
            onClick={() => setShowKiller(!showKiller)}
            className={`w-full flex items-center justify-between p-5 text-sm font-black transition-colors ${showKiller ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] px-5'}`}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" />
              <span>Modo <span className="text-[#F59E0B]">Killer</span> (Alertas y Bajas)</span>
            </div>
            {showKiller ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          {showKiller && (
            <div className="p-6 bg-slate-50 space-y-5 border-t border-indigo-600/20">
              <div className="pb-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isFreeTrial"
                    checked={formData.isFreeTrial}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-[var(--primary)] rounded-lg bg-[var(--bg-surface)] border-[var(--border)]"
                  />
                  <span className="text-sm font-black text-[var(--primary)]/80 group-hover:text-[var(--primary)]">Es un período de prueba (Free Trial)</span>
                </label>
                {formData.isFreeTrial && (
                  <div className="mt-4 pl-8 animate-in slide-in-from-left-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Fin de la prueba</label>
                    <input
                      type="date"
                      name="trialEndDate"
                      value={formData.trialEndDate}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-[var(--text-primary)] text-sm font-bold shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Preaviso (Días)</label>
                  <input
                    type="number"
                    name="alertDays"
                    value={formData.alertDays}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-sm font-bold focus:ring-2 focus:ring-[var(--primary)]/20 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">URL Cancelación</label>
                  <input
                    type="url"
                    name="cancelUrl"
                    value={formData.cancelUrl}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-sm font-bold focus:ring-2 focus:ring-[var(--primary)]/20 outline-none shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Notas del <span className="text-[#F59E0B]">Killer</span></label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Email de registro, recordatorios..."
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl py-3 px-4 text-[var(--text-primary)] text-sm resize-none font-medium focus:ring-2 focus:ring-[var(--primary)]/20 outline-none shadow-sm"
                ></textarea>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white font-black uppercase tracking-[0.2em] py-5 px-6 rounded-3xl shadow-xl shadow-[var(--primary)]/20 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm mb-4"
        >
          {initialData ? <>Actualizar Registro <span className="text-[#F59E0B]">Killer</span></> : <>Guardar Suscripción <span className="text-[#F59E0B]">Killer</span></>}
        </button>
      </form>
    </div>
  );
}
