import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6"
        style={{ backgroundImage: "url('/img/background/main-bg.png')" }}
      >
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-10 text-center">
          <h1 className="text-2xl font-bold mb-8">Sign Up</h1>

          <form className="space-y-6">
            {/* username */}
            <div className="flex items-center gap-3 border-b pb-2">
              <User className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Username"
                className="w-full outline-none text-sm"
              />
            </div>

            {/* email */}
            <div className="flex items-center gap-3 border-b pb-2">
              <Mail className="text-gray-500" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-sm"
              />
            </div>

            {/* password */}
            <div className="flex items-center gap-3 border-b pb-2">
              <Lock className="text-gray-500" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none text-sm"
              />

              {/* show password button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* register button */}
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-full font-semibold hover:bg-violet-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-semibold text-black cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
