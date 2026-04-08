import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserProfile } from '../lib/db';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // Asegurar que loading es true al empezar el cambio
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          // Recuperar el perfil de Firestore
          const userProfile = await getUserProfile(firebaseUser.uid);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error in onAuthStateChanged:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    dashboardId: profile?.dashboardId || null,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useCurrentUser
 * Hook global para acceder al usuario autenticado por Firebase
 * Renombrado para evitar colisiones con useAuth (que maneja formularios)
 */
export function useCurrentUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within an AuthProvider');
  }
  return context;
}

// Alias para compatibilidad con otros archivos que importan useAuth
export const useAuth = useCurrentUser;
