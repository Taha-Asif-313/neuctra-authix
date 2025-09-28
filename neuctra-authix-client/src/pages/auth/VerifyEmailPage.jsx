import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, KeyRound } from "lucide-react";

const VerifyEmailPage = () => {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/send-verify-otp`,
        { email: formData.email }
      );
      toast.success(res.data.message || "OTP sent to email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/verify-email`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message || "Email verified!");
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
      <div className="max-w-md w-full bg-zinc-950 p-6 shadow rounded-lg">
        <h2 className="text-center text-2xl font-bold text-white mb-4">
          Verify Your Email
        </h2>
        <form className="space-y-4" onSubmit={handleVerify}>
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-300">
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
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={handleSendOTP}
            className="w-full py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Send OTP
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-md bg-[#00c420] text-white hover:bg-emerald-600 disabled:opacity-70"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
