"use client";
import React, { ReactNode, useEffect, useState } from "react";

const isUserSignedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const userInfo = localStorage.getItem("userInfo");
    return Boolean(userInfo && userInfo !== "undefined" && userInfo !== "null");
  } catch {
    return false;
  }
};

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode;
  width?: string;
  height?: string;
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
  width,
  height,
}) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const check = () => setSignedIn(isUserSignedIn());
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  if (!signedIn) return <>{fallback}</>;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "middle",
        width,
        height,
      }}
    >
      {children}
    </span>
  );
};
