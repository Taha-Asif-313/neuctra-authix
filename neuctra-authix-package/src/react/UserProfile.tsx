import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserInfo } from "../api/login.js";
import {
  Edit3,
  Save,
  X,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
  Key,
  Shield,
  Send,
  KeyRound,
  LogOut,
  Home,
  MoreVertical,
} from "lucide-react";
import { getSdkConfig } from "../sdk/config.js";
import DeleteAccountModal from "./components/DeleteAccountModal.js";
import AvatarModal from "./components/AvatarModal.js";
import ChangePasswordModal from "./components/ChangePasswordModal.js";
import { EmailVerificationModal } from "./components/EmailVerificationModal.js";

interface UserProfileProps {
  token: string;
  user?: UserInfo | null;
  darkMode?: boolean;
  homeUrl?: string;
  primaryColor?: string;
  onLogout: () => void;
}

export const ReactUserProfile: React.FC<UserProfileProps> = ({
  token,
  user: propUser = null,
  darkMode = true,
  homeUrl,
  onLogout,
  primaryColor = "#00C212",
}) => {
  const { baseUrl, apiKey, appId } = getSdkConfig();
  const [user, setUser] = useState<UserInfo | null>(propUser);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  // ✅ NEW STATES FOR DROPDOWN
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [dropdownClosing, setDropdownClosing] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [verifyFormData, setVerifyFormData] = useState({
    email: "",
    otp: "",
    appId: appId,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // ✅ Notification helper
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ✅ Close dropdown with animation
  const closeDropdown = () => {
    setDropdownClosing(true);

    // Allow time for the closing animation to finish before unmounting
    const timeout = setTimeout(() => {
      setMoreMenuOpen(false);
      setDropdownClosing(false);
    }, 150);

    // Cleanup in case component unmounts early
    return () => clearTimeout(timeout);
  };

  // ✅ Handle dropdown toggle with animation
  const toggleDropdown = () => {
    if (moreMenuOpen) {
      closeDropdown();
    } else {
      setMoreMenuOpen(true);
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".dropdown-container");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (moreMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreMenuOpen]);

  // ✅ Send OTP for verification
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
        {
          headers: { "x-api-key": apiKey, "x-app-id": appId },
        }
      );
      if (res.data.success) {
        showNotification("success", res.data.message || "OTP sent to email!");
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

  // ✅ Verify Email with OTP
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyFormData.email || !verifyFormData.otp) {
      showNotification("error", "Please fill in all fields");
      return;
    }

    try {
      setVerifying(true);
      const res = await axios.post(
        `${baseUrl}/users/verify-email`,
        verifyFormData
      );
      if (res.data.success) {
        showNotification("success", res.data.message || "Email verified!");
        // Update user verification status
        if (user) {
          const updatedUser = { ...user, isVerified: true };
          setUser(updatedUser);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ ...updatedUser, token })
          );
        }
        setVerifyFormData({ email: "", otp: "", appId });
        setOtpSent(false);
        setShowVerifyEmail(false);
      } else {
        showNotification("error", res.data.message || "Verification failed");
      }
    } catch (err: any) {
      showNotification(
        "error",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setVerifying(false);
    }
  };

  // ✅ Avatar update
  const handleAvatarUpdate = async (newAvatarUrl: string) => {
    if (!user) return false;
    try {
      const updateData = { ...user, avatarUrl: newAvatarUrl };
      const { data } = await axios.put(
        `${baseUrl}/users/update/${user.id}`,
        updateData,
        { headers: { "x-api-key": apiKey } }
      );

      if (data.success) {
        setUser(updateData);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...updateData, token })
        );
        showNotification("success", "Avatar updated successfully!");
        return true;
      } else {
        showNotification("error", data.message || "Failed to update avatar");
        return false;
      }
    } catch (error) {
      console.error("Avatar update error:", error);
      showNotification("error", "Failed to update avatar");
      return false;
    }
  };

  // ✅ Save profile
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/update/${user.id}`,
        user,
        { headers: { "x-api-key": apiKey } }
      );

      if (data.success) {
        setUser(data.user);
        setEditMode(false);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...data.user, token })
        );
        showNotification("success", "Profile updated successfully");
      } else {
        showNotification("error", data.message);
      }
    } catch (err) {
      console.error(err);
      showNotification("error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Validate user with backend
  const validateUser = async (userId: string) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/users/check-user/${userId}?appId=${appId}`,
        { headers: { "x-api-key": apiKey } }
      );

      if (!data.success || !data.exists) {
        console.warn("User not found, clearing session...");
        localStorage.removeItem("userInfo");
        setUser(null);
      }
    } catch (err) {
      console.error("User check failed:", err);
      localStorage.removeItem("userInfo");
      setUser(null);
    }
  };

  // ✅ Init user ONCE
  useEffect(() => {
    const initUser = () => {
      if (propUser) {
        setUser(propUser);
        setLoading(false);
        validateUser(propUser.id);
      } else {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed: UserInfo = JSON.parse(stored);
          setUser(parsed);
          setLoading(false);
          validateUser(parsed.id);
        } else {
          setLoading(false);
        }
      }
    };

    initUser();
  }, [propUser]);

  // Set email in verification form when user is available
  useEffect(() => {
    if (user?.email) {
      setVerifyFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

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
        background: "#000000",
        surface: "#09090b",
        surfaceLight: "#27272a",
        surfaceLighter: "#3f3f46",
        textPrimary: "#ffffff",
        textSecondary: "#d4d4d8",
        textTertiary: "#a1a1aa",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -15),
        success: "#10b981",
        error: "#ef4444",
        border: "#27272a",
        warning: "#f59e0b",
      }
    : {
        background: "#ffffff",
        surface: "#fafafa",
        surfaceLight: "#f4f4f5",
        surfaceLighter: "#e4e4e7",
        textPrimary: "#18181b",
        textSecondary: "#52525b",
        textTertiary: "#71717a",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -15),
        success: "#10b981",
        error: "#ef4444",
        border: "#e4e4e7",
        warning: "#d97706",
      };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.textPrimary,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            textAlign: "center",
          }}
        >
          <Loader2
            size={40}
            color={colors.accent}
            style={{ animation: "spin 1s linear infinite" }}
            aria-hidden="true"
          />
          <p style={{ color: colors.textTertiary, margin: 0 }}>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.textPrimary,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            textAlign: "center",
          }}
        >
          <AlertCircle size={40} color={colors.error} aria-hidden="true" />
          <p style={{ color: colors.textTertiary, margin: 0 }}>
            No profile found. Please log in again.
          </p>
        </div>
      </div>
    );
  }

  const userFields = [
    {
      label: "Full Name",
      value: user.name,
      name: "name",
      type: "text",
      icon: User,
    },
    {
      label: "Email Address",
      value: user.email,
      name: "email",
      type: "email",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: user.phone || "Not set",
      name: "phone",
      type: "tel",
      icon: Phone,
    },
    {
      label: "Address",
      value: user.address || "Not provided",
      name: "address",
      type: "text",
      icon: MapPin,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.textPrimary,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.5,
        minHeight: "80vh",
      }}
    >
      {/* Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(8px)",
            border: "1px solid",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 500,
            maxWidth: "400px",
            animation: "slideIn 0.3s ease-out",
            ...(notification.type === "success"
              ? {
                  backgroundColor: darkMode
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(16, 185, 129, 0.05)",
                  borderColor: darkMode
                    ? "rgba(16, 185, 129, 0.3)"
                    : "rgba(16, 185, 129, 0.2)",
                  color: darkMode ? "#34d399" : "#059669",
                }
              : {
                  backgroundColor: darkMode
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(239, 68, 68, 0.05)",
                  borderColor: darkMode
                    ? "rgba(239, 68, 68, 0.3)"
                    : "rgba(239, 68, 68, 0.2)",
                  color: darkMode ? "#f87171" : "#dc2626",
                }),
          }}
          role="alert"
          aria-live="polite"
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} aria-hidden="true" />
          ) : (
            <AlertCircle size={20} aria-hidden="true" />
          )}
          {notification.message}
        </div>
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "1fr",
            ...(window.innerWidth >= 1024 && {
              gridTemplateColumns: "1fr 2fr",
              gap: "10px",
            }),
            ...(window.innerWidth >= 768 &&
              window.innerWidth < 1024 && {
                gap: "10px",
              }),
            ...(window.innerWidth >= 600 &&
              window.innerWidth < 768 && {
                gap: "28px",
              }),
          }}
        >
          {/* Left Column - Avatar & Actions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              height: "100%",
            }}
          >
            <section
              style={{
                backgroundColor: colors.surface,
                borderRadius: "16px",
                position: "relative",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                minHeight: "300px",
              }}
            >
              {homeUrl && (
                <a
                  href={homeUrl ? homeUrl : "/"}
                  target="_self"
                  rel="noopener noreferrer"
                  style={{ position: "absolute", top: "18px", left: "18px" }}
                >
                  <Home
                    size={20}
                    style={{
                      color: darkMode ? "#ffffff" : "#000000",
                    }}
                  />
                </a>
              )}

              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={
                    user.avatarUrl ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                      user.name
                    )}`
                  }
                  alt={`Profile avatar of ${user.name}`}
                  style={{
                    width: "128px",
                    height: "128px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    border: `3px solid ${colors.border}`,
                  }}
                  width={128}
                  height={128}
                  loading="eager"
                />

                <button
                  onClick={() => setAvatarModal(true)}
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    backgroundColor: colors.accent,
                    color: "white",
                    padding: "8px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                  }}
                  aria-label="Change profile picture"
                >
                  <Camera size={16} aria-hidden="true" />
                </button>
              </div>

              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  margin: "0 0 4px 0",
                  color: colors.textPrimary,
                }}
              >
                {user.name}
              </h2>

              <p
                style={{
                  color: colors.textTertiary,
                  margin: "0 0 8px 0",
                }}
              >
                {user.email}
              </p>

              {/* Verification Status Badge */}
              <div
                style={{
                  backgroundColor: user.isVerified
                    ? darkMode
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(16, 185, 129, 0.05)"
                    : darkMode
                    ? "rgba(245, 158, 11, 0.1)"
                    : "rgba(245, 158, 11, 0.05)",
                  color: user.isVerified ? colors.success : colors.warning,
                  border: `1px solid ${
                    user.isVerified
                      ? darkMode
                        ? "rgba(16, 185, 129, 0.3)"
                        : "rgba(16, 185, 129, 0.2)"
                      : darkMode
                      ? "rgba(245, 158, 11, 0.3)"
                      : "rgba(245, 158, 11, 0.2)"
                  }`,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "8px",
                }}
              >
                {user.isVerified ? (
                  <CheckCircle size={16} aria-hidden="true" />
                ) : (
                  <AlertCircle size={16} aria-hidden="true" />
                )}
                {user.isVerified ? "Email Verified" : "Not Verified"}
              </div>
            </section>

            {/* Action Buttons */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{
                      backgroundColor: colors.surfaceLight,
                      border: `1px solid ${colors.border}`,
                      color: colors.textPrimary,
                      padding: "10px 20px",
                      borderRadius: "6px",
                      borderStyle: "solid",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "12px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      minHeight: "36px",
                      flex: window.innerWidth < 1024 ? "1" : "auto",
                    }}
                  >
                    <X size={16} aria-hidden="true" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                      opacity: saving ? 0.7 : 1,
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: saving ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "12px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      minHeight: "36px",
                      flex: window.innerWidth < 1024 ? "1" : "auto",
                    }}
                  >
                    {saving ? (
                      <Loader2
                        size={16}
                        style={{ animation: "spin 1s linear infinite" }}
                        aria-hidden="true"
                      />
                    ) : (
                      <Save size={16} aria-hidden="true" />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "12px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      minHeight: "36px",
                      flex: window.innerWidth < 1024 ? "1" : "auto",
                    }}
                  >
                    <Edit3 size={16} aria-hidden="true" />
                    Edit Profile
                  </button>

                  {/* Actions Dropdown */}
                  <div style={{ position: "relative" }}>
                    <button
                      style={{
                        backgroundColor: colors.surfaceLight,
                        color: colors.textPrimary,
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "12px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        textDecoration: "none",
                        minHeight: "36px",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    >
                      <MoreVertical size={16} aria-hidden="true" />
                      More Actions
                    </button>

                    {/* Dropdown Menu */}
                    {moreMenuOpen && (
                      <div
                        className={`dropdown-container ${
                          dropdownClosing ? "closing" : ""
                        }`}
                        style={{
                          position: "absolute",
                          bottom: "100%", // 👈 appears above the button
                          left: 0,
                          right: 0,
                          backgroundColor: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "12px 12px 0 0", // 👈 more drawer-like (rounded top)
                          boxShadow: "0 -8px 24px rgba(0, 0, 0, 0.25)", // 👈 softer shadow
                          zIndex: 200,
                          marginBottom: "6px",
                          overflow: "hidden",
                          animation: `${
                            dropdownClosing
                              ? "drawerSlideDown"
                              : "drawerSlideUp"
                          } 0.25s ease-out forwards`,
                        }}
                      >
                        {/* Change Password */}
                        <button
                          onClick={() => {
                            setShowChangePassword(true);
                            closeDropdown();
                          }}
                          style={{
                            width: "100%",
                            padding: "14px 18px",
                            backgroundColor: "transparent",
                            border: "none",
                            color: colors.textPrimary,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontSize: "13px",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              colors.surfaceLight)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <Key size={14} aria-hidden="true" />
                          Change Password
                        </button>

                        {/* Verify Email */}
                        {!user.isVerified && (
                          <button
                            onClick={() => {
                              setShowVerifyEmail(true);
                              closeDropdown();
                            }}
                            disabled={sendingVerification}
                            style={{
                              width: "100%",
                              padding: "14px 18px",
                              backgroundColor: "transparent",
                              border: "none",
                              color: sendingVerification
                                ? colors.textTertiary
                                : colors.warning,
                              cursor: sendingVerification
                                ? "not-allowed"
                                : "pointer",
                              transition: "all 0.2s ease",
                              fontSize: "13px",
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              textAlign: "left",
                              opacity: sendingVerification ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => {
                              if (!sendingVerification)
                                e.currentTarget.style.backgroundColor =
                                  colors.surfaceLight;
                            }}
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            {sendingVerification ? (
                              <Loader2
                                size={14}
                                style={{ animation: "spin 1s linear infinite" }}
                                aria-hidden="true"
                              />
                            ) : (
                              <Send size={14} aria-hidden="true" />
                            )}
                            {sendingVerification
                              ? "Sending..."
                              : "Verify Email"}
                          </button>
                        )}

                        {/* Logout */}
                        {onLogout && (
                          <button
                            onClick={() => {
                              onLogout();
                              closeDropdown();
                            }}
                            style={{
                              width: "100%",
                              padding: "14px 18px",
                              backgroundColor: "transparent",
                              border: "none",
                              color: darkMode ? "#fca5a5" : "#dc2626",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              fontSize: "13px",
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              textAlign: "left",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = darkMode
                                ? "rgba(239, 68, 68, 0.1)"
                                : "rgba(239, 68, 68, 0.05)";
                            }}
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            <LogOut size={14} aria-hidden="true" />
                            Logout
                          </button>
                        )}

                        {/* Delete Account */}
                        <button
                          onClick={() => {
                            setShowDeleteAccount(true);
                            closeDropdown();
                          }}
                          style={{
                            width: "100%",
                            padding: "14px 18px",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontSize: "13px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = darkMode
                              ? "rgba(239, 68, 68, 0.1)"
                              : "rgba(239, 68, 68, 0.05)";
                          }}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <Trash2 size={14} aria-hidden="true" />
                          Delete Account
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </nav>
          </div>

          {/* Right Column - User Details */}
          <div
            style={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <section
              style={{
                backgroundColor: colors.surface,
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  margin: "0 0 24px 0",
                  color: colors.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <User size={20} aria-hidden="true" />
                Personal Information
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "20px",
                  gridTemplateColumns: "1fr",
                  ...(window.innerWidth >= 600 && {
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }),
                }}
              >
                {userFields.map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div
                      key={field.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <label
                        style={{
                          color: colors.textTertiary,
                          fontSize: "12px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <IconComponent size={16} aria-hidden="true" />
                        {field.label}
                      </label>
                      {editMode ? (
                        <input
                          type={field.type}
                          name={field.name}
                          value={user[field.name as keyof UserInfo] as string}
                          onChange={(e) =>
                            setUser((prev) =>
                              prev
                                ? { ...prev, [e.target.name]: e.target.value }
                                : prev
                            )
                          }
                          style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: `1px solid ${primaryColor}`,
                            backgroundColor: "transparent",
                            color: colors.textPrimary,
                            fontSize: "12px",
                            outline: "none",
                            transition: "border-color 0.2s ease",
                            minHeight: "44px",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          aria-label={field.label}
                        />
                      ) : (
                        <div
                          style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid transparent",
                            fontSize: "12px",
                            minHeight: "44px",
                            display: "flex",
                            alignItems: "center",
                            boxSizing: "border-box",
                            color: colors.textPrimary,
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.05)",
                          }}
                        >
                          {field.value}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Security Status Section */}
            <section
              style={{
                backgroundColor: colors.surface,
                borderRadius: "16px",
                padding: "30px 24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  margin: "0 0 24px 0",
                  color: colors.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Shield size={20} aria-hidden="true" />
                Security Status
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: colors.textSecondary,
                    }}
                  >
                    <Mail size={16} aria-hidden="true" />
                    <span>Email Verification</span>
                  </div>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      ...(user.isVerified
                        ? {
                            backgroundColor: darkMode
                              ? "rgba(16, 185, 129, 0.1)"
                              : "rgba(16, 185, 129, 0.05)",
                            color: colors.success,
                            border: `1px solid ${
                              darkMode
                                ? "rgba(16, 185, 129, 0.3)"
                                : "rgba(16, 185, 129, 0.2)"
                            }`,
                          }
                        : {
                            backgroundColor: darkMode
                              ? "rgba(245, 158, 11, 0.1)"
                              : "rgba(245, 158, 11, 0.05)",
                            color: colors.warning,
                            border: `1px solid ${
                              darkMode
                                ? "rgba(245, 158, 11, 0.3)"
                                : "rgba(245, 158, 11, 0.2)"
                            }`,
                          }),
                    }}
                  >
                    {user.isVerified ? (
                      <>
                        <CheckCircle size={16} aria-hidden="true" />
                        Verified
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} aria-hidden="true" />
                        Not Verified
                      </>
                    )}
                  </div>
                </div>
                {!user.isVerified && (
                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      backgroundColor: darkMode
                        ? "rgba(100, 100, 100, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <p
                      style={{
                        color: colors.textTertiary,
                        fontSize: "12px",
                        margin: 0,
                      }}
                    >
                      Verify your email to unlock all features and enhance your
                      account security.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AvatarModal
        isOpen={avatarModal}
        onClose={() => {
          setAvatarModal(false);
        }}
        onUpdate={handleAvatarUpdate}
        colors={colors}
      />

      <ChangePasswordModal
        baseUrl={baseUrl}
        apiKey={apiKey}
        appId={appId}
        userId={user.id}
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSuccess={(msg) => showNotification("success", msg)}
        onError={(msg) => showNotification("error", msg)}
        colors={colors}
      />

      <DeleteAccountModal
        baseUrl={baseUrl}
        apiKey={apiKey}
        appId={appId}
        userId={user.id}
        token={token}
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        onSuccess={(msg) => showNotification("success", msg)}
        onError={(msg) => showNotification("error", msg)}
        colors={colors}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerifyEmail}
        onClose={() => {
          setShowVerifyEmail(false);
          setOtpSent(false);
          setVerifyFormData({ email: user?.email || "", otp: "", appId });
        }}
        onVerify={handleVerify}
        onSendOTP={handleSendOTP}
        verifyFormData={verifyFormData}
        setVerifyFormData={setVerifyFormData}
        otpSent={otpSent}
        verifying={verifying}
        user={user}
        colors={colors}
        darkMode={darkMode}
      />

      <style>{`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes drawerSlideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes drawerSlideDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
}


  @keyframes slideUp {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Responsive design using container queries as fallback */
  @media (max-width: 599px) {
    .profile-main-container {
      padding: 0 12px;
    }
  }

  @media (min-width: 600px) and (max-width: 767px) {
    .profile-main-container {
      padding: 0 20px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .profile-main-container {
      padding: 0 24px;
    }
  }

  @media (min-width: 1024px) {
    .profile-main-container {
      padding: 0 32px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`}</style>
    </div>
  );
};
