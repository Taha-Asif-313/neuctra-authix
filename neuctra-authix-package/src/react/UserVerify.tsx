import React, { useState, useEffect } from "react";
import {
  Mail,
  Key,
  Loader2,
  Send,
  CheckCircle,
  AlertCircle,
  Verified,
} from "lucide-react";
import { useAuthix } from "./Provider/AuthixProvider.js";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface ReactEmailVerificationProps {
  user?: UserInfo | null;
  darkMode?: boolean;
  primaryColor?: string;
  onVerify?: (updatedUser: UserInfo) => void;
}

export const ReactEmailVerification: React.FC<ReactEmailVerificationProps> = ({
  user,
  darkMode = true,
  primaryColor = "#00C212",
  onVerify,
}) => {
  const authix = useAuthix();

  // If user is missing, render a warning
  if (!user) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 24,
          borderRadius: 12,
          backgroundColor: darkMode ? "#000000" : "#f4f4f5",
          color: darkMode ? "#fff" : "#18181b",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <AlertCircle size={24} style={{ marginBottom: 8 }} />
        <p style={{ margin: 0 }}>User data is required to verify email.</p>
      </div>
    );
  }

  const [isMobile, setIsMobile] = useState(false);
  const [verifyFormData, setVerifyFormData] = useState({
    email: user?.email || "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  // Adjust color brightness
  const adjustColor = (hex: string, percent: number) => {
    let num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00ff) + percent;
    let b = (num & 0x0000ff) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
  };

  const colors = darkMode
    ? {
        surface: "#000000",
        surfaceLight: "#27272a",
        textPrimary: "#ffffff",
        textSecondary: "#d4d4d8",
        textTertiary: "#a1a1aa",
        border: "#27272a",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -15),
        success: adjustColor(primaryColor, 0),
        warning: "#f59e0b",
      }
    : {
        surface: "#fafafa",
        surfaceLight: "#f4f4f5",
        textPrimary: "#18181b",
        textSecondary: "#52525b",
        textTertiary: "#71717a",
        border: "#e4e4e7",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -15),
        success: adjustColor(primaryColor, 0),
        warning: "#d97706",
      };

  useEffect(() => {
    if (user?.email) {
      setVerifyFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendOTP = async () => {
    if (!verifyFormData.email || !/\S+@\S+\.\S+/.test(verifyFormData.email)) {
      showNotification("error", "Please enter a valid email");
      return;
    }

    if (!user?.id) {
      showNotification("error", "User ID missing");
      return;
    }

    try {
      setVerifying(true);

      // 🔥 log to check what authix returns
      const res = await authix.requestEmailVerificationOTP({
        userId: user.id,
        email: verifyFormData.email,
      });
      console.log("Send OTP response:", res);

      // ✅ handle both cases
      if (res.success || res.data?.success) {
        const message = res.message || res.data?.message || "OTP sent!";
        showNotification("success", message);
        setOtpSent(true);
      } else {
        const message =
          res.message || res.data?.message || "Failed to send OTP";
        showNotification("error", message);
      }
    } catch (err: any) {
      console.error("Send OTP error:", err);
      showNotification("error", err.message || "Server error");
    } finally {
      setVerifying(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyFormData.email || !verifyFormData.otp) {
      showNotification("error", "Please fill in all fields");
      return;
    }

    try {
      setVerifying(true);
      const res = await authix.verifyEmail({
        email: verifyFormData.email,
        otp: verifyFormData.otp,
      });

      if (res.success) {
        const updatedUser = { ...user, isVerified: true };
        onVerify?.(updatedUser);
        showNotification("success", res.message || "Email verified!");
        setOtpSent(false);
        setVerifyFormData({ email: user.email, otp: "" });
      } else {
        showNotification("error", res.message || "Verification failed");
      }
    } catch (err: any) {
      showNotification("error", err.message || "Server error");
    } finally {
      setVerifying(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
    color: colors.textPrimary,
    fontSize: 14,
    outline: "none",
  };

  const buttonStyle = (disabled = false): React.CSSProperties => ({
    flex: 1,
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
    opacity: disabled ? 0.7 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 14,
    border: "none",
  });

  return (
    <form
      onSubmit={handleVerify}
      style={{
        width: "100%",
        maxWidth: isMobile ? "340px" : "400px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        backgroundColor: colors.surface,
        padding: 24,
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        boxShadow: darkMode
          ? "0 6px 24px rgba(0,0,0,0.4)"
          : "0 6px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Verified size={32} color={colors.accent} />
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            color: colors.textPrimary,
          }}
        >
          Verify Your Email
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: colors.textSecondary,
            textAlign: "center",
          }}
        >
          Enter your email and OTP to confirm your account
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 500,
            color:
              notification.type === "success" ? colors.success : colors.warning,
            border: `1px solid ${notification.type === "success" ? colors.success : colors.warning}`,
            backgroundColor:
              notification.type === "success"
                ? `${colors.success}20`
                : `${colors.warning}20`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {notification.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {notification.message}
        </div>
      )}

      {/* Email Field */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Mail
            size={18}
            style={{
              position: "absolute",
              left: 12,
              color: colors.textTertiary,
              pointerEvents: "none",
            }}
          />
          <input
            type="email"
            value={verifyFormData.email}
            onChange={(e) =>
              setVerifyFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter your email"
            style={{
              ...inputStyle,
              paddingLeft: 40, // enough space for icon
              height: 40,
              borderRadius: 8,
              boxShadow: darkMode
                ? "0 2px 6px rgba(0,0,0,0.3)"
                : "0 2px 6px rgba(0,0,0,0.08)",
            }}
            required
          />
        </div>
        <small
          style={{ fontSize: 11, color: colors.textTertiary, marginTop: 2 }}
        >
          We'll send a verification code to this email
        </small>
      </div>

      {/* OTP Field */}
      {otpSent && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Key
              size={18}
              style={{
                position: "absolute",
                left: 12,
                color: colors.textTertiary,
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={verifyFormData.otp}
              onChange={(e) =>
                setVerifyFormData((prev) => ({ ...prev, otp: e.target.value }))
              }
              placeholder="Enter OTP"
              style={{
                ...inputStyle,
                paddingLeft: 40,
                height: 40,
                borderRadius: 8,
                boxShadow: darkMode
                  ? "0 2px 6px rgba(0,0,0,0.3)"
                  : "0 2px 6px rgba(0,0,0,0.08)",
              }}
              required
            />
          </div>
          <small
            style={{ fontSize: 11, color: colors.textTertiary, marginTop: 2 }}
          >
            Check your inbox for the 6-digit code
          </small>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={verifying || !user?.id}
            style={{
              ...buttonStyle(verifying),
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 14,
            }}
          >
            {verifying ? (
              <Loader2 size={16} className="spinner" />
            ) : (
              <Send size={16} />
            )}
            {verifying ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={verifying}
            style={{
              ...buttonStyle(verifying),
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 14,
            }}
          >
            {verifying ? (
              <Loader2 size={16} className="spinner" />
            ) : (
              <CheckCircle size={16} />
            )}
            {verifying ? "Verifying..." : "Verify Email"}
          </button>
        )}
      </div>
    </form>
  );
};
