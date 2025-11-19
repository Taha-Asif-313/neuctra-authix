"use client";
import React, { ReactNode, useEffect, useState } from "react";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode;
  width?: string;
  height?: string;
}

/**
 * ReactSignedOut
 * Renders children ONLY when user is NOT signed in.
 * Fully SSR-safe and window-safe.
 */
export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
  width,
  height,
}) => {
  // Prevent SSR window access by defaulting to "signed out"
  const [signedOut, setSignedOut] = useState(true);

  useEffect(() => {
    const isUserSignedIn = () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        return Boolean(
          userInfo && userInfo !== "undefined" && userInfo !== "null"
        );
      } catch {
        return false;
      }
    };

    const check = () => setSignedOut(!isUserSignedIn());

    check(); // Run on mount

    // Sync with other tabs
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
