import { useState, useCallback } from 'react';

/* ── Validation ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (v) => {
  if (!v.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(v)) return 'Invalid email format.';
  return '';
};

const validatePassword = (v, isLogin) => {
  if (!v) return 'Password is required.';
  if (!isLogin && v.length < 8) return 'Minimum 8 characters.';
  return '';
};

/* ── Mock APIs ── */
async function mockOAuth(provider) {
  await new Promise(r => setTimeout(r, 1500));
  if (Math.random() < 0.07) throw new Error(`Connection error with ${provider}. Please try again.`);
  return { user: { email: `user@${provider.toLowerCase()}.com` } };
}

async function mockEmailAuth(email, password, isLogin) {
  await new Promise(r => setTimeout(r, 1200));
  // Simulate known bad password for demo
  if (password === 'wrong') throw new Error('Incorrect password. Please try again.');
  if (!isLogin && Math.random() < 0.05) throw new Error('This email is already registered.');
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
      addToast('success', isLogin ? 'Welcome back!' : 'Account created successfully!');
      
      setTimeout(() => {
        const plan = sessionStorage.getItem('selected_plan');
        if (plan === 'premium') {
          navigate('/checkout');
        } else {
          navigate('/dashboard');
        }
      }, 600);
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
      addToast('success', `Session started with ${provider}.`);
      
      setTimeout(() => {
        const plan = sessionStorage.getItem('selected_plan');
        if (plan === 'premium') {
          navigate('/checkout');
        } else {
          navigate('/dashboard');
        }
      }, 600);
    } catch (ex) {
      addToast('error', ex.message);
    } finally {
      setLoadingBtn(null);
    }
  }, [addToast, navigate]);

  const handleForgotPassword = useCallback(() => {
    if (!email) {
      setEmailError('Enter your email to recover your password.');
      return;
    }
    setLoadingBtn('email');
    setTimeout(() => {
      setLoadingBtn(null);
      addToast('success', 'We have sent you an email to reset your password.');
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