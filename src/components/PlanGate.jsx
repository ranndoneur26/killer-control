import React from 'react';
import { usePlan } from '../hooks/usePlan';
import { useNavigate } from 'react-router-dom';

export function PlanGate({ requires, children, fallback }) {
  const { plan } = usePlan();
  const navigate = useNavigate();

  // If requires is premium and user is free, gate it.
  if (requires === 'premium' && plan !== 'premium') {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-xl text-center shadow-sm w-full">
        <p className="text-gray-600 mb-4 font-medium">Esta función es solo para usuarios <strong className="text-amber-500">Premium</strong>.</p>
        <button 
          onClick={() => navigate('/checkout')}
          className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20"
        >
          Mejorar a Premium
        </button>
      </div>
    );
  }
  return <>{children}</>;
}
