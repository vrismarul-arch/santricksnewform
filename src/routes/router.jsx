import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SantricksForm from "../form/SantricksForm";
import SuccessPage from "../form/SuccessPage";

// ✅ Create your routes here
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <SantricksForm />, // Contact Form Page
  },
  {
    path: "/success",
    element: <SuccessPage />, // Contact Form Page
  },
]);

// ✅ Export a component that provides the router to your app
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
