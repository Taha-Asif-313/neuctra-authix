import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  KeyRound,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuthix } from "./Provider/AuthixProvider.js";

interface AuthFormProps {
  logoUrl?: string;
  logoLinkUrl?: string;
  title?: string;
  subtitle?: string;
  footerText?: string;
  primaryColor?: string;
  gradient?: string;
  darkMode?: boolean;
  signupUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const ReactUserLogin: React.FC<AuthFormProps> = ({
  logoUrl,
  logoLinkUrl,
  title = "Sign In to Your Account",
  subtitle = "Welcome back! Please enter your details",
  footerText = "Secure authentication powered by Neuctra Authix",
  primaryColor = "#00C214",
  gradient = "linear-gradient(135deg, #22c55e, #00C214)",
  darkMode = true,
  signupUrl,
  onSuccess,
  onError,
}) => {
  const authix = useAuthix();
  // State
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [step, setStep] = useState(1); // forgot-password step: 1=email, 2=otp+new pass
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot/reset states
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  // Theme
  const [isMobile, setIsMobile] = useState(false);

  const textColor = darkMode ? "#ffffff" : "#111827";
  const subTextColor = darkMode ? "#a1a1aa" : "#6b7280";
  const inputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)";
  const inputBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await authix.loginUser({ email, password });
      const { user } = response;

      if (!user) {
        throw new Error(response.message || "Login failed");
      }

      // ✅ Set frontend cookie using document.cookie (safe for Next.js)
      if (typeof document !== "undefined") {
        const cookieName = "a_s_b";
        const cookieValue = "true";
        const expires = new Date();
        expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000); // 1 hour expiry

        document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
        // Optional: Add Secure if on HTTPS
        // if (window.location.protocol === "https:") document.cookie += "; Secure";
      }

      setMessage({ type: "success", text: `Welcome ${user.name}` });
      onSuccess?.(user);
    } catch (err: any) {
      const errorMsg = err.message || "Login failed";
      setMessage({ type: "error", text: errorMsg });
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await authix.requestResetUserPasswordOTP({
        email: formData.email,
      });

      if (res.success) {
        setStep(2);
        setMessage({
          type: "success",
          text: res.message || "OTP sent to your email",
        });
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to send OTP",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await authix.resetUserPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      if (res.success) {
        setMessage({
          type: "success",
          text: res.message || "Password reset successfully!",
        });
        setStep(1);
        setFormData({ email: "", otp: "", newPassword: "" });
        setMode("login");
      } else {
        setMessage({ type: "error", text: res.message || "Reset failed" });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Common Input Style
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "10px 14px 10px 44px" : "10px 16px 10px 44px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "10px",
    color: textColor,
    fontSize: isMobile ? "15px" : "15px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: isMobile ? "320px" : "380px",
          maxWidth: isMobile ? "340px" : "390px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          padding: isMobile ? "30px 24px" : "18px 28px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {logoUrl ? (
            <a
              href={logoLinkUrl ? logoLinkUrl : "/"}
              target="_self"
              rel="noopener noreferrer"
            >
              <img
                src={logoUrl}
                alt="Logo"
                style={{ height: "50px", width: "50px", marginBottom: "10px" }}
              />
            </a>
          ) : (
            <User
              size={40}
              color={primaryColor}
              style={{ marginBottom: "10px" }}
            />
          )}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            {mode === "login"
              ? title
              : step === 1
                ? "Forgot Password"
                : "Reset Password"}
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: subTextColor,
            }}
          >
            {mode === "login"
              ? subtitle
              : "Follow the steps to reset your password"}
          </p>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {/* Email */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label
                htmlFor="login-email"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={20}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: subTextColor,
                  }}
                />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label
                htmlFor="login-password"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={20}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: subTextColor,
                  }}
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    padding: "4px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: subTextColor,
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Links */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
              }}
            >
              {signupUrl && (
                <a
                  href={signupUrl}
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Create new account
                </a>
              )}
              <button
                type="button"
                onClick={() => setMode("forgot")}
                style={{
                  background: "none",
                  border: "none",
                  color: primaryColor,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                background: gradient,
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}

        {/* Forgot / Reset Password */}
        {mode === "forgot" && (
          <form
            onSubmit={step === 1 ? handleSendOTP : handleResetPassword}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {step === 1 ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <label
                  htmlFor="forgot-email"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: darkMode ? "#ffffff" : "#000000",
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={20}
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: subTextColor,
                    }}
                  />
                  <input
                    id="forgot-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>
            ) : (
              <>
                {/* OTP */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    htmlFor="otp"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: darkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    One-Time Password (OTP)
                  </label>
                  <div style={{ position: "relative" }}>
                    <KeyRound
                      size={20}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: subTextColor,
                      }}
                    />
                    <input
                      id="otp"
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* New Password */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    htmlFor="newPassword"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: darkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <Lock
                      size={20}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: subTextColor,
                      }}
                    />
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",

                background: gradient,
                color: "#fff",
                border: "none",
                fontSize: "14px",
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              {loading
                ? "Please wait..."
                : step === 1
                  ? "Send Reset OTP"
                  : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("login");
                setStep(1);
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: "14px",
                color: subTextColor,
                marginTop: "6px",
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </form>
        )}

        {/* Messages */}
        {message && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              borderRadius: "12px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor:
                message.type === "success"
                  ? `${primaryColor}15`
                  : "rgba(239,68,68,0.1)",
              border:
                message.type === "success"
                  ? `1px solid ${primaryColor}30`
                  : "1px solid rgba(239,68,68,0.3)",
              color: message.type === "success" ? primaryColor : "#ef4444",
            }}
          >
            {message.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: subTextColor,
            marginTop: "16px",
            padding: "0 4px",
          }}
        >
          Secure authentication powered by{" "}
          <span style={{ color: primaryColor, fontWeight: 600 }}>
            Neuctra Authix
          </span>
        </div>
      </div>
    </div>
  );
};
