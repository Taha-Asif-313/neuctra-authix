import React, { useState, useEffect } from "react";
import { loginUser } from "../api/auth.js";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface LoginFormProps {
  baseUrl: string;
  apiKey: string;
  appId: string;
  logoUrl?: string;
  signupUrl?: string;
  forgotPasswordUrl?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const UserLogin: React.FC<LoginFormProps> = ({
  baseUrl,
  apiKey,
  appId,
  logoUrl,
  signupUrl,
  forgotPasswordUrl,
  onSuccess,
  onError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isDark, setIsDark] = useState(false);

  // detect system dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const user = await loginUser(
        { email, password, appId },
        { baseUrl, apiKey }
      );
      setMessage({ type: "success", text: `Welcome ${user.name}` });
      if (onSuccess) onSuccess(user);
    } catch (err: any) {
      const errorMsg = err.message || "Login failed";
      setMessage({ type: "error", text: errorMsg });
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "448px",
      padding: "28px",
      borderRadius: "12px",
      boxShadow: isDark
        ? "0 4px 14px rgba(0,0,0,0.7)"
        : "0 4px 14px rgba(0,0,0,0.1)",
      backgroundColor: isDark ? "#111" : "#fff",
    },
    logo: {
      display: "block",
      margin: "0 auto 12px",
      maxHeight: "50px",
    },
    title: {
      fontSize: "22px",
      fontWeight: 700,
      textAlign: "center" as const,
      marginBottom: "16px",
      color: isDark ? "#f0f0f0" : "#111",
    },
    field: { marginBottom: "16px" },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 500,
      marginBottom: "3px",
      color: isDark ? "#bbb" : "#333",
    },
    inputWrapper: {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
    },
    icon: {
      position: "absolute" as const,
      left: "10px",
      color: isDark ? "#777" : "#999",
    },
    input: {
      width: "100%",
      padding: "10px 12px 10px 36px",
      borderRadius: "6px",
      border: `1px solid ${isDark ? "#444" : "#ccc"}`,
      backgroundColor: isDark ? "#000000" : "#fff",
      color: isDark ? "#f0f0f0" : "#222",
      outline: "none",
      fontSize: "14px",
    },
    togglePassword: {
      position: "absolute" as const,
      right: "10px",
      cursor: "pointer",
      color: isDark ? "#888" : "#555",
      background: "none",
      border: "none",
    },
    error: {
      color: "#f87171",
      fontSize: "12px",
      marginTop: "4px",
    },
    button: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: loading ? "#22c55eaa" : "#00c420",
      color: "#fff",
      fontWeight: 600,
      cursor: loading ? "not-allowed" : "pointer",
      marginTop: "10px",
      fontSize: "15px",
      transition: "background-color 0.2s ease",
    },
    messageBox: {
      marginTop: "16px",
      padding: "10px",
      borderRadius: "6px",
      fontSize: "13px",
      textAlign: "center" as const,
    },
    success: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      border: "1px solid #22c55e",
    },
    errorBox: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      border: "1px solid #ef4444",
    },
    links: {
      marginTop: "14px",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "13px",
    },
    link: {
      color: isDark ? "#00c420" : "#00c420",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {logoUrl && <img src={logoUrl} alt="Logo" style={styles.logo} />}
        <h2 style={styles.title}>Sign in to your account</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                style={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          {/* Links */}
          <div style={styles.links}>
            {signupUrl && (
              <a href={signupUrl} style={styles.link}>
                Create account
              </a>
            )}
            {forgotPasswordUrl && (
              <a href={forgotPasswordUrl} style={styles.link}>
                Forgot password?
              </a>
            )}
          </div>

          {/* Submit */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Messages */}
        {message && (
          <div
            style={{
              ...styles.messageBox,
              ...(message.type === "success"
                ? styles.success
                : styles.errorBox),
            }}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};
