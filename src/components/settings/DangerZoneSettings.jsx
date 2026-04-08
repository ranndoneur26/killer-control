import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { useToast } from '../../hooks/useToast';
import { usePlan } from '../../hooks/usePlan';
import { useLanguage } from '../../contexts/LanguageContext';
import { PlanGate } from '../PlanGate';
import { Download, Trash2, AlertOctagon, FileText, Database } from 'lucide-react';

export default function DangerZoneSettings() {
  const { isPremium } = usePlan();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    // Simulación de delay de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExporting(false);
    addToast('success', `Datos exportados correctamente en formato ${format.toUpperCase()}.`);
  };

  const handleDeleteAccount = async () => {
    // 1. Sin confirmación, acción directa "One-Click"
    setIsDeleting(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      // 2. Eliminar datos de Firestore
      await deleteDoc(doc(db, 'users', user.uid));

      // 3. Eliminar usuario de Authentication
      await deleteUser(user);

      // 4. Redirección inmediata
      navigate('/signup');
      addToast('success', 'Cuenta eliminada. Hasta la vista, Killer.');
    } catch (error) {
      console.error("Error eliminando cuenta:", error);
      setIsDeleting(false);

      if (error.code === 'auth/requires-recent-login') {
        addToast('error', 'Por seguridad, necesitas volver a iniciar sesión para realizar esta acción.');
      } else {
        addToast('error', 'No se pudo eliminar la cuenta. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="border-b border-red-100 dark:border-red-900/30 pb-6">
        <h2 className="text-xl font-black text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertOctagon size={24} /> {t('profile.danger.title')}
        </h2>
        <p className="text-sm text-red-500/80 font-medium mt-1">{t('profile.danger.subtitle')}</p>
      </div>

      {/* Export Data Section (Mantenido del contexto anterior) */}
      <div className="space-y-4">
        <h3 className="font-bold text-[var(--text-secondary)] text-sm uppercase tracking-wider ml-1">{t('profile.danger.exportSection')}</h3>

        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--bg-elevated)] p-3 rounded-xl text-[var(--primary)]">
              <Database size={24} />
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)]">{t('profile.danger.exportTitle')}</h4>
              <p className="text-xs text-[var(--text-secondary)]">{t('profile.danger.exportDesc')}</p>
            </div>
          </div>

          <PlanGate requires="premium" fallback={
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-between border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-bold text-gray-500 flex items-center gap-2"><Download size={16} /> Exportar CSV / PDF</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded border border-amber-200 uppercase tracking-wider notranslate" translate="no">PREMIUM</span>
            </div>
          }>
            <div className="flex gap-4">
              <button
                onClick={() => handleExport('csv')}
                disabled={isExporting}
                className="flex-1 bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 hover:shadow-sm"
              >
                <FileText size={18} /> {t('profile.danger.exportBtn')}
              </button>
              <button
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="flex-1 bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 hover:shadow-sm"
              >
                <FileText size={18} /> {t('profile.danger.exportBtn')}
              </button>
            </div>
          </PlanGate>
        </div>
      </div>

      {/* Delete Account Section (REQUERIMIENTO PRINCIPAL) */}
      <div className="space-y-4 pt-8 border-t border-[var(--border)]">
        <h3 className="font-bold text-red-500 text-sm uppercase tracking-wider ml-1">{t('profile.danger.deleteSection')}</h3>

        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-8 relative overflow-visible">

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-md">
              <h4 className="font-black text-red-700 dark:text-red-400 text-lg mb-2">{t('profile.danger.deleteTitle')}</h4>
              <p className="text-sm text-red-600/80 dark:text-red-300 font-medium leading-relaxed">
                {t('profile.danger.deleteDesc')}
              </p>
            </div>

            {/* Contenedor del Botón con Tooltip (Group) */}
            <div className="group relative">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="
                     relative z-20
                     bg-[#DC2626] hover:bg-[#B91C1C] 
                     text-white font-black 
                     py-4 px-8 rounded-xl 
                     shadow-lg shadow-red-500/20 hover:shadow-red-500/40
                     flex items-center gap-3 
                     transition-all duration-300 transform active:scale-95 
                     disabled:opacity-70 disabled:cursor-wait disabled:scale-100 whitespace-nowrap
                   "
              >
                {isDeleting ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    {t('profile.danger.deleting')}
                  </>
                ) : (
                  <>
                    <Trash2 size={20} />
                    {t('profile.danger.deleteBtn')}
                  </>
                )}
              </button>

              {/* Tooltip Temático Flotante */}
              <div className="
                   absolute right-0 bottom-full mb-4 w-72 
                   p-4 bg-gray-900 text-white text-xs font-bold text-center leading-relaxed
                   rounded-xl shadow-2xl 
                   opacity-0 group-hover:opacity-100 
                   transition-all duration-300 ease-out transform translate-y-4 group-hover:translate-y-0
                   pointer-events-none z-50
                 ">
                {/* Flecha del Tooltip */}
                <div className="absolute right-12 top-full -mt-1 border-8 border-transparent border-t-gray-900"></div>
                {t('profile.danger.tooltipText')}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
