import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Public Pages
import SantricksForm from "../form/SantricksForm";
import SuccessPage from "../form/SuccessPage";
import FailurePage from "../form/FailurePage";

// Admin Login
import AdminLogin from "../pages/admin/AdminLogin";

// Admin Layout + Pages
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEntries from "../pages/admin/AdminEntries";
import AdminCalendar from "../pages/admin/AdminCalendar";

// Protection
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const router = createBrowserRouter([
  // 🌍 Public Routes
  { path: "/", element: <SantricksForm /> },
  { path: "/success", element: <SuccessPage /> },
  { path: "/failure", element: <FailurePage /> },

  // 🔑 Admin Login Route (No Protection)
  { path: "/admin/login", element: <AdminLogin /> },

  // 🔐 Protected Admin Routes
  {
    path: "/admin",
    element: <ProtectedAdminRoute />, // Security Gate 🚫➡🚪
    children: [
      {
        path: "",
        element: <AdminLayout />, // Sidebar + Topbar Layout
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "entries", element: <AdminEntries /> },
          { path: "calendar", element: <AdminCalendar /> },
        ],
      },
    ],
  },

  // ❌ 404 Fallback (Optional)
  { path: "*", element: <h2 style={{ padding: 20 }}>404 - Page Not Found</h2> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
