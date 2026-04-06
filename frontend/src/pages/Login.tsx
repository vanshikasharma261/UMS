import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser, clearError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { Errors } from "../types/login.types";
import { jwtDecode } from "jwt-decode";
import type { token } from "../types/auth.types";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const validate = () => {
    const error: Errors = {};
    if (!formData.email.trim()) {
      error.email = "Email is Required";
    }
    if (formData.email) {
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
      ) {
        error.email = "Invalid Email";
      }
    }
    if (!formData.password.trim()) {
      error.password = "Password is required";
    }

    setErrors(error);
    return Object.keys(error).length == 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      const payload = result.payload;
      const decoded = jwtDecode<token>(payload.access_token);
      if (decoded.role == "ADMIN") {
        navigate("/admin");
      }
      if (decoded.role == "USER") {
        navigate("/user");
      }
    }
    console.log(result);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b3d2c]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#0b3d2c]">UMS</h1>
          <p className="text-gray-500 text-sm mt-1">User Management System</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3d2c]"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3d2c]"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#ffdf00] hover:bg-[#e6c800] text-[#0b3d2c] font-bold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
