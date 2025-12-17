"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface ReactSignedInProps {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
  className?: string;
  width?: string;
  height?: string;
  appId: string; // 🔑 required
}

export const ReactSignedIn: React.FC<ReactSignedInProps> = ({
  children,
  fallback = null,
  className,
  width,
  height,
  appId,
}) => {
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkUserExists = async () => {
      try {
        const raw = localStorage.getItem("userInfo");
        if (!raw || raw === "undefined" || raw === "null") {
          setSignedIn(false);
          return;
        }

        const user = JSON.parse(raw);
        if (!user?.id) {
          setSignedIn(false);
          return;
        }

        const res = await fetch(
          `https://server.authix.neuctra.com/api/users/check-user/${user.id}?appId=${appId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          setSignedIn(false);
          return;
        }

        const data = await res.json();

        if (!cancelled) {
          setSignedIn(Boolean(data?.exists));
        }
      } catch {
        if (!cancelled) setSignedIn(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    checkUserExists();

    // 🔄 re-check when localStorage changes (login/logout in another tab)
    const onStorage = () => checkUserExists();
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
    };
  }, [appId]);

  // ⏳ Prevent flicker
  if (checking) return null;

  if (!signedIn) {
    return typeof fallback === "function" ? fallback() : fallback;
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};
