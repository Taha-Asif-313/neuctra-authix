"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  loading?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
  loading = null,
  className = "",
  width,
  height,
}) => {
  const authix = useAuthix();
  const [mounted, setMounted] = useState(false);
  const [signedOut, setSignedOut] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkSession = async () => {
      try {
        const session = await authix.getSession();
        setSignedOut(!session?.authenticated);
      } catch {
        setSignedOut(true);
      }
    };

    checkSession();
  }, [authix]);

  if (!mounted) return null;

  if (signedOut === null) return typeof loading === "function" ? loading() : loading;

  if (!signedOut) return typeof fallback === "function" ? fallback() : fallback;

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", width, height }}
    >
      {children}
    </div>
  );
};
