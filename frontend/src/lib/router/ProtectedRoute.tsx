import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  return isAuth ? children : <Navigate to="/login" replace />;
}
