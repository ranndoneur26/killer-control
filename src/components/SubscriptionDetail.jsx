import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Trash2, Calendar, CreditCard, ShieldAlert, Sparkles, TrendingUp, Check, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import SubscriptionForm from './SubscriptionForm';
import HeroHeader from './HeroHeader';
import { useLanguage } from '../contexts/LanguageContext';

// Mock data until DB is connected
const mockHistoryData = [
  { month: 'Jan', price: 12.99 },
  { month: 'Feb', price: 12.99 },
  { month: 'Mar', price: 15.99 }, // Price hike detected
  { month: 'Apr', price: 15.99 },
  { month: 'May', price: 15.99 },
];

export default function SubscriptionDetail() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // Setup dynamic mock data - one customised entry per category
  const MOCK_DATA = {
    // STREAMING - Netflix
    '1': {
      name: 'Netflix', price: 15.99, cycle: 'Monthly', webUrl: 'https://netflix.com',
      startDate: '2021-03-10', annualPrice: 191.88, category: 'streaming',
      card: 'Visa •••• 4242', color: 'bg-red-600', hikeDetected: true,
      planType: 'Premium', familySlots: 4, altPlanCost: 119.88,
      noticeDays: '3 Days before', currency: 'EUR (€)', nextChargeDate: '2026-05-14'
    },
    // MUSIC - Spotify
    '2': {
      name: 'Spotify', price: 10.99, cycle: 'Monthly', webUrl: 'https://spotify.com',
      startDate: '2020-07-15', annualPrice: 131.88, category: 'music',
      card: 'Mastercard •••• 8810', color: 'bg-green-600', hikeDetected: false,
      planType: 'Individual Premium', familySlots: 1, altPlanCost: 99.99,
      noticeDays: '3 Days before', currency: 'EUR (€)', nextChargeDate: '2026-05-12'
    },
    // GAMING - Xbox Game Pass
    '3': {
      name: 'Xbox Game Pass', price: 14.99, cycle: 'Monthly', webUrl: 'https://xbox.com',
      startDate: '2023-01-01', annualPrice: 179.88, category: 'gaming',
      card: 'Visa •••• 4242', color: 'bg-green-500', hikeDetected: false,
      planType: 'Ultimate', familySlots: 1, altPlanCost: 129.99,
      noticeDays: '1 Day before', currency: 'EUR (€)', nextChargeDate: '2026-05-15'
    },
    // HEALTH - Seguro Dental
    '4': {
      name: 'Sanitas Dental Insurance', price: 18.50, cycle: '28 Days', webUrl: 'https://sanitas.es',
      startDate: '2025-12-01', annualPrice: 240.50, category: 'health',
      card: 'Bank Account ES12', color: 'bg-blue-400', hikeDetected: false,
      permanenceEnd: '2026-12-01',
      noticeDays: '7 Days before', currency: 'EUR (€)', nextChargeDate: '2026-05-25'
    },
    // TELECOM - Movistar
    '5': {
      name: 'Movistar Fusion+', price: 65.00, cycle: 'Monthly', webUrl: 'https://movistar.es',
      startDate: '2024-03-01', annualPrice: 780.00, category: 'telecom',
      card: 'Bank Debit BBVA', color: 'bg-blue-600', hikeDetected: true,
      permanenceEnd: '2026-03-01', packServices: 'Fiber 1Gb + 2 Mobile Lines + TV',
      noticeDays: '7 Days before', currency: 'EUR (€)', nextChargeDate: '2026-06-01'
    },
    // PRESS - New York Times
    '6': {
      name: 'The New York Times', price: 1.00, cycle: 'Monthly', webUrl: 'https://nytimes.com',
      startDate: '2026-01-01', annualPrice: 12.00, category: 'press',
      card: 'PayPal', color: 'bg-gray-700', hikeDetected: false,
      isPromo: true, postPromoPrice: 15.99, promoEnd: '2026-07-01',
      noticeDays: '3 Days before', currency: 'USD ($)', nextChargeDate: '2026-06-01'
    },
    // OTHER - Gestor de Contraseñas
    '7': {
      name: 'Password Manager', price: 2.99, cycle: 'Monthly', webUrl: 'https://bitwarden.com',
      startDate: '2025-06-01', annualPrice: 35.88, category: 'other',
      card: 'Visa •••• 4242', color: 'bg-gray-600', hikeDetected: false,
      noticeDays: '3 Days before', currency: 'EUR (€)', nextChargeDate: '2026-06-10'
    },
  };

  const initialMock = MOCK_DATA[id] || MOCK_DATA['1'];
  const [subData, setSubData] = useState(initialMock);

  // Update mock if URL id changes (useful during testing)
  useEffect(() => {
    if (MOCK_DATA[id]) {
      setSubData(MOCK_DATA[id]);
    }
  }, [id]);

  const handleSave = () => {
    // Save to DB...
    setIsEditing(false);
  };

  const categoryName = subData.category === 'streaming' ? t('categories.entertainment') :
    subData.category === 'music' ? t('categories.music') :
      subData.category === 'gaming' ? t('categories.gaming') :
        subData.category === 'health' ? t('categories.health') :
          subData.category === 'telecom' ? t('categories.telecom') :
            subData.category === 'press' ? t('categories.press') :
              subData.category === 'other' ? t('categories.other') : subData.category;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] flex flex-col">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto pb-24 pt-20 flex-1">

        {/* Header Actions */}
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => isEditing ? setIsEditing(false) : navigate(-1)} className="p-2 -ml-2 hover:bg-[var(--bg-surface)] rounded-xl transition text-[var(--text-secondary)]">
            {isEditing ? <X size={24} /> : <ArrowLeft size={24} />}
          </button>

          <div className="flex gap-2">
            {isEditing ? (
              <button onClick={handleSave} className="px-4 py-2 bg-[var(--primary)] text-white font-black rounded-xl flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-[var(--primary)]/20">
                <Check size={18} /> {t('login.continue')}
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="p-2 bg-[var(--bg-surface)] border border-[var(--border)] hover:bg-[var(--bg-elevated)] rounded-xl transition text-[var(--text-secondary)] shadow-sm">
                <Edit3 size={20} />
              </button>
            )}
          </div>
        </header>

        {isEditing ? (
          // --- EDIT MODE (Unified Form) ---
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-10">
            <SubscriptionForm
              initialData={subData}
              onSave={(formData) => {
                setSubData({ ...subData, ...formData });
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
              title={<span dangerouslySetInnerHTML={{ __html: t('subscription_detail.edit_title') }}></span>}
            />
          </motion.div>
        ) : (
          // --- READ ONLY MODE ---
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Hero Info */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className={`w-24 h-24 rounded-3xl ${subData.color} flex items-center justify-center text-white text-3xl font-black shadow-xl mb-4 border-4 border-[var(--bg)]`}>
                {subData.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-black mb-1 text-[var(--text-primary)]">{subData.name}</h1>
              <div className="text-[var(--primary)] font-black bg-[var(--primary)]/10 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border border-[var(--primary)]/10">
                {categoryName}
              </div>
            </div>

            {/* Price Big KPI */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 mb-8 flex justify-between items-end relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-[0.05] text-[var(--primary)]">
                <CreditCard size={80} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-[var(--text-secondary)] font-black uppercase tracking-widest mb-2">{t('subscription_detail.current_spend')}</p>
                <div className="text-5xl font-black text-[var(--text-primary)] tracking-tight">{subData.price}€<span className="text-lg text-[var(--text-secondary)] font-medium ml-1">/{subData.cycle.toLowerCase() === 'annual' ? t('pricing.premium_annual').split(' ')[0].toLowerCase() : 'mo'}</span></div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-tighter mb-1">{t('subscription_detail.annual_projected')}</p>
                <p className="font-black text-[#10B981] text-lg">{subData.annualPrice}€</p>
              </div>
            </div>

            {/* Intelligent Insights (Dark Pattern detection) */}
            {subData.hikeDetected && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 flex gap-4 items-start shadow-sm">
                <ShieldAlert size={24} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-amber-500 text-sm mb-1 uppercase tracking-tight">{t('subscription_detail.alert_title')}</h4>
                  <p className="text-sm text-amber-200/80 mb-3 font-medium">{t('subscription_detail.alert_desc')}</p>
                  <button
                    onClick={() => navigate(`/alternatives/${id}`)}
                    className="bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-amber-700 transition shadow-md shadow-amber-900/20"
                  >
                    {t('subscription_detail.see_alternatives')}
                  </button>
                </div>
              </div>
            )}

            {/* Vibe Chart */}
            <div className="mb-8">
              <h3 className="font-black text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-[var(--primary)]" /> {t('subscription_detail.cost_history')}
              </h3>
              <div className="h-40 w-full ml-[-1rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockHistoryData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)' }}
                      itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                    />
                    <Area type="stepAfter" dataKey="price" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-4 mb-10">
              {subData.webUrl && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <span className="font-black text-xs uppercase tracking-widest">Web</span>
                  </div>
                  <a
                    href={subData.webUrl.startsWith('http') ? subData.webUrl : `https://${subData.webUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black text-[var(--primary)] text-sm hover:underline block truncate max-w-[200px] text-right"
                  >
                    {subData.webUrl.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              )}
              {subData.startDate && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Calendar size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.since')}</span>
                  </div>
                  <span className="font-black text-[var(--text-primary)] text-sm block">{new Date(subData.startDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Calendar size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.next_charge')}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-[var(--text-primary)] text-sm block">{new Date(subData.nextChargeDate).toLocaleDateString()}</span>
                  <span className="text-[10px] font-black uppercase text-[var(--primary)]">{subData.noticeDays}</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CreditCard size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.payment_method')}</span>
                </div>
                <span className="font-black text-[var(--text-primary)] text-sm">{subData.card}</span>
              </div>
              {/* Dynamic Read-only Fields */}
              {(subData.category === 'streaming' || subData.category === 'music' || subData.category === 'gaming') && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Sparkles size={18} className="text-[var(--primary)]" />
                    <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.plan')}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[var(--text-primary)] text-sm block">{subData.planType || 'Standard'}</span>
                    <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-tighter">{subData.familySlots || 1} {t('subscription_detail.profiles')}</span>
                  </div>
                </div>
              )}

              {subData.category === 'health' && subData.permanenceEnd && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-red-400">
                    <ShieldAlert size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.lock_in_end')}</span>
                  </div>
                  <span className="font-black text-[var(--text-primary)] text-sm">{new Date(subData.permanenceEnd).toLocaleDateString()}</span>
                </div>
              )}

              {subData.category === 'press' && subData.isPromo && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Sparkles size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.active_promo')}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#0F172A] text-sm block">{t('subscription_detail.until')} {new Date(subData.promoEnd).toLocaleDateString()}</span>
                    <span className="text-[10px] font-black text-[#EF4444] uppercase tracking-tighter">{t('subscription_detail.then')} {subData.postPromoPrice}€</span>
                  </div>
                </div>
              )}

              {subData.category === 'telecom' && (
                <>
                  <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                      <ShieldAlert size={18} />
                      <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.lock_in_period')}</span>
                    </div>
                    <span className="font-black text-[var(--text-primary)] text-sm">{subData.permanenceEnd ? new Date(subData.permanenceEnd).toLocaleDateString() : t('subscription_detail.no_lock_in')}</span>
                  </div>
                  {subData.packServices && (
                    <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                      <div className="flex items-center gap-3 text-[var(--text-secondary)] w-1/3">
                        <Sparkles size={18} className="text-[var(--primary)]" />
                        <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.pack')}</span>
                      </div>
                      <span className="text-sm font-black text-right text-[var(--text-secondary)] truncate w-2/3">{subData.packServices}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Killer Action */}
            <button
              onClick={() => navigate(`/guide/${id}`)}
              className="w-full bg-red-950/20 text-red-400 border border-red-900/30 font-black uppercase tracking-widest rounded-3xl py-4 flex items-center justify-center gap-2 hover:bg-red-900 hover:text-white transition shadow-sm"
            >
              <Trash2 size={20} /> {t('subscription_detail.cancel_btn')}
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}