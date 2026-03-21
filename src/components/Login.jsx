import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Mail, Eye, EyeOff, Loader2, CheckCircle2, XCircle, X, Crown } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import HeroHeader from './HeroHeader';

/* ── Google SVG ─────────────────────────── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.74 22.37 10.04H12V14.22H17.92C17.65 15.6 16.89 16.74 15.72 17.5V20.22H19.26C21.34 18.32 22.56 15.54 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.46 22.02 19.26 20.22L15.72 17.5C14.73 18.16 13.48 18.57 12 18.57C9.13 18.57 6.7 16.63 5.82 14.04H2.17V16.86C3.99 20.46 7.7 23 12 23Z" fill="#34A853"/>
    <path d="M5.82 14.04C5.59 13.38 5.46 12.7 5.46 12C5.46 11.3 5.59 10.62 5.82 9.96V7.14H2.17C1.42 8.63 1 10.27 1 12C1 13.73 1.42 15.37 2.17 16.86L5.82 14.04Z" fill="#FBBC05"/>
    <path d="M12 5.43C13.62 5.43 15.06 5.98 16.21 7.07L19.34 3.94C17.45 2.18 14.97 1 12 1C7.7 1 3.99 3.54 2.17 7.14L5.82 9.96C6.7 7.37 9.13 5.43 12 5.43Z" fill="#EA4335"/>
  </svg>
);

/* ── Apple SVG ──────────────────────────── */
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ── Toast ──────────────────────────────── */
function ToastItem({ toast, onDismiss }) {
  const s = {
    success: 'bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]',
    error:   'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]',
  };
  const Icon = toast.type === 'success' ? CheckCircle2 : XCircle;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 px-4 py-3 rounded-2xl border text-sm font-medium max-w-sm w-full ${s[toast.type]}`}
    >
      <Icon size={17} className="shrink-0 mt-0.5" />
      <span className="flex-1">{toast.msg}</span>
      <button onClick={() => onDismiss(toast.id)} className="opacity-60 hover:opacity-100 mt-0.5"><X size={14} /></button>
    </motion.div>
  );
}

/* ── Spinner button ─────────────────────── */
function AuthButton({ loading, disabled, onClick, type = 'button', variant = 'primary', children }) {
  const base = 'w-full flex items-center justify-center gap-2 font-bold rounded-full py-3.5 transition shadow-sm';
  const variants = {
    primary: `bg-[var(--primary)] text-white hover:opacity-90 ${(loading || disabled) ? 'opacity-70 cursor-not-allowed' : ''}`,
    white:   `bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-elevated)] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`,
    dark:    `bg-black text-white hover:bg-gray-900 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`,
  };
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} className={`${base} ${variants[variant]}`}>
      {loading ? <Loader2 size={18} className="animate-spin" /> : children}
    </button>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  const isPremium = plan === 'premium';

  useEffect(() => {
    if (plan) {
      sessionStorage.setItem('selected_plan', plan);
    }
  }, [plan]);

  const { toasts, addToast, dismissToast } = useToast();
  const auth = useAuth(addToast, navigate);
  const anyLoading = !!auth.loadingBtn;
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <HeroHeader />
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />

      {/* Toast container */}
      <div aria-live="polite" className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none px-4 w-full">
        <AnimatePresence mode="sync">
          {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />)}
        </AnimatePresence>
      </div>

      {/* Card */}
      <div className="flex flex-col flex-1 p-6 max-w-md mx-auto w-full justify-center">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
            <div className="w-8 h-8 border-2 border-white rounded relative flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded-full absolute" />
              <div className="w-1 h-3 bg-white rounded-full absolute" />
            </div>
          </div>
        </div>

        {/* Heading — animates when switching login/register */}
        <AnimatePresence mode="wait">
          <motion.div
            key={auth.isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-8"
          >
            {isPremium && !auth.isLogin && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
                <Crown size={14} className="fill-amber-500 text-amber-600" />
                Premium Plan Selected
              </div>
            )}
            <h1 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">
              {auth.isLogin 
                ? 'Welcome back' 
                : isPremium 
                  ? 'Start your Premium trial'
                  : <>Create your <span className="text-[#F59E0B]">Killer</span> account</>}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-medium">
              {auth.isLogin
                ? 'Log in to access your subscriptions.'
                : isPremium
                  ? 'Sign up to activate all Pro features. 4.99€/mo after trial.'
                  : <>Join <span className="text-[#F59E0B]">Killer</span> Control and take charge of your expenses.</>}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── OAuth ── */}
        <div className="space-y-3 mb-6">
          <AuthButton
            variant="white"
            loading={auth.loadingBtn === 'google'}
            disabled={anyLoading}
            onClick={() => auth.handleOAuth('Google')}
          >
            <GoogleIcon /> {auth.isLogin ? 'Log in with Google' : 'Continue with Google'}
          </AuthButton>
          <AuthButton
            variant="dark"
            loading={auth.loadingBtn === 'apple'}
            disabled={anyLoading}
            onClick={() => auth.handleOAuth('Apple')}
          >
            <AppleIcon /> {auth.isLogin ? 'Log in with Apple' : 'Continue with Apple'}
          </AuthButton>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-[var(--border)]" />
          <span className="px-4 text-xs text-[var(--text-muted)] font-bold tracking-wider uppercase">
            OR WITH EMAIL
          </span>
          <div className="flex-1 border-t border-[var(--border)]" />
        </div>

        {/* ── Email → Password flow ── */}
        <form
          onSubmit={auth.step === 'email' ? auth.handleEmailContinue : auth.handlePasswordSubmit}
          className="space-y-4"
          noValidate
        >
          {/* Email field */}
          <div>
            <div className="relative">
              <input
                type="email"
                inputMode="email"
                value={auth.email}
                onChange={e => { auth.setEmail(e.target.value); auth.setEmailError(''); }}
                placeholder="you@email.com"
                disabled={auth.step === 'password' || anyLoading}
                className={`w-full bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl py-4 px-5 pr-12 outline-none border border-[var(--border)] shadow-sm
                  focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition placeholder-[var(--text-muted)] font-medium
                  disabled:opacity-60 disabled:cursor-default
                  ${auth.emailError ? 'border-red-500 ring-2 ring-red-500/10' : ''}`}
              />
              {auth.step === 'password'
                ? (
                  <button
                    type="button"
                    onClick={auth.backToEmail}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                    title="Change email"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )
                : <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              }
            </div>
            {auth.emailError && <p className="text-xs text-red-400 mt-1.5 pl-1">{auth.emailError}</p>}
          </div>

          {/* Password field — slides in when email is confirmed */}
          <AnimatePresence>
            {auth.step === 'password' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <input
                    type={auth.showPassword ? 'text' : 'password'}
                    value={auth.password}
                    onChange={e => { auth.setPassword(e.target.value); auth.setPassError(''); }}
                    placeholder={auth.isLogin ? 'Your password' : 'Create a password (min. 8 chars)'}
                    autoFocus
                    disabled={anyLoading}
                    className={`w-full bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-2xl py-4 px-5 pr-12 outline-none border border-[var(--border)] shadow-sm
                      focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition placeholder-[var(--text-muted)] font-medium
                      disabled:opacity-60 ${auth.passError ? 'border-red-500 ring-2 ring-red-500/10' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => auth.setShowPassword(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)] transition"
                  >
                    {auth.showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
                {auth.passError && <p className="text-xs text-red-400 mt-1.5 pl-1">{auth.passError}</p>}

                {/* Forgot password — login only */}
                {auth.isLogin && (
                  <div className="text-right mt-2">
                    <button 
                      type="button" 
                      onClick={() => auth.handleForgotPassword()}
                      className="text-xs text-[var(--primary)] font-bold hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <AuthButton
            type="submit"
            variant="primary"
            loading={auth.loadingBtn === 'email'}
            disabled={anyLoading && auth.loadingBtn !== 'email'}
          >
            {auth.step === 'email'
              ? <>Continue <ArrowRight size={18} /></>
              : auth.isLogin ? 'Log In' : 'Create Account'
            }
          </AuthButton>
        </form>

        {/* ── Legal & Toggle ── */}
        <div className="mt-8 text-center space-y-5 pb-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
            By continuing, you agree to our{' '}
            <button type="button" onClick={() => setShowTerms(true)} className="text-[var(--primary)] hover:underline font-bold">
              Terms & Conditions
            </button>
            {' '}and{' '}
            <button type="button" onClick={() => setShowPrivacy(true)} className="text-[var(--primary)] hover:underline font-bold">Privacy Policy</button>.
          </p>
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            {auth.isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={auth.toggleMode}
              className="text-[var(--text-primary)] font-bold hover:text-[var(--primary)] transition"
            >
              {auth.isLogin ? 'Sign up for free' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
