import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import PasswordField from "../../components/utils/PasswordField";
import InputField from "../../components/utils/InputField";

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
        formData,
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
    <div className="bg-black flex flex-col">
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
        <div className="max-w-md w-full">
          <img
            src="/logo.png"
            height={60}
            width={60}
            className="mx-auto mb-2"
            alt="logo"
          />
          <h2 className="text-center text-2xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-1 text-center text-sm text-gray-400">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-green-600 transition-colors"
            >
              create a new account
            </Link>
          </p>

          {/* Form Card */}
          <div className="py-4 px-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <InputField
                label="Email address"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                prefixIcon={Mail} // adds the mail icon like before
              />

              {/* Password */}
              <PasswordField
                // className="bg-zinc-900"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                show={showPassword}
                toggleShow={() => setShowPassword(!showPassword)}
                prefixIcon={Lock} // optional: adds the lock icon like before
              />

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
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
                className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#00c420] hover:bg-primary/80 transition-all duration-300 disabled:opacity-70"
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
