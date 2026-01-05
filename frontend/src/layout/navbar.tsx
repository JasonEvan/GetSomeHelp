import { Link } from "react-router-dom";

export default function Navbar() {
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

      <div className="ml-auto space-x-3">
        {/* Sign in */}
        <Link
          to="/login"
          className="px-3 py-2 bg-[#CBBFDF] text-[#7C3AED] rounded-lg text-sm font-semibold hover:opacity-90"
        >
          Sign in
        </Link>

        {/* Start Hiring */}
        <Link
          // == nanti ganti link nya ke ngak tau apa  ===
          to="/career"
          className="px-3 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
        >
          Start Hiring
        </Link>
      </div>
    </nav>
  );
}
