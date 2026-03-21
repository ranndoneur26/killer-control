import { useState, useEffect } from 'react';

// Limits configuration
export const PLAN_LIMITS = {
  free: {
    maxSubscriptions: 3,
    historyMonths: 3,
    canExport: false,
    canUseAdvancedAlerts: false,
    canSeePriceIncreases: false,
    canSeePromoEnd: false,
  },
  premium: {
    maxSubscriptions: Infinity,
    historyMonths: Infinity,
    canExport: true,
    canUseAdvancedAlerts: true,
    canSeePriceIncreases: true,
    canSeePromoEnd: true,
  },
};

export function usePlan() {
  // In a real app with backend, this would come from useAuth().user.plan
  // For this SPA prototype, we read from the session storage where we stored it during login
  // We use a state to ensure reactivity if it changes (though usually it changes on login)
  
  const [plan, setPlan] = useState('free');

  useEffect(() => {
    // Simulate fetching plan from secure session
    const storedPlan = sessionStorage.getItem('selected_plan');
    if (storedPlan === 'premium') {
      setPlan('premium');
    } else {
      setPlan('free');
    }
    
    // Listen for storage changes in case of multi-tab or immediate updates
    const handleStorage = () => {
       const p = sessionStorage.getItem('selected_plan');
       setPlan(p === 'premium' ? 'premium' : 'free');
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;

  return {
    plan,
    limits,
    isFree: plan === 'free',
    isPremium: plan === 'premium',
    canAddSubscription: (currentCount) => {
      if (plan === 'premium') return true;
      return currentCount < limits.maxSubscriptions;
    }
  };
}
