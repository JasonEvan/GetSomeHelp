import { Mail, Lock } from "lucide-react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6"
        style={{ backgroundImage: "url('/img/background/main-bg.png')" }}
      >
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-10 text-center">
          <h1 className="text-2xl font-bold mb-8">Log in</h1>

          <form
            className="flex flex-col gap-y-6"
            onSubmit={formik.handleSubmit}
          >
            {/* Email */}
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

            {/* Password */}
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
              onClick={() => navigate("/signup", { replace: true })}
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
