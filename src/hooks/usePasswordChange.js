import { useState } from 'react';

const COMPLEXITY_RULES = [
  { id: 'length',  label: 'Mínimo 8 caracteres',        test: v => v.length >= 8 },
  { id: 'upper',   label: 'Una letra mayúscula',         test: v => /[A-Z]/.test(v) },
  { id: 'number',  label: 'Un número',                   test: v => /\d/.test(v) },
  { id: 'special', label: 'Un carácter especial (!@#…)', test: v => /[^A-Za-z0-9]/.test(v) },
];

/** Mock API — simulates a 1.2s server round-trip */
async function mockChangePasswordAPI({ current, next }) {
  await new Promise(r => setTimeout(r, 1200));
  if (current === 'wrong') throw new Error('La contraseña actual no es correcta.');
  return { ok: true };
}

export function usePasswordChange() {
  const [fields, setFields] = useState({ current: '', next: '', confirm: '' });
  const [show,   setShow]   = useState({ current: false, next: false, confirm: false });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = key => e => setFields(f => ({ ...f, [key]: e.target.value }));
  const toggleShow = key => () => setShow(s => ({ ...s, [key]: !s[key] }));

  // Validation
  const complexityResults = COMPLEXITY_RULES.map(r => ({ ...r, passed: r.test(fields.next) }));
  const complexityOk = complexityResults.every(r => r.passed);
  const matchOk = fields.next === fields.confirm && fields.confirm !== '';
  const formOk  = fields.current !== '' && complexityOk && matchOk;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formOk) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await mockChangePasswordAPI({ current: fields.current, next: fields.next });
      setStatus('success');
      setFields({ current: '', next: '', confirm: '' });
      // Auto-reset success banner after 4s
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return {
    fields, update,
    show, toggleShow,
    complexityResults, complexityOk, matchOk, formOk,
    status, errorMsg,
    handleSubmit,
  };
}
