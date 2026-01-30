"use client";

import React, { createContext, useContext } from "react";

export interface AuthixLike {
  checkSession: () => Promise<{ authenticated: boolean }>;
}

const AuthixContext = createContext<AuthixLike | null>(null);

export const AuthixProvider = ({
  authix,
  children,
}: {
  authix: AuthixLike;
  children: React.ReactNode;
}) => {
  return (
    <AuthixContext.Provider value={authix}>
      {children}
    </AuthixContext.Provider>
  );
};

export const useAuthix = () => {
  const ctx = useContext(AuthixContext);
  if (!ctx) {
    throw new Error(
      "useAuthix must be used inside <AuthixProvider />"
    );
  }
  return ctx;
};
