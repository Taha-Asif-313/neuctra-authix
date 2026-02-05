import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, KeyRound, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/utils/InputField";

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
        { email: formData.email },
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
        formData,
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
          <form className="space-y-4" onSubmit={handleSendOTP}>
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              prefixIcon={Mail}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-[#00c420] text-white font-medium hover:bg-emerald-600 transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send Reset OTP"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleResetPassword}>
            {/* OTP */}
            <InputField
              label="OTP"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              prefixIcon={KeyRound}
            />

            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              prefixIcon={Lock}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-[#00c420] text-white font-medium hover:bg-primary/80 transition-all duration-300 disabled:opacity-70"
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
