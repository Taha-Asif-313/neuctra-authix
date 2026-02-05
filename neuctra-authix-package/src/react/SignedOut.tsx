"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
}) => {
  const [mounted, setMounted] = useState(false);
  const [signedOut, setSignedOut] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    // Read JS-accessible cookie
    const cookies = document.cookie.split(";").map((c) => c.trim());

    const authFlag = cookies.find((c) => c.startsWith("a_s_b="));

    // signed out if flag is missing or not "true"
    setSignedOut(authFlag?.split("=")[1] !== "true");
  }, []);

  if (!mounted) return null; // prevent hydration mismatch

  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  if (signedOut === null) return renderNode(fallback) ?? null;
  if (!signedOut) return renderNode(fallback);

  return <>{children}</>;
};
