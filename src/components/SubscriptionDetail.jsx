import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Trash2, Calendar, CreditCard, ShieldAlert, Sparkles, TrendingUp, Check, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import SubscriptionForm from './SubscriptionForm';
import HeroHeader from './HeroHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { auth } from '../lib/firebase';
import { updateSubscription, deleteSubscription } from '../lib/db';
import { useToast } from '../hooks/useToast';

export default function SubscriptionDetail() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { addToast } = useToast();

  const { subscriptions: firebaseSubs, loading } = useSubscriptions();
  const initialData = firebaseSubs.find(s => s.id === id);
  const [subData, setSubData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setSubData(initialData);
    }
  }, [initialData]);

  const handleSave = async (formData) => {
    try {
      if (!auth.currentUser) return;

      const mappedData = {
        nombre: formData.name,
        precio: Number(formData.price),
        ciclo: formData.cycle,
        proximo_cobro: formData.nextBillingDate,
        categoria: formData.category,
        moneda: formData.currency,
        metodo_pago: formData.paymentMethod,
        compartido: formData.isShared,
        es_prueba_gratuita: formData.isFreeTrial,
        preaviso_dias: Number(formData.alertDays) || 3,
        cancelacion_url: formData.cancelUrl,
        notas: formData.notes
      };

      await updateSubscription(auth.currentUser.uid, id, mappedData);
      setIsEditing(false);
      addToast('success', t('form.save_btn') + "!");
    } catch (error) {
      console.error("Error updating subscription:", error);
      addToast('error', "Could not update subscription");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await deleteSubscription(auth.currentUser.uid, id);
        addToast('success', "Subscription deleted");
        navigate('/subscriptions');
      } catch (error) {
        console.error("Error deleting subscription:", error);
        addToast('error', "Could not delete subscription");
      }
    }
  };

  if (loading || !subData) {
    return <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6 text-[var(--text-primary)]">{t('login.continue')}...</div>;
  }

  const categoryName = subData.categoria?.toLowerCase() === 'streaming' ? t('categories.entertainment') :
    subData.categoria?.toLowerCase() === 'music' ? t('categories.music') :
      subData.categoria?.toLowerCase() === 'gaming' ? t('categories.gaming') :
        subData.categoria?.toLowerCase() === 'health' ? t('categories.health') :
          subData.categoria?.toLowerCase() === 'telecom' ? t('categories.telecom') :
            subData.categoria?.toLowerCase() === 'press' ? t('categories.press') :
              subData.categoria?.toLowerCase() === 'other' ? t('categories.other') : subData.categoria;

  // Chart data fallback safely extracting from Firebase true history, or defaulting to an empty array to prevent crashes
  const historyData = Array.isArray(subData.costHistory)
    ? subData.costHistory
    : Array.isArray(subData.historial)
      ? subData.historial
      : [];

  // Prepare data format for the Form component
  const formInitialData = {
    name: subData.nombre,
    price: subData.precio,
    cycle: subData.ciclo,
    nextBillingDate: subData.proximo_cobro,
    category: subData.categoria,
    currency: subData.moneda,
    paymentMethod: subData.metodo_pago,
    isShared: subData.compartido,
    isFreeTrial: subData.es_prueba_gratuita,
    alertDays: subData.preaviso_dias?.toString(),
    cancelUrl: subData.cancelacion_url,
    notes: subData.notas,
  };

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
              initialData={formInitialData}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
              title={<span dangerouslySetInnerHTML={{ __html: t('subscription_detail.edit_title') }}></span>}
            />
          </motion.div>
        ) : (
          // --- READ ONLY MODE ---
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Hero Info */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className={`w-24 h-24 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] text-3xl font-black shadow-xl mb-4`}>
                {subData.nombre?.charAt(0) || '?'}
              </div>
              <h1 className="text-3xl font-black mb-1 text-[var(--text-primary)]">{subData.nombre}</h1>
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
                <div className="text-5xl font-black text-[var(--text-primary)] tracking-tight">{subData.precio}€<span className="text-lg text-[var(--text-secondary)] font-medium ml-1">/{subData.ciclo?.toLowerCase() === 'annual' ? t('pricing.premium_annual').split(' ')[0].toLowerCase() : 'mo'}</span></div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-tighter mb-1">{t('subscription_detail.annual_projected')}</p>
                <p className="font-black text-[#10B981] text-lg">{(subData.precio * 12).toFixed(2)}€</p>
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
                  <AreaChart data={historyData}>
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
              {subData.cancelacion_url && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <span className="font-black text-xs uppercase tracking-widest">Web</span>
                  </div>
                  <a
                    href={subData.cancelacion_url.startsWith('http') ? subData.cancelacion_url : `https://${subData.cancelacion_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black text-[var(--primary)] text-sm hover:underline block truncate max-w-[200px] text-right"
                  >
                    {subData.cancelacion_url.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              )}
              {subData.creado_en && (
                <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Calendar size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.since')}</span>
                  </div>
                  <span className="font-black text-[var(--text-primary)] text-sm block">{subData.creado_en.toDate ? subData.creado_en.toDate().toLocaleDateString() : new Date(subData.creado_en).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Calendar size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.next_charge')}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-[var(--text-primary)] text-sm block">{subData.proximo_cobro ? new Date(subData.proximo_cobro).toLocaleDateString() : 'N/A'}</span>
                  <span className="text-[10px] font-black uppercase text-[var(--primary)]">{subData.preaviso_dias || 3} días antes</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CreditCard size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">{t('subscription_detail.payment_method')}</span>
                </div>
                <span className="font-black text-[var(--text-primary)] text-sm">{subData.metodo_pago || 'N/A'}</span>
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

            <button
              onClick={handleDelete}
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