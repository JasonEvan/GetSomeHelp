import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

export default function ProtectedRoute({ role }: { role?: string }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole && userRole !== role) {
    return <Navigate to="/403" replace />;
  }

  // Render Child Components
  return <Outlet />;
}
