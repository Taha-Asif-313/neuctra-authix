"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
}) => {
  const [mounted, setMounted] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);

    const cookies = document.cookie.split(";").map((c) => c.trim());

    const authFlag = cookies.find((c) => c.startsWith("a_s_b="));

    // signed in ONLY if a_s_b === "true"
    setSignedIn(authFlag?.split("=")[1] === "true");
  }, []);

  if (!mounted) return null; // prevent hydration mismatch

  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  if (signedIn === null) return renderNode(fallback) ?? null;
  if (!signedIn) return renderNode(fallback);

  return <>{children}</>;
};
