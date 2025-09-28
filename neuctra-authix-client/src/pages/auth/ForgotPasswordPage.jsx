import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/forgot-password`,
        { email }
      );
      toast.success(res.data.message || "OTP sent for password reset");
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
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 rounded-md border bg-black text-white"
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
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
