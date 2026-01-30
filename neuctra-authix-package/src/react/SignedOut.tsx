"use client";

import React, { ReactNode, useEffect, useState } from "react";

/**
 * Same minimal contract as ReactSignedIn
 */
export interface AuthixLike {
  getSession: () => Promise<{ authenticated: boolean }>;
}

interface ReactSignedOutProps {
  authix: AuthixLike;
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  authix,
  children,
  fallback = null,
  className = "",
  width,
  height,
}) => {
  const [mounted, setMounted] = useState(false);
  const [signedOut, setSignedOut] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkSession = async () => {
      try {
        const session = await authix.getSession();
        setSignedOut(!session?.authenticated);
      } catch {
        // If session fails → treat as signed out
        setSignedOut(true);
      }
    };

    checkSession();

    // Optional: cross-tab auth updates
    const onStorage = () => checkSession();
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [authix]);

  // ⛔ Prevent SSR/CSR mismatch
  if (!mounted || signedOut === null) return null;

  if (!signedOut) {
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
