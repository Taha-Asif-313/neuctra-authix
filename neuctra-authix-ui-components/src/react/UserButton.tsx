import React, { useState, useEffect, useRef } from "react";
import { LogOut, Mail, User } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  avatarUrl?: string;
  profileUrl?: string; // ✅ Added profile link
}

interface UserButtonProps {
  darkMode?: boolean;
  primaryColor?: string;
  onLogout: () => void;
  profileUrl?: string; // ✅ accept profile URL as prop
}

export const UserButton: React.FC<UserButtonProps> = ({
  darkMode = true,
  primaryColor = "#3b82f6",
  onLogout,
  profileUrl,
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Load user info from localStorage + merge with props
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed: UserInfo = JSON.parse(stored);

        if (parsed?.name && parsed?.email) {
          // ✅ Merge profileUrl from props (if passed)
          setUser({ ...parsed, profileUrl: profileUrl || parsed.profileUrl });
        } else {
          setError("Invalid user data format.");
        }
      } else {
        setError("No user found in localStorage.");
      }
    } catch (err) {
      console.error("Failed to parse userInfo:", err);
      setError("Error loading user data.");
    }
  }, [profileUrl]);

  // Utility: darken/lighten color
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
        background: "#09090B",
        surface: "#09090B",
        border: "#27272a",
        textPrimary: "#ffffff",
        textSecondary: "#a1a1aa",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -30),
      }
    : {
        background: "#ffffff",
        surface: "#f9fafb",
        border: "#e4e4e7",
        textPrimary: "#111827",
        textSecondary: "#6b7280",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -30),
      };

  const styles = {
    wrapper: { position: "relative" as const },
    avatarButton: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      overflow: "hidden",
      cursor: "pointer",
      border: `2px solid ${colors.accent}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      backgroundColor: colors.surface,
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    dropdown: {
      position: "absolute" as const,
      top: "56px",
      right: "0",
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "14px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      width: "270px",
      padding: "16px",
      zIndex: 100,
      fontFamily: "'Inter', sans-serif",
      opacity: open ? 1 : 0,
      transform: open ? "translateY(0)" : "translateY(-10px)",
      pointerEvents: (open
        ? "auto"
        : "none") as React.CSSProperties["pointerEvents"],
      transition: "opacity 0.2s ease, transform 0.2s ease",
    },
    arrow: {
      position: "absolute" as const,
      top: "44px",
      right: "14px",
      width: "0",
      height: "0",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: `8px solid ${colors.surface}`,
      filter: "drop-shadow(0 -1px 1px rgba(0,0,0,0.2))",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start",
      marginBottom: "16px",
    },
    userName: {
      fontSize: "16px",
      fontWeight: 600,
      color: colors.textPrimary,
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    userEmail: {
      fontSize: "14px",
      color: colors.textSecondary,
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginTop: "4px",
    },
    profileLink: {
      fontSize: "14px",
      marginTop: "8px",
      color: colors.accent,
      cursor: "pointer",
      textDecoration: "none",
      fontWeight: 500,
    },
    logoutButton: {
      marginTop: "12px",
      width: "100%",
      background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      color: "white",
      fontSize: "12px",
      fontWeight: 500,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "opacity 0.2s ease, transform 0.1s ease",
    },
    logoutButtonHover: {
      opacity: 0.9,
      transform: "scale(1.02)",
    },
    errorText: {
      color: "red",
      fontSize: "13px",
      marginTop: "8px",
    },
  };

  return (
    <div style={styles.wrapper} ref={dropdownRef}>
      {/* Avatar Trigger */}
      <div
        style={styles.avatarButton}
        onClick={() => setOpen((prev) => !prev)}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="User avatar"
            style={styles.avatarImage}
          />
        ) : (
          <User size={20} color={colors.accent} />
        )}
      </div>

      {/* Dropdown + Arrow */}
      <div style={styles.arrow} hidden={!open}></div>
      <div style={styles.dropdown}>
        {user ? (
          <>
            <div style={styles.userInfo}>
              <div style={styles.userName}>
                <User size={16} /> {user.name}
              </div>
              <div style={styles.userEmail}>
                <Mail size={16} /> {user.email}
              </div>

              {/* ✅ Profile Link */}
              {user.profileUrl && (
                <a
                  href={user.profileUrl}
                  style={styles.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              )}
            </div>

            <button
              style={styles.logoutButton}
              onMouseOver={(e) =>
                Object.assign(e.currentTarget.style, styles.logoutButtonHover)
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={onLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <p style={styles.errorText}>{error || "Not logged in"}</p>
        )}
      </div>
    </div>
  );
};
