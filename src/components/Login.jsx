import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Mail, Eye, EyeOff, Loader2, CheckCircle2, XCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    success: 'bg-[#ECFDF5] border-[#10B981]/40 text-[#065F46]',
    error:   'bg-[#FEF2F2] border-[#EF4444]/40 text-[#991B1B]',
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
    primary: `bg-[#4F46E5] text-white hover:bg-[#4338CA] ${(loading || disabled) ? 'opacity-70 cursor-not-allowed' : ''}`,
    white:   `bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`,
    dark:    `bg-[#0F172A] text-white hover:bg-black ${loading ? 'opacity-70 cursor-not-allowed' : ''}`,
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
  const { toasts, addToast, dismissToast } = useToast();
  const auth = useAuth(addToast, navigate);
  const anyLoading = !!auth.loadingBtn;
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A]">
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
          <div className="w-16 h-16 bg-[#4F46E5] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
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
            <h1 className="text-3xl font-bold mb-3 text-[#0F172A]">
              {auth.isLogin ? 'Bienvenido de nuevo' : <>Crea Tu cuenta <span className="text-[#F59E0B]">Killer</span></>}
            </h1>
            <p className="text-[#64748B] text-sm leading-relaxed font-medium">
              {auth.isLogin
                ? 'Inicia sesión para acceder a tus suscripciones.'
                : <>Únete a <span className="text-[#F59E0B]">Killer</span> Control y toma el control de tus gastos.</>}
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
            <GoogleIcon /> {auth.isLogin ? 'Iniciar sesión con Google' : 'Continuar con Google'}
          </AuthButton>
          <AuthButton
            variant="dark"
            loading={auth.loadingBtn === 'apple'}
            disabled={anyLoading}
            onClick={() => auth.handleOAuth('Apple')}
          >
            <AppleIcon /> {auth.isLogin ? 'Iniciar sesión con Apple' : 'Continuar con Apple'}
          </AuthButton>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-[#E2E8F0]" />
          <span className="px-4 text-xs text-[#94A3B8] font-bold tracking-wider uppercase">
            O con tu email
          </span>
          <div className="flex-1 border-t border-[#E2E8F0]" />
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
                placeholder="tu@email.com"
                disabled={auth.step === 'password' || anyLoading}
                className={`w-full bg-white text-[#0F172A] rounded-2xl py-4 px-5 pr-12 outline-none border border-[#E2E8F0] shadow-sm
                  focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition placeholder-[#94A3B8] font-medium
                  disabled:opacity-60 disabled:cursor-default
                  ${auth.emailError ? 'border-red-500 ring-2 ring-red-500/10' : ''}`}
              />
              {auth.step === 'password'
                ? (
                  <button
                    type="button"
                    onClick={auth.backToEmail}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                    title="Cambiar email"
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
                    placeholder={auth.isLogin ? 'Tu contraseña' : 'Crea una contraseña (mín. 8 caracteres)'}
                    autoFocus
                    disabled={anyLoading}
                    className={`w-full bg-white text-[#0F172A] rounded-2xl py-4 px-5 pr-12 outline-none border border-[#E2E8F0] shadow-sm
                      focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition placeholder-[#94A3B8] font-medium
                      disabled:opacity-60 ${auth.passError ? 'border-red-500 ring-2 ring-red-500/10' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => auth.setShowPassword(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#4F46E5] transition"
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
                      className="text-xs text-[#4F46E5] font-bold hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
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
              ? <>Continuar <ArrowRight size={18} /></>
              : auth.isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
            }
          </AuthButton>
        </form>

        {/* ── Legal & Toggle ── */}
        <div className="mt-8 text-center space-y-5 pb-4">
          <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
            Al continuar, aceptas nuestros{' '}
            <button type="button" onClick={() => setShowTerms(true)} className="text-[#4F46E5] hover:underline font-bold">
              Términos y Condiciones
            </button>
            {' '}y{' '}
            <button type="button" onClick={() => setShowPrivacy(true)} className="text-[#4F46E5] hover:underline font-bold">Política de Privacidad</button>.
          </p>
          <p className="text-sm text-[#64748B] font-medium">
            {auth.isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button
              type="button"
              onClick={auth.toggleMode}
              className="text-[#0F172A] font-bold hover:text-[#4F46E5] transition"
            >
              {auth.isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
