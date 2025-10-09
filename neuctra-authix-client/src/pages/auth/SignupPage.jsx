import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, ShieldCheck } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // ✅ Password strength logic
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;

    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength === 4) return "Strong";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // ✅ Improved Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must include at least one uppercase letter, number, and symbol";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}api/admin/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = {
    Weak: "text-red-500",
    Fair: "text-yellow-500",
    Good: "text-blue-500",
    Strong: "text-green-500",
  };

  return (
    <div className="bg-zinc-950 flex flex-col">
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-md w-full">
          <img
            src="/logo.png"
            height={60}
            width={60}
            className="mx-auto mb-2"
            alt="logo"
          />
          <h2 className="text-center text-2xl font-extrabold text-white">
            Create a new account
          </h2>
          <p className="mt-1 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-green-500 transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Form Card */}
          <div className="bg-zinc-950 text-sm py-4 px-4 shadow rounded-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-300"
                >
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 text-sm border rounded-md shadow-sm focus:ring-[#00c420] focus:border-[#00c420] ${
                      errors.name
                        ? "border-red-300 text-red-900"
                        : "border-gray-300 bg-black text-white"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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

                {/* Password Strength Indicator */}
                {passwordStrength && (
                  <p
                    className={`mt-2 text-xs font-medium ${strengthColors[passwordStrength]} flex items-center gap-1`}
                  >
                    <ShieldCheck size={12} /> {passwordStrength} password
                  </p>
                )}

                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 text-sm border rounded-md shadow-sm focus:ring-[#00c420] focus:border-[#00c420] ${
                      errors.confirmPassword
                        ? "border-red-300 text-red-900"
                        : "border-gray-300 bg-black text-white"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#00c420] hover:bg-primary/80 transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
