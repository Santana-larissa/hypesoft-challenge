import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Home from "@pages/Home";
import { ProtectedRoute } from "@lib/router/ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* privadas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
