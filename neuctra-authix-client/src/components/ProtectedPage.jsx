import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedPage({ Component }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return Component ? (
    <Component>
      <Outlet />
    </Component>
  ) : (
    <Outlet />
  );
}
