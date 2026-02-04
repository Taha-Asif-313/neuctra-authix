"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  loading?: ReactNode | (() => ReactNode);
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
  loading = null,
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
          borderTop: "4px solid #e74c3c",
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

  if (signedOut === null) {
    return renderNode(loading) ?? defaultLoader;
  }

  if (!signedOut) {
    return renderNode(fallback);
  }

  return <>{children}</>;
};
