import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

export default function GuestOnlyRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Render Child Components
  return <Outlet />;
}
