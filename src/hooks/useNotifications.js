import { useState, useCallback, useRef } from 'react';
import { useUserProfile } from './useUserProfile';

/* ═══════════════════════════════════════════════
   HOOK: useNotifications
   - Uses Firestore (via useUserProfile) for state
   - Returns toasts array + dismiss helper
═══════════════════════════════════════════════ */
export function useNotifications() {
  const { profile, updateProfile } = useUserProfile();
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

  /* Toggle handler */
  const handleToggle = useCallback(async (key) => {
    if (!profile) return;
    const previousValue = profile[key] !== undefined ? profile[key] : true; // default true except pushEnabled handled below
    const nextValue = !previousValue;

    setSaving(s => ({ ...s, [key]: true }));

    try {
      await updateProfile({ [key]: nextValue });
      addToast('success', 'Preferencias actualizadas correctamente.');
    } catch (err) {
      addToast('error', err.message || 'Error occurred while saving');
    } finally {
      setSaving(s => ({ ...s, [key]: false }));
    }
  }, [profile, updateProfile, addToast]);

  const prefs = {
    notif_novedades: profile?.notif_novedades ?? true,
    notif_resumenes_mensuales: profile?.notif_resumenes_mensuales ?? true,
    notif_alertas_proximos_cargos: profile?.notif_alertas_proximos_cargos ?? true,
    notif_push_activada: profile?.notif_push_activada ?? false,
    notif_push_renovaciones: profile?.notif_push_renovaciones ?? true,
    notif_alertas_login: profile?.notif_alertas_login ?? true,
    notif_alertas_cambios: profile?.notif_alertas_cambios ?? true,
  };

  return { prefs, saving, toasts, dismissToast, handleToggle };
}
