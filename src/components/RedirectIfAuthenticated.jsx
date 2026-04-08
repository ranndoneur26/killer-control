import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/AuthContext';

export default function RedirectIfAuthenticated({ children }) {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');

  if (user) {
    const target = plan ? `/checkout?plan=${plan}` : '/dashboard';
    return <Navigate to={target} replace />;
  }

  return children;
}
