import { useState, useCallback, useRef } from 'react';

/* ─── Mock async API ─────────────────────────────
   Simulates a PATCH /user/notification-settings call.
   Pass failKey to simulate a specific key failing (for testing).
─────────────────────────────────────────────────── */
async function patchNotificationSettings(key, value) {
  await new Promise(r => setTimeout(r, 700)); // simulate network latency

  // Simulate a random failure (10% chance) so you can see rollback in action
  if (Math.random() < 0.1) {
    throw new Error(`Error al guardar "${key}". Inténtalo de nuevo.`);
  }

  return { ok: true, key, value };
}

/* ─── Initial preferences ─────────────────────── */
const INITIAL_PREFS = {
  emailNews:         true,
  emailSummary:      true,
  emailRenewals:     true,
  pushEnabled:       false,
  pushRenewals:      true,
  alertLogin:        true,
  alertAccountChange: true,
};

/* ═══════════════════════════════════════════════
   HOOK: useNotifications
   - Optimistic update on toggle
   - Auto-save via mock API call
   - Rollback on failure
   - Returns toasts array + dismiss helper
═══════════════════════════════════════════════ */
export function useNotifications() {
  const [prefs, setPrefs]   = useState(INITIAL_PREFS);
  const [saving, setSaving] = useState({}); // { [key]: boolean }
  const [toasts, setToasts] = useState([]); // { id, type, msg }
  const toastId = useRef(0);

  /* Show a toast for 3.5s then auto-dismiss */
  const addToast = useCallback((type, msg) => {
    const id = ++toastId.current;
    setToasts(p => [...p, { id, type, msg }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  const dismissToast = useCallback(id => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  /* Optimistic toggle with rollback */
  const handleToggle = useCallback(async (key) => {
    const previousValue = prefs[key];
    const nextValue     = !previousValue;

    // 1. Optimistic update
    setPrefs(p => ({ ...p, [key]: nextValue }));
    setSaving(s => ({ ...s, [key]: true }));

    try {
      // 2. Async save
      await patchNotificationSettings(key, nextValue);
      addToast('success', 'Preferencias actualizadas correctamente.');
    } catch (err) {
      // 3. Rollback
      setPrefs(p => ({ ...p, [key]: previousValue }));
      addToast('error', err.message);
    } finally {
      setSaving(s => ({ ...s, [key]: false }));
    }
  }, [prefs, addToast]);

  return { prefs, saving, toasts, dismissToast, handleToggle };
}
