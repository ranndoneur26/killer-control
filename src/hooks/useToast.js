import { useState, useCallback, useRef } from 'react';

/**
 * Shared toast hook — re-usable across all settings sections.
 * Returns { toasts, addToast, dismissToast }
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const addToast = useCallback((type, msg, duration = 3500) => {
    const id = ++counter.current;
    setToasts(p => [...p, { id, type, msg }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration);
  }, []);

  const dismissToast = useCallback(id => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
}
