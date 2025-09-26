import React, { useEffect, useState } from "react";
import axios from "axios";
import { getStoredUserInfo, UserInfo } from "../api/login.js";

interface UserProfileProps {
  baseUrl: string;
  apiKey: string;
  token: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  baseUrl,
  apiKey,
  token,
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
        `${baseUrl}/api/users/${user.id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      const { data } = await axios.delete(`${baseUrl}/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      });
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

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #111827 0%, #000000 100%)",
      color: "white",
      fontFamily: "'Inter', sans-serif"
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px"
    },
    spinner: {
      animation: "spin 1s linear infinite",
      height: "40px",
      width: "40px",
      border: "4px solid #3b82f6",
      borderTop: "4px solid transparent",
      borderRadius: "50%",
      marginBottom: "12px"
    },
    errorIcon: {
      height: "40px",
      width: "40px",
      backgroundColor: "#ef4444",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "12px"
    },
    notification: {
      position: "fixed" as const,
      top: "20px",
      right: "20px",
      padding: "12px 24px",
      borderRadius: "12px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(8px)",
      border: "1px solid",
      zIndex: 50,
      transition: "all 0.3s ease"
    },
    notificationSuccess: {
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "rgba(34, 197, 94, 0.3)",
      color: "#86efac"
    },
    notificationError: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.3)",
      color: "#fca5a5"
    },
    notificationContent: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%"
    },
    mainContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px 16px"
    },
    header: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "32px",
      gap: "16px"
    },
    headerTitle: {
      fontSize: "clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)",
      fontWeight: "bold",
      background: "linear-gradient(to right, white, #d1d5db)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    headerSubtitle: {
      color: "#9ca3af",
      marginTop: "4px"
    },
    backButton: {
      padding: "10px 24px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "white",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backdropFilter: "blur(8px)"
    },
    grid: {
      display: "grid",
      gap: "24px",
      gridTemplateColumns: "1fr"
    },
    avatarSection: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      padding: "24px",
      textAlign: "center" as const
    },
    avatarContainer: {
      position: "relative" as const,
      display: "inline-block"
    },
    avatar: {
      width: "128px",
      height: "128px",
      borderRadius: "20px",
      margin: "0 auto 16px",
      objectFit: "cover" as const,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
    },
    changeAvatarButton: {
      position: "absolute" as const,
      bottom: "8px",
      right: "8px",
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "14px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    },
    detailsSection: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      padding: "24px"
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#d1d5db"
    },
    fieldContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      marginBottom: "16px"
    },
    fieldLabel: {
      color: "#9ca3af",
      fontSize: "14px",
      fontWeight: "500",
      minWidth: "120px"
    },
    fieldInput: {
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      padding: "8px 12px",
      color: "white",
      outline: "none",
      transition: "border-color 0.2s ease"
    },
    actionButtons: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "32px"
    },
    button: {
      padding: "10px 24px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "14px",
      fontWeight: "500"
    },
    cancelButton: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "white"
    },
    saveButton: {
      background: "linear-gradient(to right, #3b82f6, #2563eb)",
      color: "white"
    },
    editButton: {
      background: "linear-gradient(to right, #3b82f6, #2563eb)",
      color: "white"
    },
    deleteButton: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      color: "#fca5a5"
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
      zIndex: 50
    },
    modal: {
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "20px",
      padding: "24px",
      maxWidth: "400px",
      width: "100%"
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "16px"
    },
    modalInput: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: "#4b5563",
      border: "1px solid #6b7280",
      color: "white",
      outline: "none",
      marginBottom: "16px"
    },
    modalButtons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px"
    },
    modalCancel: {
      padding: "8px 16px",
      color: "#9ca3af",
      background: "none",
      border: "none",
      cursor: "pointer"
    },
    modalConfirm: {
      padding: "8px 16px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }
  };

  // Media queries for responsiveness
  const mediaQueries = {
    sm: "@media (min-width: 640px)",
    lg: "@media (min-width: 1024px)"
  };

  // Apply responsive styles
  Object.assign(styles.header, {
    [mediaQueries.sm]: {
      flexDirection: "row",
      alignItems: "center"
    }
  });

  Object.assign(styles.grid, {
    [mediaQueries.lg]: {
      gridTemplateColumns: "1fr 2fr"
    }
  });

  Object.assign(styles.fieldContainer, {
    [mediaQueries.sm]: {
      flexDirection: "row",
      alignItems: "center"
    }
  });

  Object.assign(styles.actionButtons, {
    [mediaQueries.sm]: {
      flexDirection: "row"
    }
  });

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={{ color: "#6b7280" }}>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.errorIcon}>
          <span style={{ color: "white", fontWeight: "bold" }}>!</span>
        </div>
        <p style={{ color: "#9ca3af" }}>No profile found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Global styles for animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          button:hover {
            transform: translateY(-1px);
          }
          
          input:focus {
            border-color: #3b82f6 !important;
          }
        `}
      </style>

      {/* Notification */}
      {notification && (
        <div
          style={{
            ...styles.notification,
            ...(notification.type === "success" ? styles.notificationSuccess : styles.notificationError)
          }}
        >
          <div style={styles.notificationContent}>
            <div
              style={{
                ...styles.statusDot,
                backgroundColor: notification.type === "success" ? "#34d399" : "#f87171"
              }}
            ></div>
            {notification.message}
          </div>
        </div>
      )}

      <div style={styles.mainContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Profile Settings</h1>
            <p style={styles.headerSubtitle}>Manage your account information</p>
          </div>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={styles.backButton}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Profile Content */}
        <div style={styles.grid}>
          {/* Avatar Section */}
          <div>
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
                    e.currentTarget.style.backgroundColor = "#2563eb";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b82f6";
                  }}
                >
                  Change
                </button>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>{user.name}</h2>
              <p style={{ color: "#9ca3af", fontSize: "14px" }}>{user.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div>
            <div style={styles.detailsSection}>
              <h3 style={styles.sectionTitle}>Personal Information</h3>
              
              <div>
                {[
                  { label: "Full Name", value: user.name, name: "name", type: "text" },
                  { label: "Email Address", value: user.email, name: "email", type: "email" },
                  { label: "Phone Number", value: user.phone || "Not set", name: "phone", type: "tel" },
                  { label: "Address", value: user.address || "Not provided", name: "address", type: "text" },
                ].map((field) => (
                  <div key={field.name} style={styles.fieldContainer}>
                    <label style={styles.fieldLabel}>
                      {field.label}
                    </label>
                    {editMode ? (
                      <input
                        type={field.type}
                        name={field.name}
                        value={user[field.name as keyof UserInfo] as string}
                        onChange={(e) =>
                          setUser((prev) =>
                            prev ? { ...prev, [e.target.name]: e.target.value } : prev
                          )
                        }
                        style={styles.fieldInput}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <span style={{ flex: 1, color: "white" }}>{field.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                style={{ ...styles.button, ...styles.cancelButton }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ 
                  ...styles.button, 
                  ...styles.saveButton,
                  opacity: saving ? 0.5 : 1
                }}
                onMouseOver={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #1d4ed8)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = "linear-gradient(to right, #3b82f6, #2563eb)";
                  }
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                style={{ ...styles.button, ...styles.editButton }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #1d4ed8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "linear-gradient(to right, #3b82f6, #2563eb)";
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                style={{ ...styles.button, ...styles.deleteButton }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                }}
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>

      {/* Avatar Modal */}
      {avatarModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Update Avatar</h2>
            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "16px" }}>
              Enter the URL of your new avatar image
            </p>
            
            <input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
              style={styles.modalInput}
            />
            
            <div style={styles.modalButtons}>
              <button
                onClick={() => setAvatarModal(false)}
                style={styles.modalCancel}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newAvatar) {
                    setUser((prev) =>
                      prev ? { ...prev, avatarUrl: newAvatar } : prev
                    );
                    setAvatarModal(false);
                    setNewAvatar("");
                  }
                }}
                style={styles.modalConfirm}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                }}
              >
                Update Avatar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};