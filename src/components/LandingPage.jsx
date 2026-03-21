import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  TrendingUp, 
  Timer, 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  ArrowRight,
  CreditCard,
  Clock,
  Zap,
  Star,
  Plus,
  PlayCircle,
  Gem,
  XCircle,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import HeroHeader from './HeroHeader';
import HeroCopy from './HeroCopy';
import HeroSlider from './HeroSlider';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import CookiesModal from './CookiesModal';
import LegalNoticeModal from './LegalNoticeModal';
import ContactModal from './ContactModal';
import DemoModal from './DemoModal';
import CookieConsent from './CookieConsent';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(0); // Open first by default
  const { t } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqIcons = [Zap, Gem, XCircle, CreditCard, Search];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#4F46E5]/10 transition-colors duration-500">
      <HeroHeader />

      {/* ─── Hero Section ─────────────────────────────── */}
      <section className="pt-32 pb-20 overflow-hidden bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <HeroCopy 
                onStart={() => navigate('/signup?plan=free')} 
                onDemo={() => setShowDemo(true)} 
              />
            </motion.div>


            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <HeroSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Problem Section ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Pagas más de lo que imaginas cada mes.</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">Suscripciones olvidadas, subidas de precio ocultas y promociones que caducan sin avisar… poco a poco vacían tu cuenta.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock size={48} />, title: "Servicios olvidados", text: "Esa app que probaste una vez, pero que sigues pagando cada mes sin darte cuenta." },
              { icon: <TrendingUp size={48} />, title: "Subidas silenciosas", text: "Pequeños aumentos de precio escondidos en un correo que nunca leíste." },
              { icon: <Timer size={48} />, title: "Promociones que caducan", text: "El mes gratis que, de repente, se convierte en una cuota anual." },
              { icon: <CreditCard size={48} />, title: "Goteos invisibles", text: "Pagos de 5 € o 10 € que, sumados, cuestan cientos de euros al año." }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 text-amber-500">{card.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-[#0F172A]">{card.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed font-medium">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Solution Section ─────────────────────────────── */}
      <section id="features" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-16">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-4xl font-bold text-[#0F172A] mb-6"><span className="text-[#F59E0B]">Killer</span> Control lo vigila por ti</h2>
              <p className="text-lg text-[#64748B] mb-10">La app que te avisa cuando una suscripción merece tu atención, para que tú solo decidas.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Avisos de fin de promoción", text: "No vuelvas a pagar el precio completo por despiste." },
                  { title: "Próximos cargos centralizados", text: "Una vista única para saber qué se cobra mañana, la semana que viene o el próximo mes." },
                  { title: "Recomendaciones de ahorro", text: "Descubre alternativas más baratas o planes compartidos que te convengan." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{item.title}</h4>
                      <p className="text-[#64748B] text-sm font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative px-4 sm:px-0">
               <div className="bg-[#F8FAFC] rounded-[2.5rem] p-8 lg:p-12 relative z-10 shadow-xl overflow-hidden border border-[#E2E8F0]">
                  <div className="mb-8">
                    <h3 className="text-[#0F172A] text-xl font-bold mb-2">Todo lo importante, en una sola vista</h3>
                    <p className="text-[#64748B] text-sm font-medium">Diseño refinado para que la información fluya sin ruido.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
                      <div className="text-[#64748B] text-[10px] font-bold uppercase mb-1">Ahorro Potencial</div>
                      <div className="text-2xl font-black text-[#10B981]">-32,00€</div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
                      <div className="text-[#64748B] text-[10px] font-bold uppercase mb-1">Próximo cobro</div>
                      <div className="text-lg font-bold text-[#0F172A]">Mañana</div>
                    </div>
                    <div className="col-span-2 bg-white p-6 rounded-[2rem] border border-[#E2E8F0] h-40 flex items-center justify-center shadow-inner">
                       <BarChart3 size={48} className="text-[#E2E8F0]" />
                    </div>
                  </div>
                  
                  {/* Decorative blobs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/5 filter blur-3xl rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/5 filter blur-3xl rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it Works ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Así de sencillo</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { num: "01", title: "Añade tus servicios", text: "Introduce tus suscripciones una a una o sincroniza tus facturas." },
              { num: "02", title: "Recibe alertas", text: "Deja que <span className=\"text-[#F59E0B]\">Killer</span> Control te avise con atelación por ti 24/7." },
              { num: "03", title: "Decide y ahorra", text: "Con toda la información en mano, elige qué mantener y qué cancelar." }
            ].map((step, i) => (
              <div key={i} className="relative group px-4">
                <div className="text-5xl font-black text-[#F59E0B] mb-6 transition-colors duration-500">{step.num}</div>
                <h3 className="text-xl font-bold mb-4 text-[#0F172A]">{step.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: step.text }}></p>
                {i < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 text-[#E2E8F0]">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Section ─────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-500 mb-4">Elige cómo empezar</h2>
            <p className="text-lg text-[#64748B] font-medium">Empieza gratis. Pásate a Premium cuando quieras más control.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center hover:border-[#CBD5E1] transition-colors">
              <span className="text-[#94A3B8] font-bold uppercase tracking-widest text-[10px] mb-4">Freemium</span>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-black text-[#0F172A]">0€</span>
                <span className="text-[#64748B] ml-2 font-medium">/mes</span>
              </div>
              <p className="text-[#64748B] mb-8 font-semibold">Empieza a controlar tus suscripciones sin coste.</p>
              
              <ul className="space-y-4 mb-10 w-full text-left">
                {["Hasta 3 suscripciones", "Vista mensual del gasto", "Recordatorios básicos", "Alertas limitadas", "Histórico de 3 meses"].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#64748B] font-medium">
                    <Check size={18} className="text-amber-500" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/signup?plan=free')} className="mt-auto w-full py-4 px-6 bg-white border border-[#E2E8F0] text-amber-500 rounded-2xl font-bold hover:bg-[#F8FAFC] transition-all">
                Empezar gratis
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#FFF8E1] p-10 rounded-[2.5rem] border-2 border-amber-500 shadow-xl relative overflow-hidden flex flex-col items-center text-center group translate-y-[-10px]">
              <div className="absolute top-0 right-0 bg-[#0F172A] text-white text-[10px] font-bold px-4 py-2 rounded-bl-2xl">MÁS ELEGIDO</div>
              
              <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-1">
                <ShieldCheck size={14} /> <span translate="no">Premium</span>
              </span>
              <div className="flex flex-col items-center mb-6">
                 <div className="flex items-baseline">
                    <span className="text-5xl font-black text-[#0F172A]">4,99€</span>
                    <span className="text-[#64748B] ml-2 font-medium">/mes</span>
                 </div>
                 <span className="text-amber-600 text-xs font-bold mt-2 px-3 py-1 bg-amber-100 rounded-full">Anual: 44,99€ (Ahorra 15€)</span>
              </div>
              <p className="text-[#64748B] mb-8 font-semibold">Para quienes quieren ahorrar de verdad.</p>
              
              <ul className="space-y-4 mb-10 w-full text-left">
                {["Suscripciones ilimitadas", "Subidas de precio en tiempo real", "Avisos de fin de promoción", "Informes CSV/PDF", "Soporte prioritario"].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#0F172A] font-semibold">
                    <Check size={18} className="text-amber-500" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/signup?plan=premium')} className="mt-auto w-full py-4 px-6 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30">
                Probar Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Javier M.", role: "Autónomo", quote: "He ahorrado casi 200€ al año tras detectar 3 aplicaciones que ya no usaba. La app es una pasada." },
              { name: "Laura S.", role: "Familia numerosa", quote: "Con tantas plataformas en casa ya no sabíamos ni lo que pagábamos. <span className=\"text-[#F59E0B]\">Killer</span> Control nos ha puesto orden." },
              { name: "Carlos P.", role: "Software Engineer", quote: "Me encantan las alertas de subidas de precio. Netflix me subió la cuota y me enteré al momento por la app." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm relative italic">
                 <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#F59E0B" className="text-[#F59E0B]" />)}
                 </div>
                 <p className="text-[#64748B] text-sm leading-relaxed mb-6 font-medium" dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }}></p>
                 <div className="not-italic flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-[#4F46E5] text-lg">{t.name[0]}</div>
                    <div>
                       <div className="font-bold text-[#0F172A] text-sm">{t.name}</div>
                       <div className="text-xs text-[#94A3B8] font-semibold">{t.role}</div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-[#0F0F1A] relative overflow-hidden">
        {/* Background Texture/Noise */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1A] to-[#1A1040] pointer-events-none"></div>

        <div className="max-w-[780px] mx-auto px-6 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-black text-center mb-12 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent tracking-tight">
            {t('faq.title')}
          </h2>
          
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((num, i) => {
              const Icon = faqIcons[i];
              const isActive = activeFAQ === i;
              
              return (
                <div 
                  key={i} 
                  className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/5 border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.15)] border-l-4 border-l-amber-500 border-t border-r border-b' 
                      : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] border-l border-l-transparent'
                  } backdrop-blur-md relative`}
                >
                  {/* Left Border Glow Animation */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 animate-pulse shadow-[0_0_15px_#F59E0B]"></div>
                  )}

                  <button 
                    onClick={() => toggleFAQ(i)}
                    className="w-full px-6 py-5 flex items-center justify-between cursor-pointer text-left relative z-10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-white'}`}>
                        {Icon && <Icon size={20} />}
                      </div>
                      <span className="text-white font-bold text-[17px] leading-snug">
                        {t(`faq.q${num}`)}
                      </span>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? 'bg-amber-500 border-amber-500 rotate-45' : 'bg-transparent group-hover:border-white/30'
                    }`}>
                      <Plus size={18} className="text-white" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div 
                          className="px-6 pb-6 pl-[60px] text-[#CBD5E1] text-[15px] leading-[1.7] font-medium"
                          dangerouslySetInnerHTML={{ __html: t(`faq.a${num}`) }}
                        >
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Empieza hoy a recuperar el control</h2>
                <p className="text-[#94A3B8] text-lg mb-10 max-w-2xl mx-auto font-medium">Lo que no controlas, lo sigues pagando. Empieza gratis en menos de un minuto.</p>
                <button onClick={() => navigate('/signup?plan=free')} className="px-12 py-5 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-900/40">
                  Crear cuenta gratis
                </button>
             </div>
             
             {/* Decorative grid */}
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#4F46E5]/10 filter blur-3xl rounded-full"></div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#10B981]/10 filter blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────── */}
      <footer className="py-20 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] text-center md:text-left mb-12">
              <div className="flex flex-col gap-3">
                <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">Legal</span>
                <button onClick={() => setShowLegal(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">Aviso Legal</button>
                <button onClick={() => setShowPrivacy(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">Privacidad</button>
                <button onClick={() => setShowTerms(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">Términos</button>
                <button onClick={() => setShowCookies(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">Cookies</button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">Soporte</span>
                <button onClick={() => setShowContact(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">Contacto</button>
                <a href="mailto:soporte@killercontrol.app" className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">Email</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">Explorar</span>
                <a href="#features" className="hover:text-[#4F46E5] transition-colors uppercase">Características</a>
                <a href="#pricing" className="hover:text-[#4F46E5] transition-colors uppercase">Precios</a>
                <a href="#faq" className="hover:text-[#4F46E5] transition-colors uppercase">FAQs</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">Marca</span>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="w-6 h-6 bg-[#4F46E5] rounded flex items-center justify-center">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-[#0F172A]"><span className="text-[#F59E0B]" translate="no">Killer</span> <span translate="no">Control</span></span>
                </div>
              </div>
           </div>
           
           <div className="pt-8 border-t border-[#f1f5f9] text-center text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              © 2026 <span className="text-[#F59E0B]" translate="no">Killer</span> <span translate="no">Control</span>. Your financial ally for subscriptions.
           </div>
        </div>
      </footer>

      {/* Modals */}
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <CookiesModal open={showCookies} onClose={() => setShowCookies(false)} />
      <LegalNoticeModal open={showLegal} onClose={() => setShowLegal(false)} />
      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
      <DemoModal open={showDemo} onClose={() => setShowDemo(false)} />
      
      {/* Cookie Consent Banner */}
      <CookieConsent onOpenPolicy={() => setShowCookies(true)} />
    </div>
  );
};

export default LandingPage;
