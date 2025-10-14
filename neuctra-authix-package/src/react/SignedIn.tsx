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
  width?: string;
  height?: string;
}

/**
 * ReactSignedIn
 * Renders children only when the user is signed in.
 * Provides optional width/height props for consistent alignment in layouts.
 */
export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
  width,
  height,
}) => {
  if (!isUserSignedIn()) return <>{fallback}</>;

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return <span style={style}>{children}</span>;
};
