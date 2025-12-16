"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
  className,
  width,
  height,
}) => {
  const [signedIn, setSignedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const userInfo = localStorage.getItem("userInfo");
      return Boolean(
        userInfo && userInfo !== "undefined" && userInfo !== "null"
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;
      try {
        const userInfo = localStorage.getItem("userInfo");
        setSignedIn(
          Boolean(userInfo && userInfo !== "undefined" && userInfo !== "null")
        );
      } catch {
        setSignedIn(false);
      }
    };

    window.addEventListener("storage", check);

    return () => {
      window.removeEventListener("storage", check);
    };
  }, []);

  if (!signedIn) return typeof fallback === "function" ? fallback() : fallback;

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
