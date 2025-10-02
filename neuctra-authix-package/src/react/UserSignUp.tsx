import React, { useState } from "react";
import { signupUser } from "../api/signup.js";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
  Loader,
  Image,
} from "lucide-react";
import { getSdkConfig } from "../sdk/config.js";

interface SignupFormProps {
  // Customization options
  logoUrl?: string;
  title?: string;
  subtitle?: string;
  footerText?: string;
  primaryColor?: string;
  gradient?: string;
  darkMode?: boolean;

  // Only avatar is optional
  showAvatar?: boolean;

  loginUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

// Simplified form data interface
interface FormData {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export const ReactUserSignUp: React.FC<SignupFormProps> = ({
  logoUrl,
  title = "Create Your Account",
  subtitle = "Join our platform today",
  footerText = "Secure authentication powered by Neuctra Authix",
  primaryColor = "#00C214",
  gradient = "linear-gradient(135deg, #22c55e, #00C214)",
  darkMode = true,

  // Only avatar is optional
  showAvatar = false,

  loginUrl,
  onSuccess,
  onError,
}) => {
  const { baseUrl, apiKey, appId } = getSdkConfig();

  // Initialize form data with only essential fields
  const initialFormData: FormData = {
    name: "",
    email: "",
    password: "",
    ...(showAvatar && { avatarUrl: "" }),
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  // Dynamic colors based on darkMode prop
  const textColor = darkMode ? "#ffffff" : "#111827";
  const subTextColor = darkMode ? "#a1a1aa" : "#6b7280";
  const inputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)";
  const inputBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const userData = {
        ...formData,
        appId: appId,
      };

      const user = await signupUser(userData, { baseUrl, apiKey });
      setMessage({ type: "success", text: "Account created successfully!" });
      if (onSuccess) onSuccess(user);
    } catch (err: any) {
      const errorMsg = err.message || "Signup failed. Please try again.";
      setMessage({ type: "error", text: errorMsg });
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  // Common Input Style - matches login component
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "14px 14px 14px 44px" : "16px 16px 16px 44px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
    color: textColor,
    fontSize: isMobile ? "15px" : "15px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
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
          minWidth: "320px",
          maxWidth: "390px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          padding: isMobile ? "30px 24px" : "32px 28px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              style={{ height: "50px", width: "50px", marginBottom: "10px" }}
            />
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
            {title}
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: subTextColor,
              margin: "6px 0 0 0",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Avatar Preview */}
        {showAvatar && formData.avatarUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <img
              src={formData.avatarUrl}
              alt="Avatar Preview"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${primaryColor}30`,
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Signup Form */}
        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label
              htmlFor="signup-name"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: textColor,
              }}
            >
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <User
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
                id="signup-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.name ? "#ef4444" : inputBorder,
                }}
              />
            </div>
            {errors.name && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "12px",
                  marginTop: "2px",
                }}
              >
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label
              htmlFor="signup-email"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: textColor,
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
                id="signup-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.email ? "#ef4444" : inputBorder,
                }}
              />
            </div>
            {errors.email && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "12px",
                  marginTop: "2px",
                }}
              >
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label
              htmlFor="signup-password"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: textColor,
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
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.password ? "#ef4444" : inputBorder,
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
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "12px",
                  marginTop: "2px",
                }}
              >
                {errors.password}
              </span>
            )}
          </div>

          {/* Avatar URL - Optional */}
          {showAvatar && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label
                htmlFor="signup-avatar"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: textColor,
                }}
              >
                Avatar URL (Optional)
              </label>
              <div style={{ position: "relative" }}>
                <Image
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
                  id="signup-avatar"
                  type="url"
                  name="avatarUrl"
                  placeholder="Paste your avatar image URL"
                  value={formData.avatarUrl || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* Links */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginTop: "6px",
            }}
          >
            {loginUrl && (
              <a
                href={loginUrl}
                style={{
                  color: primaryColor,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Already have an account?
              </a>
            )}
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
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading ? (
              <>
                <Loader
                  size={18}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

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
            marginTop: "20px",
            padding: "0 4px",
          }}
        >
          Secure authentication powered by{" "}
          <span style={{ color: primaryColor, fontWeight: 600 }}>
            Neuctra Authix
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
