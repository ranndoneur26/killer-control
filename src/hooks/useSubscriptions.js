import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot;

    // Listen to auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        const subsRef = collection(db, 'users', user.uid, 'subscriptions');

        unsubscribeSnapshot = onSnapshot(subsRef, (snapshot) => {
          const subs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setSubscriptions(subs);
          setLoading(false);
        }, (error) => {
          console.error("Error connecting to real-time subscriptions:", error);
          setLoading(false);
        });
      } else {
        if (unsubscribeSnapshot) unsubscribeSnapshot();
        setSubscriptions([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return {
    subscriptions,
    count: subscriptions.length,
    loading
  };
}
