import React, { useState, ChangeEvent, FormEvent } from "react";
import { X, Loader2, Lock, Key, EyeOff, Eye } from "lucide-react";
import { useAuthix } from "../Provider/AuthixProvider.js";

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
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  userId: string;
  colors: ThemeColors;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  userId,
  colors,
}) => {
  const authix = useAuthix();
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
    if (typeof window === "undefined") return;

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
      const { data } = await authix.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        userId,
      });

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

export default ChangePasswordModal;
