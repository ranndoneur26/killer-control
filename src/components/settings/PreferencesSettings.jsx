import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import { usePlan } from '../../hooks/usePlan';
import { useToast } from '../../hooks/useToast';
import { DollarSign, Bell, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { PlanGate } from '../PlanGate';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PreferencesSettings() {
  const { profile, updateProfile } = useUserProfile();
  const { isPremium } = usePlan();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [currency, setCurrency] = useState('EUR');
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    monthlySummary: true,
    promoEnding: false,
    smartAnalysis: false,
  });

  // Sync state with profile preferences
  useEffect(() => {
    if (profile) {
      if (profile.currency) setCurrency(profile.currency);
      if (profile.preferences) setNotifications(prev => ({ ...prev, ...profile.preferences }));
    }
  }, [profile]);

  const handleCurrencyChange = async (e) => {
    const newVal = e.target.value;
    setCurrency(newVal);
    try {
      await updateProfile({ currency: newVal });
      addToast('success', t('profile.notifications.currencyUpdated', { val: newVal }));
    } catch (err) {
      addToast('error', t('profile.notifications.currencyError'));
    }
  };

  const handleToggle = async (key, value) => {
    const newPrefs = { ...notifications, [key]: value };
    setNotifications(newPrefs);
    try {
      await updateProfile({ preferences: newPrefs });
    } catch (err) {
      addToast('error', t('profile.notifications.preferenceError'));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-[var(--border)] pb-6">
        <h2 className="text-xl font-black text-[var(--text-primary)]">{t('profile.notifications.title')}</h2>
        <p className="text-sm text-[var(--text-secondary)] font-medium mt-1">{t('profile.notifications.subtitle')}</p>
      </div>

      <div className="grid gap-8 max-w-2xl">

        {/* Currency Selector */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[var(--bg-elevated)] p-2 rounded-lg text-[var(--primary)]">
              <DollarSign size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)]">{t('profile.notifications.currency')}</h3>
              <p className="text-xs text-[var(--text-secondary)]">{t('profile.notifications.currencyDesc')}</p>
            </div>
          </div>

          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all cursor-pointer"
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="JPY">Japanese Yen (¥)</option>
          </select>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-[var(--text-secondary)] text-sm uppercase tracking-wider ml-1">{t('profile.notifications.sectionTitle')}</h3>

          {/* Basic Toggle */}
          <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl">
            <div className="flex gap-3">
              <div className="mt-1 text-[var(--primary)]"><BarChart2 size={18} /></div>
              <div>
                <div className="font-bold text-sm text-[var(--text-primary)]">{t('profile.notifications.monthlySummary')}</div>
                <div className="text-xs text-[var(--text-secondary)]">{t('profile.notifications.monthlySummaryDesc')}</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications.monthlySummary} onChange={(e) => handleToggle('monthlySummary', e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--primary)] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>

          {/* Premium Toggles */}
          <PlanGate requires="premium" fallback={
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl opacity-60 grayscale pointer-events-none relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100/10 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded border border-amber-200 shadow-sm flex items-center gap-1 notranslate" translate="no"><AlertTriangle size={10} /> {t('profile.notifications.premiumOnly')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="mt-1"><TrendingUp size={18} /></div>
                  <div>
                    <div className="font-bold text-sm">{t('profile.notifications.smartAlerts')}</div>
                    <div className="text-xs">{t('profile.notifications.smartAlertsDesc')}</div>
                  </div>
                </div>
                <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          }>
            <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl">
              <div className="flex gap-3">
                <div className="mt-1 text-amber-500"><TrendingUp size={18} /></div>
                <div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{t('profile.notifications.smartAlerts')}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t('profile.notifications.smartAlertsDesc')}</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notifications.priceAlerts} onChange={(e) => handleToggle('priceAlerts', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--primary)] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary)]"></div>
              </label>
            </div>
          </PlanGate>

        </div>
      </div>
    </div>
  );
}
