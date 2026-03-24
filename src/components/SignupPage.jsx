import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from './Logo';

/* ── Google SVG ─────────────────────────── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.74 22.37 10.04H12V14.22H17.92C17.65 15.6 16.89 16.74 15.72 17.5V20.22H19.26C21.34 18.32 22.56 15.54 22.56 12.25Z" fill="#4285F4" />
    <path d="M12 23C14.97 23 17.46 22.02 19.26 20.22L15.72 17.5C14.73 18.16 13.48 18.57 12 18.57C9.13 18.57 6.7 16.63 5.82 14.04H2.17V16.86C3.99 20.46 7.7 23 12 23Z" fill="#34A853" />
    <path d="M5.82 14.04C5.59 13.38 5.46 12.7 5.46 12C5.46 11.3 5.59 10.62 5.82 9.96V7.14H2.17C1.42 8.63 1 10.27 1 12C1 13.73 1.42 15.37 2.17 16.86L5.82 14.04Z" fill="#FBBC05" />
    <path d="M12 5.43C13.62 5.43 15.06 5.98 16.21 7.07L19.34 3.94C17.45 2.18 14.97 1 12 1C7.7 1 3.99 3.54 2.17 7.14L5.82 9.96C6.7 7.37 9.13 5.43 12 5.43Z" fill="#EA4335" />
  </svg>
);

/* ── Apple SVG ──────────────────────────── */
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const plan = searchParams.get('plan') || 'free';
  const isPremium = plan === 'premium';

  /* Initialize Auth Hook (Signup mode) */
  const auth = useAuth(addToast, navigate);
  const anyLoading = !!auth.loadingBtn;

  useEffect(() => {
    if (plan) {
      sessionStorage.setItem('selected_plan', plan);
    }
  }, [plan]);

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">

      {/* Container */}
      <div className="flex flex-col flex-1 p-6 max-w-md mx-auto w-full justify-center">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo className="h-12" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">
            {isPremium ? t('login.premium_trial') : <span dangerouslySetInnerHTML={{ __html: t('login.create_account') }} />}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-medium">
            {isPremium ? t('login.premium_subtitle') : <span dangerouslySetInnerHTML={{ __html: t('login.join_subtitle') }} />}
          </p>
        </div>

        {/* ── OAuth ── */}
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={() => auth.handleOAuth('Google')}
            disabled={anyLoading}
            className="w-full flex items-center justify-center gap-2 font-bold rounded-full py-3.5 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-elevated)] transition shadow-sm disabled:opacity-70"
          >
            {auth.loadingBtn === 'google' ? <Loader2 key="goog-l" size={18} className="animate-spin" /> : <><GoogleIcon key="goog-i" /> {t('login.google_continue')}</>}
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-[var(--border)]" />
          <span className="px-4 text-xs text-[var(--text-muted)] font-bold tracking-wider uppercase">
            {t('login.or_email')}
          </span>
          <div className="flex-1 border-t border-[var(--border)]" />
        </div>

        {/* ── Email → Password flow ── */}
        <form
          onSubmit={auth.step === 'email' ? auth.handleEmailContinue : auth.handlePasswordSubmit}
          className="space-y-4"
        >
          {/* Email field */}
          <div>
            <div className="relative">
              <input
                type="email"
                value={auth.email}
                onChange={e => { auth.setEmail(e.target.value); auth.setEmailError(''); }}
                placeholder={t('login.email_placeholder')}
                disabled={auth.step === 'password' || anyLoading}
                className={`w-full bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl py-4 px-5 pr-12 outline-none border border-[var(--border)] shadow-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition placeholder-[var(--text-muted)] font-medium ${auth.emailError ? 'border-red-500' : ''}`}
              />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {auth.emailError && <p className="text-xs text-red-400 mt-1 pl-1">{auth.emailError}</p>}
          </div>

          {/* Password field */}
          <AnimatePresence>
            {auth.step === 'password' && (
              <motion.div
                key="signup-password-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <input
                    type={auth.showPassword ? 'text' : 'password'}
                    value={auth.password}
                    onChange={e => { auth.setPassword(e.target.value); auth.setPassError(''); }}
                    placeholder={t('login.password_placeholder') || "Crea una contraseña (mín. 8 caract.)"}
                    autoFocus
                    disabled={anyLoading}
                    className={`w-full bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl py-4 px-5 pr-12 outline-none border border-[var(--border)] shadow-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition font-medium ${auth.passError ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => auth.setShowPassword(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {auth.showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
                {auth.passError && <p className="text-xs text-red-400 mt-1 pl-1">{auth.passError}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <button
            type="submit"
            disabled={anyLoading}
            className="w-full flex items-center justify-center gap-2 font-bold rounded-full py-4 bg-[var(--primary)] text-white hover:opacity-90 transition shadow-lg shadow-[var(--primary)]/20 disabled:opacity-70"
          >
            {auth.loadingBtn === 'email' ? <Loader2 size={18} className="animate-spin" /> : (
              auth.step === 'email' ? <>{t('login.continue')} <ArrowRight size={18} /></> : t('login.signup_btn')
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            {t('login.already_account')}{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[var(--text-primary)] font-bold hover:text-[var(--primary)] transition"
            >
              {t('login.login_link')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
