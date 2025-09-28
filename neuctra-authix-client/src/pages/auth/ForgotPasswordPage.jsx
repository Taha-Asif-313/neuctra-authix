import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, KeyRound, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotResetPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP + new password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/forgot-password`,
        { email: formData.email }
      );
      if (res.data.success) {
        toast.success(res.data.message || "OTP sent to your email");
        setStep(2);
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/reset-password`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message || "Password reset successfully!");
        setStep(1); // go back to step 1
        setFormData({ email: "", otp: "", newPassword: "" });
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-zinc-950">
      <div className="max-w-md w-full bg-zinc-950 p-6 shadow rounded-lg">
        <h2 className="text-center flex flex-col gap-2 items-center text-2xl font-bold text-white mb-4">
          <img
            src="/logo.png"
            height={60}
            width={60}
            className="mx-auto mb-2"
            alt="logo"
          />
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {step === 1 ? (
          // Step 1: Email Form
          <form className="space-y-4" onSubmit={handleSendOTP}>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-md border bg-black text-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-[#00c420] text-white hover:bg-emerald-600 disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send Reset OTP"}
            </button>
          </form>
        ) : (
          // Step 2: OTP + New Password Form
          <form className="space-y-4" onSubmit={handleResetPassword}>
            {/* OTP */}
            <div>
              <label className="block text-xs font-medium text-gray-300">
                OTP
              </label>
              <div className="mt-1 relative">
                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-md border bg-black text-white"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-medium text-gray-300">
                New Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-md border bg-black text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-[#00c420] text-white hover:bg-emerald-600 disabled:opacity-70"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotResetPasswordPage;
