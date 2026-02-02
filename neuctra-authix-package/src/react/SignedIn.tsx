"use client";

import React, { ReactNode, useEffect, useState } from "react";

/**
 * Minimal contract your UI needs.
 * Cookie-based session check
 */
export interface AuthixLike {
  getSession: () => Promise<{ authenticated: boolean }>;
}

interface ReactSignedInProps {
  authix: AuthixLike;
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  loading?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  authix,
  children,
  fallback = null,
  loading = null,
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
        setSignedIn(!!session?.authenticated);
      } catch {
        setSignedIn(false);
      }
    };

    checkSession();
  }, [authix]);

  // ⛔ Prevent SSR / hydration mismatch
  if (!mounted) return null;

  // ⏳ Loading state
  if (signedIn === null) {
    return typeof loading === "function" ? loading() : loading;
  }

  // ❌ Not signed in
  if (!signedIn) {
    return typeof fallback === "function" ? fallback() : fallback;
  }

  // ✅ Signed in
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
