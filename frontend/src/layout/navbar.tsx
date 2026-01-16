import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import api from "../lib/axios";
import { useTranslation } from "react-i18next";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 h-16 w-full backdrop-blur-lg">
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/img/logo.png" alt="Logo" />
            <Link to="/" className="text-lg font-semibold">
              Get Some Help
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="ml-10 hidden md:flex items-center space-x-6">
            <Link to="/career">{t("navbar.career")}</Link>
            <Link to="/help">{t("navbar.help")}</Link>
          </div>

          {/* Desktop Actions */}
          <div className="ml-auto hidden md:flex items-center gap-x-3">
            {isAuthenticated && user ? (
              <UserAvatar name={user.name} role={user.role} />
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 bg-[#CBBFDF] text-[#7C3AED] rounded-lg text-sm font-semibold"
              >
                {t("navbar.sign_in")}
              </Link>
            )}

            <Link
              to="/catalog"
              className="px-3 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
            >
              {t("navbar.start_hiring")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="ml-auto md:hidden"
            onClick={() => setOpenMobileMenu(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {openMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="fixed right-0 top-0 h-full w-72 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setOpenMobileMenu(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <Link to="/" onClick={() => setOpenMobileMenu(false)}>
                {t("footer.home")}
              </Link>
              <Link to="/career" onClick={() => setOpenMobileMenu(false)}>
                {t("navbar.career")}
              </Link>
              <Link to="/help" onClick={() => setOpenMobileMenu(false)}>
                {t("navbar.help")}
              </Link>

              <hr />

              {isAuthenticated && user ? (
                <UserAvatar name={user.name} role={user.role} />
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center px-3 py-2 bg-[#CBBFDF] text-[#7C3AED] rounded-lg text-sm font-semibold"
                  onClick={() => setOpenMobileMenu(false)}
                >
                  {t("navbar.sign_in")}
                </Link>
              )}

              <Link
                to="/catalog"
                className="w-full text-center px-3 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold"
                onClick={() => setOpenMobileMenu(false)}
              >
                {t("navbar.start_hiring")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UserAvatar({ name, role }: { name: string; role?: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

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
        <MenuItem onClick={handleClickProfile}>{t("navbar.profile")}</MenuItem>
        <MenuItem onClick={handleLogout}>{t("navbar.logout")}</MenuItem>
      </Menu>
    </>
  );
}
