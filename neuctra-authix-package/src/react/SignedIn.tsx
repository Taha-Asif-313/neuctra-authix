"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}

type AuthState = "loading" | "authenticated" | "unauthenticated";

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
}) => {
  const authix = useAuthix();
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const validate = async () => {
      // 🔹 Check if cookie exists first
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const authFlag = cookies.find((c) => c.startsWith("a_s_b="));
      const hasCookie = authFlag?.split("=")[1] === "true";

      if (!hasCookie) {
        // ❌ No cookie → do not check session, just unauthenticated
        setAuthState("unauthenticated");
        return;
      }

      try {
        // 🔹 Cookie exists → validate real session
        const res = await authix.checkUserSession();

        if (res?.user?.id) {
          setAuthState("authenticated");
        } else {
          // ❌ Cookie existed but session invalid → remove cookie
          document.cookie =
            "a_s_b=false; path=/; max-age=0; SameSite=Lax";
          setAuthState("unauthenticated");
        }
      } catch (err) {
        console.error("Session validation failed:", err);

        // ❌ Only remove cookie if it existed
        document.cookie =
          "a_s_b=false; path=/; max-age=0; SameSite=Lax";
        setAuthState("unauthenticated");
      }
    };

    validate();
  }, [authix]);

  const renderNode = (node?: ReactNode | (() => ReactNode)) =>
    typeof node === "function" ? (node as () => ReactNode)() : node;

  // 🔹 Do not render anything while checking session
  if (authState === "loading") return null;

  if (authState === "unauthenticated") return renderNode(fallback) ?? null;

  return <>{children}</>;
};
