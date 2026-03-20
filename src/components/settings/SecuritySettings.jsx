import React from 'react';
import { Eye, EyeOff, Shield, Smartphone, Monitor, X, Lock, Check, AlertCircle, Loader2, QrCode, CheckCircle2 } from 'lucide-react';
import { usePasswordChange } from '../../hooks/usePasswordChange';
import { use2FA } from '../../hooks/use2FA';

const MOCK_SESSIONS = [
  { id: 1, device: 'MacBook Pro', browser: 'Chrome 123', location: 'Barcelona, ES', ip: '84.120.45.22', isCurrent: true },
  { id: 2, device: 'iPhone 15 Pro', browser: 'Safari Mobile', location: 'Barcelona, ES', ip: '84.120.45.22', isCurrent: false },
  { id: 3, device: 'Windows PC', browser: 'Edge 120', location: 'Madrid, ES', ip: '195.77.32.10', isCurrent: false },
];

/* ─── Small reusable Alert ─────────────────────── */
function Alert({ type, children }) {
  const styles = {
    success: 'bg-[var(--primary)]/10 border-[var(--primary)]/20 text-[var(--primary)]',
    error:   'bg-red-500/10 border-red-500/20 text-red-500',
    info:    'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-secondary)]',
  };
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${styles[type]}`}>
      <Icon size={17} className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

/* ─── Password strength indicator ─────────────── */
function StrengthBar({ results }) {
  const passed = results.filter(r => r.passed).length;
  const pct = (passed / results.length) * 100;
  const color = pct <= 25 ? 'bg-red-500' : pct <= 50 ? 'bg-[#F59E0B]' : pct <= 75 ? 'bg-[#FBBF24]' : 'bg-[var(--primary)]';
  return (
    <div className="space-y-2 mt-3">
      <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
        {results.map(r => (
          <li key={r.id} className={`flex items-center gap-1.5 text-xs font-bold ${r.passed ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`}>
            <Check size={11} className={r.passed ? 'opacity-100' : 'opacity-30'} />
            {r.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Password Field ───────────────────────────── */
function PasswordField({ label, name, value, onChange, show, onToggleShow, error, required }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2 ml-1">
        {label} {required && <span className="text-[var(--primary)]">*</span>}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className={`w-full bg-[var(--bg-surface)] border rounded-xl py-3 px-4 pr-12 outline-none text-[var(--text-primary)] transition shadow-sm font-bold
            ${error ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]'}`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)] transition"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5 ml-1 font-bold">{error}</p>}
    </div>
  );
}

/* ─── Toggle ───────────────────────────────────── */
function Toggle({ enabled, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none
        ${enabled ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform
        ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function SecuritySettings() {
  const pw  = usePasswordChange();
  const tfa = use2FA(false);

  const [sessions, setSessions] = React.useState(MOCK_SESSIONS);
  const revokeSession = id => setSessions(prev => prev.filter(s => s.id !== id));

  /* Computed error messages */
  const confirmError = pw.fields.confirm && !pw.matchOk ? 'Las contraseñas no coinciden.' : '';

  return (
    <section className="space-y-8">
      {/* ── SECTION HEADER ── */}
      <div>
        <h2 className="text-xl font-black text-[var(--text-primary)]">Privacidad y Seguridad</h2>
        <p className="text-sm text-[var(--text-secondary)] font-medium">Protege tu cuenta y controla el acceso desde múltiples dispositivos.</p>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CAMBIAR CONTRASEÑA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-5 md:p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Lock size={18} className="text-[var(--primary)]" />
          <h3 className="font-black text-[var(--text-primary)] text-lg">Cambiar Contraseña</h3>
        </div>

        {/* Status Alerts */}
        {pw.status === 'success' && <Alert type="success">Contraseña actualizada correctamente.</Alert>}
        {pw.status === 'error'   && <Alert type="error">{pw.errorMsg}</Alert>}

        <form onSubmit={pw.handleSubmit} className="space-y-4" noValidate>
          <PasswordField
            label="Contraseña actual"
            name="current"
            value={pw.fields.current}
            onChange={pw.update('current')}
            show={pw.show.current}
            onToggleShow={pw.toggleShow('current')}
            required
          />

          <div>
            <PasswordField
              label="Nueva contraseña"
              name="next"
              value={pw.fields.next}
              onChange={pw.update('next')}
              show={pw.show.next}
              onToggleShow={pw.toggleShow('next')}
              required
            />
            {/* Strength meter — only when user has typed something */}
            {pw.fields.next.length > 0 && <StrengthBar results={pw.complexityResults} />}
          </div>

          <PasswordField
            label="Confirmar nueva contraseña"
            name="confirm"
            value={pw.fields.confirm}
            onChange={pw.update('confirm')}
            show={pw.show.confirm}
            onToggleShow={pw.toggleShow('confirm')}
            error={confirmError}
            required
          />

          <button
            type="submit"
            disabled={!pw.formOk || pw.status === 'loading'}
            className={`w-full flex items-center justify-center gap-2 font-black uppercase tracking-widest rounded-xl py-3.5 transition shadow-lg
              ${pw.formOk && pw.status !== 'loading'
                ? 'bg-[var(--primary)] text-white hover:opacity-90 shadow-[var(--primary)]/20'
                : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed shadow-none'}`}
          >
            {pw.status === 'loading'
              ? <><Loader2 size={18} className="animate-spin" /> Actualizando…</>
              : 'Actualizar Contraseña'}
          </button>
        </form>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. AUTENTICACIÓN 2FA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        {/* Header row */}
        <div className="flex items-center justify-between px-5 md:px-6 py-5">
          <div className="flex items-center gap-3">
            <Shield size={18} className={tfa.enabled ? 'text-[#10B981]' : 'text-[var(--text-muted)]'} />
            <div>
              <h3 className="font-black text-[var(--text-primary)] leading-tight">Autenticación de Dos Factores</h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                {tfa.enabled ? '✅ Activo — tu cuenta tiene una capa extra de protección.' : 'Inactivo — actívala para proteger tu cuenta.'}
              </p>
            </div>
          </div>
          <Toggle
            enabled={tfa.enabled}
            onChange={tfa.handleToggle}
            disabled={tfa.stage === 'verifying'}
          />
        </div>

        {/* ── SETUP FLOW ── */}
        {(tfa.stage === 'setup' || tfa.stage === 'verifying') && (
          <div className="border-t border-[var(--border)] px-5 md:px-6 py-5 space-y-5 bg-[var(--bg-elevated)]">
            <Alert type="info">
              Escanea el código QR con <strong>Google Authenticator</strong> o <strong>Authy</strong> y luego introduce el código de 6 dígitos.
            </Alert>

            {/* QR Code */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                {tfa.qrData ? (
                  <img
                    src={tfa.qrData.qrUrl}
                    alt="Código QR para 2FA"
                    width={160}
                    height={160}
                    className="rounded-2xl border-4 border-white bg-white"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-2xl bg-gray-800 flex items-center justify-center animate-pulse">
                    <QrCode size={40} className="text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <p className="text-sm font-black text-[var(--text-primary)]">¿No puedes escanear el QR?</p>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Introduce este código manualmente en tu app de autenticación:</p>
                {tfa.qrData && (
                  <code className="block bg-[var(--bg-surface)] text-[var(--primary)] font-mono text-sm px-3 py-2 rounded-xl tracking-widest border border-[var(--primary)]/20 select-all font-bold shadow-sm">
                    {tfa.qrData.secret}
                  </code>
                )}
              </div>
            </div>

            {/* OTP Input */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2 ml-1">
                Código de verificación <span className="text-[var(--primary)]">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={tfa.otp}
                onChange={tfa.handleOtpChange}
                className={`w-full bg-[var(--bg-surface)] border rounded-xl py-3.5 px-4 text-center text-2xl font-mono font-black tracking-[0.5em] outline-none transition shadow-sm
                  ${tfa.error2FA ? 'border-red-500 text-red-500' : 'border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] text-[var(--text-primary)]'}`}
              />
              {tfa.error2FA && <p className="text-xs text-red-500 mt-1.5 text-center font-bold">{tfa.error2FA}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={tfa.cancel}
                className="px-5 py-3 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition text-sm font-black uppercase tracking-widest"
              >
                Cancelar
              </button>
              <button
                onClick={tfa.handleVerify}
                disabled={tfa.otp.length < 6 || tfa.stage === 'verifying'}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition shadow-lg
                  ${tfa.otp.length === 6 && tfa.stage !== 'verifying'
                    ? 'bg-[var(--primary)] text-white hover:opacity-90 shadow-[var(--primary)]/20'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed shadow-none'}`}
              >
                {tfa.stage === 'verifying'
                  ? <><Loader2 size={16} className="animate-spin" /> Verificando…</>
                  : <><Check size={16} /> Verificar y Activar</>}
              </button>
            </div>
          </div>
        )}

        {/* ── ACTIVE STATE ── */}
        {tfa.stage === 'active' && (
          <div className="border-t border-[var(--border)] px-5 md:px-6 py-4 flex items-center gap-3 bg-[var(--primary)]/5">
            <Smartphone size={16} className="text-[var(--primary)]" />
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              Verificación activa mediante <span className="text-[var(--primary)] font-black">app de autenticación</span>. Para desactivarla, pulsa de nuevo el interruptor.
            </p>
          </div>
        )}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. SESIONES ACTIVAS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div>
        <h3 className="font-black text-[var(--text-primary)] text-lg mb-4">Sesiones Activas</h3>
        <div className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-sm transition-all hover:bg-[var(--bg-elevated)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0 border border-[var(--primary)]/10">
                {session.device.includes('iPhone') || session.device.includes('Android')
                  ? <Smartphone size={20} />
                  : <Monitor size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-[var(--text-primary)] text-sm leading-tight">{session.device}</p>
                  {session.isCurrent && (
                    <span className="text-[10px] font-black bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded-full whitespace-nowrap border border-[var(--primary)]/10 uppercase tracking-tighter">
                      Este dispositivo
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate font-medium">{session.browser} · {session.location} · {session.ip}</p>
              </div>
              {!session.isCurrent && (
                <button
                  onClick={() => revokeSession(session.id)}
                  className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition shrink-0"
                  title="Cerrar sesión en este dispositivo"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
        {sessions.length > 1 && (
          <button
            onClick={() => setSessions(prev => prev.filter(s => s.isCurrent))}
            className="mt-4 w-full text-sm text-red-500 font-black uppercase tracking-widest py-3.5 hover:bg-red-500/10 rounded-xl border border-red-500/20 transition shadow-sm"
          >
            Cerrar sesión en todos los demás dispositivos ({sessions.filter(s => !s.isCurrent).length})
          </button>
        )}
      </div>
    </section>
  );
}
