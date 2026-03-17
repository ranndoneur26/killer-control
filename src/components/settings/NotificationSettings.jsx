import React from 'react';
import { Mail, Bell, Shield, Lock, CheckCircle2, XCircle, X, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '../../hooks/useNotifications';

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════ */

/* ─── iOS-style Toggle ──────────────────────── */
function Toggle({ enabled, onChange, loading }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      disabled={loading}
      className={`
        relative inline-flex h-7 w-12 shrink-0 rounded-full p-0.5
        transition-colors duration-300 ease-in-out focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2
        focus-visible:ring-offset-white
        ${enabled ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}
        ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-flex h-6 w-6 items-center justify-center rounded-full
          bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      >
        {loading && <Loader2 size={12} className="animate-spin text-[#94A3B8]" />}
      </span>
    </button>
  );
}

/* ─── Single preference row ─────────────────── */
function PrefRow({ icon: Icon, color, label, description, prefKey, prefs, saving, onToggle }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]/50 transition-colors px-2 -mx-2 rounded-xl">
      <div className={`mt-0.5 shrink-0 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-[#0F172A] text-sm leading-snug">{label}</p>
        {description && <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed font-medium">{description}</p>}
      </div>
      <Toggle
        enabled={prefs[prefKey]}
        onChange={() => onToggle(prefKey)}
        loading={saving[prefKey]}
      />
    </div>
  );
}

/* ─── Category card wrapper ─────────────────── */
function CategoryCard({ icon: Icon, iconColor, title, children }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl px-5 shadow-sm">
      <div className={`flex items-center gap-2 pt-5 pb-3 border-b border-[#E2E8F0]`}>
        <Icon size={16} className={iconColor} />
        <h3 className="font-black text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ─── Toast notification ────────────────────── */
function Toast({ toast, onDismiss }) {
  const isSuccess = toast.type === 'success';
  return (
    <motion.div
      key={toast.id}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } }}
      className={`
        flex items-start gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-black
        max-w-sm w-full pointer-events-auto transition-all uppercase tracking-widest
        ${isSuccess
          ? 'bg-[#EEF2FF] border-[#4F46E5]/20 text-[#4F46E5]'
          : 'bg-[#FEF2F2] border-[#EF4444]/20 text-[#EF4444]'}
      `}
    >
      {isSuccess
        ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
        : <XCircle     size={18} className="shrink-0 mt-0.5" />}
      <span className="flex-1">{toast.msg}</span>
      <button onClick={() => onDismiss(toast.id)} className="opacity-60 hover:opacity-100 transition shrink-0 mt-0.5">
        <X size={15} />
      </button>
    </motion.div>
  );
}

/* ─── Toast container (fixed bottom) ───────── */
function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none px-4 w-full"
    >
      <AnimatePresence mode="sync">
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
const EMAIL_ROWS = [
  {
    prefKey: 'emailNews',
    icon: Bell,
    color: 'text-[#4F46E5]',
    label: <>Novedades de <span className="text-[#F59E0B]">Killer</span> Control</>,
    description: 'Nuevas funciones, mejoras y actualizaciones del producto.',
  },
  {
    prefKey: 'emailSummary',
    icon: Mail,
    color: 'text-[#4F46E5]',
    label: 'Resúmenes mensuales de facturación',
    description: 'Un resumen mensual de cuánto gastaste en suscripciones.',
  },
  {
    prefKey: 'emailRenewals',
    icon: Bell,
    color: 'text-[#4F46E5]',
    label: 'Alertas de próximos cargos',
    description: 'Aviso con X días de antelación antes de cada renovación.',
  },
];

const PUSH_ROWS = [
  {
    prefKey: 'pushEnabled',
    icon: Bell,
    color: 'text-[#F59E0B]',
    label: 'Activar notificaciones push',
    description: 'Permite que el navegador envíe alertas a tu dispositivo.',
  },
  {
    prefKey: 'pushRenewals',
    icon: Bell,
    color: 'text-[#F59E0B]',
    label: 'Push de renovaciones',
    description: 'Recibe un push el día previo a cada cargo recurrente.',
  },
];

const SECURITY_ROWS = [
  {
    prefKey: 'alertLogin',
    icon: Lock,
    color: 'text-[#EF4444]',
    label: 'Nuevos inicios de sesión',
    description: 'Alerta si se inicia sesión desde un dispositivo no reconocido.',
  },
  {
    prefKey: 'alertAccountChange',
    icon: Shield,
    color: 'text-[#EF4444]',
    label: 'Cambios en la cuenta',
    description: 'Aviso si se modifica tu contraseña, email o método de pago.',
  },
];

export default function NotificationSettings() {
  const { prefs, saving, toasts, dismissToast, handleToggle } = useNotifications();

  const rowProps = { prefs, saving, onToggle: handleToggle };

  return (
    <>
      {/* Toast system — rendered outside the scroll container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <section className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-black text-[#0F172A]">Notificaciones y Alertas</h2>
          <p className="text-sm text-[#64748B] font-medium">
            Los cambios se guardan al instante. Si hay un error, el ajuste se restaura automáticamente.
          </p>
        </div>

        {/* Email Category */}
        <CategoryCard icon={Mail} iconColor="text-[#4F46E5]" title="Correos Electrónicos">
          {EMAIL_ROWS.map(r => <PrefRow key={r.prefKey} {...r} {...rowProps} />)}
        </CategoryCard>

        {/* Push Category */}
        <CategoryCard icon={Bell} iconColor="text-[#F59E0B]" title="Notificaciones Push">
          {PUSH_ROWS.map(r => <PrefRow key={r.prefKey} {...r} {...rowProps} />)}
          {!prefs.pushEnabled && (
            <p className="text-xs text-[#94A3B8] py-3 italic font-medium px-2">
              Activa las notificaciones push para gestionar las alertas de renovación.
            </p>
          )}
        </CategoryCard>

        {/* Security Category */}
        <CategoryCard icon={Shield} iconColor="text-[#EF4444]" title="Alertas de Seguridad">
          {SECURITY_ROWS.map(r => <PrefRow key={r.prefKey} {...r} {...rowProps} />)}
        </CategoryCard>

        {/* Summary of currently enabled */}
        <div className="text-xs text-[#94A3B8] text-center font-black uppercase tracking-widest">
          {Object.values(prefs).filter(Boolean).length} de {Object.keys(prefs).length} preferencias activas
        </div>
      </section>
    </>
  );
}
