import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldCheck, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { t } = useLanguage();

    const [oobCode] = useState(searchParams.get('oobCode'));
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('loading'); // loading, input, success, error
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!oobCode) {
            setStatus('error');
            return;
        }

        // Verify the reset code and get user email
        verifyPasswordResetCode(auth, oobCode)
            .then(userEmail => {
                setEmail(userEmail);
                setStatus('input');
            })
            .catch(error => {
                console.error("Link invalid or expired", error);
                setStatus('error');
            });
    }, [oobCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            addToast('error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setStatus('success');
            addToast('success', 'Contraseña actualizada correctamente.');
        } catch (error) {
            console.error("Error resetting password", error);
            addToast('error', 'No se pudo actualizar la contraseña. Reintenta.');
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] p-8 shadow-xl text-center">
                <div className="mb-8 flex justify-center">
                    <Logo className="h-12" />
                </div>

                {status === 'loading' && (
                    <div className="py-12">
                        <Loader2 className="animate-spin h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                        <p className="text-[var(--text-secondary)] font-medium">Validando enlace...</p>
                    </div>
                )}

                {status === 'input' && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Nueva Contraseña</h1>
                            <p className="text-sm text-[var(--text-secondary)]">Restableciendo cuenta de <strong>{email}</strong></p>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="Escribe tu nueva contraseña"
                                autoFocus
                                className="w-full bg-[var(--bg)] text-[var(--text-primary)] rounded-2xl py-4 px-5 pr-12 outline-none border border-[var(--border)] shadow-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)] transition"
                            >
                                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Actualizar Contraseña'}
                        </button>
                    </form>
                )}

                {status === 'success' && (
                    <div className="py-8 space-y-6">
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">¡Contraseña Cambiada!</h2>
                            <p className="text-[var(--text-secondary)] font-medium">
                                Ya puedes entrar de nuevo en Killer Control con tu nueva clave.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                        >
                            Ir a Iniciar Sesión <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="py-8 space-y-6 text-center">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="rotate-45" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">Enlace no válido</h2>
                            <p className="text-[var(--text-secondary)] font-medium">
                                El enlace de recuperación ha caducado o ya ha sido utilizado.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] font-bold py-4 rounded-2xl hover:bg-[var(--bg-elevated)] transition-all"
                        >
                            Volver al Inicio
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
