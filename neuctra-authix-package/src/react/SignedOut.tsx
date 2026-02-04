"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
}) => {
  const authix = useAuthix();
  const [mounted, setMounted] = useState(false);
  const [signedOut, setSignedOut] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    const getSession = async () => {
      try {
        const session = await authix.checkUserSession();
        setSignedOut(!session?.authenticated);
      } catch {
        setSignedOut(true);
      }
    };

    getSession();
  }, [authix]);

  if (!mounted) return null; // Prevent SSR mismatch

  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  // While loading (signedOut === null), show fallback if exists, else nothing
  if (signedOut === null) return renderNode(fallback) ?? null;

  // If user is signed in, show fallback
  if (!signedOut) return renderNode(fallback);

  // Signed out → render children
  return <>{children}</>;
};
