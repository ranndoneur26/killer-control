import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export default function CheckEmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleResend = async () => {
    setLoading(true);
    try {
      await api.resendVerification(email);
      addToast('success', 'Correo de verificación reenviado.');
    } catch (err) {
      addToast('error', 'No se pudo reenviar el correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 max-w-md w-full text-center border border-gray-100">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={32} />
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-4">Revisa tu correo</h2>
        
        <p className="text-gray-600 mb-6 font-medium leading-relaxed">
          Hemos enviado un enlace de confirmación a <strong className="text-gray-900 block mt-1">{email}</strong>
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Haz clic en el enlace del correo para activar tu cuenta y comenzar tu prueba Premium.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => window.location.href = `mailto:`}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            Abrir aplicación de correo
          </button>

          <button 
            onClick={handleResend}
            disabled={loading}
            className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Reenviar correo'}
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400 font-medium">
          ¿No lo recibes? Revisa tu carpeta de Spam.
        </p>
      </div>
    </div>
  );
}
