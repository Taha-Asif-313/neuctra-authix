import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/send-verify-otp`,
        { email: formData.email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "OTP sent to email!");
        setOtpSent(true);
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Email
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.otp) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/verify-email`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message || "Email verified!");
        // reset form
        setFormData({ email: "", otp: "" });
        setOtpSent(false);
        navigate("/dashboard/profile");
      } else {
        toast.error(res.data.message || "Verification failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <div className="max-w-md w-full flex flex-col items-center gap-2 bg-zinc-950 p-6 shadow rounded-lg">
        <img
          src="/logo.png"
          height={60}
          width={60}
          className="mx-auto mb-2"
          alt="logo"
        />
        <h2 className="text-center text-2xl font-bold text-white mb-4">
          Verify Your Email
        </h2>

        <form className="space-y-4" onSubmit={handleVerify}>
          {/* Email */}
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

          {/* OTP (only show after sending) */}
          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-300">
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
          )}

          {/* Actions */}
          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-[#00c420] text-white hover:bg-primary/80 disabled:opacity-70"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
