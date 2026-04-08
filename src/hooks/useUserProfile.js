import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { updateProfile as updateAuthProfile } from 'firebase/auth';

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
                    } else {
                        // Handle case where auth exists but firestore doc doesn't
                        setProfile({ id: user.uid, email: user.email });
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

    /**
     * Updates Firestore profile data and optionally Firebase Auth profile
     * @param {Object} data - Fields to update in Firestore
     * @param {Object} [authData] - Optional: { displayName, photoURL } to update in Auth
     */
    const updateProfile = async (data, authData = null) => {
        if (!auth.currentUser) throw new Error("No authenticated user");
        
        // 1. Update Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, data, { merge: true });

        // 2. Update Firebase Auth (Display Name / Photo) if provided
        if (authData) {
            await updateAuthProfile(auth.currentUser, authData);
        }
    };

    return { profile, loading, updateProfile };
}
