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
} from "lucide-react";
import { getSdkConfig } from "../sdk/config.js";
import DeleteAccountModal from "./components/DeleteAccountModal.js";
import AvatarModal from "./components/AvatarModal.js";
import ChangePasswordModal from "./components/ChangePasswordModal.js";

interface UserProfileProps {
  token: string;
  user?: UserInfo | null;
  darkMode?: boolean;
  primaryColor?: string;
}

export const ReactUserProfile: React.FC<UserProfileProps> = ({
  token,
  user: propUser = null,
  darkMode = true,
  primaryColor = "#00C214",
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
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [verifyFormData, setVerifyFormData] = useState({ email: "", otp: "", appId:appId });
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // ✅ Notification helper
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };


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
          headers: { "x-api-key": apiKey,"x-app-id":appId },
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
        setVerifyFormData({ email: "", otp: "" ,appId});
        setOtpSent(false);
        setShowVerifyEmail(false);
      } else {
        showNotification("error", res.data.message || "Verification failed");
      }
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || "Something went wrong");
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
      setVerifyFormData(prev => ({ ...prev, email: user.email }));
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
        surface: "#18181b",
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
      <div className="profile-container" style={{ color: colors.textPrimary }}>
        <div className="loading-container">
          <Loader2
            size={40}
            color={colors.accent}
            className="spinner"
            aria-hidden="true"
          />
          <p style={{ color: colors.textTertiary }}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container" style={{ color: colors.textPrimary }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            textAlign: "center",
          }}
        >
          <AlertCircle size={40} color={colors.error} aria-hidden="true" />
          <p style={{ color: colors.textTertiary }}>
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
    <div className="profile-container" style={{ color: colors.textPrimary }}>
      {/* Notification */}
      {notification && (
        <div
          className={`notification ${notification.type}`}
          style={{
            zIndex: 10000,
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

      <div className="profile-main-container">
        {/* Email Verification Banner */}
        {!user.isVerified && (
          <div
            className="verification-banner"
            style={{
              backgroundColor: darkMode 
                ? "rgba(245, 158, 11, 0.1)" 
                : "rgba(245, 158, 11, 0.05)",
              border: `1px solid ${darkMode 
                ? "rgba(245, 158, 11, 0.3)" 
                : "rgba(245, 158, 11, 0.2)"}`,
              color: colors.warning,
            }}
          >
            <div className="verification-content">
              <div className="verification-info">
                <AlertCircle size={20} aria-hidden="true" />
                <div>
                  <strong>Email not verified</strong>
                  <p>Please verify your email address to access all features</p>
                </div>
              </div>
              <button
                onClick={() => setShowVerifyEmail(true)}
                disabled={sendingVerification}
                className="btn-verify"
                style={{
                  backgroundColor: colors.warning,
                  color: darkMode ? "#000000" : "#ffffff",
                }}
              >
                {sendingVerification ? (
                  <Loader2 size={16} className="spinner" aria-hidden="true" />
                ) : (
                  <Send size={16} aria-hidden="true" />
                )}
                {sendingVerification ? "Sending..." : "Verify Email"}
              </button>
            </div>
          </div>
        )}

        <div className="profile-grid">
          {/* Left Column - Avatar & Actions */}
          <aside className="profile-sidebar">
            <section
              className="profile-card avatar-section"
              style={{ backgroundColor: colors.surface }}
            >
              <div className="avatar-container">
                <img
                  src={
                    user.avatarUrl ||
                    `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(
                      user.name
                    )}`
                  }
                  alt={`Profile avatar of ${user.name}`}
                  className="avatar-image"
                  style={{ borderColor: colors.border }}
                  width={128}
                  height={128}
                  loading="eager"
                />
                <button
                  onClick={() => setAvatarModal(true)}
                  className="avatar-edit-btn"
                  style={{ backgroundColor: colors.accent }}
                  aria-label="Change profile picture"
                >
                  <Camera size={16} aria-hidden="true" />
                </button>
              </div>
              <h2 className="avatar-name">{user.name}</h2>
              <p style={{ color: colors.textTertiary }}>{user.email}</p>
              
              {/* Verification Status Badge */}
              <div
                className="verification-badge"
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

            <nav className="action-buttons">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="btn btn-outline"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      borderColor: colors.border,
                      color: colors.textPrimary,
                    }}
                  >
                    <X size={16} aria-hidden="true" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary"
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? (
                      <Loader2
                        size={16}
                        className="spinner"
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
                    className="btn btn-primary"
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                    }}
                  >
                    <Edit3 size={16} aria-hidden="true" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="btn btn-secondary"
                  >
                    <Key size={14} aria-hidden="true" />
                    Change Password
                  </button>
                  
                  {/* Resend Verification Button in Sidebar */}
                  {!user.isVerified && (
                    <button
                      onClick={() => setShowVerifyEmail(true)}
                      disabled={sendingVerification}
                      className="btn btn-warning"
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(245, 158, 11, 0.1)"
                          : "rgba(245, 158, 11, 0.05)",
                        color: colors.warning,
                        border: `1px solid ${darkMode
                          ? "rgba(245, 158, 11, 0.3)"
                          : "rgba(245, 158, 11, 0.2)"}`,
                      }}
                    >
                      {sendingVerification ? (
                        <Loader2 size={16} className="spinner" aria-hidden="true" />
                      ) : (
                        <Send size={16} aria-hidden="true" />
                      )}
                      {sendingVerification ? "Sending..." : "Verify Email"}
                    </button>
                  )}

                  <button
                    onClick={() => setShowDeleteAccount(true)}
                    className="btn btn-danger"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(239, 68, 68, 0.15)",
                      color: colors.error,
                      border: `1px solid ${
                        darkMode
                          ? "rgba(239, 68, 68, 0.4)"
                          : "rgba(239, 68, 68, 0.3)"
                      }`,
                    }}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    Delete Account
                  </button>
                </>
              )}
            </nav>
          </aside>

          {/* Right Column - User Details */}
          <main className="profile-content">
            <section
              className="profile-card"
              style={{ backgroundColor: colors.surface }}
            >
              <h2 className="section-title">
                <User size={20} aria-hidden="true" />
                Personal Information
              </h2>

              <div className="fields-grid">
                {userFields.map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.name} className="field-group">
                      <label className="field-label">
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
                          className="field-input"
                          style={{
                            borderColor: primaryColor,
                            color: colors.textPrimary,
                          }}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          aria-label={field.label}
                        />
                      ) : (
                        <div
                          className="field-value"
                          style={{ color: colors.textPrimary }}
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
              className="profile-card"
              style={{ backgroundColor: colors.surface }}
            >
              <h2 className="section-title">
                <Shield size={20} aria-hidden="true" />
                Security Status
              </h2>
              <div className="security-status">
                <div className="security-item">
                  <div className="security-info">
                    <Mail size={16} aria-hidden="true" />
                    <span>Email Verification</span>
                  </div>
                  <div
                    className={`security-status-badge ${
                      user.isVerified ? "verified" : "not-verified"
                    }`}
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
                  <div className="security-notice">
                    <p style={{ color: colors.textTertiary, fontSize: "14px" }}>
                      Verify your email to unlock all features and enhance your account security.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </main>
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
      {showVerifyEmail && (
        <div className="modal-overlay" style={{ backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' }}>
          <div 
            className="verify-email-modal"
            style={{ 
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="modal-header">
              <h3 style={{ color: colors.textPrimary }}>Verify Your Email</h3>
              <button
                onClick={() => {
                  setShowVerifyEmail(false);
                  setOtpSent(false);
                  setVerifyFormData({ email: user?.email || "", otp: "",appId });
                }}
                className="close-btn"
                style={{ color: colors.textTertiary }}
              >
                <X size={20} />
              </button>
            </div>

            <form className="verify-form" onSubmit={handleVerify}>
              <div className="form-group">
                <label style={{ color: colors.textSecondary }}>Email</label>
                <div className="input-container">
                  <Mail size={18} style={{ color: colors.textTertiary }} />
                  <input
                    type="email"
                    value={verifyFormData.email}
                    onChange={(e) => setVerifyFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.textPrimary,
                      borderColor: colors.border,
                    }}
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <div className="form-group">
                  <label style={{ color: colors.textSecondary }}>OTP</label>
                  <div className="input-container">
                    <KeyRound size={18} style={{ color: colors.textTertiary }} />
                    <input
                      type="text"
                      value={verifyFormData.otp}
                      onChange={(e) => setVerifyFormData(prev => ({ ...prev, otp: e.target.value }))}
                      placeholder="Enter OTP"
                      style={{
                        backgroundColor: colors.surfaceLight,
                        color: colors.textPrimary,
                        borderColor: colors.border,
                      }}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="modal-actions">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={verifying}
                    className="btn-primary"
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                      opacity: verifying ? 0.7 : 1,
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
                    className="btn-primary"
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                      opacity: verifying ? 0.7 : 1,
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
          </div>
        </div>
      )}

      <style>{`
        .profile-container {
          width: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.5;
        }

        /* Container-based responsive design */
        .profile-main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          container-type: inline-size;
          container-name: profile-container;
        }

        /* Responsive grid layout */
        .profile-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }

        /* Container queries for different container sizes */
        @container profile-container (min-width: 600px) {
          .profile-grid {
            gap: 28px;
          }
          
          .fields-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        @container profile-container (min-width: 768px) {
          .profile-grid {
            gap: 32px;
          }
          
          .verification-content {
            flex-direction: row;
          }
        }

        @container profile-container (min-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr 2fr;
            gap: 40px;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }

        @container profile-container (min-width: 1200px) {
          .profile-grid {
            gap: 48px;
          }
        }

        /* Mobile-first responsive design */
        @media (max-width: 599px) {
          .profile-main-container {
            padding: 0 12px;
          }
          
          .profile-card {
            padding: 20px;
          }
          
          .verification-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .btn-verify {
            align-self: stretch;
            justify-content: center;
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

        /* Verification Banner */
        .verification-banner {
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
        }

        .verification-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .verification-info {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          flex: 1;
        }

        .verification-info strong {
          display: block;
          margin-bottom: 4px;
        }

        .verification-info p {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }

        .btn-verify {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .btn-verify:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-verify:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Verification Badge */
        .verification-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
        }

        /* Security Status */
        .security-status {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .security-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
        }

        .security-info {
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${colors.textSecondary};
        }

        .security-status-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .security-status-badge.verified {
          background-color: ${darkMode 
            ? "rgba(16, 185, 129, 0.1)" 
            : "rgba(16, 185, 129, 0.05)"};
          color: ${colors.success};
          border: 1px solid ${darkMode 
            ? "rgba(16, 185, 129, 0.3)" 
            : "rgba(16, 185, 129, 0.2)"};
        }

        .security-status-badge.not-verified {
          background-color: ${darkMode 
            ? "rgba(245, 158, 11, 0.1)" 
            : "rgba(245, 158, 11, 0.05)"};
          color: ${colors.warning};
          border: 1px solid ${darkMode 
            ? "rgba(245, 158, 11, 0.3)" 
            : "rgba(245, 158, 11, 0.2)"};
        }

        .security-notice {
          padding: 12px;
          border-radius: 8px;
          background-color: ${darkMode 
            ? "rgba(100, 100, 100, 0.1)" 
            : "rgba(0, 0, 0, 0.05)"};
        }

        /* Warning button style */
        .btn-warning {
          padding: 8px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
        }

        .btn-warning:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background-color: ${darkMode 
            ? "rgba(245, 158, 11, 0.2)" 
            : "rgba(245, 158, 11, 0.1)"} !important;
        }

        .btn-warning:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Email Verification Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .verify-email-modal {
          width: 100%;
          max-width: 440px;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .close-btn:hover {
          background-color: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
        }

        .verify-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-container svg {
          position: absolute;
          left: 12px;
          pointer-events: none;
        }

        .input-container input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border-radius: 8px;
          border: 1px solid;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .input-container input:focus {
          border-color: ${colors.accent};
          box-shadow: 0 0 0 3px ${colors.accent}20;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .modal-actions .btn-primary {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .modal-actions .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .modal-actions .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Existing component styles */
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 24px;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          border: 1px solid;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          max-width: 400px;
          animation: slideIn 0.3s ease-out;
        }

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

        .profile-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .profile-content {
          min-width: 0;
        }

        .profile-card {
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .avatar-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .avatar-container {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }

        .avatar-image {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          border: 3px solid;
        }

        .avatar-edit-btn {
          position: absolute;
          bottom: 8px;
          right: 8px;
          color: white;
          padding: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-edit-btn:hover {
          transform: scale(1.1);
        }

        .avatar-name {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn {
          padding: 8px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          min-height: 44px;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-primary {
          background: linear-gradient(to right, ${colors.accent}, ${
        colors.accentHover
      });
          color: white;
        }

        .btn-secondary {
          background-color: #27272a;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #3f3f46;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid;
        }

        .btn-danger {
          background: transparent;
          border: 1px solid;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 24px 0;
          color: ${colors.textSecondary};
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fields-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          color: ${colors.textTertiary};
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .field-input {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid;
          background: transparent;
          color: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
          min-height: 44px;
          width: 100%;
          box-sizing: border-box;
        }

        .field-input:focus {
          border-color: ${colors.accent};
          box-shadow: 0 0 0 3px ${colors.accent}20;
        }

        .field-value {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid transparent;
          font-size: 14px;
          min-height: 44px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .btn, .avatar-edit-btn, .notification, .btn-verify, .close-btn, .modal-actions .btn-primary {
            transition: none;
          }
          
          .spinner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};