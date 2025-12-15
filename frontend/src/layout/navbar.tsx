import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed h-16 w-full flex items-center px-16 backdrop-blur-lg">
      <div className="flex items-center space-x-7">
        <span className="flex items-center space-x-2">
          <img src="/img/icons/logo.png" alt="Logo" />
          <Link to="/" className="text-lg">
            Get Some Help
          </Link>
        </span>
        <Link to="/career">Career</Link>
        <Link to="/help">Help</Link>
      </div>
      <div className="ml-auto space-x-3">
        <button className="px-3 py-2 bg-[#CBBFDF] text-[#7C3AED] rounded-lg">
          Sign in
        </button>
        <button className="px-3 py-2 bg-[#7C3AED] text-white rounded-lg">
          Start Hiring
        </button>
      </div>
    </nav>
  );
}
