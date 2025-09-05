import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Home from "@pages/Home";
import { ProtectedRoute } from "@lib/router/ProtectedRoute";
import CategoriesList from "@pages/categories/CategoriesList";
import CategoryCreate from "@pages/categories/CategoryCreate";
import CategoryEdit from "@pages/categories/CategoryEdit";
import ProductsList from "@pages/products/ProductsList";
import ProductCreate from "@pages/products/ProductCreate";
import ProductEdit from "@pages/products/ProductEdit";


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

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/new"
          element={
            <ProtectedRoute>
              <CategoryCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:id/edit"
          element={
            <ProtectedRoute>
              <CategoryEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <ProductEdit />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

