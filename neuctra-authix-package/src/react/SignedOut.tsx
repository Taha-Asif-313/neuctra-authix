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
  loading?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  authix,
  children,
  fallback = null,
  loading = null,
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
        // If session check fails → treat as signed out
        setSignedOut(true);
      }
    };

    checkSession();
  }, [authix]);

  // ⛔ Prevent SSR / hydration mismatch
  if (!mounted) return null;

  // ⏳ Loading state
  if (signedOut === null) {
    return typeof loading === "function" ? loading() : loading;
  }

  // ❌ User is signed IN → show fallback
  if (!signedOut) {
    return typeof fallback === "function" ? fallback() : fallback;
  }

  // ✅ User is signed OUT
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
