import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { updateUserProfile } from '../lib/db';

export function useUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setProfile({ id: docSnap.id, ...docSnap.data() });
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error listening to user profile:", error);
                    setLoading(false);
                });
                return () => unsubscribeDoc();
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const updateProfile = async (data) => {
        if (!auth.currentUser) throw new Error("No authenticated user");
        await updateUserProfile(auth.currentUser.uid, data);
    };

    return { profile, loading, updateProfile };
}
