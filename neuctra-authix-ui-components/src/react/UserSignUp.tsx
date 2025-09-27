import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Phone,
  Home,
  Upload,
  Loader2,
  Shield,
  ToggleLeft,
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

  // Customizable fields
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
  title = "Create Account",
  subtitle = "Join us to continue",
  footerText = "Already have an account?",
  primaryColor = "#2563eb",
  gradient = "linear-gradient(to right, #2563eb, #1d4ed8)",
  darkMode = true,
  showPhone = true,
  showAddress = true,
  showAvatar = true,
  showRole = false,
  showStatus = false,
  loginUrl,
  onSuccess,
  onError,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    isActive: true,
    role: "user",
    phone: "",
    address: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 🔹 Shared Styles
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: darkMode ? "linear-gradient(135deg, #0f0f0f, #1a1a1a)" : "#f9fafb",
      padding: "20px",
    },
    card: {
      background: darkMode ? "#18181b" : "#fff",
      border: `1px solid ${darkMode ? "#27272a" : "#e5e7eb"}`,
      borderRadius: "16px",
      padding: "32px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    },
    header: { marginBottom: "24px", textAlign: "center" as const },
    title: {
      fontSize: "24px",
      fontWeight: 700,
      color: darkMode ? "#fff" : "#111827",
      marginBottom: "6px",
    },
    subtitle: { fontSize: "14px", color: darkMode ? "#9ca3af" : "#6b7280" },
    form: { display: "flex", flexDirection: "column" as const, gap: "14px" },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      background: darkMode ? "#27272a" : "#f3f4f6",
      borderRadius: "10px",
      padding: "10px 14px",
      gap: "10px",
      border: "1px solid transparent",
    },
    input: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: "14px",
      color: darkMode ? "#fff" : "#111827",
    },
    button: {
      background: gradient,
      border: "none",
      borderRadius: "10px",
      padding: "12px",
      color: "#fff",
      fontSize: "15px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "0.2s ease",
    },
    buttonDisabled: { opacity: 0.6, cursor: "not-allowed" },
    message: {
      marginTop: "12px",
      fontSize: "14px",
      textAlign: "center" as const,
      padding: "8px",
      borderRadius: "8px",
    },
    success: { background: "rgba(34,197,94,0.15)", color: "#22c55e" },
    error: { background: "rgba(239,68,68,0.15)", color: "#ef4444" },
    footer: { marginTop: "20px", textAlign: "center" as const, fontSize: "14px" },
  };

  // 🔹 Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        `${baseUrl}/api/users/signup`,
        { ...formData, appId },
        { headers: { "x-api-key": apiKey } }
      );

      if (res.data.success) {
        setMessage({ type: "success", text: "Signup successful! You can now log in." });
        setFormData({ name: "", email: "", password: "", isActive: true, role: "user" });
        onSuccess?.(res.data.user);
      } else {
        setMessage({ type: "error", text: res.data.message || "Signup failed" });
        onError?.(res.data);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong",
      });
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: "48px", margin: "0 auto 12px" }} />}
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {showPhone && (
            <div style={styles.inputWrapper}>
              <Phone size={18} className="text-gray-400" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          )}

          {showAddress && (
            <div style={styles.inputWrapper}>
              <Home size={18} className="text-gray-400" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          )}

          {showAvatar && (
            <div style={styles.inputWrapper}>
              <Upload size={18} className="text-gray-400" />
              <input
                type="text"
                name="avatarUrl"
                placeholder="Avatar URL (optional)"
                value={formData.avatarUrl}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          )}

          {showRole && (
            <div style={styles.inputWrapper}>
              <Shield size={18} className="text-gray-400" />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          )}

          {showStatus && (
            <div style={styles.inputWrapper}>
              <ToggleLeft size={18} className="text-gray-400" />
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ width: "18px", height: "18px" }}
              />
              <label style={{ fontSize: "14px", color: darkMode ? "#fff" : "#111827" }}>Active</label>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <Loader2 className="animate-spin" size={18} />
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            style={{
              ...styles.message,
              ...(message.type === "success" ? styles.success : styles.error),
            }}
          >
            {message.text}
          </div>
        )}

        {/* Footer */}
        {footerText && (
          <div style={styles.footer}>
            <p>
              {footerText}{" "}
              {loginUrl && (
                <a href={loginUrl} style={{ color: primaryColor, fontWeight: 600 }}>
                  Log in
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


