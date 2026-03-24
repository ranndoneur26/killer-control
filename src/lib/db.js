import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Creates a new user profile document in Firestore if it doesn't exist.
 * Uses default values according to the Killer Control schema.
 * 
 * @param {Object} user - The Firebase Auth user object
 * @param {Object} additionalData - Any extra data to save (e.g., nombre if coming from a custom form)
 */
export const createUserProfile = async (user, additionalData = {}) => {
    if (!user || !user.uid) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        const { email, displayName, photoURL } = user;

        try {
            await setDoc(userRef, {
                uid: user.uid,
                email: email || '',
                nombre: displayName || additionalData.nombre || '',
                plan: 'free',
                avatarUrl: photoURL || '',

                // Notification Preferences
                notif_novedades: true,
                notif_resumenes_mensuales: true,
                notif_alertas_proximos_cargos: true,
                notif_push_activada: false,
                notif_push_renovaciones: true,

                // Appearance
                tema: 'sistema',
                densidad: 'normal',
                idioma: 'es',

                createdAt: serverTimestamp(),
                ...additionalData // allow override if necessary
            });
        } catch (error) {
            console.error("Error creating user profile", error);
        }
    }
};

/**
 * Fetches a user profile document from Firestore.
 * 
 * @param {string} uid - The user's Firebase Auth UID
 * @returns {Object|null} The user data, or null if it doesn't exist
 */
export const getUserProfile = async (uid) => {
    if (!uid) return null;

    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            return userSnapshot.data();
        }
        return null;
    } catch (error) {
        console.error("Error fetching user profile", error);
        return null;
    }
};

/**
 * Updates an existing user profile document.
 * 
 * @param {string} uid - The user's Firebase Auth UID
 * @param {Object} data - The object containing fields to update
 */
export const updateUserProfile = async (uid, data) => {
    if (!uid) return;

    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, data);
    } catch (error) {
        console.error("Error updating user profile", error);
        throw error;
    }
};

// ---------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------

/**
 * Adds a new subscription to the user's subscriptions subcollection.
 * 
 * @param {string} uid - The user's Firebase Auth UID
 * @param {Object} subscriptionData - The subscription object aligned with the schema
 * @returns {string} The ID of the newly created subscription document
 */
export const addSubscription = async (uid, subscriptionData) => {
    if (!uid) throw new Error("User ID is required");

    try {
        const subsRef = collection(db, 'users', uid, 'subscriptions');
        const docRef = await addDoc(subsRef, {
            ...subscriptionData,
            creado_en: serverTimestamp(),
            actualizado_en: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding subscription", error);
        throw error;
    }
};

/**
 * Fetches all subscriptions for a specific user.
 * 
 * @param {string} uid - The user's Firebase Auth UID
 * @returns {Array} An array of subscription objects containing their IDs
 */
export const getUserSubscriptions = async (uid) => {
    if (!uid) return [];

    try {
        const subsRef = collection(db, 'users', uid, 'subscriptions');
        const subsSnapshot = await getDocs(subsRef);

        return subsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching subscriptions", error);
        return [];
    }
};

/**
 * Updates a specific subscription document.
 * 
 * @param {string} uid - The user's Firebase Auth UID
 * @param {string} subId - The subscription document ID
 * @param {Object} data - The fields to update
 */
export const updateSubscription = async (uid, subId, data) => {
    if (!uid || !subId) throw new Error("User ID and Subscription ID are required");

    try {
        const subRef = doc(db, 'users', uid, 'subscriptions', subId);
        await updateDoc(subRef, {
            ...data,
            actualizado_en: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating subscription", error);
        throw error;
    }
};

/**
 * Deletes a specific subscription document.
 * 
 * @param {string} uid - The user's Firebase Auth UID
 * @param {string} subId - The subscription document ID
 */
export const deleteSubscription = async (uid, subId) => {
    if (!uid || !subId) throw new Error("User ID and Subscription ID are required");

    try {
        const subRef = doc(db, 'users', uid, 'subscriptions', subId);
        await deleteDoc(subRef);
    } catch (error) {
        console.error("Error deleting subscription", error);
        throw error;
    }
};
