import { useState, useCallback } from 'react';

/* ── Validation ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (v) => {
  if (!v.trim()) return 'El correo es obligatorio.';
  if (!EMAIL_RE.test(v)) return 'Formato de correo no válido.';
  return '';
};

const validatePassword = (v, isLogin) => {
  if (!v) return 'La contraseña es obligatoria.';
  if (!isLogin && v.length < 8) return 'Mínimo 8 caracteres.';
  return '';
};

/* ── Mock APIs ── */
async function mockOAuth(provider) {
  await new Promise(r => setTimeout(r, 1500));
  if (Math.random() < 0.07) throw new Error(`Error de conexión con ${provider}. Inténtalo de nuevo.`);
  return { user: { email: `user@${provider.toLowerCase()}.com` } };
}

async function mockEmailAuth(email, password, isLogin) {
  await new Promise(r => setTimeout(r, 1200));
  // Simulate known bad password for demo
  if (password === 'wrong') throw new Error('Contraseña incorrecta. Inténtalo de nuevo.');
  if (!isLogin && Math.random() < 0.05) throw new Error('Este correo ya está registrado.');
  return { user: { email } };
}

/* ═══════════════════════════════════════════
   HOOK: useAuth
═══════════════════════════════════════════ */
export function useAuth(addToast, navigate) {
  const [isLogin,       setIsLogin]       = useState(false);    // false = Register
  const [step,          setStep]          = useState('email');   // 'email' | 'password'
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [showPassword,  setShowPassword]  = useState(false);
  const [emailError,    setEmailError]    = useState('');
  const [passError,     setPassError]     = useState('');
  const [loadingBtn,    setLoadingBtn]    = useState(null); // null | 'email' | 'google' | 'apple'

  const toggleMode = useCallback(() => {
    setIsLogin(v => !v);
    setStep('email');
    setEmail('');
    setPassword('');
    setEmailError('');
    setPassError('');
  }, []);

  /* Step 1: validate email, reveal password field */
  const handleEmailContinue = useCallback((e) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError('');
    setStep('password');
  }, [email]);

  const backToEmail = useCallback(() => {
    setStep('email');
    setPassword('');
    setPassError('');
  }, []);

  /* Step 2: submit login or register */
  const handlePasswordSubmit = useCallback(async (e) => {
    e.preventDefault();
    const err = validatePassword(password, isLogin);
    if (err) { setPassError(err); return; }
    setPassError('');

    setLoadingBtn('email');
    try {
      await mockEmailAuth(email, password, isLogin);
      addToast('success', isLogin ? '¡Bienvenido de nuevo!' : '¡Cuenta creada correctamente!');
      setTimeout(() => navigate('/dashboard'), 600);
    } catch (ex) {
      addToast('error', ex.message);
    } finally {
      setLoadingBtn(null);
    }
  }, [email, password, isLogin, addToast, navigate]);

  const handleOAuth = useCallback(async (provider) => {
    setLoadingBtn(provider.toLowerCase());
    try {
      await mockOAuth(provider);
      addToast('success', `Sesión iniciada con ${provider}.`);
      setTimeout(() => navigate('/dashboard'), 600);
    } catch (ex) {
      addToast('error', ex.message);
    } finally {
      setLoadingBtn(null);
    }
  }, [addToast, navigate]);

  const handleForgotPassword = useCallback(() => {
    if (!email) {
      setEmailError('Introduce tu email para recuperar la contraseña.');
      return;
    }
    setLoadingBtn('email');
    setTimeout(() => {
      setLoadingBtn(null);
      addToast('success', 'Te hemos enviado un email para restablecer tu contraseña.');
    }, 1000);
  }, [email, addToast]);

  return {
    isLogin, toggleMode,
    step, backToEmail,
    email, setEmail, emailError, setEmailError,
    password, setPassword, showPassword, setShowPassword, passError, setPassError,
    loadingBtn,
    handleEmailContinue, handlePasswordSubmit, handleOAuth, handleForgotPassword,
  };
}
