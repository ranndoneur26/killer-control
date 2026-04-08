import React, { useState } from 'react';
import { usePlan } from '../../hooks/usePlan';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useToast } from '../../hooks/useToast';
import { CreditCard, CheckCircle2, AlertTriangle, ExternalLink, Calendar, XCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * BillingSettings Component
 * Handles the "Zero Friction" cancellation and reactivation logic.
 */
export default function BillingSettings() {
  const { plan, isPremium, isCanceled, periodEnd, status, isOverLimit } = usePlan();
  const { profile } = useUserProfile(); // To get stripe IDs if needed
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  // MOCK: Simulate calling backend API to get Stripe Portal URL or Cancel
  const handleManageSubscription = async (action) => {
    setLoading(true);
    try {
      // In production: await api.post('/create-portal-session') -> window.location.href = url;
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (action === 'portal') {
        // Redirect to Stripe Customer Portal
        window.open('https://billing.stripe.com/p/login/test', '_blank'); // Demo link
        addToast('success', 'Opening Stripe Customer Portal...');
      } else if (action === 'reactivate') {
        // Call API to reactivate subscription
        addToast('success', 'Subscription reactivated successfully!');
        // Here we would optimistic update the UI or reload profile
      }
    } catch (error) {
      console.error(error);
      addToast('error', 'Could not access billing portal.');
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = periodEnd
    ? periodEnd.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Unknown';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* 1. Header & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h2 className="text-xl font-black text-[var(--text-primary)]">{t('profile.payment.title')}</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium mt-1">{t('profile.payment.subtitle')}</p>
        </div>
        <div className={`
          px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 w-fit
          ${isPremium
            ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700'}
        `}>
          {isPremium ? (
            <><CheckCircle2 size={16} /> <span translate="no" className="notranslate">Premium</span> {t('profile.payment.premium_label')}</>
          ) : (
            <><div className="w-2 h-2 rounded-full bg-gray-400" /> {t('profile.payment.freePlan')}</>
          )}
        </div>
      </div>

      {/* 2. Graceful Degradation Warning (The "Zombie Subs" case) */}
      {isOverLimit && !isPremium && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 flex gap-4 items-start">
          <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full text-red-600 dark:text-red-400 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-red-800 dark:text-red-200 mb-1">{t('profile.payment.limit_exceeded_title')}</h3>
            <p className="text-sm text-red-600 dark:text-red-300 font-medium leading-relaxed">
              {t('profile.payment.limit_exceeded_desc')}
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-3 text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition shadow-sm"
            >
              {t('profile.payment.restore_access')}
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Content based on Plan */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <CreditCard size={200} />
        </div>

        {isPremium ? (
          /* ── PREMIUM STATE ── */
          <div className="relative z-10 space-y-6">

            {/* Cancellation "Grace Period" Banner */}
            {isCanceled ? (
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/50 rounded-2xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{t('profile.payment.cancel_scheduled')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1 leading-relaxed">
                      {t('profile.payment.cancel_grace_note', { date: formattedDate })}
                    </p>

                    <button
                      onClick={() => handleManageSubscription('reactivate')}
                      disabled={loading}
                      className="mt-4 flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
                    >
                      {loading ? <RefreshCw className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                      {t('profile.payment.reactivate_btn')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Premium State */
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{t('profile.payment.payment_method')}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">{t('profile.payment.next_billing', { date: formattedDate })}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-xl">
                  <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-[10px] text-gray-500">•••</div>
                  <span>•••• 4242</span>
                </div>
              </div>
            )}

            <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleManageSubscription('portal')}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-primary)] font-bold py-3 px-6 rounded-xl transition shadow-sm"
              >
                {t('profile.payment.billing_history')} <ExternalLink size={16} />
              </button>

              {!isCanceled && (
                <button
                  onClick={() => handleManageSubscription('portal')}
                  className="flex-1 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold py-3 px-6 rounded-xl transition"
                >
                  {t('profile.payment.cancel_sub')}
                </button>
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)] text-center mt-4">
              {t('profile.payment.stripe_redirect_note')}
            </p>
          </div>
        ) : (
          /* ── FREE STATE ── */
          <div className="relative z-10 text-center py-8">
            <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary)]">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">{t('profile.payment.upgradeTitle')}</h3>
            <p className="text-[var(--text-secondary)] font-medium max-w-md mx-auto mb-8">
              {t('profile.payment.upgradeDesc')}
            </p>

            <button
              onClick={() => navigate('/checkout?plan=premium-monthly')}
              className="bg-[var(--primary)] text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-[var(--primary)]/30 hover:scale-105 active:scale-95 transition-all w-full max-w-xs"
            >
              {t('profile.payment.startTrial')}
            </button>
          </div>
        )}
      </div>

      {/* 4. Data Safety Note */}
      <div className="flex items-start gap-3 px-4">
        <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
        <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
          <strong className="text-[var(--text-primary)]">{t('profile.payment.zeroFrictionLabel')}</strong> {t('profile.payment.zeroFrictionDesc')}
        </p>
      </div>
    </div>
  );
}
