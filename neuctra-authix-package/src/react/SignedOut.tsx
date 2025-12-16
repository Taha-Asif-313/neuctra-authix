"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
  className,
  width,
  height,
}) => {
  const [signedOut, setSignedOut] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const userInfo = localStorage.getItem("userInfo");
      return !userInfo || userInfo === "undefined" || userInfo === "null";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const check = () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        setSignedOut(
          !userInfo || userInfo === "undefined" || userInfo === "null"
        );
      } catch {
        setSignedOut(true);
      }
    };

    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  if (!signedOut) return typeof fallback === "function" ? fallback() : fallback;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};
