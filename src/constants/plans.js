export const PLANS = {
    PREMIUM_MONTHLY: 'premium-monthly',
    PREMIUM_YEARLY: 'premium-yearly',
    PREMIUM: 'premium', // Default fallback
};

export const STRIPE_PRICE_IDS = {
    [PLANS.PREMIUM_MONTHLY]: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_MONTHLY || 'price_monthly_placeholder',
    [PLANS.PREMIUM_YEARLY]: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_YEARLY || 'price_yearly_placeholder',
    [PLANS.PREMIUM]: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_MONTHLY || 'price_monthly_placeholder',
};

export const getPlanFromParam = (param) => {
    if (!param) return null;
    const lower = param.toLowerCase();
    if (lower === PLANS.PREMIUM_MONTHLY) return PLANS.PREMIUM_MONTHLY;
    if (lower === PLANS.PREMIUM_YEARLY) return PLANS.PREMIUM_YEARLY;
    if (lower === 'premium') return PLANS.PREMIUM_MONTHLY; // Default to monthly
    return null;
};
