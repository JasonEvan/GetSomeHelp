import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6"
        style={{ backgroundImage: "url('/img/background/main-bg.png')" }}
      >
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-10 text-center">
          <h1 className="text-2xl font-bold mb-8">Log in</h1>

          <form className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-3 border-b pb-2">
              <Mail className="text-gray-500" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 border-b pb-2">
              <Lock className="text-gray-500" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none text-sm bg-transparent"
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

            <div className="flex items-center justify-between text-sm">
              {/* remember me button */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-violet-600"
                />
                <span className="text-gray-600">Remember me</span>
              </label>

              {/* forgot password ---- kalau mau dibuat, ngak penting-penting amat sih */}
              <span className="text-gray-500 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* login button */}
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-full font-semibold hover:bg-violet-700 transition"
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-semibold text-black cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
