import { useState } from 'react';
import { MOCK_SUBSCRIPTIONS } from '../data/mockSubscriptions';

export function useSubscriptions() {
  // Currently using mock data. In a real implementation, this would read from a Context or Store.
  const [subscriptions] = useState(MOCK_SUBSCRIPTIONS);

  return {
    subscriptions,
    count: subscriptions.length
  };
}
