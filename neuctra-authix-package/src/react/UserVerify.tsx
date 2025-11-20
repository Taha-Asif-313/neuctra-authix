import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserInfo } from "../api/login.js";
import { Mail, Key, Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { getSdkConfig } from "../sdk/config.js";

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
  const { appId, baseUrl, apiKey } = getSdkConfig();
  const [verifyFormData, setVerifyFormData] = useState({
    email: user?.email || "",
    otp: "",
    appId: appId,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Function to adjust color brightness
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
        surface: "#09090b",
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

    try {
      setVerifying(true);
      const res = await axios.post(
        `${baseUrl}/users/send-verify-otp/${user?.id}`,
        { email: verifyFormData.email },
        { headers: { "x-api-key": apiKey, "x-app-id": appId } }
      );

      if (res.data.success) {
        showNotification("success", res.data.message || "OTP sent!");
        setOtpSent(true);
      } else {
        showNotification("error", res.data.message || "Failed to send OTP");
      }
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || "Server error");
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
      const res = await axios.post(`${baseUrl}/users/verify-email`, verifyFormData);
      if (res.data.success && user) {
        const updatedUser = { ...user, isVerified: true };
        onVerify?.(updatedUser);
        showNotification("success", res.data.message || "Email verified!");
        setOtpSent(false);
        setVerifyFormData({ email: user.email, otp: "", appId });
      } else {
        showNotification("error", res.data.message || "Verification failed");
      }
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || "Server error");
    } finally {
      setVerifying(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.surfaceLight,
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
        display: "flex",
        flexDirection: "column",
        gap: 16,
        backgroundColor: colors.surface,
        padding: 24,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Notification */}
      {notification && (
        <div
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 500,
            color: notification.type === "success" ? colors.success : colors.warning,
            border: `1px solid ${
              notification.type === "success" ? colors.success : colors.warning
            }`,
            backgroundColor:
              notification.type === "success"
                ? `${colors.success}20`
                : `${colors.warning}20`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {notification.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {notification.message}
        </div>
      )}

      {/* Email Field */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ color: colors.textSecondary }}>Email</label>
        <div style={{ position: "relative" }}>
          <Mail
            size={18}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
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
            style={inputStyle}
            required
          />
        </div>
      </div>

      {/* OTP Field */}
      {otpSent && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ color: colors.textSecondary }}>OTP</label>
          <div style={{ position: "relative" }}>
            <Key
              size={18}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
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
              style={inputStyle}
              required
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={verifying}
            style={buttonStyle(verifying)}
          >
            {verifying ? <Loader2 size={16} className="spinner" /> : <Send size={16} />}
            {verifying ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <button type="submit" disabled={verifying} style={buttonStyle(verifying)}>
            {verifying ? <Loader2 size={16} className="spinner" /> : <CheckCircle size={16} />}
            {verifying ? "Verifying..." : "Verify Email"}
          </button>
        )}
      </div>
    </form>
  );
};
