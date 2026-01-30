"use client";

import React, { ReactNode, useEffect, useState } from "react";

/**
 * Minimal contract your UI needs.
 * Any Authix-like SDK can satisfy this.
 */
export interface AuthixLike {
  getSession: () => Promise<{ authenticated: boolean }>;
}

interface ReactSignedInProps {
  authix: AuthixLike;
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  authix,
  children,
  fallback = null,
  className = "",
  width,
  height,
}) => {
  const [mounted, setMounted] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkSession = async () => {
      try {
        const session = await authix.getSession();
        setSignedIn(Boolean(session?.authenticated));
      } catch {
        setSignedIn(false);
      }
    };

    checkSession();

    // Optional: re-check on cross-tab auth changes
    const onStorage = () => checkSession();
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [authix]);

  // ⛔ Prevent SSR/CSR mismatch
  if (!mounted || signedIn === null) return null;

  if (!signedIn) {
    return typeof fallback === "function" ? fallback() : fallback;
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};
