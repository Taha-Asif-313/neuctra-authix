"use client";
import React, { ReactNode, useEffect, useState } from "react";

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
    const isUserSignedIn = () => {
      if (typeof window === "undefined") return false; // SSR guard
      try {
        const userInfo = localStorage.getItem("userInfo");
        return Boolean(
          userInfo && userInfo !== "undefined" && userInfo !== "null"
        );
      } catch {
        return false;
      }
    };

    const check = () => setSignedIn(isUserSignedIn());
    check();

    // Safe: runs only in browser
    if (typeof window !== "undefined") {
      window.addEventListener("storage", check);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", check);
      }
    };
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
