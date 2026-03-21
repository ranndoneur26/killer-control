import React, { useState } from 'react';
import { User, Mail, Shield, Check, Loader2 } from 'lucide-react';

export default function PersonalDataSettings() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Killer User',
    email: 'user@killercontrol.app',
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
        <h2 className="text-xl font-black mb-1 text-[var(--text-primary)]">Personal Data</h2>
        <p className="text-sm text-[var(--text-secondary)] font-medium">Update your contact information and how you appear in the app.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 space-y-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl py-3.5 pl-12 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition font-bold shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl py-3.5 pl-12 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition font-bold shadow-inner"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-[#10B981] text-white' : 'bg-[var(--primary)] text-white hover:opacity-90 shadow-[var(--primary)]/20'
          }`}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : saved ? <><Check size={18} /> Changes saved</> : 'Update Profile'}
        </button>
      </form>

      <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 p-5 rounded-2xl flex gap-4 items-start shadow-sm">
        <Shield size={20} className="text-[var(--primary)] shrink-0 mt-1" />
        <div>
          <p className="text-sm text-[var(--text-primary)] font-bold mb-1">Data Privacy</p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">Your data is end-to-end encrypted. Only you can view your spending and subscription history.</p>
        </div>
      </div>
    </section>
  );
}