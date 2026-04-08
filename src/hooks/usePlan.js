import { useUserProfile } from './useUserProfile';
import { useSubscriptions } from './useSubscriptions';

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
  const { profile, loading: profileLoading } = useUserProfile();
  const { count } = useSubscriptions();

  // 1. Determine Plan Status
  // We trust the 'plan' field, but we can double-check expiration if needed.
  // In a robust system, a backend webhook updates 'plan' to 'free' when the period actually ends.
  const rawPlan = profile?.plan || 'free';
  const status = profile?.subscriptionStatus || 'active'; // 'active', 'canceled_at_period_end', 'past_due'
  
  // Logic: User is Premium if plan is premium. 
  // Even if 'canceled_at_period_end', they are still Premium until the date passes.
  const isPremium = rawPlan === 'premium';
  
  // 2. Identify Grace Period (Cancellation scheduled)
  const isCanceled = profile?.cancelAtPeriodEnd === true || status === 'canceled_at_period_end';
  
  // 3. Get Expiration Date
  // Handle Firestore Timestamp or ISO string
  let periodEnd = null;
  if (profile?.currentPeriodEnd) {
    periodEnd = profile.currentPeriodEnd.toDate ? profile.currentPeriodEnd.toDate() : new Date(profile.currentPeriodEnd);
  }

  const limits = PLAN_LIMITS[isPremium ? 'premium' : 'free'];

  // 4. Graceful Degradation Logic (The "Zombie Data" State)
  // If user is Free but has 15 subs, they are "Over Limit".
  const isOverLimit = !isPremium && count > limits.maxSubscriptions;

  return {
    plan: isPremium ? 'premium' : 'free',
    status,
    limits,
    loading: profileLoading,
    isFree: !isPremium,
    isPremium,
    isCanceled, // True if user canceled but still has access
    periodEnd,  // Date object or null
    isOverLimit, // Use this to show "Archive your subs" banners
    
    // Check if user can add more subscriptions based on their current count
    canAddSubscription: (currentCount = count) => {
      if (isPremium) return true;
      return currentCount < limits.maxSubscriptions;
    }
  };
}
