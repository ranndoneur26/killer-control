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
import HeroSlider from './HeroSlider';
import Logo from './Logo';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import CookiesModal from './CookiesModal';
import LegalNoticeModal from './LegalNoticeModal';
import ContactModal from './ContactModal';
import DemoModal from './DemoModal';
import { useLanguage } from '../contexts/LanguageContext';
import HeroHeader from './HeroHeader';
import HeroCopy from './HeroCopy';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(0); // Open first by default

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
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">{t('pain.title')}</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">{t('pain.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock size={48} />, title: t('pain.forgotten_title'), text: t('pain.forgotten_desc') },
              { icon: <TrendingUp size={48} />, title: t('pain.silent_title'), text: t('pain.silent_desc') },
              { icon: <Timer size={48} />, title: t('pain.promo_title'), text: t('pain.promo_desc') },
              { icon: <CreditCard size={48} />, title: t('pain.drip_title'), text: t('pain.drip_desc') }
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
              <h2 className="text-4xl font-bold text-[#0F172A] mb-6"><span className="text-[#F59E0B]">Killer</span> Control {t('features.title')}</h2>
              <p className="text-lg text-[#64748B] mb-10">{t('features.subtitle')}</p>

              <div className="space-y-6">
                {[
                  { title: t('features.promo_title'), text: t('features.promo_desc') },
                  { title: t('features.charges_title'), text: t('features.charges_desc') },
                  { title: t('features.savings_title'), text: t('features.savings_desc') }
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
                  <h3 className="text-[#0F172A] text-xl font-bold mb-2">{t('features.hero_title')}</h3>
                  <p className="text-[#64748B] text-sm font-medium">{t('features.hero_subtitle')}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
                    <div className="text-[#64748B] text-[10px] font-bold uppercase mb-1">{t('features.potential_savings')}</div>
                    <div className="text-2xl font-black text-[#10B981]">-32,00€</div>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-[#E2E8F0] shadow-sm">
                    <div className="text-[#64748B] text-[10px] font-bold uppercase mb-1">{t('features.next_charge')}</div>
                    <div className="text-lg font-bold text-[#0F172A]">{t('features.tomorrow')}</div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">{t('how.title')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { num: "01", title: t('how.step1_title'), text: t('how.step1_desc') },
              { num: "02", title: t('how.step2_title'), text: t('how.step2_desc') },
              { num: "03", title: t('how.step3_title'), text: t('how.step3_desc') }
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
            <h2 className="text-4xl font-bold text-amber-500 mb-4">{t('pricing.title')}</h2>
            <p className="text-lg text-[#64748B] font-medium">{t('pricing.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center hover:border-[#CBD5E1] transition-colors">
              <span className="text-[#94A3B8] font-bold uppercase tracking-widest text-[10px] mb-4">{t('pricing.freemium_label')}</span>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-black text-[#0F172A]">{t('pricing.freemium_price')}</span>
              </div>
              <p className="text-[#64748B] mb-8 font-semibold">{t('pricing.freemium_desc')}</p>

              <ul className="space-y-4 mb-10 w-full text-left">
                {[t('pricing.freemium_f1'), t('pricing.freemium_f2'), t('pricing.freemium_f3'), t('pricing.freemium_f4'), t('pricing.freemium_f5')].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#64748B] font-medium">
                    <Check size={18} className="text-amber-500" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/signup?plan=free')} className="mt-auto w-full py-4 px-6 bg-white border border-[#E2E8F0] text-amber-500 rounded-2xl font-bold hover:bg-[#F8FAFC] transition-all">
                {t('pricing.freemium_cta')}
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#FFF8E1] p-10 rounded-[2.5rem] border-2 border-amber-500 shadow-xl relative overflow-hidden flex flex-col items-center text-center group translate-y-[-10px]">
              <div className="absolute top-0 right-0 bg-[#0F172A] text-white text-[10px] font-bold px-4 py-2 rounded-bl-2xl">{t('pricing.most_chosen')}</div>

              <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-1">
                <ShieldCheck size={14} /> <span translate="no">{t('pricing.premium_label')}</span>
              </span>
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-black text-[#0F172A]">{t('pricing.premium_price')}</span>
                </div>
                <span className="text-amber-600 text-xs font-bold mt-2 px-3 py-1 bg-amber-100 rounded-full">{t('pricing.premium_annual')}</span>
              </div>
              <p className="text-[#64748B] mb-8 font-semibold">{t('pricing.premium_desc')}</p>

              <ul className="space-y-4 mb-10 w-full text-left">
                {[t('pricing.premium_f1'), t('pricing.premium_f2'), t('pricing.premium_f3'), t('pricing.premium_f4'), t('pricing.premium_f5')].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#0F172A] font-semibold">
                    <Check size={18} className="text-amber-500" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/signup?plan=premium')} className="mt-auto w-full py-4 px-6 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30">
                {t('pricing.premium_cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {t('testimonials').map((testi, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm relative italic">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#F59E0B" className="text-[#F59E0B]" />)}
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6 font-medium" dangerouslySetInnerHTML={{ __html: `"${testi.quote}"` }}></p>
                <div className="not-italic flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-[#4F46E5] text-lg">{testi.name[0]}</div>
                  <div>
                    <div className="font-bold text-[#0F172A] text-sm">{testi.name}</div>
                    <div className="text-xs text-[#94A3B8] font-semibold">{testi.role}</div>
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

        <style>
          {`
            @keyframes softPurpleGlow {
              0%, 100% { box-shadow: 0 0 8px #8B5CF6, inset 0 0 2px #8B5CF6; opacity: 0.7; }
              50% { box-shadow: 0 0 20px #8B5CF6, inset 0 0 6px #8B5CF6; opacity: 1; }
            }
            .animate-purple-glow {
              animation: softPurpleGlow 3s infinite ease-in-out;
            }
          `}
        </style>

        <div className="max-w-[780px] mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-black text-center mb-12 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent tracking-tight">
            {t('faq.title')}
          </h2>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((num, i) => {
              const isActive = activeFAQ === i;

              return (
                <div
                  key={i}
                  className={`group rounded-2xl overflow-hidden transition-all duration-300 ${isActive
                    ? 'bg-white/5 border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.15)] border-t border-r border-b'
                    : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] border-l border-l-transparent'
                    } backdrop-blur-md relative`}
                >
                  {/* Left Border Glow Animation (Morado) */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B5CF6] animate-purple-glow z-20"></div>
                  )}

                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between cursor-pointer text-left relative z-10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-[15px] md:text-[17px] leading-snug flex items-start gap-3">
                        {(() => {
                          const questionText = t(`faq.q${num}`);
                          // Assuming format is "Emoji ¿Questiontext?"
                          const spaceIdx = questionText.indexOf(' ');
                          const emoji = questionText.substring(0, spaceIdx);
                          const restText = questionText.substring(spaceIdx + 1);
                          return (
                            <>
                              <span className="text-[18px] md:text-[20px] shrink-0 mt-[2px] opacity-80 md:opacity-100">{emoji}</span>
                              <span className="mt-[3px]">{restText}</span>
                            </>
                          );
                        })()}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ml-4 ${isActive ? 'bg-[#8B5CF6] border-[#8B5CF6] rotate-45' : 'bg-transparent group-hover:border-white/30'
                      }`}>
                      <Plus size={18} className="text-white" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                          className="px-4 pb-5 md:px-6 md:pb-6 md:pl-[56px] text-[#CBD5E1] text-[14px] md:text-[15px] leading-[1.7] font-medium"
                          dangerouslySetInnerHTML={{ __html: t(`faq.a${num}`) }}
                        />
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
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">{t('cta.title')}</h2>
              <p className="text-[#94A3B8] text-lg mb-10 max-w-2xl mx-auto font-medium">{t('cta.subtitle')}</p>
              <button onClick={() => navigate('/signup?plan=free')} className="px-12 py-5 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-900/40">
                {t('cta.button')}
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
              <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">{t('footer.legal')}</span>
              <button onClick={() => setShowLegal(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">{t('footer.legal_notice')}</button>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">{t('footer.privacy')}</button>
              <button onClick={() => setShowTerms(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">{t('footer.terms')}</button>
              <button onClick={() => setShowCookies(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">{t('footer.cookies')}</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">{t('footer.support')}</span>
              <button onClick={() => setShowContact(true)} className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">{t('footer.contact')}</button>
              <a href="mailto:soporte@killercontrol.app" className="hover:text-[#4F46E5] transition-colors md:text-left uppercase">{t('footer.email')}</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">{t('footer.explore')}</span>
              <a href="#features" className="hover:text-[#4F46E5] transition-colors uppercase">{t('nav.features')}</a>
              <a href="#pricing" className="hover:text-[#4F46E5] transition-colors uppercase">{t('nav.pricing')}</a>
              <a href="#faq" className="hover:text-[#4F46E5] transition-colors uppercase">{t('nav.faq')}</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400 mb-1 pb-2 border-b border-[#f1f5f9]">{t('footer.brand')}</span>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Logo className="h-9" />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#f1f5f9] text-center text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            © 2026, <span className="text-[#F59E0B]" translate="no">Killer</span> <span translate="no">Control</span> | {t('footer.tagline')}
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
