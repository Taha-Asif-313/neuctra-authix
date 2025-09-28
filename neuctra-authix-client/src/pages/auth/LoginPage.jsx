import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/login`,
        formData
      );
      console.log(res);
      console.log(res.data.userData.token);

      if (res.data.success) {
        toast.success(res.data.message || "Login successful!");

        // save user and token
        login(res.data.userData.admin, res.data.userData.token);

        // Redirect to dashboard or home
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-zinc-950 flex flex-col">
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
        <div className="max-w-md w-full">
          <img
            src="/logo.png"
            height={60}
            width={60}
            className="mx-auto mb-2"
            alt="logo"
          />
          <h2 className="text-center text-2xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-green-600 transition-colors"
            >
              create a new account
            </Link>
          </p>

          {/* Form Card */}
          <div className="bg-zinc-950 text-sm py-4 px-4 shadow rounded-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 text-sm border rounded-md shadow-sm focus:ring-[#00c420] focus:border-[#00c420] ${
                      errors.email
                        ? "border-red-300 text-red-900"
                        : "border-gray-300 bg-black text-white"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 text-sm border rounded-md shadow-sm focus:ring-[#00c420] focus:border-[#00c420] ${
                      errors.password
                        ? "border-red-300 text-red-900"
                        : "border-gray-300 bg-black text-white"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#00c420] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#00c420] hover:text-green-500"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#00c420] hover:bg-emerald-600 transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
