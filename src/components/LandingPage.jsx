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
  PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import HeroHeader from './HeroHeader';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import CookiesModal from './CookiesModal';
import LegalNoticeModal from './LegalNoticeModal';
import ContactModal from './ContactModal';
import DemoModal from './DemoModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#4F46E5]/10 transition-colors duration-500">
      <HeroHeader />

      {/* ─── Hero Section ─────────────────────────────── */}
      <section className="pt-32 pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                <Zap size={14} fill="currentColor" />
                Nueva era en control de gastos
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] mb-6 leading-[1.1]">
                Controla tus suscripciones antes de que ellas <span className="text-[#4F46E5]">controlen tu cuenta</span>
              </h1>
              <p className="text-xl text-[#64748B] mb-10 leading-relaxed max-w-xl">
                Detecta subidas de precio, promociones que terminan y servicios que ya no compensan. Todo en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-10 py-4 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338CA] active:scale-95 transition-all shadow-lg shadow-indigo-100">
                  Empezar gratis
                </button>
                <button 
                  onClick={() => setShowDemo(true)} 
                  className="w-full sm:w-auto px-10 py-4 bg-white border border-[#E2E8F0] text-[#0F172A] font-bold rounded-2xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle size={18} className="text-[#4F46E5]" />
                  Ver demostración
                </button>
              </div>
              <p className="mt-4 text-sm text-[#94A3B8] font-medium ml-1">
                Sin tarjeta para empezar
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Dashboard Preview Mockup */}
              <div className="bg-black rounded-3xl p-4 shadow-2xl border-4 border-white/5 rotate-1 transform hover:rotate-0 transition-transform duration-500 scale-105 lg:scale-110">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">APP PREVIEW</div>
                </div>

                {/* KPI Card */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 mb-4 shadow-sm">
                  <div className="text-gray-500 text-[10px] font-black uppercase mb-1">Gasto Mensual</div>
                  <div className="text-2xl font-black text-white">124,50 €</div>
                  <div className="flex items-center gap-1 text-primary text-[10px] mt-1 font-black">
                    <TrendingUp size={10} /> -12.5% vs abril
                  </div>
                </div>

                {/* Alert Card */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-4">
                  <div className="flex gap-3">
                    <div className="text-red-500 mt-1"><Bell size={16} /></div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white font-bold text-xs">Netflix</span>
                        <span className="text-red-500 text-[8px] font-bold uppercase">Aumento de Precio</span>
                      </div>
                      <p className="text-[10px] text-gray-300 mt-1 leading-tight">Tu suscripción subirá de 14.99€ a 17.99€ el próximo mes.</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Próximos cargos</div>
                  <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-[10px] font-bold">S</div>
                      <span className="text-white text-xs font-medium">Spotify</span>
                    </div>
                    <span className="text-white text-xs font-bold">11.99€</span>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 -left-10 bg-[#111111] shadow-2xl rounded-2xl p-4 border border-white/5 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">Ahorro Mensual</div>
                    <div className="text-lg font-black text-white">45,20 €</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-[#111111] shadow-2xl rounded-2xl p-4 border border-white/5 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="font-black text-sm text-white">100% Bajo Control</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Problem Section ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Cada mes pagas más de lo que crees</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">Suscripciones olvidadas y subidas silenciosas que drenan tu cuenta poco a poco.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock size={24} />, title: "Servicios Olvidados", text: "Esa aplicación que usaste una vez y sigues pagando cada mes." },
              { icon: <TrendingUp size={24} />, title: "Subidas Silenciosas", text: "Aumentos de precio de los que apenas te informan por email." },
              { icon: <Timer size={24} />, title: "Promociones que caducan", text: "El mes gratis que se convierte en una cuota anual por sorpresa." },
              { icon: <CreditCard size={24} />, title: "Pequeños goteos", text: "Cuotas de 5€ o 10€ que sumadas suponen cientos de euros al año." }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 text-[#64748B]">{card.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-[#0F172A]">{card.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed font-medium">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Solution Section ─────────────────────────────── */}
      {/* ─── Solution Section ─────────────────────────────── */}
      <section id="features" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-16">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-4xl font-bold text-[#0F172A] mb-6"><span className="text-[#F59E0B]">Killer</span> Control lo vigila por ti</h2>
              <p className="text-lg text-[#64748B] mb-10">La app que te avisa cuando una suscripción merece tu atención, para que tú solo decidas.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Alertas de subidas de precio", text: "Te avisamos antes del cobro si tu plataforma ha subido la tarifa." },
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
              { num: "02", title: "Recibe alertas", text: "Deja que <span className=\"text-[#F59E0B]\">Killer</span> Control vigile precios y promociones por ti 24/7." },
              { num: "03", title: "Decide y ahorra", text: "Con toda la información en mano, elige qué mantener y qué cancelar." }
            ].map((step, i) => (
              <div key={i} className="relative group px-4">
                <div className="text-5xl font-black text-[#E2E8F0] mb-6 group-hover:text-[#4F46E5]/10 transition-colors duration-500">{step.num}</div>
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
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Elige cómo empezar</h2>
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
                {["Hasta 5 suscripciones", "Vista mensual del gasto", "Recordatorios básicos", "Alertas limitadas", "Histórico de 3 meses"].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#64748B] font-medium">
                    <Check size={18} className="text-[#4F46E5]" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/login')} className="mt-auto w-full py-4 px-6 bg-white border border-[#E2E8F0] text-[#4F46E5] rounded-2xl font-bold hover:bg-[#F8FAFC] transition-all">
                Empezar gratis
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#EEF2FF] p-10 rounded-[2.5rem] border-2 border-[#4F46E5] shadow-xl relative overflow-hidden flex flex-col items-center text-center group translate-y-[-10px]">
              <div className="absolute top-0 right-0 bg-[#0F172A] text-white text-[10px] font-bold px-4 py-2 rounded-bl-2xl">MÁS ELEGIDO</div>
              
              <span className="text-[#4F46E5] font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-1">
                <ShieldCheck size={14} /> <span translate="no">Premium</span>
              </span>
              <div className="flex flex-col items-center mb-6">
                 <div className="flex items-baseline">
                    <span className="text-5xl font-black text-[#0F172A]">4,99€</span>
                    <span className="text-[#64748B] ml-2 font-medium">/mes</span>
                 </div>
                 <span className="text-[#10B981] text-xs font-bold mt-2 px-3 py-1 bg-[#ECFDF5] rounded-full">Anual: 44,99€ (Ahorra 15€)</span>
              </div>
              <p className="text-[#64748B] mb-8 font-semibold">Para quienes quieren ahorrar de verdad.</p>
              
              <ul className="space-y-4 mb-10 w-full text-left">
                {["Suscripciones ilimitadas", "Alertas inteligentes Pro", "Subidas de precio en tiempo real", "Avisos de fin de promoción", "Recomendaciones de IA", "Informes CSV/PDF", "Soporte prioritario"].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#0F172A] font-semibold">
                    <Check size={18} className="text-[#4F46E5]" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/login')} className="mt-auto w-full py-4 px-6 bg-[#4F46E5] text-white rounded-2xl font-bold hover:bg-[#4338CA] transition-all shadow-lg shadow-indigo-100">
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

      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F172A]">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: "¿Puedo usar <span className=\"text-[#F59E0B]\">Killer</span> Control gratis?", a: "Sí, el plan gratuito permite gestionar hasta 5 suscripciones con alertas básicas. Es perfecto para empezar." },
              { q: "¿Qué incluye Premium?", a: "Suscripciones ilimitadas, alertas inteligentes en tiempo real, histórico completo de precios, recomendaciones avanzadas de ahorro y exportación de datos." },
              { q: "¿Puedo cancelar cuando quiera?", a: "Totalmente. No hay permanencias en ningún plan. Si cancelas Premium, volverás al plan gratuito al finalizar el periodo pagado." },
              { q: "¿Necesito tarjeta para empezar?", a: "Para el plan gratuito no pedimos ninguna forma de pago. Queremos que pruebes el valor del producto primero." },
              { q: "¿Cómo se detectan las oportunidades de ahorro?", a: "Analizamos más de 500 plataformas y comparamos tus cuotas con los planes actuales y competidores para ofrecerte la mejor alternativa." }
            ].map((item, i) => (
              <details key={i} className="group border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#CBD5E1] transition-colors bg-white">
                 <summary className="p-6 list-none flex justify-between items-center cursor-pointer font-bold text-[#0F172A]">
                    <span dangerouslySetInnerHTML={{ __html: item.q }}></span>
                    <Plus size={20} className="group-open:rotate-45 transition-transform text-[#4F46E5]" />
                 </summary>
                 <div className="p-6 pt-0 text-[#64748B] text-sm leading-relaxed font-medium">
                    {item.a}
                 </div>
              </details>
            ))}
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
                <button onClick={() => navigate('/login')} className="px-12 py-5 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338CA] active:scale-95 transition-all shadow-xl shadow-indigo-900/40">
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
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] text-center md:text-left mb-12">
              <div className="flex flex-col gap-3">
                <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">Legal</span>
                <button onClick={() => setShowLegal(true)} className="hover:text-[#4F46E5] transition-colors text-left uppercase">Aviso Legal</button>
                <button onClick={() => setShowPrivacy(true)} className="hover:text-[#4F46E5] transition-colors text-left uppercase">Privacidad</button>
                <button onClick={() => setShowTerms(true)} className="hover:text-[#4F46E5] transition-colors text-left uppercase">Términos</button>
                <button onClick={() => setShowCookies(true)} className="hover:text-[#4F46E5] transition-colors text-left uppercase">Cookies</button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">Soporte</span>
                <button onClick={() => setShowContact(true)} className="hover:text-[#4F46E5] transition-colors text-left uppercase">Contacto</button>
                <a href="mailto:soporte@killercontrol.app" className="hover:text-[#4F46E5] transition-colors text-left uppercase">Email</a>
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
              © 2026 <span className="text-[#F59E0B]" translate="no">Killer</span> <span translate="no">Control</span>. El aliado financiero para tus suscripciones.
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
    </div>
  );
};

export default LandingPage;
