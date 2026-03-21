import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useToast } from '../hooks/useToast';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.74 22.37 10.04H12V14.22H17.92C17.65 15.6 16.89 16.74 15.72 17.5V20.22H19.26C21.34 18.32 22.56 15.54 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.46 22.02 19.26 20.22L15.72 17.5C14.73 18.16 13.48 18.57 12 18.57C9.13 18.57 6.7 16.63 5.82 14.04H2.17V16.86C3.99 20.46 7.7 23 12 23Z" fill="#34A853"/>
    <path d="M5.82 14.04C5.59 13.38 5.46 12.7 5.46 12C5.46 11.3 5.59 10.62 5.82 9.96V7.14H2.17C1.42 8.63 1 10.27 1 12C1 13.73 1.42 15.37 2.17 16.86L5.82 14.04Z" fill="#FBBC05"/>
    <path d="M12 5.43C13.62 5.43 15.06 5.98 16.21 7.07L19.34 3.94C17.45 2.18 14.97 1 12 1C7.7 1 3.99 3.54 2.17 7.14L5.82 9.96C6.7 7.37 9.13 5.43 12 5.43Z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const plan = searchParams.get('plan') || 'free';
  const isPremium = plan === 'premium';

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un email válido.');
      setLoading(false);
      return;
    }

    try {
      await api.signup(email, plan);
      // Redirect to check-email with the email in query params for easy display/resend
      navigate(`/check-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message || 'Error al registrarse. Inténtalo de nuevo.');
      addToast('error', err.message || 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isPremium ? 'Comienza tu prueba Premium' : 'Crea tu cuenta gratis'}
        </h2>
        {isPremium && (
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">
            4,99 €/mes después del periodo de prueba
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-2 transition-colors"
            >
              <GoogleIcon /> Continuar con Google
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 gap-2 transition-colors"
            >
              <AppleIcon /> Continuar con Apple
            </button>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-bold uppercase tracking-wider text-xs">
                O por correo electrónico
              </span>
            </div>
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  className={`block w-full pl-10 sm:text-sm rounded-md py-3 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} placeholder-gray-400 focus:outline-none`}
                  placeholder="ejemplo@correo.com"
                  disabled={loading}
                />
              </div>
              {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Continuar'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
            <p>
              Al continuar, aceptas nuestros{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 underline">Términos de servicio</a>
              {' '}y{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 underline">Política de privacidad</a>.
            </p>
            <p>
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="font-bold text-indigo-600 hover:text-indigo-500">
                Acceso
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
