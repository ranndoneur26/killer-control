import { useState } from 'react';

/** Mock API — simulates QR seed generation */
async function mockGenerate2FASecret() {
  await new Promise(r => setTimeout(r, 800));
  return {
    secret: 'JBSWY3DPEHPK3PXP',
    // A real QR would be a data-URI; we use a placeholder URL
    qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=otpauth://totp/KillerControl:usuario@killercontrol.app?secret=JBSWY3DPEHPK3PXP&issuer=KillerControl',
  };
}

/** Mock API — accepts any 6-digit code as valid for demo */
async function mockVerifyOTP(otp) {
  await new Promise(r => setTimeout(r, 1000));
  if (otp.length !== 6 || !/^\d{6}$/.test(otp)) throw new Error('Código inválido. Introduce exactamente 6 dígitos.');
  return { ok: true };
}

export function use2FA(initialEnabled = false) {
  const [enabled,    setEnabled]    = useState(initialEnabled);
  const [stage,      setStage]      = useState('idle'); // idle | setup | verifying | active | disabling
  const [qrData,     setQrData]     = useState(null);
  const [otp,        setOtp]        = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error2FA,   setError2FA]   = useState('');

  const startSetup = async () => {
    setStage('setup');
    setLoadingMsg('Generando código QR…');
    setError2FA('');
    try {
      const data = await mockGenerate2FASecret();
      setQrData(data);
      setLoadingMsg('');
    } catch {
      setStage('idle');
      setError2FA('Error al generar el QR. Inténtalo de nuevo.');
      setLoadingMsg('');
    }
  };

  const handleToggle = () => {
    if (enabled) {
      // Disable flow: simple confirm in UI (no extra page needed)
      setEnabled(false);
      setStage('idle');
      setQrData(null);
      setOtp('');
    } else {
      startSetup();
    }
  };

  const handleVerify = async () => {
    setStage('verifying');
    setError2FA('');
    try {
      await mockVerifyOTP(otp);
      setEnabled(true);
      setStage('active');
      setOtp('');
    } catch (err) {
      setStage('setup'); // stay on setup
      setError2FA(err.message);
    }
  };

  const handleOtpChange = e => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(val);
    setError2FA('');
  };

  const cancel = () => {
    setStage('idle');
    setQrData(null);
    setOtp('');
    setError2FA('');
  };

  return {
    enabled, stage, qrData, otp, loadingMsg, error2FA,
    handleToggle, handleOtpChange, handleVerify, cancel,
  };
}
