import React, { useState } from 'react';
import {
  CreditCard, Plus, Download, CheckCircle2, Clock, XCircle,
  Trash2, Loader2, X, AlertTriangle, Star, Lock,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePayments } from '../../hooks/usePayments';
import { useToast } from '../../hooks/useToast';

/* ══════════════════════════════════════════════
   SHARED: Toast Container
══════════════════════════════════════════════ */
function ToastItem({ toast, onDismiss }) {
  const styles = {
    success: 'bg-[var(--primary)]/10 border-[var(--primary)]/20 text-[var(--primary)]',
    error:   'bg-red-500/10 border-red-500/20 text-red-500',
    info:    'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-secondary)]',
  };
  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'info' ? Clock : XCircle;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 px-4 py-3 rounded-2xl border text-sm font-medium max-w-sm w-full ${styles[toast.type]}`}
    >
      <Icon size={17} className="shrink-0 mt-0.5" />
      <span className="flex-1">{toast.msg}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-[var(--text-muted)] hover:text-[var(--primary)] transition shrink-0 mt-0.5">
        <X size={15} />
      </button>
    </motion.div>
  );
}

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div aria-live="polite" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 items-center pointer-events-none px-4 w-full">
      <AnimatePresence mode="sync">
        {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />)}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SUB-COMPONENT: Confirm Delete Overlay
══════════════════════════════════════════════ */
function ConfirmDeleteDialog({ card, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="mt-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl space-y-3"
    >
      <div className="flex items-start gap-2 text-red-500 text-sm font-medium">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
        <p>¿Eliminar la tarjeta <strong>{card.brand} •••• {card.last4}</strong>? Esta acción no se puede deshacer.</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onCancel} className="flex-1 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] text-sm font-black uppercase tracking-widest transition">
          Cancelar
        </button>
        <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-black uppercase tracking-widest hover:bg-red-600 transition shadow-lg shadow-red-500/20">
          Sí, eliminar
        </button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   SUB-COMPONENT: PaymentCard
══════════════════════════════════════════════ */
const BRAND_COLOR = {
  Visa:       'text-[var(--primary)]',
  Mastercard: 'text-[#F59E0B]',
  Amex:       'text-[#10B981]',
  Tarjeta:    'text-[var(--text-secondary)]',
};

function PaymentCard({ card, loadingKey, confirmId, onSetDefault, onRemove, onConfirmRemove, onCancelRemove }) {
  const isSettingDefault = loadingKey === `default_${card.id}`;
  const isRemoving       = loadingKey === `remove_${card.id}`;
  const isConfirming     = confirmId  === card.id;

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-5 transition shadow-sm">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center ${BRAND_COLOR[card.brand] ?? 'text-[var(--text-secondary)]'}`}>
          <CreditCard size={22} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="font-black text-[var(--text-primary)] text-sm">{card.brand} •••• {card.last4}</span>
            {card.isDefault && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded-full uppercase tracking-tighter border border-[var(--primary)]/10">
                <Star size={9} fill="currentColor" /> Predeterminada
              </span>
            )}
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-medium">Caduca {card.expiry}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {!card.isDefault && (
            <button
              onClick={() => onSetDefault(card.id)}
              disabled={!!loadingKey}
              className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl transition disabled:opacity-50"
            >
              {isSettingDefault ? <Loader2 size={14} className="animate-spin" /> : 'Establecer principal'}
            </button>
          )}
          <button
            onClick={() => onRemove(card.id)}
            disabled={!!loadingKey || card.isDefault}
            className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
            title={card.isDefault ? 'No puedes eliminar la tarjeta predeterminada' : 'Eliminar'}
          >
            {isRemoving ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
          </button>
        </div>
      </div>

      {/* Confirm delete */}
      <AnimatePresence>
        {isConfirming && (
          <ConfirmDeleteDialog
            card={card}
            onConfirm={() => onConfirmRemove(card.id)}
            onCancel={onCancelRemove}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SUB-COMPONENT: BillingRow
══════════════════════════════════════════════ */
const STATUS_META = {
  paid: { label: 'Pagada',  cls: 'text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/10', Icon: CheckCircle2 },
  free: { label: 'Gratuita', cls: 'text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)]',    Icon: Clock },
  fail: { label: 'Fallida',  cls: 'text-red-500 bg-red-500/10 border border-red-500/10', Icon: XCircle },
};

function BillingRow({ inv, downloading, onDownload }) {
  const meta = STATUS_META[inv.status] ?? STATUS_META.free;
  const isDownloading = downloading === inv.id;

  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-elevated)] transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-black text-[var(--text-primary)] text-sm leading-snug">{inv.concept}</p>
        <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">{inv.date}</p>
      </div>
      <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
        <span className="font-black text-[var(--text-primary)] text-sm">{inv.amount}</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${meta.cls}`}>
          <meta.Icon size={10} /> {meta.label}
        </span>
      </div>
      {inv.status === 'paid' && (
        <button
          onClick={() => onDownload(inv)}
          disabled={isDownloading}
          className="ml-1 p-2 rounded-xl hover:bg-[#EEF2FF] hover:text-[#4F46E5] text-[#94A3B8] transition disabled:opacity-50"
          title="Descargar factura"
        >
          {isDownloading
            ? <Loader2 size={17} className="animate-spin text-[#4F46E5]" />
            : <Download size={17} />}
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   SUB-COMPONENT: Add Card Modal
══════════════════════════════════════════════ */
function formatCardNumber(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function AddCardModal({ onClose, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [errors, setErrors] = useState({});

  const handle = (field, formatter) => e => {
    const val = formatter ? formatter(e.target.value) : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    const digits = form.number.replace(/\s/g, '');
    if (digits.length < 16)         e.number = 'Introduce 16 dígitos.';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Formato MM/AA.';
    if (form.cvc.length < 3)        e.cvc    = 'CVC inválido.';
    if (!form.name.trim())          e.name   = 'Introduce el titular.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="bg-white border border-[#E2E8F0] rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-[#0F172A]">Añadir Tarjeta</h3>
            <p className="text-xs text-[#64748B] font-medium flex items-center gap-1 mt-0.5">
              <Lock size={11} className="text-[#10B981]" /> Conexión segura (Stripe Elements)
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F8FAFC] rounded-xl transition text-[#94A3B8]">
            <X size={20} />
          </button>
        </div>

        {/* Card preview */}
        <div className="h-40 bg-gradient-to-br from-[#1E1B4B] to-[#0f0f14] rounded-2xl p-6 flex flex-col justify-between border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[var(--primary)]/10 transition-colors duration-700" />
          <div className="flex justify-between items-start relative z-10">
            <div className="w-12 h-8 bg-gradient-to-br from-amber-400/80 to-amber-200/50 rounded-md backdrop-blur-sm border border-white/20" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
              Premium Account
            </span>
          </div>
          <div className="relative z-10">
            <p className="font-mono text-xl font-black tracking-[0.2em] text-white">
              {form.number || '•••• •••• •••• ••••'}
            </p>
            <div className="flex justify-between items-end mt-4">
              <div className="space-y-0.5">
                <span className="text-[8px] text-white/40 uppercase font-black tracking-widest">Titular</span>
                <p className="text-xs font-bold text-white/90 tracking-wider">
                  {form.name || 'NOMBRE APELLIDO'}
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[8px] text-white/40 uppercase font-black tracking-widest">Exp</span>
                <p className="text-xs font-bold text-white/90 tracking-wider">
                  {form.expiry || 'MM/AA'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cardholder */}
          <div>
            <label className="block text-xs font-black text-[var(--text-secondary)] mb-2 uppercase tracking-widest ml-1">Titular</label>
            <input
              value={form.name}
              onChange={handle('name')}
              placeholder="Ej. Juan Pérez"
              className={`w-full bg-[var(--bg-surface)] border rounded-xl py-3 px-4 outline-none text-[var(--text-primary)] font-bold uppercase placeholder:normal-case placeholder:text-[var(--text-muted)] transition shadow-sm ${errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.name}</p>}
          </div>

          {/* Card number */}
          <div>
            <label className="block text-xs font-black text-[var(--text-secondary)] mb-2 uppercase tracking-widest ml-1">Número de tarjeta</label>
            <input
              inputMode="numeric"
              value={form.number}
              onChange={handle('number', formatCardNumber)}
              placeholder="4242 4242 4242 4242"
              className={`w-full bg-[var(--bg-surface)] border rounded-xl py-3 px-4 outline-none text-[var(--text-primary)] font-mono font-bold tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:text-[var(--text-muted)] transition shadow-sm ${errors.number ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]'}`}
            />
            {errors.number && <p className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.number}</p>}
          </div>

          {/* Expiry + CVC */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-black text-[var(--text-secondary)] mb-2 uppercase tracking-widest ml-1">Caducidad</label>
              <input
                inputMode="numeric"
                value={form.expiry}
                onChange={handle('expiry', formatExpiry)}
                placeholder="MM/AA"
                className={`w-full bg-[var(--bg-surface)] border rounded-xl py-3 px-4 outline-none text-[var(--text-primary)] font-mono font-bold placeholder:font-sans placeholder:text-[var(--text-muted)] transition shadow-sm ${errors.expiry ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]'}`}
              />
              {errors.expiry && <p className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.expiry}</p>}
            </div>
            <div className="w-28">
              <label className="block text-xs font-black text-[var(--text-secondary)] mb-2 uppercase tracking-widest ml-1">CVC</label>
              <input
                inputMode="numeric"
                value={form.cvc}
                onChange={handle('cvc', v => v.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                type="password"
                className={`w-full bg-[var(--bg-surface)] border rounded-xl py-3 px-4 outline-none text-[var(--text-primary)] font-bold transition shadow-sm ${errors.cvc ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]'}`}
              />
              {errors.cvc && <p className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.cvc}</p>}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black uppercase tracking-widest transition shadow-xl
              ${isSubmitting
                ? 'bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-wait'
                : 'bg-[var(--primary)] text-white hover:opacity-90 shadow-[var(--primary)]/20'}`}
          >
            {isSubmitting
              ? <><Loader2 size={18} className="animate-spin" /> Verificando…</>
              : <><CreditCard size={18} /> Guardar Tarjeta</>}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT: PaymentSettings
══════════════════════════════════════════════ */
export default function PaymentSettings() {
  const { toasts, addToast, dismissToast } = useToast();
  const {
    methods, billing,
    loadingKey, confirmId, setConfirmId,
    showModal, setShowModal,
    downloading,
    handleSetDefault, handleRemove, handleAddCard, handleDownload,
  } = usePayments(addToast);

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <AnimatePresence>
        {showModal && (
          <AddCardModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddCard}
            isSubmitting={loadingKey === 'add_card'}
          />
        )}
      </AnimatePresence>

      <section className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-xl font-black text-[var(--text-primary)]">Métodos de Pago</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Gestiona tus tarjetas y consulta el historial de facturación.</p>
        </div>

        {/* Cards List */}
        <div className="space-y-3">
          <AnimatePresence>
            {methods.map(card => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
              >
                <PaymentCard
                  card={card}
                  loadingKey={loadingKey}
                  confirmId={confirmId}
                  onSetDefault={handleSetDefault}
                  onRemove={id => setConfirmId(id)}
                  onConfirmRemove={handleRemove}
                  onCancelRemove={() => setConfirmId(null)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add card button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl border-2 border-dashed border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all font-black uppercase tracking-widest text-xs"
          >
            <Plus size={18} /> Añadir nuevo método de pago
          </button>
        </div>

        {/* Billing History */}
        <div>
          <h3 className="font-black text-[var(--text-primary)] text-lg mb-4">Historial de Facturación</h3>
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
            {billing.map(inv => (
              <BillingRow
                key={inv.id}
                inv={inv}
                downloading={downloading}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
