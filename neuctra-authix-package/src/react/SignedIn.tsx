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

interface SignInComponentProps {
  children?: ReactNode;
}

// SignInComponent - only renders if userInfo exists
export const ReactSignedIn: React.FC<SignInComponentProps> = ({
  children,
}) => {
  if (!checkAuth()) return null;

  return (
    <div>
      {children ?? (
        <div
          style={{
            padding: "20px",
            border: "2px solid green",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <h2>Signed In Content</h2>
          <p>This content only shows when user is signed in.</p>
        </div>
      )}
    </div>
  );
};
