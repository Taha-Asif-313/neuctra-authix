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
  children?: ReactNode;
  fallback?: ReactNode;
}

/**
 * ReactSignedOut
 * Shows children only when the user is *not* signed in.
 * Inline styles are used for consistent alignment with flex/inline elements.
 */
export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
}) => {
  if (isUserSignedIn()) return null;

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
      {children ?? fallback}
    </span>
  );
};
