import { useState, useCallback } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { app } from '../lib/firebase';
import { createUserProfile } from '../lib/db';

const auth = getAuth(app);

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
      }

      // Ensure the user profile exists in Firestore (critical for new signups)
      await createUserProfile(userCredential.user);

      addToast('success', isLogin ? 'Welcome back!' : 'Account created successfully!');

      const plan = sessionStorage.getItem('selected_plan') || 'free';
      if (plan === 'premium' && !isLogin) {
        navigate('/checkout'); // e.g. stripe integration
      } else {
        navigate('/dashboard');
      }

    } catch (ex) {
      console.error("Auth error:", ex);
      let errMsg = "Authentication failed.";
      if (ex.code === 'auth/email-already-in-use') errMsg = "This email is already registered.";
      if (ex.code === 'auth/wrong-password' || ex.code === 'auth/invalid-credential') errMsg = "Incorrect credentials. Please try again.";
      if (ex.code === 'auth/user-not-found') errMsg = "No account found for this email.";
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
      } else if (providerName === 'Apple') {
        provider = new OAuthProvider('apple.com');
      }

      const result = await signInWithPopup(auth, provider);

      // Ensure profile exists. If it's a first-time OAuth login, it creates it.
      await createUserProfile(result.user);

      addToast('success', `Session started with ${providerName}.`);

      const plan = sessionStorage.getItem('selected_plan') || 'free';
      // Basic logic: if they want premium from landing page
      if (plan === 'premium') {
        navigate('/checkout');
      } else {
        navigate('/dashboard');
      }
    } catch (ex) {
      console.error("OAuth error:", ex);
      addToast('error', `Failed to authenticate with ${providerName}.`);
    } finally {
      setLoadingBtn(null);
    }
  }, [addToast, navigate]);

  const handleForgotPassword = useCallback(async () => {
    if (!email) {
      setEmailError('Enter your email to recover your password.');
      return;
    }
    setLoadingBtn('email');
    try {
      await sendPasswordResetEmail(auth, email);
      addToast('success', 'We have sent you an email to reset your password.');
    } catch (error) {
      console.error("Forgot password error", error);
      addToast('error', 'Could not send reset email. Verify your address.');
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