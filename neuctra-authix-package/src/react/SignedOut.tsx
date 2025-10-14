import React, { ReactNode } from "react";

const isUserSignedIn = (): boolean => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return Boolean(userInfo && userInfo !== "undefined" && userInfo !== "null");
  } catch {
    return false;
  }
};

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode;
  width?: string;
  height?: string;
}

/**
 * ReactSignedOut
 * Renders its children only when the user is NOT signed in.
 * Uses inline-flex for consistent alignment within navbars or flex layouts.
 */
export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
  width,
  height,
}) => {
  if (isUserSignedIn()) return <>{fallback}</>;

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return <span style={style}>{children}</span>;
};
