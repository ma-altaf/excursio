"use client";

import { onAuthStateChanged, User } from "firebase/auth";

import { createContext, useState, useEffect, use } from "react";
import { auth } from "./auth";

type authContext = {
  user: User | null;
};

const AuthContext = createContext<authContext | null>(null);

export default function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscibe = onAuthStateChanged(auth, (res) => {
      setUser(res);
    });

    return () => {
      subscibe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuthContect must be within a AuthContextProvider");
  }
  return context;
}
