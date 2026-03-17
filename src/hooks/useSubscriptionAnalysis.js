import { useMemo } from 'react';
import {
  analyzeSubscription,
  getAlertedSubscriptions,
  totalPotentialSavings,
} from '../utils/analyzeSubscription';

/**
 * React hook that runs the analysis engine over a list of subscriptions.
 *
 * @param {import('../types/subscription').Subscription[]} subscriptions
 * @returns {{
 *   analyzed:          { sub: import('../types/subscription').Subscription, analysis: import('../types/subscription').SubscriptionAnalysis }[],
 *   alerted:           { sub: import('../types/subscription').Subscription, analysis: import('../types/subscription').SubscriptionAnalysis }[],
 *   potentialSavings:  number,
 *   highAlerts:        number,
 * }}
 */
export function useSubscriptionAnalysis(subscriptions) {
  return useMemo(() => {
    const analyzed = subscriptions.map(sub => ({
      sub,
      analysis: analyzeSubscription(sub),
    }));

    const alerted = getAlertedSubscriptions(subscriptions);

    const potentialSavings = totalPotentialSavings(subscriptions);

    const highAlerts = alerted.filter(
      ({ analysis }) => analysis.alert?.severity === 'high'
    ).length;

    return { analyzed, alerted, potentialSavings, highAlerts };
  }, [subscriptions]);
}
