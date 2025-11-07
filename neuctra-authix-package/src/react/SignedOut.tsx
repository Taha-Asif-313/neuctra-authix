"use client";
import React, { ReactNode, useEffect, useState } from "react";

const isUserSignedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const userInfo = localStorage.getItem("userInfo");
    return Boolean(userInfo && userInfo !== "undefined" && userInfo !== "null");
  } catch {
    return false;
  }
};

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode;
  width?: string;
  height?: string;
}

/**
 * ReactSignedOut
 * Renders its children only when the user is NOT signed in.
 * Safe for SSR and reactive to auth changes.
 */
export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
  width,
  height,
}) => {
  const [signedOut, setSignedOut] = useState(!isUserSignedIn());

  useEffect(() => {
    const check = () => setSignedOut(!isUserSignedIn());
    check();

    // Sync with other tabs or when auth state changes
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  if (!signedOut) return <>{fallback}</>;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "middle",
        width,
        height,
      }}
    >
      {children}
    </span>
  );
};
