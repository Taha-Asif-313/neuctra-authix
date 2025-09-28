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
  Phone,
  MapPin,
  Image,
  UserCheck,
  UserX,
  X,
  Plus,
} from "lucide-react";

interface SignupFormProps {
  baseUrl: string;
  apiKey: string;
  appId: string;

  // Customization options
  logoUrl?: string;
  title?: string;
  subtitle?: string;
  footerText?: string;
  primaryColor?: string;
  gradient?: string;
  darkMode?: boolean;

  // Customizable fields - users can choose which fields to show
  showPhone?: boolean;
  showAddress?: boolean;
  showAvatar?: boolean;
  showRole?: boolean;
  showStatus?: boolean;

  loginUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

// Define the form data interface
interface FormData {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}

export const UserSignUp: React.FC<SignupFormProps> = ({
  baseUrl,
  apiKey,
  appId,
  logoUrl,
  title = "Create Your Account",
  subtitle = "Join our platform today",
  footerText = "Secure authentication powered by our platform",
  primaryColor = "#22c55e",
  gradient = "linear-gradient(135deg, #10b981, #22c55e)",
  darkMode = true,

  // Field visibility props - all optional, default to false
  showPhone = false,
  showAddress = false,
  showAvatar = false,
  showRole = false,
  showStatus = false,

  loginUrl,
  onSuccess,
  onError,
  onClose,
}) => {
  // Initialize form data with only the fields that will be shown
  const initialFormData: FormData = {
    name: "",
    email: "",
    password: "",
    isActive: true,
    role: "user",
    ...(showPhone && { phone: "" }),
    ...(showAddress && { address: "" }),
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev: FormData) => ({ ...prev, isActive: !prev.isActive }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
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
      setMessage({ type: "success", text: "Account created successfully" });
      if (onSuccess) onSuccess(user);
    } catch (err: any) {
      const errorMsg = err.message || "Signup failed";
      setMessage({ type: "error", text: errorMsg });
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate if we should show two columns (only if we have enough fields and not on mobile)
  const shouldShowTwoColumns =
    !isMobile && (showPhone || showAddress || showRole || showStatus);

  // Responsive Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    borderRadius: isMobile ? "12px" : "12px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: shouldShowTwoColumns ? "900px" : "390px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  // Header - Vertical Centered
  const headerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: isMobile ? "32px 24px 0px 24px" : "20px 32px 0px 32px",
  };

  const logoStyle: React.CSSProperties = {
    height: isMobile ? "48px" : "50px",
    width: isMobile ? "48px" : "50px",
    objectFit: "contain",
    marginBottom: isMobile ? "16px" : "20px",
    borderRadius: "12px",
  };

  const iconWrapperStyle: React.CSSProperties = {
    height: isMobile ? "60px" : "80px",
    width: isMobile ? "60px" : "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${primaryColor}20`,
    borderRadius: "16px",
    marginBottom: isMobile ? "16px" : "20px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "24px" : "24px",
    fontWeight: 700,
    color: textColor,
    margin: "0 0 8px 0",
    letterSpacing: "-0.025em",
    lineHeight: "1.2",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: isMobile ? "14px" : "14px",
    color: subTextColor,
    margin: 0,
    lineHeight: "1.5",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: isMobile ? "16px" : "20px",
    right: isMobile ? "16px" : "20px",
    color: subTextColor,
    backgroundColor: "transparent",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    padding: isMobile ? "24px" : "10px 32px",
  };

  const formStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: shouldShowTwoColumns ? "1fr 1fr" : "1fr",
    gap: isMobile ? "20px" : "20px",
  };

  const columnStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "end",
    flexDirection: "column",
    gap: isMobile ? "16px" : "16px",
  };

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: isMobile ? "14px" : "14px",
    fontWeight: 600,
    color: textColor,
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const inputIconStyle: React.CSSProperties = {
    position: "absolute",
    left: "16px",
    color: subTextColor,
    width: "20px",
    height: "20px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "14px 14px 14px 48px" : "16px 16px 16px 52px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
    color: textColor,
    fontSize: isMobile ? "15px" : "15px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "14px 48px 14px 16px" : "16px 52px 16px 16px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
    color: textColor,
    fontSize: isMobile ? "16px" : "16px",
    outline: "none",
    appearance: "none",
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: "absolute",
    right: "16px",
    backgroundColor: "transparent",
    border: "none",
    color: subTextColor,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  };

  // Avatar Preview at the top
  const avatarPreviewContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    margin: "10px 0px",
  };

  const avatarPreviewStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "200px",
  };

  const avatarImageStyle: React.CSSProperties = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${primaryColor}30`,
  };

  const avatarPlaceholderStyle: React.CSSProperties = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: `${primaryColor}10`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: primaryColor,
    border: `2px solid ${primaryColor}20`,
  };

  const statusToggleStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "21px 20px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
  };

  const statusContentStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "12px",
  };

  const toggleSwitchStyle: React.CSSProperties = {
    width: "52px",
    height: "28px",
    backgroundColor: formData.isActive ? primaryColor : "#9ca3af",
    borderRadius: "14px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const toggleKnobStyle: React.CSSProperties = {
    position: "absolute",
    top: "2px",
    left: formData.isActive ? "26px" : "2px",
    width: "24px",
    height: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transition: "left 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: isMobile ? "0px 24px 18px 24px" : "14px 32px 18px 32px",
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: isMobile ? "12px" : "13px",
    color: subTextColor,
    textAlign: "center",
    lineHeight: "1.5",
  };

  const loginLinkStyle: React.CSSProperties = {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: isMobile ? "14px" : "15px",
    fontWeight: 500,
    textAlign: "center",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    width: "100%",
  };

  const buttonStyle: React.CSSProperties = {
    padding: isMobile ? "14px 20px" : "14px 24px",
    borderRadius: "12px",
    border: "none",
    fontSize: isMobile ? "15px" : "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    flex: 1,
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: inputBg,
    color: textColor,
    border: `1px solid ${inputBorder}`,
  };

  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: loading ? "#9ca3af" : gradient,
    color: "#ffffff",
    boxShadow: loading ? "none" : `0 4px 14px 0 ${primaryColor}40`,
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#9ca3af",
    color: "#ffffff",
    cursor: "not-allowed",
    boxShadow: "none",
  };

  const messageStyle: React.CSSProperties = {
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginTop: "20px",
  };

  const successMessageStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: `${primaryColor}15`,
    border: `1px solid ${primaryColor}30`,
    color: primaryColor,
  };

  const errorMessageStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#ef4444",
  };

  return (
    <div style={containerStyle}>
      <div style={modalStyle}>
        {/* Header - Vertical Centered */}
        <div style={{ position: "relative" }}>
          <div style={headerStyle}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={logoStyle} />
            ) : (
              <div style={iconWrapperStyle}>
                <User size={isMobile ? 32 : 40} color={primaryColor} />
              </div>
            )}

            <div>
              <h2 style={titleStyle}>{title}</h2>
              <p style={subtitleStyle}>{subtitle}</p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              style={closeButtonStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          {/* Avatar Preview at the top */}
          {showAvatar && (
            <div style={avatarPreviewContainerStyle}>
              <div style={avatarPreviewStyle}>
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar Preview"
                    style={avatarImageStyle}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div style={avatarPlaceholderStyle}>
                    <User size={40} />
                  </div>
                )}
                <span
                  style={{
                    fontSize: "14px",
                    color: subTextColor,
                    fontWeight: 500,
                  }}
                >
                  Avatar Preview
                </span>
              </div>
            </div>
          )}
          <form onSubmit={handleSignup} style={formStyle}>
            {/* Left Column - Required fields + Phone/Address */}
            <div style={columnStyle}>
              {/* Name - Required */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Full Name</label>
                <div style={inputWrapperStyle}>
                  <User size={20} style={inputIconStyle} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                {errors.name && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email - Required */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Email Address</label>
                <div style={inputWrapperStyle}>
                  <Mail size={20} style={inputIconStyle} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                {errors.email && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password - Required */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Password</label>
                <div style={inputWrapperStyle}>
                  <Lock size={20} style={inputIconStyle} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={toggleButtonStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = darkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Phone - Optional */}
              {showPhone && (
                <div style={fieldStyle}>
                  <label style={labelStyle}>Phone Number</label>
                  <div style={inputWrapperStyle}>
                    <Phone size={20} style={inputIconStyle} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Role and Status */}
            {shouldShowTwoColumns && (
              <div style={columnStyle}>
                {/* Address - Optional */}
                {showAddress && (
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Address</label>
                    <div style={inputWrapperStyle}>
                      <MapPin size={20} style={inputIconStyle} />
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                )}

                {/* Avatar URL - At the bottom of first column */}
                {showAvatar && (
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Avatar URL</label>
                    <div style={inputWrapperStyle}>
                      <Image size={20} style={inputIconStyle} />
                      <input
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

                {/* Role - Optional */}
                {showRole && (
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Role</label>
                    <div style={inputWrapperStyle}>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={selectStyle}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Status - Optional */}
                {showStatus && (
                  <div style={statusToggleStyle}>
                    <div style={statusContentStyle}>
                      {formData.isActive ? (
                        <UserCheck size={24} color={primaryColor} />
                      ) : (
                        <UserX size={24} color="#ef4444" />
                      )}
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: textColor,
                          }}
                        >
                          Account Status
                        </div>
                        <div style={{ fontSize: "12px", color: subTextColor }}>
                          {formData.isActive
                            ? "User can access the system"
                            : "User account is disabled"}
                        </div>
                      </div>
                    </div>
                    <div
                      style={toggleSwitchStyle}
                      onClick={handleToggle}
                      onMouseOver={(e) => {
                        e.currentTarget.style.opacity = "0.8";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      <div style={toggleKnobStyle} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Role and Status for single column layout */}
            {!shouldShowTwoColumns && (
              <>
                {showRole && (
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Role</label>
                    <div style={inputWrapperStyle}>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={selectStyle}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </div>
                  </div>
                )}

                {showStatus && (
                  <div style={statusToggleStyle}>
                    <div style={statusContentStyle}>
                      {formData.isActive ? (
                        <UserCheck size={24} color={primaryColor} />
                      ) : (
                        <UserX size={24} color="#ef4444" />
                      )}
                      <div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: textColor,
                          }}
                        >
                          Account Status
                        </div>
                        <div style={{ fontSize: "14px", color: subTextColor }}>
                          {formData.isActive
                            ? "User can access the system"
                            : "User account is disabled"}
                        </div>
                      </div>
                    </div>
                    <div style={toggleSwitchStyle} onClick={handleToggle}>
                      <div style={toggleKnobStyle} />
                    </div>
                  </div>
                )}
              </>
            )}
          </form>

          {/* Messages */}
          {message && (
            <div
              style={
                message.type === "success"
                  ? successMessageStyle
                  : errorMessageStyle
              }
            >
              {message.type === "success" ? (
                <CheckCircle size={20} color={primaryColor} />
              ) : (
                <AlertCircle size={20} color="#ef4444" />
              )}
              <span style={{ fontWeight: 500 }}>{message.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          {loginUrl && (
            <a href={loginUrl} style={loginLinkStyle}>
              Already have an account?{" "}
              <span style={{ color: primaryColor }}>Sign in</span>
            </a>
          )}

          <div style={buttonContainerStyle}>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={cancelButtonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = inputBg;
                }}
              >
                <X size={18} />
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              style={loading ? disabledButtonStyle : submitButtonStyle}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 6px 20px 0 ${primaryColor}60`;
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 14px 0 ${primaryColor}40`;
                }
              }}
            >
              {loading ? (
                <Loader
                  size={18}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <Plus size={18} />
              )}
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
          {footerText && <p style={footerTextStyle}>{footerText}</p>}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 480px) {
            input, select {
              font-size: 16px !important;
            }
          }
        `}
      </style>
    </div>
  );
};
