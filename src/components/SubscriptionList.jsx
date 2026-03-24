import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import HeroHeader from './HeroHeader';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Search, Filter, ChevronDown, Pencil,
  Tv, Music, Gamepad2, HeartPulse, Smartphone, Newspaper, MoreHorizontal
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', labelKey: 'categories.all', icon: Filter },
  { id: 'streaming', labelKey: 'categories.entertainment', icon: Tv },
  { id: 'music', labelKey: 'categories.music', icon: Music },
  { id: 'gaming', labelKey: 'categories.gaming', icon: Gamepad2 },
  { id: 'health', labelKey: 'categories.health', icon: HeartPulse },
  { id: 'telecom', labelKey: 'categories.telecom', icon: Smartphone },
  { id: 'press', labelKey: 'categories.press', icon: Newspaper },
  { id: 'other', labelKey: 'categories.other', icon: MoreHorizontal },
];

const MOCK_SUBSCRIPTIONS = [
  { id: 1, name: 'Netflix', price: 15.99, cycleKey: 'form.cycle_monthly', category: 'streaming', nextBillingKey: 'subscriptions.tomorrow', color: 'text-[#EF4444]' },
  { id: 2, name: 'Spotify', price: 10.99, cycleKey: 'form.cycle_monthly', category: 'music', nextBilling: '12 May', color: 'text-[#10B981]' },
  { id: 3, name: 'Xbox Game Pass', price: 14.99, cycleKey: 'form.cycle_monthly', category: 'gaming', nextBilling: '15 May', color: 'text-[#10B981]' },
  { id: 4, name: 'Sanitas Dental', price: 18.50, cycle: '28 Días', category: 'health', nextBilling: '25 May', color: 'text-[#4F46E5]' },
  { id: 5, name: 'Movistar Fusion+', price: 65.00, cycleKey: 'form.cycle_monthly', category: 'telecom', nextBilling: '01 Jun', color: 'text-[#4F46E5]' },
  { id: 6, name: 'The New York Times', price: 1.00, cycle: 'Promo', category: 'press', nextBilling: '01 Jun', color: 'text-[#64748B]' },
  { id: 7, name: 'Bitwarden', price: 2.99, cycleKey: 'form.cycle_monthly', category: 'other', nextBilling: '10 Jun', color: 'text-[#64748B]' },
];

const getCategoryIcon = (categoryId) => {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.icon : Tv;
};

import { useSubscriptions } from '../hooks/useSubscriptions';

export default function SubscriptionList() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.initialTab || 'all';

  const [activeTab, setActiveTab] = useState(initialCategory);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'price' | 'date' | 'name'

  const { subscriptions: firebaseSubs, loading } = useSubscriptions();

  const activeCategory = CATEGORIES.find(c => c.id === activeTab);

  const filteredSubs = firebaseSubs
    .filter(sub => (activeTab === 'all' || sub.categoria === activeTab.charAt(0).toUpperCase() + activeTab.slice(1) || sub.categoria === activeTab))
    .filter(sub => sub.nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return b.precio - a.precio;
      if (sortBy === 'name') return (a.nombre || '').localeCompare(b.nombre || '');
      // Example sorting by date; in real life parse timestamp
      return 0; // default order
    });

  const totalMonthly = filteredSubs.reduce((acc, s) => acc + (s.precio || 0), 0);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] pb-28">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black mb-1" dangerouslySetInnerHTML={{ __html: t('subscriptions.title') }}></h1>
            <p className="text-[var(--text-secondary)] text-sm font-medium">{t('subscriptions.subtitle')}</p>
          </div>
          <div className="group relative">
            <button
              onClick={() => navigate('/add')}
              className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <Pencil size={18} strokeWidth={3} />
            </button>
            <span className="absolute right-0 top-full mt-2 w-max bg-[var(--text-primary)] text-[var(--bg)] text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
              {t('subscriptions.add_tooltip')}
            </span>
          </div>
        </header>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('subscriptions.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 shadow-sm transition font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          </div>
          <button
            onClick={() => setSortBy(prev => prev === 'price' ? 'name' : 'price')}
            className={`w-12 h-12 bg-[var(--bg-surface)] border rounded-xl flex items-center justify-center transition shadow-sm ${sortBy !== 'date' ? 'text-[var(--primary)] border-[var(--primary)]' : 'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Total Indicator */}
        <div className="flex items-end justify-between mb-8 px-2">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em]">{t('subscriptions.total_projected')}</p>
            <p className="text-2xl font-black text-[var(--text-primary)]">{totalMonthly.toFixed(2)}€<span className="text-[var(--text-secondary)] text-xs ml-1 font-bold">/mes</span></p>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[var(--primary)] font-black uppercase tracking-widest hover:underline"
            >
              {t('subscriptions.clear')}
            </button>
          )}
        </div>

        {/* Modern Category Selector (Accordion) */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2rem] p-5 flex items-center justify-between group hover:border-[var(--primary)]/30 transition-all shadow-xl shadow-[var(--primary)]/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shadow-sm group-hover:scale-110 transition-transform">
                {activeCategory?.icon ? <activeCategory.icon size={26} /> : <Filter size={filterSize(26)} />}
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.25em] font-black text-[var(--text-muted)] mb-0.5">{t('subscriptions.filter_label')}</p>
                <p className="font-black text-xl text-[var(--text-primary)] tracking-tight">
                  {activeCategory ? t(activeCategory.labelKey) : t('categories.all')}
                </p>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center transition-all duration-300 ${isCategoryOpen ? 'rotate-180 bg-[var(--primary)] text-white border-transparent shadow-lg shadow-[var(--primary)]/20' : 'text-[var(--text-secondary)]'}`}>
              <ChevronDown size={22} />
            </div>
          </button>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-[calc(100%+12px)] left-0 right-0 z-20 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl shadow-black/50 p-6 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveTab(category.id);
                        setIsCategoryOpen(false);
                      }}
                      className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${activeTab === category.id
                        ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                        : 'bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--bg-elevated)]'
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === category.id ? 'bg-white/20' : 'bg-[var(--bg-surface)] border border-[var(--border)]'
                        }`}>
                        {category.icon ? <category.icon size={20} /> : <Filter size={20} />}
                      </div>
                      <span className="text-sm font-black tracking-tight">{t(category.labelKey)}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="py-20 text-center"><p>{t('login.continue')}...</p></div>
          ) : filteredSubs.length > 0 ? filteredSubs.map((sub, index) => {
            const Icon = getCategoryIcon(sub.categoria?.toLowerCase() || 'other');
            // Basic mapping for cycle and nextBilling for now
            const cycleText = sub.ciclo || 'Mensual';
            const billingText = sub.proximo_cobro || '---';

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/subscriptions/${sub.id}`)}
                className="bg-[var(--bg-surface)] flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--primary)] shadow-sm transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]`}>
                  <Icon size={24} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[var(--text-primary)] truncate">{sub.nombre}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mt-1 flex items-center gap-2">
                    <span>{cycleText}</span>
                    <span className="w-1 h-1 bg-[var(--border)] rounded-full"></span>
                    <span>{billingText}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-[var(--text-primary)] text-sm">{sub.precio} €</div>
                </div>
              </motion.div>
            )
          }) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl flex items-center justify-center mx-auto mb-4 opacity-50 shadow-sm">
                <Search size={32} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="text-lg font-black text-[var(--text-secondary)]">{t('subscriptions.no_results')}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1 font-medium">{t('subscriptions.no_results_desc')}</p>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}

function filterSize(size) {
  return size;
}
