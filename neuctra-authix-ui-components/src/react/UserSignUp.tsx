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

  loginUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
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
  loginUrl,
  onSuccess,
  onError,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatarUrl: "",
    isActive: true,
    role: "user",
  });
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
  const bgColor = darkMode ? "#000000" : "#ffffff";
  const cardBg = darkMode ? "transparent" : "transparent";
  const textColor = darkMode ? "#ffffff" : "#111827";
  const subTextColor = darkMode ? "#a1a1aa" : "#6b7280";
  const inputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)";
  const inputBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const cardBorder = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
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

  // Responsive Styles
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    padding: isMobile ? "8px" : "16px",
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: cardBg,
    borderRadius: isMobile ? "12px" : "16px",
    border: `1px solid ${cardBorder}`,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    width: "100%",
    maxWidth: isMobile ? "100%" : "1024px",
    maxHeight: isMobile ? "95vh" : "90vh",
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
    padding: isMobile ? "24px 20px 20px 20px" : "32px 32px 24px 32px",
    borderBottom: `1px solid ${cardBorder}`,
  };

  const logoStyle: React.CSSProperties = {
    height: isMobile ? "48px" : "64px",
    width: isMobile ? "48px" : "64px",
    objectFit: "contain",
    marginBottom: isMobile ? "16px" : "20px",
    borderRadius: "12px",
  };

  const iconWrapperStyle: React.CSSProperties = {
    height: isMobile ? "48px" : "64px",
    width: isMobile ? "48px" : "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${primaryColor}20`,
    borderRadius: "12px",
    marginBottom: isMobile ? "16px" : "20px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: 700,
    color: textColor,
    margin: "0 0 8px 0",
    letterSpacing: "-0.025em",
    lineHeight: "1.2",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: isMobile ? "13px" : "14px",
    color: subTextColor,
    margin: 0,
    lineHeight: "1.4",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: isMobile ? "12px" : "16px",
    right: isMobile ? "12px" : "16px",
    color: subTextColor,
    backgroundColor: "transparent",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflowY: "auto",
    padding: isMobile ? "20px" : "24px",
  };

  const formStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: isMobile ? "16px" : "24px",
  };

  const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "12px" : "16px",
  };

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: isMobile ? "13px" : "14px",
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
    left: "12px",
    color: subTextColor,
    width: isMobile ? "16px" : "18px",
    height: isMobile ? "16px" : "18px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "12px 12px 12px 40px" : "14px 14px 14px 46px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "8px",
    color: textColor,
    fontSize: isMobile ? "14px" : "15px",
    outline: "none",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "12px 40px 12px 12px" : "14px 40px 14px 12px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "8px",
    color: textColor,
    fontSize: isMobile ? "14px" : "15px",
    outline: "none",
    appearance: "none",
    backdropFilter: "blur(10px)",
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: "absolute",
    right: "12px",
    backgroundColor: "transparent",
    border: "none",
    color: subTextColor,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
  };

  const avatarPreviewStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  };

  const avatarImageStyle: React.CSSProperties = {
    width: isMobile ? "80px" : "96px",
    height: isMobile ? "80px" : "96px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `1px solid ${inputBorder}`,
  };

  const avatarPlaceholderStyle: React.CSSProperties = {
    width: isMobile ? "80px" : "96px",
    height: isMobile ? "80px" : "96px",
    borderRadius: "50%",
    backgroundColor: inputBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: subTextColor,
    border: `1px solid ${inputBorder}`,
  };

  const statusToggleStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  };

  const statusContentStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const toggleSwitchStyle: React.CSSProperties = {
    width: "44px",
    height: "24px",
    backgroundColor: formData.isActive ? primaryColor : "#6b7280",
    borderRadius: "12px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const toggleKnobStyle: React.CSSProperties = {
    position: "absolute",
    top: "2px",
    left: formData.isActive ? "22px" : "2px",
    width: "20px",
    height: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transition: "left 0.2s",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "16px 20px" : "20px 24px",
    borderTop: `1px solid ${cardBorder}`,
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "12px" : "0",
  };

  const loginLinkStyle: React.CSSProperties = {
    color: primaryColor,
    textDecoration: "none",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: 500,
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    width: isMobile ? "100%" : "auto",
  };

  const buttonStyle: React.CSSProperties = {
    padding: isMobile ? "12px 20px" : "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: isMobile ? "14px" : "15px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    width: isMobile ? "100%" : "auto",
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: inputBg,
    color: textColor,
    border: `1px solid ${inputBorder}`,
  };

  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: loading ? "#374151" : gradient,
    color: "#ffffff",
    boxShadow: `0 4px 14px 0 ${primaryColor}40`,
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#374151",
    color: "#9ca3af",
    cursor: "not-allowed",
  };

  const messageStyle: React.CSSProperties = {
    padding: isMobile ? "12px" : "16px",
    borderRadius: "8px",
    fontSize: isMobile ? "13px" : "14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginTop: "16px",
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
                <User size={isMobile ? 24 : 32} color={primaryColor} />
              </div>
            )}

            <div>
              <h2 style={titleStyle}>{title}</h2>
              <p style={subtitleStyle}>{subtitle}</p>
            </div>
          </div>

          {onClose && (
            <button onClick={onClose} style={closeButtonStyle}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <form onSubmit={handleSignup} style={formStyle}>
            {/* Left Column */}
            <div style={columnStyle}>
              {/* Name */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Full Name *</label>
                <div style={inputWrapperStyle}>
                  <User size={isMobile ? 16 : 18} style={inputIconStyle} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                {errors.name && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Email Address *</label>
                <div style={inputWrapperStyle}>
                  <Mail size={isMobile ? 16 : 18} style={inputIconStyle} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                {errors.email && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Password *</label>
                <div style={inputWrapperStyle}>
                  <Lock size={isMobile ? 16 : 18} style={inputIconStyle} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={toggleButtonStyle}
                  >
                    {showPassword ? (
                      <EyeOff size={isMobile ? 16 : 18} />
                    ) : (
                      <Eye size={isMobile ? 16 : 18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Only show additional fields on desktop or if not mobile */}
              {!isMobile && (
                <>
                  {/* Phone */}
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <div style={inputWrapperStyle}>
                      <Phone size={18} style={inputIconStyle} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Address</label>
                    <div style={inputWrapperStyle}>
                      <MapPin size={18} style={inputIconStyle} />
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Role</label>
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
                </>
              )}
            </div>

            {/* Right Column - Hidden on mobile */}
            {!isMobile && (
              <div style={{ ...columnStyle, alignItems: "center" }}>
                {/* Avatar URL */}
                <div style={{ ...fieldStyle, width: "100%" }}>
                  <label style={labelStyle}>Avatar URL</label>
                  <div style={inputWrapperStyle}>
                    <Image size={18} style={inputIconStyle} />
                    <input
                      type="url"
                      name="avatarUrl"
                      placeholder="Enter avatar image URL"
                      value={formData.avatarUrl}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Avatar Preview */}
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
                      <User size={32} />
                    </div>
                  )}
                  <span style={{ fontSize: "12px", color: subTextColor }}>
                    Avatar Preview
                  </span>
                </div>

                {/* Account Status */}
                <div style={statusToggleStyle}>
                  <div style={statusContentStyle}>
                    {formData.isActive ? (
                      <UserCheck size={20} color={primaryColor} />
                    ) : (
                      <UserX size={20} color="#ef4444" />
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
                  <div style={toggleSwitchStyle} onClick={handleToggle}>
                    <div style={toggleKnobStyle} />
                  </div>
                </div>
              </div>
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
                <CheckCircle size={isMobile ? 16 : 18} color={primaryColor} />
              ) : (
                <AlertCircle size={isMobile ? 16 : 18} color="#ef4444" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          {loginUrl && (
            <a href={loginUrl} style={loginLinkStyle}>
              Already have an account? Sign in
            </a>
          )}

          <div style={buttonContainerStyle}>
            {onClose && (
              <button type="button" onClick={onClose} style={cancelButtonStyle}>
                <X size={16} />
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              style={loading ? disabledButtonStyle : submitButtonStyle}
            >
              {loading ? (
                <Loader
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <Plus size={16} />
              )}
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          button:hover:not(:disabled) {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          
          input:focus, select:focus {
            border-color: ${primaryColor};
            box-shadow: 0 0 0 3px ${primaryColor}20;
          }
          
          a:hover {
            color: ${primaryColor};
            text-decoration: underline;
          }
          
          @media (max-width: 480px) {
            input {
              font-size: 16px !important;
            }
          }
        `}
      </style>
    </div>
  );
};
