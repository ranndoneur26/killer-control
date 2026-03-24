import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { addSubscription } from '../lib/db';
import { ArrowLeft, Search, Plus, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import SubscriptionForm from './SubscriptionForm';
import { useToast } from '../hooks/useToast';
import HeroHeader from './HeroHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePlan } from '../hooks/usePlan';
import { useSubscriptions } from '../hooks/useSubscriptions';

export default function AddSubscription() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [initialData, setInitialData] = useState(null);
  const { t } = useLanguage();

  const { canAddSubscription, limits } = usePlan();
  const { count } = useSubscriptions();
  const canAdd = canAddSubscription(count);

  const POPULAR_SERVICES = [
    { id: 'netflix', name: 'Netflix', color: 'bg-[#E50914]', category: 'streaming' },
    { id: 'spotify', name: 'Spotify', color: 'bg-[#1DB954]', category: 'music' },
    { id: 'prime', name: 'Amazon Prime', color: 'bg-[#00A8E1]', category: 'streaming' },
    { id: 'hbo', name: 'HBO Max', color: 'bg-[#510091]', category: 'streaming' },
    { id: 'gym', name: t('add.gym'), color: 'bg-gray-700', category: 'health' },
    { id: 'icloud', name: 'Apple iCloud', color: 'bg-[#0070c9]', category: 'other' },
  ];

  const handleSelectService = (service) => {
    setInitialData({
      name: service.id === 'custom' ? '' : service.name,
      category: service.category || 'streaming'
    });
    setStep(2);
  };



  const handleSave = async (formData) => {
    try {
      if (!auth.currentUser) {
        addToast('error', "User not authenticated");
        return;
      }

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

      await addSubscription(auth.currentUser.uid, mappedData);

      addToast('success', t('form.save_btn') + `: ${formData.name}`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Error saving subscription:", error);
      addToast('error', "Could not save subscription");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1E] text-gray-900 dark:text-gray-50 flex flex-col pb-28">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto pt-20 flex-1">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => {
            if (step === 2) setStep(1);
            else navigate(-1);
          }} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-[#1a2035] rounded-xl transition text-gray-600 dark:text-gray-300">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            {step === 1 ? t('add.title') : t('add.form_title')}
          </h1>
        </header>

        {step === 1 && (
          <div className="animate-in fade-in">
            {!canAdd && (
              <div className="mb-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-[2rem] p-6 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
                    <Lock size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{t('add.limit_title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-medium">
                    {t('add.limit_desc', { count: limits.maxSubscriptions })}
                  </p>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
                  >
                    {t('add.unlock_btn')}
                  </button>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              </div>
            )}

            <div className={`relative mb-8 ${!canAdd ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              <input
                type="text"
                placeholder={t('add.search_placeholder')}
                disabled={!canAdd}
                className="w-full bg-gray-100 dark:bg-[#1a2035] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-[2rem] py-4 px-6 pr-12 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition placeholder-gray-400 dark:placeholder-gray-600 font-bold"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            </div>

            <h3 className={`text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-[10px] mb-4 ml-2 ${!canAdd ? 'opacity-50' : ''}`}>{t('add.popular')}</h3>
            <div className={`grid grid-cols-2 gap-4 mb-8 ${!canAdd ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              {POPULAR_SERVICES.map(service => (
                <button
                  key={service.id}
                  disabled={!canAdd}
                  onClick={() => handleSelectService(service)}
                  className="bg-gray-50 dark:bg-[#1a2035] border border-gray-200 dark:border-gray-700 p-5 rounded-[2rem] flex items-center gap-4 hover:border-[var(--primary)]/50 transition-all shadow-sm hover:shadow-md group text-gray-700 dark:text-gray-200"
                >
                  <div className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {service.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm truncate">{service.name}</span>
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-4 py-6 ${!canAdd ? 'opacity-50' : ''}`}>
              <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{t('add.or')}</span>
              <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
            </div>

            <button
              onClick={() => handleSelectService({ id: 'custom', name: t('add.custom_service_name'), color: 'bg-[var(--primary)]', category: 'other' })}
              disabled={!canAdd}
              className={`w-full mt-4 bg-gray-50 dark:bg-[#1a2035] border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-black uppercase tracking-[0.2em] rounded-[2rem] py-5 flex items-center justify-center gap-3 hover:border-[var(--primary)]/50 transition-all shadow-xl ${!canAdd ? 'opacity-50 pointer-events-none grayscale' : ''}`}
            >
              <Plus size={20} className="text-[var(--primary)]" />
              {t('add.custom_button')}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4">
            <SubscriptionForm
              initialData={initialData}
              onSave={handleSave}
              onCancel={() => setStep(1)}
              title={<>{t('add.form_title')}</>}
            />
          </div>
        )}

      </div>
      <Navigation />
    </div>
  );
}
