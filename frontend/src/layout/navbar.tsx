import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import api from "../lib/axios";

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="fixed h-16 w-full flex items-center px-16 backdrop-blur-lg z-50">
      <div className="flex items-center space-x-7">
        <span className="flex items-center space-x-2">
          <img src="/img/logo.png" alt="Logo" />
          <Link to="/" className="text-lg font-semibold">
            Get Some Help
          </Link>
        </span>

        <Link to="/career">Career</Link>
        <Link to="/help">Help</Link>
      </div>

      <div className="ml-auto gap-x-3 flex">
        {isAuthenticated && user ? (
          // <Avatar sx={{ bgcolor: "#7C3AED" }}>{user.name[0]}</Avatar>
          <UserAvatar name={user.name} role={user.role} />
        ) : (
          <Link
            to="/login"
            className="px-3 py-2 bg-[#CBBFDF] text-[#7C3AED] rounded-lg text-sm font-semibold hover:opacity-90"
          >
            Sign in
          </Link>
        )}

        {/* Start Hiring */}
        <Link
          to="/catalog"
          className="px-3 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
        >
          Start Hiring
        </Link>
      </div>
    </nav>
  );
}

function UserAvatar({ name, role }: { name: string; role?: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    handleClose();
    if (role === "customer") {
      navigate("/user-dashboard");
    } else if (role === "provider") {
      navigate("/provider-dashboard");
    }
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await api.post("/logout");
      useAuthStore.getState().logout();
      navigate("/login", { replace: true });
    } catch (err) {
      alert("Logout failed. Please try again.");
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <button className="cursor-pointer" onClick={handleClick}>
        <Avatar sx={{ bgcolor: "#7C3AED" }}>{name[0]}</Avatar>
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
