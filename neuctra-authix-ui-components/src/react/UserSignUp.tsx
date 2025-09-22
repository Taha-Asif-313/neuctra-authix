import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, Loader } from "lucide-react";

interface SignupFormProps {
  baseUrl: string;
  apiKey: string;
  appId: string;
  logoUrl?: string;
  loginUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const UserSignUp: React.FC<SignupFormProps> = ({
  baseUrl,
  apiKey,
  appId,
  logoUrl,
  loginUrl,
  onSuccess,
  onError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
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
      const res = await axios.post(
        `${baseUrl}/api/users/signup`,
        { name, email, password, appId },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );

      if (res.data?.user) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        setMessage({ type: "success", text: "Account created successfully" });
        if (onSuccess) onSuccess(res.data.user);
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || err.message || "Signup failed";
      setMessage({ type: "error", text: errorMsg });
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  // Container styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    zIndex: 50,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#0a0a0a",
    borderRadius: "16px",
    border: "1px solid #27272a",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    width: "100%",
    maxWidth: "448px",
    maxHeight: "90vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: "1px solid #27272a",
  };

  const headerContentStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const iconWrapperStyle: React.CSSProperties = {
    padding: "8px",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderRadius: "8px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#71717a",
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    color: "#71717a",
    backgroundColor: "transparent",
    border: "none",
    padding: "4px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#d4d4d8",
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const inputIconStyle: React.CSSProperties = {
    position: "absolute",
    left: "12px",
    color: "#71717a",
    width: "16px",
    height: "16px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    backgroundColor: "#09090b",
    border: "1px solid #27272a",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: "absolute",
    right: "12px",
    backgroundColor: "transparent",
    border: "none",
    color: "#71717a",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#ef4444",
    marginTop: "4px",
  };

  const submitButtonStyle: React.CSSProperties = {
    padding: "12px 20px",
    backgroundColor: loading ? "#374151" : "linear-gradient(135deg, #10b981, #22c55e)",
    background: loading ? "#374151" : "linear-gradient(135deg, #10b981, #22c55e)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 14px 0 rgba(34, 197, 94, 0.2)",
  };

  const messageStyle: React.CSSProperties = {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginTop: "16px",
  };

  const successMessageStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#bbf7d0",
  };

  const errorMessageStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#fecaca",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    padding: "20px 24px",
    borderTop: "1px solid #27272a",
  };

  const linkStyle: React.CSSProperties = {
    color: "#22c55e",
    textDecoration: "none",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <div style={iconWrapperStyle}>
              <User size={20} color="#22c55e" />
            </div>
            <div>
              <h2 style={titleStyle}>Create Your Account</h2>
              <p style={subtitleStyle}>Join our platform today</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <form onSubmit={handleSignup} style={formStyle}>
            {/* Name Field */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Full Name *</label>
              <div style={inputWrapperStyle}>
                <User size={16} style={inputIconStyle} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              {errors.name && <span style={errorStyle}>{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Email Address *</label>
              <div style={inputWrapperStyle}>
                <Mail size={16} style={inputIconStyle} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              {errors.email && <span style={errorStyle}>{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Password *</label>
              <div style={inputWrapperStyle}>
                <Lock size={16} style={inputIconStyle} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={toggleButtonStyle}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span style={errorStyle}>{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={submitButtonStyle}
            >
              {loading ? (
                <>
                  <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Messages */}
          {message && (
            <div style={message.type === "success" ? successMessageStyle : errorMessageStyle}>
              {message.type === "success" ? (
                <CheckCircle size={16} color="#22c55e" />
              ) : (
                <AlertCircle size={16} color="#ef4444" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        {loginUrl && (
          <div style={footerStyle}>
            <a href={loginUrl} style={linkStyle}>
              Already have an account? Sign in
            </a>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
            transition: all 0.2s ease;
          }
          
          input:focus {
            border-color: #22c55e;
            box-shadow: 0 0 0 1px #22c55e;
          }
        `}
      </style>
    </div>
  );
};