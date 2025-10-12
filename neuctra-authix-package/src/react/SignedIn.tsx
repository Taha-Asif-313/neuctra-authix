import React, { ReactNode } from "react";

const isUserSignedIn = (): boolean => {
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
}

/**
 * ReactSignedIn
 * Renders children only when the user is signed in.
 * Uses inline-flex styling for consistent alignment inside navigation bars or flex layouts.
 */
export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
}) => {
  if (!isUserSignedIn()) return <>{fallback}</>;

  return (
    <span
      style={{
        width: "100%",
        height: "100%",
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      {children}
    </span>
  );
};
