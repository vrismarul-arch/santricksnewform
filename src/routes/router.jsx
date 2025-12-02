import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Public Pages
import SantricksForm from "../form/SantricksForm";
import SuccessPage from "../form/SuccessPage";
import FailurePage from "../form/FailurePage";

// Admin Layout + Pages
import AdminLayout from "../components/layout/AdminLayout";
import AdminEntries from "../pages/admin/AdminEntries";
import AdminCalendar from "../pages/admin/AdminCalendar";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin"; // ⭐ Import Admin Login page

// 🔒 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  return token ? children : <Navigate to="/admin/login" replace />;
};

const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <SantricksForm /> },
  { path: "/success", element: <SuccessPage /> },
  { path: "/failure", element: <FailurePage /> },

  // Admin Login route (public)
  { path: "/admin/login", element: <AdminLogin /> },

  // Admin Secure Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "entries", element: <AdminEntries /> },
      { path: "calendar", element: <AdminCalendar /> },
    ],
  },

  // Redirect unknown routes
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
