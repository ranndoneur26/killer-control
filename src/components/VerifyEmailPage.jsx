import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verificando tu cuenta...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token no encontrado.');
      return;
    }

    const verify = async () => {
      try {
        const { user, token: authToken } = await api.verifyEmail(token);
        
        setStatus('success');
        setMessage('Correo verificado correctamente.');
        
        // Log user in
        login(user, authToken);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'El enlace ha caducado o no es válido.');
      }
    };

    verify();
  }, [token, login, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 max-w-md w-full text-center border border-gray-100 flex flex-col items-center">
        
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verificando...</h2>
            <p className="text-gray-500">Por favor, espera un momento.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Cuenta Activada!</h2>
            <p className="text-green-600 font-medium mb-6">{message}</p>
            <p className="text-sm text-gray-400">Redirigiendo a tu panel de control...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <XCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Enlace caducado</h2>
            <p className="text-red-500 font-medium mb-8">{message}</p>
            
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              Volver al inicio
            </button>
            <button 
              onClick={() => navigate('/login?plan=premium')}
              className="mt-4 text-sm text-gray-500 font-medium hover:text-indigo-600 transition-colors"
            >
              Solicitar nuevo enlace
            </button>
          </>
        )}
      </div>
    </div>
  );
}
