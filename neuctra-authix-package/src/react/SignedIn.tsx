"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  loading?: ReactNode | (() => ReactNode);
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
  loading = null,
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

  // Helper to render node or call function if provided
  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  // Default loader
  const defaultLoader = (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          border: "4px solid rgba(0,0,0,0.1)",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (signedIn === null) {
    return renderNode(loading) ?? defaultLoader;
  }

  if (!signedIn) {
    return renderNode(fallback);
  }

  return <>{children}</>;
};
