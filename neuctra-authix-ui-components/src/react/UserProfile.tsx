import React, { useEffect, useState } from "react";
import axios from "axios";
import { getStoredUserInfo, UserInfo } from "../api/login.js";
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
} from "lucide-react";

interface UserProfileProps {
  baseUrl: string;
  apiKey: string;
  appId: string;
  token: string;
  darkMode?: boolean;
  primaryColor?: string; // ✅ allow user to pass their brand color
}

export const UserProfile: React.FC<UserProfileProps> = ({
  baseUrl,
  apiKey,
  appId,
  token,
  darkMode = true,
  primaryColor = "#3b82f6", // ✅ default fallback (blue)
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAvatarUpdate = async (newAvatarUrl: string) => {
    if (!user) return false;
    try {
      const updateData = { ...user, avatarUrl: newAvatarUrl };
      const { data } = await axios.put(
        `${baseUrl}/users/update/${user.id}`,
        updateData,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
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

  const fetchProfile = async (authToken: string) => {
    try {
      const { data } = await axios.get(`${baseUrl}/users/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-api-key": apiKey,
        },
      });
      if (data.success) {
        setUser(data.user);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...data.user, token: authToken })
        );
      } else {
        showNotification("error", data.message || "Failed to fetch profile");
      }
    } catch (err) {
      console.error(err);
      showNotification("error", "Profile fetch error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/update/${user.id}`,
        user,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
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

  const handleDelete = async () => {
    if (!user) return;
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    try {
      const { data } = await axios.delete(
        `${baseUrl}/users/delete/${user.id}`,
        {
          data: { appId },
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      if (data.success) {
        localStorage.removeItem("userInfo");
        showNotification("success", "Account deleted successfully");
        window.location.href = "/login";
      } else {
        showNotification("error", data.message);
      }
    } catch (err) {
      console.error(err);
      showNotification("error", "Delete failed");
    }
  };

  useEffect(() => {
    const stored = getStoredUserInfo();
    if (stored) {
      setUser(stored);
      setLoading(false);
    } else {
      fetchProfile(token);
    }
  }, [token]);

  // utility to darken/lighten color for hover states
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

  // Color schemes for dark/light mode
  const colors = darkMode
    ? {
        background: "#000000",
        surface: "#09090b",
        surfaceLight: "#09090b",
        surfaceLighter: "#3f3f46",
        textPrimary: "#ffffff",
        textSecondary: "#d4d4d8",
        textTertiary: "#a1a1aa",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -30), // darker for hover
        success: "#10b981",
        error: "rgba(239, 68, 68)",
        border: "#18181B",
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
        accentHover: adjustColor(primaryColor, -30),
        success: "#10b981",
        error: "#ef4444",
        border: "#e4e4e7",
      };

  // Base styles without media queries
  const styles = {
    container: {
      color: colors.textPrimary,
      fontFamily: "'Inter', sans-serif",
      width:"100%"
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
    },
    notification: {
      position: "fixed" as const,
      fontSize: "12px",
      top: "20px",
      right: "20px",
      padding: "12px 24px",
      borderRadius: "12px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(8px)",
      border: "1px solid",
      zIndex: 50,
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    notificationSuccess: {
      backgroundColor: darkMode
        ? "rgba(16, 185, 129, 0.1)"
        : "rgba(16, 185, 129, 0.05)",
      borderColor: darkMode
        ? "rgba(16, 185, 129, 0.3)"
        : "rgba(16, 185, 129, 0.2)",
      color: darkMode ? "#34d399" : "#059669",
    },
    notificationError: {
      backgroundColor: darkMode
        ? "rgba(239, 68, 68, 0.1)"
        : "rgba(239, 68, 68, 0.05)",
      borderColor: darkMode
        ? "rgba(239, 68, 68, 0.3)"
        : "rgba(239, 68, 68, 0.2)",
      color: darkMode ? "#f87171" : "#dc2626",
    },
    mainContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "32px",
      gap: "16px",
    },
    headerTitle: {
      fontSize: "clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)",
      fontWeight: "bold",
      background: darkMode
        ? "linear-gradient(to right, white, #d1d5db)"
        : "linear-gradient(to right, #111827, #374151)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    grid: {
      display: "grid",
      gap: "32px",
      gridTemplateColumns: "1fr",
    },
    avatarSection: {
      backgroundColor: colors.surface,
      borderRadius: "16px",
      padding: "24px",
      textAlign: "center" as const,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarContainer: {
      position: "relative" as const,
      display: "inline-block",
      marginBottom: "16px",
    },
    avatar: {
      width: "128px",
      height: "128px",
      borderRadius: "50%",
      objectFit: "cover" as const,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      border: `3px solid ${colors.border}`,
    },
    changeAvatarButton: {
      position: "absolute" as const,
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
    },
    detailsSection: {
      backgroundColor: colors.surface,
      borderRadius: "16px",
      padding: "24px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
      color: colors.textSecondary,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    fieldContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      borderRadius: "12px",
      marginBottom: "12px",
      transition: "all 0.2s ease",
    },
    fieldLabel: {
      color: colors.textTertiary,
      fontSize: "12px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    fieldInput: {
      flex: 1,
      backgroundColor: "transparent",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      padding: "12px", // keep padding for edit mode
      color: colors.textPrimary,
      outline: "none",
      transition: "border-color 0.2s ease",
      fontSize: "14px",
      minHeight: "44px", // ✅ consistent height
      boxSizing: "border-box" as const,
    },
    fieldValue: {
      flex: 1,
      color: colors.textPrimary,
      fontSize: "14px",
      padding: "12px", // ✅ match input padding
      border: `1px solid transparent`, // ✅ keep layout stable
      borderRadius: "8px", // ✅ same shape
      minHeight: "44px", // ✅ same height as input
      display: "flex",
      alignItems: "center", // ✅ vertically center text
      boxSizing: "border-box" as const,
    },

    actionButtons: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      marginTop: "12px",
    },
    button: {
      padding: "10px 24px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "12px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    cancelButton: {
      backgroundColor: colors.surfaceLight,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
    },
    saveButton: {
      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
      color: "white",
    },
    editButton: {
      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
      color: "white",
    },
    deleteButton: {
      backgroundColor: darkMode
        ? "rgba(239, 68, 68, 0.05)"
        : "rgba(239, 68, 68, 0.05)",
      color: colors.error,
      border: `1px solid ${
        darkMode ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)"
      }`,
    },
    modalOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      zIndex: 50,
    },
    modal: {
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "20px",
      padding: "24px",
      maxWidth: "400px",
      width: "100%",
      fontSize: "14px",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "4px",
      color: colors.textPrimary,
    },
    modalInput: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: colors.surfaceLight,
      border: `1px solid ${colors.border}`,
      color: colors.textPrimary,
      outline: "none",
      marginBottom: "16px",
      fontSize: "12px",
    },
    modalButtons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      fontSize: "14px",
    },
    modalCancel: {
      padding: "8px 20px",
      color: colors.textTertiary,
      background: "none",
      border: "none",
      cursor: "pointer",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    modalConfirm: {
      padding: "8px 20px",
      backgroundColor: colors.accent,
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  // CSS classes for responsive behavior
  const cssStyles = `
    .user-profile-header {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      gap: 16px;
    }
    
    .user-profile-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr;
    }
    
    .user-profile-field-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-radius: 12px;
      margin-bottom: 8px;
      transition: all 0.2s ease;
    }
    
    .user-profile-action-buttons {
      display: flex;
      flex-direction: column;
      justify-content:center;
      gap: 12px;
    }
    
    @media (min-width: 640px) {
      .user-profile-header {
        flex-direction: row;
        align-items: center;
      }
      
      .user-profile-field-container {
        flex-direction: row;
        align-items: center;
      }
      
      .user-profile-action-buttons {
        flex-direction: row;
      }
    }
    
    @media (min-width: 1024px) {
      .user-profile-grid {
        grid-template-columns: 1fr 2fr;
      }
    }
    
    .user-profile-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .user-profile-input:focus {
      border-color: ${colors.accent} !important;
      box-shadow: 0 0 0 3px ${colors.accent}20;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  if (loading) {
    return (
      <div style={styles.container}>
        <style>{cssStyles}</style>
        <div style={styles.loadingContainer}>
          <Loader2
            size={40}
            color={colors.accent}
            style={{ animation: "spin 1s linear infinite" }}
          />
          <p style={{ color: colors.textTertiary, marginTop: "12px" }}>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <style>{cssStyles}</style>
        <div style={styles.loadingContainer}>
          <AlertCircle size={40} color={colors.error} />
          <p style={{ color: colors.textTertiary, marginTop: "12px" }}>
            No profile found. Please log in again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>

      {/* Notification */}
      {notification && (
        <div
          style={{
            ...styles.notification,
            ...(notification.type === "success"
              ? styles.notificationSuccess
              : styles.notificationError),
          }}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {notification.message}
        </div>
      )}

      <div style={styles.mainContainer}>
        {/* Profile Content */}
        <div className="user-profile-grid">
          {/* Left Column (Avatar + Actions) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "18px",
            }}
          >
            {/* Avatar Section */}
            <div style={styles.avatarSection}>
              <div style={styles.avatarContainer}>
                <img
                  src={
                    user.avatarUrl ||
                    `https://api.dicebear.com/7.x/identicon/svg?seed=${user.name}`
                  }
                  alt="Profile avatar"
                  style={styles.avatar}
                />
                <button
                  onClick={() => setAvatarModal(true)}
                  style={styles.changeAvatarButton}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accentHover;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                  }}
                >
                  <Camera size={16} />
                </button>
              </div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                {user.name}
              </h2>
              <p style={{ color: colors.textTertiary, fontSize: "14px" }}>
                {user.email}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="user-profile-action-buttons">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{ ...styles.button, ...styles.cancelButton }}
                    className="user-profile-button"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      ...styles.button,
                      ...styles.saveButton,
                      opacity: saving ? 0.7 : 1,
                    }}
                    className="user-profile-button"
                  >
                    {saving ? (
                      <Loader2
                        size={16}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                    ) : (
                      <Save size={16} />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    style={{ ...styles.button, ...styles.editButton }}
                    className="user-profile-button"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{ ...styles.button, ...styles.deleteButton }}
                    className="user-profile-button"
                  >
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column (User Details) */}
          <div style={styles.detailsSection}>
            <h3 style={styles.sectionTitle}>
              <User size={20} />
              Personal Information
            </h3>

            <div>
              {[
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
              ].map((field) => {
                const IconComponent = field.icon;
                return (
                  <div
                    key={field.name}
                    className="user-profile-field-container"
                  >
                    <label style={styles.fieldLabel}>
                      <IconComponent size={16} />
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
                        style={styles.fieldInput}
                        className="user-profile-input"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <span style={styles.fieldValue}>{field.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {avatarModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Update Avatar</h2>
            <p
              style={{
                color: colors.textTertiary,
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              Enter the URL of your new avatar image
            </p>

            <input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
              style={styles.modalInput}
              className="user-profile-input"
            />

            <div style={styles.modalButtons}>
              <button
                onClick={() => {
                  setAvatarModal(false);
                  setNewAvatar("");
                }}
                style={styles.modalCancel}
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (newAvatar) {
                    const success = await handleAvatarUpdate(newAvatar);
                    if (success) {
                      setAvatarModal(false);
                      setNewAvatar("");
                    }
                  }
                }}
                style={styles.modalConfirm}
              >
                <Camera size={16} />
                Update Avatar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
