"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  loading?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
  loading = null,
  className = "",
  width,
  height,
}) => {
  const authix = useAuthix();
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

  if (!mounted) return null; // Prevent SSR mismatch

  if (signedIn === null) return typeof loading === "function" ? loading() : loading;

  if (!signedIn) return typeof fallback === "function" ? fallback() : fallback;

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", width, height }}
    >
      {children}
    </div>
  );
};
