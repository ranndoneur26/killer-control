import React, { useState } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useToast } from '../../hooks/useToast';
import { auth } from '../../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Mail, User, Lock, Save, Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ProfileSettings() {
  const { profile, updateProfile } = useUserProfile();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [displayName, setDisplayName] = useState(profile?.nombre || profile?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Sync state when profile loads
  React.useEffect(() => {
    if (profile) {
      setDisplayName(profile.nombre || profile.displayName || '');
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update both Firestore and Auth Profile
      await updateProfile(
        { nombre: displayName }, // Firestore
        { displayName } // Auth
      );
      addToast('success', t('profile.personal.updateSuccess'));
    } catch (error) {
      console.error(error);
      addToast('error', t('profile.personal.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!profile?.email) return;
    try {
      await sendPasswordResetEmail(auth, profile.email);
      setResetSent(true);
      addToast('success', t('profile.personal.resetSuccess'));
    } catch (error) {
      addToast('error', t('profile.personal.resetError'));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-[var(--border)] pb-6">
        <h2 className="text-xl font-black text-[var(--text-primary)]">{t('profile.personal.title')}</h2>
        <p className="text-sm text-[var(--text-secondary)] font-medium mt-1">{t('profile.personal.subtitle')}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-xl">
        {/* Display Name */}
        <div>
          <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">{t('profile.personal.displayName')}</label>
          <div className="relative">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={t('profile.personal.namePlaceholder')}
              className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl py-3 px-4 pl-10 text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
            />
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          </div>
        </div>

        {/* Read-Only Email (Direct from Auth) */}
        <div>
          <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">{t('profile.personal.email')}</label>
          <div className="relative opacity-60">
            <input
              type="email"
              value={auth.currentUser?.email || ''}
              readOnly
              disabled
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-3 px-4 pl-10 text-sm font-medium cursor-not-allowed"
            />
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2 ml-1">
            {t('profile.personal.emailNote')}
          </p>
        </div>

        {/* Password Reset */}
        <div className="pt-4 border-t border-[var(--border)]">
          <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2">{t('profile.personal.password')}</label>
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={resetSent}
            className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors disabled:opacity-50"
          >
            <Lock size={16} />
            {resetSent ? t('profile.personal.resetSentNote') : t('profile.personal.resetPassword')}
          </button>
        </div>

        {/* Save Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-[var(--primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {t('profile.personal.save')}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
