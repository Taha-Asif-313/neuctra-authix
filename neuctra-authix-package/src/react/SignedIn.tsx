"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
}) => {
  const authix = useAuthix();
  const [mounted, setMounted] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    const getSession = async () => {
      try {
        const session = await authix.checkUserSession();
        setSignedIn(!!session?.authenticated);
      } catch {
        setSignedIn(false);
      }
    };

    getSession();
  }, [authix]);

  if (!mounted) return null; // Prevent SSR mismatch

  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  // While loading (signedIn === null), show fallback if exists, else nothing
  if (signedIn === null) return renderNode(fallback) ?? null;

  // If not signed in, show fallback
  if (!signedIn) return renderNode(fallback);

  // Signed in → render children
  return <>{children}</>;
};
