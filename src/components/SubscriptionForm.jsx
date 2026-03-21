import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ShieldAlert, CreditCard, CalendarDays, Wallet, Sparkles } from 'lucide-react';

// Popular services mini-dictionary
const popularServices = [
  { name: 'Netflix', price: '15.99', category: 'Entertainment', cycle: 'Monthly', cancelUrl: 'https://www.netflix.com/cancelplan', currency: 'EUR' },
  { name: 'Spotify Premium', price: '10.99', category: 'Entertainment', cycle: 'Monthly', cancelUrl: 'https://www.spotify.com/account/cancel/', currency: 'EUR' },
  { name: 'Amazon Prime', price: '49.90', category: 'Home', cycle: 'Annual', cancelUrl: 'https://www.amazon.es/mc/pipeline/cancellation', currency: 'EUR' },
  { name: 'Adobe Creative Cloud', price: '60.49', category: 'Software', cycle: 'Monthly', cancelUrl: 'https://account.adobe.com/plans', currency: 'EUR' },
  { name: 'HBO Max', price: '9.99', category: 'Entertainment', cycle: 'Monthly', cancelUrl: 'https://play.hbomax.com/profile/settings', currency: 'EUR' },
  { name: 'Disney+', price: '8.99', category: 'Entertainment', cycle: 'Monthly', cancelUrl: 'https://www.disneyplus.com/account/cancel', currency: 'EUR' },
  { name: 'ChatGPT Plus', price: '20.00', category: 'Software', cycle: 'Monthly', cancelUrl: 'https://chat.openai.com/#settings', currency: 'USD' },
  { name: 'PlayStation Plus', price: '71.99', category: 'Gaming', cycle: 'Annual', cancelUrl: 'https://store.playstation.com/', currency: 'EUR' }
];

export default function SubscriptionForm({ initialData, onSave, onCancel, title = "Add Subscription" }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    cycle: initialData?.cycle || 'Monthly',
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

  // Progressive Disclosure States
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showKiller, setShowKiller] = useState(!!initialData?.cancelUrl || !!initialData?.webUrl);

  // Autocomplete States
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
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium">Search for a popular service or add it manually.</p>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="p-2 hover:bg-[var(--bg-elevated)] rounded-full transition text-[var(--text-secondary)]">
            <ChevronDown size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        
        {/* LEVEL 1: VITAL INFO */}
        <div className="space-y-4 bg-[var(--bg-elevated)] p-6 rounded-3xl border border-[var(--border)]">
          
          <div ref={wrapperRef} className="relative">
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Name *</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder="e.g. Netflix, Gym..."
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
                      <Sparkles className="w-3 h-3" /> Autocomplete
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Price *</label>
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
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Billing Cycle *</label>
              <select
                name="cycle"
                value={formData.cycle}
                onChange={handleChange}
                className="w-full h-[58px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl px-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] font-bold shadow-sm"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Semiannual">Semiannual</option>
                <option value="Annual">Annual</option>
                <option value="OneTime">One-Time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Next Charge *</label>
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

        {/* LEVEL 2: CONTROL DETAILS */}
        <div className="border border-[var(--border)] rounded-[2rem] overflow-hidden bg-[var(--bg-surface)] shadow-sm">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-5 text-sm font-black text-[var(--primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5" />
              <span><span className="text-[#F59E0B]">Killer</span> Control Details</span>
            </div>
            {showAdvanced ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          {showAdvanced && (
            <div className="p-6 bg-[var(--bg-elevated)] space-y-5 border-t border-[var(--border)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-[var(--text-primary)] text-sm font-bold focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                  >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Music">Music</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Home">Home</option>
                    <option value="Health">Health/Sport</option>
                    <option value="Software">Software</option>
                    <option value="Telecom">Telecom</option>
                    <option value="Press">Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Currency</label>
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
                <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Payment Method</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    name="paymentMethod"
                    placeholder="e.g. Visa 4242..."
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
                  <span className="text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">I split this cost with someone</span>
                </label>
                {formData.isShared && (
                  <div className="mt-4 pl-8 animate-in slide-in-from-left-2">
                    <label className="block text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] mb-1.5 font-bold">My Share</label>
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

        {/* LEVEL 3: KILLER MODE */}
        <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 shadow-sm ${showKiller ? 'border-[var(--primary)]/30 bg-[var(--primary)]/5' : 'border-[var(--border)] bg-[var(--bg-surface)]'}`}>
          <button
            type="button"
            onClick={() => setShowKiller(!showKiller)}
            className={`w-full flex items-center justify-between p-5 text-sm font-black transition-colors ${showKiller ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] px-5'}`}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" />
              <span><span className="text-[#F59E0B]">Killer</span> Mode (Alerts & Cancellations)</span>
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
                  <span className="text-sm font-black text-[var(--primary)]/80 group-hover:text-[var(--primary)]">It's a Free Trial</span>
                </label>
                {formData.isFreeTrial && (
                  <div className="mt-4 pl-8 animate-in slide-in-from-left-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Trial Ends</label>
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
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Notice (Days)</label>
                  <input
                    type="number"
                    name="alertDays"
                    value={formData.alertDays}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-sm font-bold focus:ring-2 focus:ring-[var(--primary)]/20 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Cancel URL</label>
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
                <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1"><span className="text-[#F59E0B]">Killer</span> Notes</label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Registration email, reminders..."
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
          {initialData ? <>Update <span className="text-[#F59E0B]">Killer</span> Record</> : <>Save <span className="text-[#F59E0B]">Killer</span> Subscription</>}
        </button>
      </form>
    </div>
  );
}