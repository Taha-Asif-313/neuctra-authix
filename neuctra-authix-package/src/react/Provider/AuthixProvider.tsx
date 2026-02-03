"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { NeuctraAuthix } from "../../sdk/index.js";

/* ----------------------------------
 * Context type = FULL SDK
 * ---------------------------------- */
export type AuthixContextValue = NeuctraAuthix;

/* ----------------------------------
 * Context
 * ---------------------------------- */
const AuthixContext = createContext<AuthixContextValue | null>(null);

/* ----------------------------------
 * Provider
 * ---------------------------------- */
export const AuthixProvider = ({
  authix,
  children,
}: {
  authix: NeuctraAuthix;
  children: ReactNode;
}) => {
  return (
    <AuthixContext.Provider value={authix}>
      {children}
    </AuthixContext.Provider>
  );
};

/* ----------------------------------
 * Hook
 * ---------------------------------- */
export const useAuthix = (): AuthixContextValue => {
  const ctx = useContext(AuthixContext);
  if (!ctx) {
    throw new Error("useAuthix must be used inside <AuthixProvider />");
  }
  return ctx;
};
