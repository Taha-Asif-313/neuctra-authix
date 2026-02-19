"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedOutProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}

type AuthState = "loading" | "authenticated" | "unauthenticated";

export const ReactSignedOut: React.FC<ReactSignedOutProps> = ({
  children,
  fallback = null,
}) => {
  const authix = useAuthix();
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const validate = async () => {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const authFlag = cookies.find((c) => c.startsWith("a_s_b="));
      const hasCookie = authFlag?.split("=")[1] === "true";

      // 🔹 No cookie → definitely signed out
      if (!hasCookie) {
        setAuthState("unauthenticated");
        return;
      }

      try {
        const res = await authix.checkUserSession();

        if (res?.user?.id) {
          setAuthState("authenticated");
        } else {
          document.cookie =
            "a_s_b=false; path=/; max-age=0; SameSite=Lax";
          setAuthState("unauthenticated");
        }
      } catch (err) {
        console.error("Session validation failed:", err);

        document.cookie =
          "a_s_b=false; path=/; max-age=0; SameSite=Lax";
        setAuthState("unauthenticated");
      }
    };

    validate();
  }, [authix]);

  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  if (authState === "loading") return null;

  // If authenticated → show fallback (usually null or redirect)
  if (authState === "authenticated")
    return renderNode(fallback) ?? null;

  // If unauthenticated → show children
  return <>{children}</>;
};
