import React, { ReactNode } from "react";

// Utility function to check auth status
const checkAuth = (): boolean => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return Boolean(userInfo && userInfo !== "undefined");
  } catch {
    return false;
  }
};

interface SignOutComponentProps {
  children?: ReactNode;
}

// SignOutComponent - only renders if userInfo doesn't exist
export const ReactSignOutComponent: React.FC<SignOutComponentProps> = ({ children }) => {
  if (checkAuth()) return null; // Don't render if authenticated

  return (
    <div>
      {children ?? (
        <div
          style={{
            padding: "20px",
            border: "2px solid blue",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <h2>Signed Out Content</h2>
          <p>This content only shows when user is signed out.</p>
        </div>
      )}
    </div>
  );
};
