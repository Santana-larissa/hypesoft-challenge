import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/lib/router/ProtectedRoute";

function Home() {
  return <div className="p-4">Home protegida</div>;
}
function Login() {
  return <div className="p-4">Login (placeholder)</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
