import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { ShieldCheck, Check, Lock, CreditCard, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';
import { PLANS, getPlanFromParam } from '../constants/plans';

// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const stripePromise = Promise.resolve(null); // Mock for compilation

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();

  const planParam = searchParams.get('plan');
  const initialPlan = getPlanFromParam(planParam);

  const [billingCycle, setBillingCycle] = useState(
    initialPlan === PLANS.PREMIUM_YEARLY ? 'yearly' : 'monthly'
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialPlan) {
      setBillingCycle(initialPlan === PLANS.PREMIUM_YEARLY ? 'yearly' : 'monthly');
    }
  }, [initialPlan]);

  const handleSubscribe = async () => {
    setLoading(true);
    addToast('success', 'Preparando el portal de pago seguro...');

    try {
      // In a real integration, you would call your backend here to create a Checkout Session
      // const response = await api.post('/create-checkout-session', { cycle: billingCycle });
      // const session = response.data;

      const stripe = await stripePromise;
      // const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

      // For this demonstration, we simulate the redirection
      await new Promise(resolve => setTimeout(resolve, 2000));

      addToast('success', '¡Suscripción Premium activada con éxito!');
      navigate('/dashboard');
    } catch (err) {
      addToast('error', 'Error al conectar con Stripe. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    sessionStorage.removeItem('selected_plan');
    navigate('/');
  };

  if (!initialPlan && !planParam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Plan no encontrado</h2>
          <p className="text-slate-500 mb-8">No hemos podido identificar qué plan quieres contratar. Por favor, vuelve a intentarlo desde la página principal.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} /> Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

        {/* Left Side: Summary */}
        <div className="bg-slate-900 p-8 md:p-12 text-white md:w-5/12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Killer Control</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">Plan Premium</h2>
            <div className="space-y-4 mb-8">
              {[
                "Suscripciones ilimitadas",
                "Alertas de precio en tiempo real",
                "Seguimiento de fin de promoción",
                "Soporte prioritario"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-amber-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Lock size={12} /> Encriptado y Seguro
            </div>
            <p className="text-xs text-slate-500">
              Tu pago es procesado de forma segura por Stripe. Puedes cancelar en cualquier momento.
            </p>
          </div>

          {/* Background decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 filter blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 filter blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Right Side: Payment */}
        <div className="p-8 md:p-12 md:w-7/12 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mejora a Premium</h1>
          <p className="text-gray-500 mb-8">Elige tu ciclo de facturación y empieza a ahorrar.</p>

          {/* Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8 self-start">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Anual <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wide">Ahorra 15€</span>
            </button>
          </div>

          {/* Price Display */}
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">
                {billingCycle === 'yearly' ? '44,99€' : '4,99€'}
              </span>
              <span className="text-gray-500 font-medium">
                /{billingCycle === 'yearly' ? 'año' : 'mes'}
              </span>
            </div>
            {billingCycle === 'yearly' && (
              <p className="text-sm text-green-600 font-medium mt-1">Eso son solo 3,75 €/mes (¡menos de 2 cafés al mes!)</p>
            )}
          </div>

          {/* Payment Button Placeholder */}
          <button
            onClick={handleSubscribe}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mb-4"
          >
            <CreditCard size={20} />
            {billingCycle === 'yearly' ? 'Pagar 44,99€ / año' : 'Pagar 4,99€ / mes'}
          </button>

          <button
            onClick={handleSkip}
            className="text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors self-center flex items-center gap-1"
          >
            Continuar con el plan Gratuito <ArrowRight size={14} />
          </button>

        </div>
      </div>
    </div>
  );
}
