import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
    const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));

  // ✅ Load admin user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setFormData((prev) => ({ ...prev, email: parsedUser.email }));
        }
      } catch (err) {
        console.error("Invalid adminUser in localStorage");
      }
    }
  }, []);

  // ✅ Handle OTP box input
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return; // Only allow numbers
    const newOtp = [...otpArray];
    newOtp[index] = value.slice(-1); // only one digit
    setOtpArray(newOtp);
    setFormData((prev) => ({ ...prev, otp: newOtp.join("") }));

    // Move focus to next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  // ✅ Send OTP
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

  // ✅ Verify OTP
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
        login(res.data.userData.admin, res.data.userData.token);
        toast.success(res.data.message || "Email verified!");
        setFormData({ email: "", otp: "" });
        setOtpArray(new Array(6).fill(""));
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

        <form className="space-y-4 w-full" onSubmit={handleVerify}>
          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-primary" />
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="block w-full pl-10 pr-3 py-2.5 rounded-md border bg-black text-white opacity-70 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Modern OTP input boxes */}
          {otpSent && (
            <div className="flex flex-col w-full">
              <label className="block text-sm text-start font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <div className="flex justify-between gap-2">
                {otpArray.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    className="w-12 h-12 text-center text-lg font-semibold rounded-md bg-black border border-gray-700 text-white focus:border-[#00c420] focus:ring-1 focus:ring-[#00c420] outline-none transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-primary text-white hover:bg-primary/80 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-[#00c420] text-white hover:bg-[#00a81b] disabled:opacity-70 transition"
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
