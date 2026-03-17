import { useState, useCallback } from 'react';

/* ── Mock data ── */
export const INITIAL_METHODS = [
  { id: 'pm_1', brand: 'Visa',       last4: '4242', expiry: '08/27', isDefault: true  },
  { id: 'pm_2', brand: 'Mastercard', last4: '8810', expiry: '03/26', isDefault: false },
];

export const INITIAL_BILLING = [
  { id: 'inv_001', date: '12 Mar 2026', concept: 'Plan Pro · Marzo 2026',    amount: '7.99 €',  status: 'paid' },
  { id: 'inv_002', date: '12 Feb 2026', concept: 'Plan Pro · Febrero 2026',  amount: '7.99 €',  status: 'paid' },
  { id: 'inv_003', date: '12 Ene 2026', concept: 'Plan Pro · Enero 2026',    amount: '7.99 €',  status: 'paid' },
  { id: 'inv_004', date: '12 Dic 2025', concept: 'Plan Free (Alta)',          amount: '0.00 €',  status: 'free' },
];

/* ── Mock async API helpers ── */
const delay = (ms = 900) => new Promise(r => setTimeout(r, ms));

async function apiSetDefault(id)       { await delay(); if (Math.random() < 0.05) throw new Error('Error de red. Inténtalo de nuevo.'); }
async function apiRemoveCard(id)       { await delay(700); }
async function apiAddCard(data)        { await delay(1300); if (data.number.startsWith('0')) throw new Error('Tarjeta rechazada por el banco.'); }
async function apiDownloadInvoice(id)  { await delay(600); }

/* ════════════════════════════════════════════
   HOOK: usePayments
════════════════════════════════════════════ */
export function usePayments(addToast) {
  const [methods,      setMethods]      = useState(INITIAL_METHODS);
  const [billing]                       = useState(INITIAL_BILLING);
  const [loadingKey,   setLoadingKey]   = useState(null);   // generic loading keyed by action
  const [confirmId,    setConfirmId]    = useState(null);   // id waiting for delete confirmation
  const [showModal,    setShowModal]    = useState(false);
  const [downloading,  setDownloading]  = useState(null);   // invoice id being downloaded

  /* ── Set default card ── */
  const handleSetDefault = useCallback(async (id) => {
    const prev = methods;
    setMethods(m => m.map(c => ({ ...c, isDefault: c.id === id })));
    setLoadingKey(`default_${id}`);
    try {
      await apiSetDefault(id);
      addToast('success', 'Tarjeta establecida como predeterminada.');
    } catch (err) {
      setMethods(prev);
      addToast('error', err.message);
    } finally {
      setLoadingKey(null);
    }
  }, [methods, addToast]);

  /* ── Remove card ── */
  const handleRemove = useCallback(async (id) => {
    setConfirmId(null);
    setLoadingKey(`remove_${id}`);
    try {
      await apiRemoveCard(id);
      setMethods(m => m.filter(c => c.id !== id));
      addToast('success', 'Método de pago eliminado.');
    } catch (err) {
      addToast('error', err.message);
    } finally {
      setLoadingKey(null);
    }
  }, [addToast]);

  /* ── Add card ── */
  const handleAddCard = useCallback(async (formData) => {
    setLoadingKey('add_card');
    try {
      await apiAddCard(formData);
      const newCard = {
        id: `pm_${Date.now()}`,
        brand: detectBrand(formData.number),
        last4: formData.number.replace(/\s/g, '').slice(-4),
        expiry: formData.expiry,
        isDefault: false,
      };
      setMethods(m => [...m, newCard]);
      setShowModal(false);
      addToast('success', `Tarjeta ${newCard.brand} •••• ${newCard.last4} añadida correctamente.`);
    } catch (err) {
      addToast('error', err.message);
    } finally {
      setLoadingKey(null);
    }
  }, [addToast]);

  /* ── Download invoice (simulated) ── */
  const handleDownload = useCallback(async (inv) => {
    setDownloading(inv.id);
    addToast('info', `Preparando factura ${inv.id}…`);
    try {
      await apiDownloadInvoice(inv.id);
      // Create a simple text Blob simulating a PDF download
      const blob = new Blob(
        [`FACTURA\n${inv.id}\n${inv.concept}\nImporte: ${inv.amount}\nFecha: ${inv.date}\n\n© Killer Control`],
        { type: 'text/plain' }
      );
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `${inv.id}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      addToast('success', 'Factura descargada correctamente.');
    } catch {
      addToast('error', 'Error al descargar la factura.');
    } finally {
      setDownloading(null);
    }
  }, [addToast]);

  return {
    methods, billing,
    loadingKey, confirmId, setConfirmId,
    showModal, setShowModal,
    downloading,
    handleSetDefault, handleRemove, handleAddCard, handleDownload,
  };
}

/* ── util: detect card brand from number ── */
function detectBrand(number) {
  const n = number.replace(/\s/g, '');
  if (n.startsWith('4'))      return 'Visa';
  if (/^5[1-5]/.test(n))     return 'Mastercard';
  if (/^3[47]/.test(n))      return 'Amex';
  return 'Tarjeta';
}
