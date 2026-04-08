import { useState, useCallback } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUserProfile } from '../lib/db';

/* ── Validation ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (v) => {
  if (!v.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(v)) return 'Invalid email format.';
  return '';
};

const validatePassword = (v, isLogin) => {
  if (!v) return 'Password is required.';
  if (!isLogin) {
    if (v.length < 8) return 'Minimum 8 characters.';
    if (!/[A-Z]/.test(v)) return 'Must include an uppercase letter.';
    if (!/[0-9]/.test(v)) return 'Must include a number.';
    if (!/[^A-Za-z0-9]/.test(v)) return 'Must include a special character.';
  }
  return '';
};

/* ═══════════════════════════════════════════
   HOOK: useAuth
   ═══════════════════════════════════════════ */
export function useAuth(addToast, navigate) {
  const [isLogin, setIsLogin] = useState(false);    // false = Register
  const [step, setStep] = useState('email');   // 'email' | 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(null); // null | 'email' | 'google' | 'apple'

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
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Send Verification Email for new signups
        await sendEmailVerification(userCredential.user);
      }

      // Ensure the user profile exists in Firestore (critical for new signups)
      await createUserProfile(userCredential.user);

      if (!isLogin) {
        // For new signups, go to confirmation page
        navigate(`/check-email?email=${encodeURIComponent(email)}${plan ? `&plan=${plan}` : ''}`);
      } else {
        addToast('success', 'Welcome back!');
        const storedPlan = sessionStorage.getItem('selected_plan');
        if (storedPlan && storedPlan !== 'free') {
          navigate(`/checkout?plan=${storedPlan}`);
        }
        // No manual navigate to /dashboard; let RedirectIfAuthenticated handle it
      }

    } catch (ex) {
      console.error("Auth error:", ex);
      let errMsg = "Authentication failed.";
      if (ex.code === 'auth/email-already-in-use') {
        errMsg = "Este email ya está registrado. ¿Quieres iniciar sesión o recuperar tu contraseña?";
      } else if (ex.code === 'auth/wrong-password' || ex.code === 'auth/invalid-credential') {
        errMsg = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
      } else if (ex.code === 'auth/user-not-found') {
        errMsg = "No se encontró ninguna cuenta con este email.";
      } else if (ex.code === 'auth/too-many-requests') {
        errMsg = "Demasiados intentos. Por favor, inténtalo más tarde.";
      }
      addToast('error', errMsg);
    } finally {
      setLoadingBtn(null);
    }
  }, [email, password, isLogin, addToast, navigate]);

  const handleOAuth = useCallback(async (providerName) => {
    setLoadingBtn(providerName.toLowerCase());
    try {
      let provider;
      if (providerName === 'Google') {
        provider = new GoogleAuthProvider();
      }

      const result = await signInWithPopup(auth, provider);

      // Ensure profile exists. If it's a first-time OAuth login, it creates it.
      await createUserProfile(result.user);

      addToast('success', `Session started with ${providerName}.`);

      const storedPlan = sessionStorage.getItem('selected_plan');
      if (storedPlan && storedPlan !== 'free') {
        navigate(`/checkout?plan=${storedPlan}`);
      }
      // No manual navigate to /dashboard; let RedirectIfAuthenticated handle it
    } catch (ex) {
      console.error(`[Auth Debug] Details with ${providerName}:`, {
        code: ex.code,
        message: ex.message,
        full: ex
      });
      addToast('error', `Failed to authenticate with ${providerName}.`);
    } finally {
      setLoadingBtn(null);
    }
  }, [addToast, navigate]);

  const handleForgotPassword = useCallback(async () => {
    if (!email) {
      setEmailError('Enter your email to recover your password.');
      return false;
    }
    setLoadingBtn('email');
    try {
      await sendPasswordResetEmail(auth, email);
      addToast('success', 'Te hemos enviado un email para restablecer tu contraseña.');
      return true;
    } catch (error) {
      console.error("Forgot password error", error);
      let errMsg = 'No se pudo enviar el email de recuperación.';
      if (error.code === 'auth/user-not-found') errMsg = 'No existe una cuenta con este email.';
      if (error.code === 'auth/too-many-requests') errMsg = 'Demasiados intentos. Prueba más tarde.';
      addToast('error', errMsg);
      return false;
    } finally {
      setLoadingBtn(null);
    }
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