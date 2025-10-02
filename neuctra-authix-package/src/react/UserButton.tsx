import React, { useState, useEffect, useRef } from "react";
import { Info, LogOut, Mail, User } from "lucide-react";
import axios from "axios";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  profileUrl?: string;
}

interface UserButtonProps {
  darkMode?: boolean;
  primaryColor?: string;
  onLogout: () => void;
  profileUrl?: string;
  propUser?: UserInfo | null;
  baseUrl: string;
  appId: string;
  apiKey: string;
}

export const ReactUserButton: React.FC<UserButtonProps> = ({
  darkMode = true,
  primaryColor = "#3b82f6",
  onLogout,
  profileUrl,
  propUser,
  baseUrl,
  appId,
  apiKey,
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [alignRight, setAlignRight] = useState(false);

  // 🔹 Check position when dropdown opens
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      setAlignRight(rect.left < windowWidth / 2); // if avatar is on left half → open right
    }
  }, [open]);

  const validateUser = async (userId: string) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/users/check-user/${userId}?appId=${appId}`,
        { headers: { "x-api-key": apiKey } }
      );
console.log(data);

      if (!data.success || !data.exists) {
        localStorage.removeItem("userInfo");
        setUser(null);
      }
    } catch {
      localStorage.removeItem("userInfo");
      setUser(null);
    }
  };

useEffect(() => {
  const initUser = async () => {
    try {
      if (propUser) {
        setUser(propUser);
        setLoading(false);
        // validate in background, don't await here
        validateUser(propUser.id);
      } else {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed: UserInfo = JSON.parse(stored);
          setUser({ ...parsed, profileUrl: profileUrl || parsed.profileUrl });
          setLoading(false);
          // validate in background
          validateUser(parsed.id);
        } else {
          setError("No user session found.");
          setLoading(false);
        }
      }
    } catch {
      setLoading(false);
      setError("Error loading user data.");
    }
  };

  initUser();
}, [propUser, profileUrl]);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

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
        surface: "#09090B",
        border: "#27272a",
        textPrimary: "#ffffff",
        textSecondary: "#a1a1aa",
        accent: primaryColor,
        accentHover: adjustColor(primaryColor, -30),
      }
    : {
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      backgroundColor: colors.surface,
    },
    avatarImage: { width: "100%", height: "100%", objectFit: "cover" as const },
    dropdown: {
      position: "absolute" as const,
      top: "56px",
      [alignRight ? "left" : "right"]: "0",
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "14px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      width: "270px",
      padding: "16px",
      zIndex: 100,
      fontFamily: "'Inter', sans-serif",
      opacity: open ? 1 : 0,
      pointerEvents: (open
        ? "auto"
        : "none") as React.CSSProperties["pointerEvents"], // ✅ fixed
      transition: "opacity 0.2s ease, transform 0.2s ease",
      transform: open ? "translateY(0)" : "translateY(-10px)",
    },

    arrow: {
      position: "absolute" as const,
      top: "44px",
      [alignRight ? "left" : "right"]: "20px", // 👈 arrow aligns with side
      width: "0",
      height: "0",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: `8px solid ${colors.surface}`,
      filter: "drop-shadow(0 -1px 1px rgba(0,0,0,0.2))",
    },
  };

  return (
    <div style={styles.wrapper} ref={dropdownRef}>
      {/* Avatar Button */}
      <div
        ref={buttonRef}
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
          <img
            src="https://api.dicebear.com/9.x/glass/svg?seed=Wyatt"
            alt="User avatar"
            style={styles.avatarImage}
          />
        )}
      </div>

      {/* Dropdown */}
      <div style={styles.arrow} hidden={!open}></div>
      <div style={styles.dropdown}>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <div>
              <div>
                <User size={16} /> {user.name}
              </div>
              <div>
                <Mail size={16} /> {user.email}
              </div>
              {user.profileUrl && (
                <a
                  href={user.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              )}
            </div>
            <button onClick={onLogout}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <p>
            <Info size={18} /> {error || "Not logged in"}
          </p>
        )}
      </div>
    </div>
  );
};
