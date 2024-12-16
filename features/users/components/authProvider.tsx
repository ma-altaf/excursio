"use client";

import { onAuthStateChanged, User } from "firebase/auth";

import { createContext, useState, useEffect, use } from "react";
import { auth } from "../services/auth";

type authContext = {
  authLoading: boolean;
  user: User | null;
};

const AuthContext = createContext<authContext | null>(null);

export default function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const subscibe = onAuthStateChanged(auth, (res) => {
      setUser(res);
      setAuthLoading(false);
    });

    return () => {
      subscibe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuthContect must be within a AuthContextProvider");
  }
  return context;
}
