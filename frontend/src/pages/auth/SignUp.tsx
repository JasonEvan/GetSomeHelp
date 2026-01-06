import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../../lib/axios";
import type { AuthResponse } from "../../utils/types";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post<{ data: AuthResponse }>("/register", values);
        localStorage.setItem("token", res.data.data.token);
        navigate("/", { replace: true });
      } catch (err) {
        alert("Registration failed. Please try again.");
        console.error(err);
      }
    },
  });

  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6"
        style={{ backgroundImage: "url('/img/background/main-bg.png')" }}
      >
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-10 text-center">
          <h1 className="text-2xl font-bold mb-8">Sign Up</h1>

          <form
            className="flex flex-col gap-y-6"
            onSubmit={formik.handleSubmit}
          >
            {/* username */}
            <TextField
              fullWidth
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="standard"
              placeholder="Username"
              className="text-sm"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <User className="text-gray-500" size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* email */}
            <TextField
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="standard"
              placeholder="Email"
              className="text-sm"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail className="text-gray-500" size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* password */}
            <TextField
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="standard"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="text-sm"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="text-gray-500" size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={() =>
                          setShowPassword(
                            (prevShowPassword) => !prevShowPassword
                          )
                        }
                        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                          e.preventDefault()
                        }
                        onMouseUp={(e: React.MouseEvent<HTMLButtonElement>) =>
                          e.preventDefault()
                        }
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

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
              onClick={() => navigate("/login", { replace: true })}
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
