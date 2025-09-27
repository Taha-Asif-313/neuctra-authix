import React, { useState } from "react";
import { loginUser } from "../api/login.js";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

interface LoginFormProps {
  baseUrl: string;
  apiKey: string;
  appId: string;

  // Customization options
  logoUrl?: string;
  title?: string;
  subtitle?: string;
  footerText?: string;
  primaryColor?: string;
  gradient?: string;
  darkMode?: boolean;

  signupUrl?: string;
  forgotPasswordUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const UserLogin: React.FC<LoginFormProps> = ({
  baseUrl,
  apiKey,
  appId,
  logoUrl,
  title = "Sign In to Your Account",
  subtitle = "Welcome back! Please enter your details",
  footerText = "Secure authentication powered by our platform",
  primaryColor = "#22c55e",
  gradient = "linear-gradient(135deg, #10b981, #22c55e)",
  darkMode = true,
  signupUrl,
  forgotPasswordUrl,
  onSuccess,
  onError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const isMobile = window.innerWidth < 768;
  const textColor = darkMode ? "#ffffff" : "#111827";
  const subTextColor = darkMode ? "#a1a1aa" : "#6b7280";
  const inputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)";
  const inputBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const user = await loginUser(
        { email, password, appId },
        { baseUrl, apiKey }
      );
      setMessage({ type: "success", text: `Welcome ${user.name}` });
      if (onSuccess) onSuccess(user);
    } catch (err: any) {
      const errorMsg = err.message || "Login failed";
      setMessage({ type: "error", text: errorMsg });
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        borderRadius: "10px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: darkMode ? "#000000" : "#ffffff",
        padding: isMobile ? "20px" : "30px 28px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: isMobile ? "0 0 32px 0" : "0 0 30px 0",
            marginBottom: isMobile ? "8px" : "12px",
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                height: isMobile ? "48px" : "50px",
                width: isMobile ? "48px" : "50px",
                objectFit: "contain",
                marginBottom: isMobile ? "16px" : "20px",
                borderRadius: "12px",
              }}
            />
          ) : (
            <div
              style={{
                height: isMobile ? "48px" : "50px",
                width: isMobile ? "48px" : "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${primaryColor}20`,
                borderRadius: "12px",
                marginBottom: isMobile ? "16px" : "20px",
              }}
            >
              <User size={isMobile ? 24 : 32} color={primaryColor} />
            </div>
          )}

          <div>
            <h2
              style={{
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 700,
                color: textColor,
                margin: "0 0 8px 0",
                letterSpacing: "-0.025em",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: isMobile ? "13px" : "14px",
                color: subTextColor,
                margin: 0,
                lineHeight: "1.4",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "16px" : "14px",
          }}
        >
          {/* Email Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: 600,
                color: textColor,
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={isMobile ? 16 : 18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: subTextColor,
                  zIndex: 1,
                }}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: isMobile
                    ? "12px 12px 12px 42px"
                    : "14px 14px 14px 46px",
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  borderRadius: "12px",
                  color: textColor,
                  fontSize: isMobile ? "14px" : "15px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
              />
            </div>
            {errors.email && (
              <span
                style={{ fontSize: "12px", color: "#ef4444", marginTop: "2px" }}
              >
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: 600,
                color: textColor,
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={isMobile ? 16 : 18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: subTextColor,
                  zIndex: 1,
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: isMobile
                    ? "12px 42px 12px 42px"
                    : "14px 46px 14px 46px",
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  borderRadius: "12px",
                  color: textColor,
                  fontSize: isMobile ? "14px" : "15px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: subTextColor,
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                  zIndex: 1,
                }}
              >
                {showPassword ? (
                  <EyeOff size={isMobile ? 16 : 18} />
                ) : (
                  <Eye size={isMobile ? 16 : 18} />
                )}
              </button>
            </div>
            {errors.password && (
              <span
                style={{ fontSize: "12px", color: "#ef4444", marginTop: "2px" }}
              >
                {errors.password}
              </span>
            )}
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: isMobile ? "13px" : "12px",
              marginTop: "4px",
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
            {forgotPasswordUrl && (
              <a
                href={forgotPasswordUrl}
                style={{
                  color: primaryColor,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </a>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: isMobile ? "14px 20px" : "12px 24px",
              background: loading ? "#374151" : gradient,
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: `0 4px 14px 0 ${primaryColor}40`,
              transition: "all 0.3s ease",
              marginTop: isMobile ? "12px" : "16px",
            }}
          >
            {loading ? (
              <>
                <Loader
                  size={isMobile ? 16 : 18}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Messages */}
        {message && (
          <div
            style={{
              marginTop: isMobile ? "16px" : "20px",
              padding: isMobile ? "12px" : "16px",
              borderRadius: "12px",
              fontSize: isMobile ? "13px" : "14px",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px",
              backgroundColor:
                message.type === "success"
                  ? `${primaryColor}15`
                  : "rgba(239, 68, 68, 0.1)",
              border:
                message.type === "success"
                  ? `1px solid ${primaryColor}30`
                  : "1px solid rgba(239, 68, 68, 0.3)",
              color: message.type === "success" ? primaryColor : "#ef4444",
            }}
          >
            {message.type === "success" ? (
              <CheckCircle size={isMobile ? 16 : 18} />
            ) : (
              <AlertCircle size={isMobile ? 16 : 18} />
            )}
            <span style={{ fontWeight: 500 }}>{message.text}</span>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            padding: isMobile ? "20px 0 0 0" : "20px 0 0 0",
            textAlign: "center",
            fontSize: isMobile ? "12px" : "13px",
            color: subTextColor,
          }}
        >
          {footerText}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          input:focus {
            border-color: ${primaryColor};
            box-shadow: 0 0 0 3px ${primaryColor}20;
          }
          
          a:hover {
            color: ${primaryColor};
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            body {
              padding: 0;
            }
          }

          @media (max-width: 480px) {
            input {
              font-size: 16px !important; /* Prevents zoom on iOS */
            }
          }
        `}
      </style>
    </div>
  );
};
