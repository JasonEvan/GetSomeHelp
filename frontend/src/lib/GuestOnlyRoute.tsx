import { Navigate, Outlet } from "react-router-dom";

export default function GuestOnlyRoute() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (isAuthenticated) {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Render Child Components
  return <Outlet />;
}
