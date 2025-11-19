import React, { useState, useEffect } from "react";
import { UserInfo } from "../api/login.js";
import { Mail, KeyRound, Loader2, Send, CheckCircle } from "lucide-react";
import axios from "axios";
import { getSdkConfig } from "../sdk/config.js";

interface EmailVerificationFormProps {
  user?: UserInfo | null;
  darkMode?: boolean;
  colors: {
    surface: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    surfaceLight: string;
    accent: string;
    accentHover: string;
  };
  onVerify?: (updatedUser: UserInfo) => void;
}

export const ReactEmailVerification: React.FC<EmailVerificationFormProps> = ({
  user,
  darkMode = true,
  colors,
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

  useEffect(() => {
    if (user?.email) {
      setVerifyFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const handleSendOTP = async () => {
    if (!verifyFormData.email || !/\S+@\S+\.\S+/.test(verifyFormData.email))
      return;

    try {
      setVerifying(true);
      const res = await axios.post(
        `${baseUrl}/users/send-verify-otp/${user?.id}`,
        { email: verifyFormData.email },
        { headers: { "x-api-key": apiKey, "x-app-id": appId } }
      );
      if (res.data.success) setOtpSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyFormData.email || !verifyFormData.otp) return;

    try {
      setVerifying(true);
      const res = await axios.post(
        `${baseUrl}/users/verify-email`,
        verifyFormData
      );
      if (res.data.success && user) {
        const updatedUser = { ...user, isVerified: true };
        onVerify?.(updatedUser);
        setOtpSent(false);
        setVerifyFormData({ email: user.email, otp: "", appId });
      }
    } catch (err) {
      console.error(err);
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
      {/* Email */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ color: colors.textSecondary }}>Email</label>
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
              pointerEvents: "none",
              color: colors.textTertiary,
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

      {/* OTP */}
      {otpSent && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ color: colors.textSecondary }}>OTP</label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <KeyRound
              size={18}
              style={{
                position: "absolute",
                left: 12,
                pointerEvents: "none",
                color: colors.textTertiary,
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
            style={buttonStyle(verifying)}
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
