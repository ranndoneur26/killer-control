import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { getUserSubscriptions } from '../lib/db';
import { onAuthStateChanged } from 'firebase/auth';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser;

    // Listen to auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const subs = await getUserSubscriptions(user.uid);
          setSubscriptions(subs);
        } catch (error) {
          console.error("Error fetching subscriptions", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSubscriptions([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return {
    subscriptions,
    count: subscriptions.length,
    loading
  };
}
