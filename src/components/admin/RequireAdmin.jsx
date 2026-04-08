import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/AuthContext';

// For prototype simplicity, we allow these emails. 
// In production, use Custom Claims (auth.token.claims.admin)
const ADMIN_EMAILS = ['admin@killercontrol.com', 'marcxicola@gmail.com']; 

export default function RequireAdmin({ children }) {
  const { user, loading } = useCurrentUser();

  if (loading) return <div className="p-10 text-center">Loading admin check...</div>;

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
