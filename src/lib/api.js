const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  /**
   * Register a new user
   * @param {string} email 
   * @param {string} plan 'free' | 'premium'
   */
  signup: async (email, plan) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, plan }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Error al registrarse');
    }
    
    return response.json();
  },

  /**
   * Resend verification email
   * @param {string} email 
   */
  resendVerification: async (email) => {
    const response = await fetch(`${API_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('No se pudo reenviar el correo');
    }
    
    return response.json();
  },

  /**
   * Verify email with token
   * @param {string} token 
   */
  verifyEmail: async (token) => {
    const response = await fetch(`${API_URL}/auth/verify-email?token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Token inválido o expirado');
    }

    return response.json(); // Expected to return { user, token }
  }
};
