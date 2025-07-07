"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import Preloader from './Preloader';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, setUser: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserState(user);
      setLoading(false);
      if (user) {
        localStorage.setItem("lotr-current-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("lotr-current-user");
      }
    });
    return () => unsubscribe();
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("lotr-current-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("lotr-current-user");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 