import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
  Lock,
  Key,
  EyeOff,
  Eye,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Link2,
  Image,
  Upload,
  Database,
  UserX,
  LogOut,
} from "lucide-react";
import { getSdkConfig } from "../sdk/config.js";

interface UserProfileProps {
  token: string;
  user?: UserInfo | null;
  darkMode?: boolean;
  primaryColor?: string;
}

interface ThemeColors {
  background: string;
  surface: string;
  surfaceLight: string;
  surfaceLighter: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  success: string;
  error: string;
  border: string;
}

interface ChangePasswordModalProps {
  baseUrl: string;
  apiKey: string;
  appId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  userId: string;
  colors: ThemeColors;
}

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (url: string) => Promise<boolean>;
  colors: ThemeColors;
}

interface DeleteAccountModalProps {
  baseUrl: string;
  apiKey: string;
  appId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  userId: string;
  token: string;
  colors: ThemeColors;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  colors,
}) => {
  const [newAvatar, setNewAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [validation, setValidation] = useState<{
    isValid: boolean;
    message: string;
    type: "success" | "error" | "warning" | null;
  }>({ isValid: false, message: "", type: null });

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Validate URL
  useEffect(() => {
    if (!newAvatar.trim()) {
      setValidation({ isValid: false, message: "", type: null });
      return;
    }

    try {
      const url = new URL(newAvatar);
      const isValidImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);

      if (isValidImage) {
        setValidation({
          isValid: true,
          message: "Valid image URL",
          type: "success",
        });
      } else {
        setValidation({
          isValid: false,
          message: "URL should point to an image file",
          type: "warning",
        });
      }
    } catch {
      setValidation({
        isValid: false,
        message: "Please enter a valid URL",
        type: "error",
      });
    }
  }, [newAvatar]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!newAvatar || !validation.isValid) return;

    setLoading(true);
    try {
      const success = await onUpdate(newAvatar);
      if (success) {
        setNewAvatar("");
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "20px",
          width: "100%",
          maxWidth: "480px",
          padding: "24px",
          boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          animation: "modalSlideIn 0.3s ease-out",
        }}
        className="avatar-modal-container"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}40)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.accent,
                flexShrink: 0,
              }}
            >
              <Camera size={22} />
            </div>
            <div>
              <h3
                style={{
                  color: colors.textPrimary,
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: "1.3",
                }}
              >
                Update Avatar
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close avatar modal"
            style={{
              background: "transparent",
              border: "none",
              color: colors.textTertiary,
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.border;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.textTertiary;
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* URL Input */}
          <div>
            <label
              htmlFor="avatar-url"
              style={{
                display: "flex",
                marginBottom: "8px",
                color: colors.textPrimary,
                fontSize: "14px",
                fontWeight: 500,

                alignItems: "center",
                gap: "6px",
              }}
            >
              <Link2 size={16} />
              Avatar URL
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="url"
                id="avatar-url"
                placeholder="https://example.com/your-avatar.jpg"
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  paddingLeft: "44px",
                  borderRadius: "12px",
                  border: `1.5px solid ${
                    validation.type === "error"
                      ? colors.error
                      : validation.type === "success"
                      ? colors.success
                      : colors.border
                  }`,
                  backgroundColor: "transparent",
                  color: colors.textPrimary,
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    validation.type === "error"
                      ? colors.error
                      : validation.type === "success"
                      ? colors.success
                      : colors.border;
                  e.target.style.boxShadow = "none";
                }}
                disabled={loading}
              />
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.textTertiary,
                }}
              >
                <Image size={18} />
              </div>
            </div>

            {/* Validation Message */}
            {validation.message && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "8px",
                  fontSize: "13px",
                  color:
                    validation.type === "success"
                      ? colors.success
                      : validation.type === "error"
                      ? colors.error
                      : colors.textTertiary,
                }}
              >
                {validation.type === "success" && <CheckCircle size={14} />}
                {validation.type === "error" && <AlertCircle size={14} />}
                {validation.type === "warning" && <AlertCircle size={14} />}
                {validation.message}
              </div>
            )}
          </div>

          {/* Preview */}
          {newAvatar && validation.type === "success" && (
            <div
              style={{
                padding: "16px",
                backgroundColor: `${colors.success}10`,
                border: `1px solid ${colors.success}20`,
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: colors.textSecondary,
                  fontSize: "13px",
                  fontWeight: 500,
                  margin: "0 0 12px 0",
                }}
              >
                Preview
              </p>
              <img
                src={newAvatar}
                alt="Avatar preview"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${colors.success}40`,
                  margin: "0 auto",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: isMobile ? "column-reverse" : "row",
            justifyContent: "flex-end",
            alignItems: "stretch",
            marginTop: "24px",
          }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: `1.5px solid ${colors.border}`,
              background: "transparent",
              color: colors.textPrimary,
              fontSize: "14px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              flex: isMobile ? "none" : 1,
              minWidth: isMobile ? "100%" : "120px",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = colors.border;
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !validation.isValid}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: "none",
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}E6)`,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor:
                loading || !validation.isValid ? "not-allowed" : "pointer",
              flex: isMobile ? "none" : 1,
              minWidth: isMobile ? "100%" : "140px",
              opacity: loading || !validation.isValid ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              boxShadow:
                loading || !validation.isValid
                  ? "none"
                  : `0 4px 12px ${colors.accent}40`,
            }}
            onMouseOver={(e) => {
              if (!loading && validation.isValid) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 6px 20px ${colors.accent}60`;
              }
            }}
            onMouseOut={(e) => {
              if (!loading && validation.isValid) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${colors.accent}40`;
              }
            }}
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
                Updating...
              </>
            ) : (
              <>
                <Camera size={16} />
                Update Avatar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .avatar-modal-container {
            animation: modalSlideIn 0.3s ease-out;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 480px) {
            .avatar-modal-container {
              padding: 20px 16px;
              margin: 0;
              border-radius: 16px 16px 0 0;
              max-height: 90vh;
              overflow-y: auto;
            }
          }
          
          @media (max-width: 360px) {
            .avatar-modal-container {
              padding: 16px 12px;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .avatar-modal-container {
              animation: none;
            }
            
            * {
              transition: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  userId,
  colors,
}) => {
  const { baseUrl, apiKey, appId } = getSdkConfig();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Check mobile screen size
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleVisibility = (field: string) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/change-password/${userId}`,
        {
          appId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      if (data.success) {
        onSuccess(data.message || "Password updated successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        onClose();
      } else {
        onError(data.message || "Failed to update password");
      }
    } catch (err: any) {
      onError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const passwordFields = [
    {
      field: "currentPassword",
      label: "Current Password",
      icon: <Key size={18} />,
    },
    {
      field: "newPassword",
      label: "New Password",
      icon: <Lock size={18} />,
    },
    {
      field: "confirmPassword",
      label: "Confirm Password",
      icon: <Lock size={18} />,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "16px",
          maxWidth: "440px",
          width: "100%",
          padding: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        className="change-password-modal"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}40)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.accent,
                flexShrink: 0,
              }}
            >
              <Lock size={20} />
            </div>
            <div>
              <h3
                style={{
                  color: colors.textPrimary,
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "1.4",
                }}
              >
                Change Password
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close password change modal"
            style={{
              background: "transparent",
              border: "none",
              color: colors.textTertiary,
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              flexShrink: 0,
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.border;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.textTertiary;
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {passwordFields.map(({ field, label, icon }) => (
            <div
              key={field}
              style={{
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <label
                htmlFor={field}
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textPrimary,
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "1.4",
                }}
              >
                {label}
              </label>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: colors.textTertiary,
                    zIndex: 2,
                  }}
                >
                  {icon}
                </div>
                <input
                  type={showPassword[field] ? "text" : "password"}
                  id={field}
                  name={field}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 44px",
                    borderRadius: "10px",
                    border: `1.5px solid ${
                      errors[field] ? colors.error : colors.border
                    }`,
                    backgroundColor: "transparent",
                    color: colors.textPrimary,
                    fontSize: "15px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors[field]
                      ? colors.error
                      : colors.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(field)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: colors.textTertiary,
                    padding: "4px",
                    borderRadius: "4px",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.border;
                    e.currentTarget.style.color = colors.textPrimary;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.textTertiary;
                  }}
                >
                  {showPassword[field] ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors[field] && (
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.error,
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>⚠</span>
                  {errors[field]}
                </div>
              )}
            </div>
          ))}

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: isMobile ? "column-reverse" : "row",
              justifyContent: "flex-end",
              alignItems: "stretch",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                border: `1.5px solid ${colors.border}`,
                background: "transparent",
                color: colors.textPrimary,
                fontSize: "14px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                flex: isMobile ? "none" : 1,
                minWidth: isMobile ? "100%" : "120px",
                opacity: loading ? 0.6 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = colors.border;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                border: "none",
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}E6)`,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                flex: isMobile ? "none" : 1,
                minWidth: isMobile ? "100%" : "140px",
                opacity: loading ? 0.8 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                boxShadow: loading ? "none" : `0 4px 12px ${colors.accent}40`,
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 6px 20px ${colors.accent}60`;
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.accent}40`;
                }
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>

        {/* Inline CSS for animations */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            .change-password-modal::-webkit-scrollbar {
              width: 6px;
            }
            
            .change-password-modal::-webkit-scrollbar-track {
              background: transparent;
            }
            
            .change-password-modal::-webkit-scrollbar-thumb {
              background: ${colors.border};
              border-radius: 3px;
            }
            
            .change-password-modal::-webkit-scrollbar-thumb:hover {
              background: ${colors.textTertiary};
            }
            
            /* Mobile responsiveness */
            @media (max-width: 480px) {
              .change-password-modal {
                padding: 20px 16px;
                margin: 0;
                border-radius: 12px 12px 0 0;
                max-height: 85vh;
              }
            }
            
            @media (max-width: 360px) {
              .change-password-modal {
                padding: 16px 12px;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  userId,
  token,
  colors,
}) => {
  const { baseUrl, apiKey, appId } = getSdkConfig();
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [step, setStep] = useState<
    "warning" | "confirmation" | "processing" | "success"
  >("warning");
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setStep("processing");

    try {
      const { data } = await axios.delete(`${baseUrl}/users/delete/${userId}`, {
        data: { appId },
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (data.success) {
        onSuccess(data.message || "Account deleted successfully");
        setStep("success");

        // Redirect after showing success state
        setTimeout(() => {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("userToken");
          window.location.href = "/";
        }, 2000);
      } else {
        onError(data.message || "Failed to delete account");
        setStep("warning");
      }
    } catch (err: any) {
      onError(err.response?.data?.message || "Something went wrong");
      setStep("warning");
    } finally {
      setLoading(false);
    }
  };

  const isConfirmed = confirmationText.toLowerCase() === "delete my account";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget &&
      step !== "processing" &&
      step !== "success"
    ) {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "warning":
        return (
          <>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  <Trash2 size={20} />
                </div>
                <div>
                  <h3
                    style={{
                      color: colors.textPrimary,
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: 700,
                      lineHeight: "1.3",
                    }}
                  >
                    Delete Account
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: "transparent",
                  border: "none",
                  color: colors.textTertiary,
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.border;
                  e.currentTarget.style.color = colors.textPrimary;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.textTertiary;
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Warning Content */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px",
                background: `${colors.error}15`,
                border: `1px solid ${colors.error}30`,
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  color: colors.error,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <AlertTriangle size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    color: colors.textPrimary,
                    margin: "0 0 12px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Before you proceed...
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    {
                      icon: <Database size={16} />,
                      text: "All your data will be permanently deleted",
                    },
                    {
                      icon: <UserX size={16} />,
                      text: "This action cannot be reversed",
                    },
                    {
                      icon: <LogOut size={16} />,
                      text: "You will lose access to all services",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "14px",
                        color: colors.textSecondary,
                      }}
                    >
                      <div style={{ color: colors.error, flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexDirection: isMobile ? "column-reverse" : "row",
                justifyContent: "flex-end",
                alignItems: "stretch",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  border: `1.5px solid ${colors.border}`,
                  background: "transparent",
                  color: colors.textPrimary,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  flex: isMobile ? "none" : 1,
                  minWidth: isMobile ? "100%" : "120px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.border;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setStep("confirmation")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  flex: isMobile ? "none" : 1,
                  minWidth: isMobile ? "100%" : "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(239, 68, 68, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(239, 68, 68, 0.4)";
                }}
              >
                <Trash2 size={16} />
                Continue to Delete
              </button>
            </div>
          </>
        );

      case "confirmation":
        return (
          <>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    color: colors.textPrimary,
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "1.3",
                  }}
                >
                  Confirm Deletion
                </h3>
              </div>
            </div>

            {/* Confirmation Content */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  color: colors.textSecondary,
                  marginBottom: "16px",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                Type{" "}
                <strong style={{ color: colors.textPrimary }}>
                  "delete my account"
                </strong>{" "}
                to confirm:
              </p>

              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="delete my account"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: `2px solid ${
                    isConfirmed ? colors.success : colors.error
                  }`,
                  backgroundColor: "transparent",
                  color: colors.textPrimary,
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                }}
                autoFocus
              />

              {isConfirmed && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                    color: colors.success,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Confirmation accepted</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexDirection: isMobile ? "column-reverse" : "row",
                justifyContent: "flex-end",
                alignItems: "stretch",
              }}
            >
              <button
                onClick={() => {
                  setStep("warning");
                  setConfirmationText("");
                }}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  border: `1.5px solid ${colors.border}`,
                  background: "transparent",
                  color: colors.textPrimary,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  flex: isMobile ? "none" : 1,
                  minWidth: isMobile ? "100%" : "120px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.border;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Go Back
              </button>
              <button
                onClick={handleDelete}
                disabled={!isConfirmed || loading}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: !isConfirmed || loading ? "not-allowed" : "pointer",
                  flex: isMobile ? "none" : 1,
                  minWidth: isMobile ? "100%" : "140px",
                  opacity: !isConfirmed || loading ? 0.6 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  boxShadow:
                    !isConfirmed || loading
                      ? "none"
                      : "0 4px 12px rgba(239, 68, 68, 0.4)",
                }}
                onMouseOver={(e) => {
                  if (isConfirmed && !loading) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(239, 68, 68, 0.5)";
                  }
                }}
                onMouseOut={(e) => {
                  if (isConfirmed && !loading) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(239, 68, 68, 0.4)";
                  }
                }}
              >
                <Trash2 size={16} />
                Yes, Delete My Account
              </button>
            </div>
          </>
        );

      case "processing":
        return (
          <>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #6b7280, #4b5563)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <Loader2
                  size={20}
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    color: colors.textPrimary,
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "1.3",
                  }}
                >
                  Deleting Account
                </h3>
                <p
                  style={{
                    color: colors.textTertiary,
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Please wait while we process your request
                </p>
              </div>
            </div>

            {/* Processing Content */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  { text: "Removing your data", active: true },
                  { text: "Closing active sessions", active: false },
                  { text: "Finalizing deletion", active: false },
                ].map((stepItem, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                      backgroundColor: stepItem.active
                        ? `${colors.accent}10`
                        : "transparent",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: stepItem.active
                          ? colors.accent
                          : colors.textTertiary,
                        transition: "all 0.3s ease",
                        boxShadow: stepItem.active
                          ? `0 0 0 4px ${colors.accent}20`
                          : "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        color: stepItem.active
                          ? colors.textPrimary
                          : colors.textSecondary,
                        fontWeight: stepItem.active ? 500 : 400,
                      }}
                    >
                      {stepItem.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px",
                background: `${colors.accent}10`,
                borderRadius: "10px",
                fontSize: "14px",
                color: colors.textSecondary,
              }}
            >
              <Shield
                size={18}
                style={{ color: colors.accent, flexShrink: 0 }}
              />
              <span>You will be redirected to the login page shortly</span>
            </div>
          </>
        );

      case "success":
        return (
          <>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    color: colors.textPrimary,
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "1.3",
                  }}
                >
                  Account Deleted
                </h3>
                <p
                  style={{
                    color: colors.textTertiary,
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Your account has been successfully deleted
                </p>
              </div>
            </div>

            {/* Success Content */}
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                background: `${colors.success}10`,
                border: `1px solid ${colors.success}20`,
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            >
              <CheckCircle2
                size={48}
                style={{
                  color: colors.success,
                  marginBottom: "12px",
                  display: "block",
                  margin: "0 auto 12px auto",
                }}
              />
              <p
                style={{
                  color: colors.textPrimary,
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: "0 0 8px 0",
                }}
              >
                Goodbye!
              </p>
              <p
                style={{
                  color: colors.textSecondary,
                  fontSize: "14px",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Your account and all associated data have been permanently
                removed from our systems.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px",
                background: `${colors.accent}10`,
                borderRadius: "10px",
                fontSize: "14px",
                color: colors.textSecondary,
                justifyContent: "center",
              }}
            >
              <Loader2
                size={16}
                style={{
                  animation: "spin 1s linear infinite",
                  color: colors.accent,
                }}
              />
              <span>Redirecting to login page...</span>
            </div>
          </>
        );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 10000,
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "20px",
          width: "100%",
          maxWidth: "480px",
          padding: "24px",
          boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          animation: "scaleIn 0.3s ease-out",
        }}
        className="delete-modal-container"
      >
        {renderStepContent()}
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .delete-modal-container {
            animation: scaleIn 0.3s ease-out;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 480px) {
            .delete-modal-container {
              padding: 20px 16px;
              margin: 0;
              border-radius: 16px 16px 0 0;
              max-height: 90vh;
              overflow-y: auto;
            }
          }
          
          @media (max-width: 360px) {
            .delete-modal-container {
              padding: 16px 12px;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .delete-modal-container {
              animation: none;
            }
            
            * {
              transition: none !important;
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

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
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // ✅ Notification helper
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
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
        localStorage.setItem("userInfo", JSON.stringify({ ...updateData, token }));
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
        localStorage.setItem("userInfo", JSON.stringify({ ...data.user, token }));
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
      // optional clear
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
        validateUser(propUser.id); // 🔹 no await
      } else {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed: UserInfo = JSON.parse(stored);
          setUser(parsed);
          setLoading(false);
          validateUser(parsed.id); // 🔹 background validation
        } else {
          setLoading(false);
        }
      }
    };

    initUser();
  }, [propUser]);


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
        background: "#000000", // pure black background
        surface: "#18181b", // main card surface
        surfaceLight: "#27272a", // lighter than surface for contrast
        surfaceLighter: "#3f3f46", // even lighter for inputs/hover
        textPrimary: "#ffffff", // main text
        textSecondary: "#d4d4d8", // muted text
        textTertiary: "#a1a1aa", // tertiary (labels/hints)
        accent: primaryColor, // dynamic brand color
        accentHover: adjustColor(primaryColor, -15), // softer hover shade
        success: "#10b981", // green success
        error: "#ef4444", // solid red error
        border: "#27272a", // slightly lighter than surface
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
            gap:"12px",
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
                  <button
                    onClick={() => setShowDeleteAccount(true)}
                    className="btn btn-danger"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(239, 68, 68, 0.1)" // slightly stronger red for dark mode
                        : "rgba(239, 68, 68, 0.15)", // softer red for light mode
                      color: colors.error, // consistent error text color
                      border: `1px solid ${
                        darkMode
                          ? "rgba(239, 68, 68, 0.4)"
                          : "rgba(239, 68, 68, 0.3)"
                      }`,
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = darkMode
                        ? "rgba(239, 68, 68, 0.2)"
                        : "rgba(239, 68, 68, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = darkMode
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(239, 68, 68, 0.15)";
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

      <style>{`
        .profile-container {
          width: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.5;
        }

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

        .profile-main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .profile-header {
          margin-bottom: 32px;
          text-align: center;
        }

        .profile-title {
          font-size: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 8px 0;
          background: ${
            darkMode
              ? "linear-gradient(to right, white, #d1d5db)"
              : "linear-gradient(to right, #111827, #374151)"
          };
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profile-subtitle {
          font-size: 16px;
          margin: 0;
        }

        .profile-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
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

        .btn:hover {
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

        /* Responsive Design */
        @media (min-width: 640px) {
          .profile-main-container {
            padding: 0 24px;
          }

          .profile-header {
            text-align: left;
          }
        }

        @media (min-width: 768px) {
          .fields-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .field-group:nth-last-child(1):nth-child(odd) {
            grid-column: 1 / -1;
          }
        }

        @media (min-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr 2fr;
            gap: 32px;
          }

          .action-buttons {
            flex-direction: column;
          }
        }

        @media (min-width: 1280px) {
          .profile-main-container {
            padding: 0 32px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .btn, .avatar-edit-btn, .notification {
            transition: none;
          }
          
          .spinner {
            animation: none;
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .field-input {
            border-width: 2px;
          }
          
          .btn {
            border-width: 2px;
          }
        }
      `}</style>
    </div>
  );
};
