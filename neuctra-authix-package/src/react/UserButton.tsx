import React, { useState, useEffect, useRef } from "react";
import {
  Info,
  LogOut,
  Mail,
  User,
  Settings,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { getSdkConfig } from "../sdk/config.js";
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
  varient?: "classic" | "modren";
  onLogout: () => void;
  propUser?: UserInfo | null;
  className?: string;
  // New props for custom URLs
  profileUrl?: string;
  settingsUrl?: string;
  // Props for customizing menu items
  showProfileMenuItem?: boolean;
  showSettingsMenuItem?: boolean;
  showViewProfileMenuItem?: boolean;
  // Custom labels
  profileLabel?: string;
  settingsLabel?: string;
  viewProfileLabel?: string;
  logoutLabel?: string;
}

export const ReactUserButton: React.FC<UserButtonProps> = ({
  darkMode = true,
  primaryColor = "#3b82f6",
  onLogout,
  varient = "classic",
  propUser,
  className = "",
  // New URL props with defaults
  profileUrl,
  settingsUrl,
  // Menu item visibility with defaults
  showProfileMenuItem = true,
  showSettingsMenuItem = true,
  showViewProfileMenuItem = true,
  // Custom labels with defaults
  profileLabel = "My Profile",
  settingsLabel = "Settings",
  viewProfileLabel = "View Profile",
  logoutLabel = "Sign Out",
}) => {
  const { baseUrl, apiKey, appId } = getSdkConfig();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [alignRight, setAlignRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Validate user with backend (safe version, no false logout)
  const validateUser = async (userId: string) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/users/check-user/${userId}?appId=${appId}`,
        { headers: { "x-api-key": apiKey } }
      );

      // ❗ Only logout if backend explicitly says user DOES NOT exist
      if (data?.success === true && data?.exists === false) {
        console.warn("❌ User does not exist on server. Clearing session...");
        localStorage.removeItem("userInfo");
        setUser(null);
      }

      // ❗ If success is false but exists is undefined,
      // DO NOT LOGOUT — backend may be down or misconfigured.
    } catch (err) {
      // ❗ Do NOT logout on error — prevents false logouts
      console.error("⚠️ User validation request failed:", err);

      // Keep user logged in; do not clear storage
      // localStorage.removeItem("userInfo"); ❌ removed
      // setUser(null); ❌ removed
    }
  };

  // Check mobile viewport
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize user with comprehensive error handling
  useEffect(() => {
    const initUser = async () => {
      try {
        setLoading(true);
        setError(null);

        if (propUser) {
          if (!propUser.id || !propUser.name || !propUser.email) {
            throw new Error("Invalid user data provided");
          }
          setUser(propUser);
          await validateUser(propUser.id);
        } else {
          if (typeof window !== "undefined") {
            const stored = localStorage.getItem("userInfo");
            if (stored) {
              try {
                const parsed: UserInfo = JSON.parse(stored);
                if (!parsed.id || !parsed.name || !parsed.email) {
                  throw new Error("Invalid stored user data");
                }
                setUser(parsed);
                await validateUser(parsed.id);
              } catch (parseError) {
                console.error("Failed to parse stored user data:", parseError);
                localStorage.removeItem("userInfo");
                setError("Invalid user data");
              }
            }
          }
        }
      } catch (err: any) {
        console.error("User initialization failed:", err);
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [propUser]);

  // Dropdown alignment and viewport boundary check
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDropdownPosition = () => {
      if (!open || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const dropdownWidth = 280;
      const dropdownHeight = 300;

      const spaceOnRight = windowWidth - rect.right;
      const spaceOnLeft = rect.left;
      const spaceBelow = windowHeight - rect.bottom;

      const shouldAlignRight =
        spaceOnRight >= dropdownWidth || spaceOnRight > spaceOnLeft;

      setAlignRight(shouldAlignRight);
    };

    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    return () => window.removeEventListener("resize", updateDropdownPosition);
  }, [open]);

  // Close dropdown on outside click, escape key, and scroll
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleScroll = () => {
      if (open) setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  // Modern color scheme with accessibility
  const colors = darkMode
    ? {
        surface: "#000000",
        surfaceElevated: "#000000",
        surfaceHover: "#262626",
        border: "#262626",
        borderLight: "#404040",
        textPrimary: "#ffffff",
        textSecondary: "#a3a3a3",
        textTertiary: "#737373",
        accent: primaryColor,
        accentHover: `${primaryColor}e6`,
        error: "#ef4444",
        errorHover: "#dc2626",
        gradient: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
      }
    : {
        surface: "#ffffff",
        surfaceElevated: "#fafafa",
        surfaceHover: "#f5f5f5",
        border: "#e5e5e5",
        borderLight: "#f0f0f0",
        textPrimary: "#171717",
        textSecondary: "#525252",
        textTertiary: "#a3a3a3",
        accent: primaryColor,
        accentHover: `${primaryColor}e6`,
        error: "#ef4444",
        errorHover: "#dc2626",
        gradient: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
      };

  // Responsive styles
  const styles = {
    wrapper: {
      position: "relative" as const,
      display: "inline-block",
    },
    avatarButton: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : "8px",
      padding: isMobile ? "6px 10px 6px 6px" : "8px 12px 8px 8px",
      borderRadius: "24px",
      backgroundColor: colors.surface,
      cursor: "pointer",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      minWidth: isMobile ? "auto" : "140px",
      maxWidth: isMobile ? "200px" : "none",
      outline: "none",
    },
    avatarImage: {
      width: isMobile ? "28px" : "32px",
      height: isMobile ? "28px" : "32px",
      borderRadius: "50%",
      objectFit: "cover" as const,
      border: `2px solid ${colors.borderLight}`,
      flexShrink: 0,
    },
    userInfo: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start",
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
    },
    userName: {
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: 600,
      color: colors.textPrimary,
      lineHeight: "1.2",
      whiteSpace: "nowrap" as const,
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: isMobile ? "80px" : "120px",
    },
    userEmail: {
      fontSize: isMobile ? "11px" : "12px",
      color: colors.textTertiary,
      lineHeight: "1.2",
      whiteSpace: "nowrap" as const,
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: isMobile ? "80px" : "120px",
    },
    chevron: {
      transition: "transform 0.2s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      color: colors.textTertiary,
      flexShrink: 0,
    },
    dropdown: {
      position: "absolute" as const,
      top: "100%",
      marginTop: "8px",
      [alignRight ? "left" : "right"]: "0",
      backgroundColor: colors.surfaceElevated,
      border: `1px solid ${colors.border}`,
      borderRadius: "12px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
      width: "min(280px, 90vw)",
      maxWidth: "calc(100vw - 20px)",
      padding: "6px 6px 16px 6px",
      zIndex: 1000,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      opacity: open ? 1 : 0,
      pointerEvents: open ? ("auto" as const) : ("none" as const),
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: open
        ? "translateY(0) scale(1)"
        : "translateY(-8px) scale(0.95)",
      overflow: "hidden",
    },
    dropdownSection: {
      padding: isMobile ? "10px 12px" : "0px 16px",
      "&:last-child": {
        borderBottom: "none",
      },
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "12px",
      padding: isMobile ? "14px" : "16px",
    },
    dropdownAvatar: {
      width: isMobile ? "40px" : "48px",
      height: isMobile ? "40px" : "48px",
      borderRadius: "50%",
      objectFit: "cover" as const,
      border: `2px solid ${colors.borderLight}`,
      flexShrink: 0,
    },
    dropdownUserInfo: {
      display: "flex",
      flexDirection: "column" as const,
      flex: 1,
      minWidth: 0,
    },
    dropdownUserName: {
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: 600,
      color: colors.textPrimary,
      lineHeight: "1.2",
      marginBottom: "2px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    dropdownUserEmail: {
      fontSize: isMobile ? "13px" : "14px",
      color: colors.textSecondary,
      lineHeight: "1.2",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "12px",
      padding: isMobile ? "10px 12px" : "12px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      color: colors.textPrimary,
      textDecoration: "none",
      border: "none",
      background: "none",
      width: "100%",
      fontSize: isMobile ? "13px" : "14px",
      textAlign: "left" as const,
      outline: "none",
    },
    menuItemText: {
      flex: 1,
    },
    icon: {
      width: isMobile ? "16px" : "18px",
      height: isMobile ? "16px" : "18px",
      color: colors.textSecondary,
      flexShrink: 0,
    },
    logoutButton: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "12px",
      padding: isMobile ? "10px 12px" : "12px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      background: "none",
      border: "none",
      width: "100%",
      fontSize: isMobile ? "13px" : "14px",
      color: colors.error,
      textAlign: "left" as const,
      outline: "none",
    },
    loadingText: {
      padding: isMobile ? "16px 12px" : "20px 16px",
      textAlign: "center" as const,
      color: colors.textSecondary,
      fontSize: isMobile ? "13px" : "14px",
    },
    errorState: {
      padding: isMobile ? "16px 12px" : "20px 16px",
      textAlign: "center" as const,
      color: colors.textSecondary,
      fontSize: isMobile ? "13px" : "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      flexDirection: "column" as const,
    },
    retryButton: {
      marginTop: "8px",
      padding: "8px 16px",
      backgroundColor: colors.accent,
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: 500,
      transition: "background-color 0.2s ease",
    },
  };

  const handleRetry = async () => {
    setError(null);
    setLoading(true);

    try {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed: UserInfo = JSON.parse(stored);
        setUser(parsed);
        await validateUser(parsed.id);
      } else if (propUser) {
        setUser(propUser);
        await validateUser(propUser.id);
      }
    } catch (parseError) {
      console.error("Retry failed:", parseError);
      setError("Invalid user data");
      localStorage.removeItem("userInfo");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Determine which profile URL to use (priority: prop > user data > provided prop)
  const getProfileUrl = () => {
    return profileUrl || user?.profileUrl;
  };

  // Handle profile click - navigate to URL if provided
  const handleProfileClick = () => {
    const url = getProfileUrl();
    if (url) {
      window.open(url, "_self", "noopener,noreferrer");
    }
  };

  // Handle settings click - navigate to URL if provided
  const handleSettingsClick = () => {
    if (settingsUrl) {
      window.open(settingsUrl, "_self", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={styles.wrapper}
      ref={dropdownRef}
      className={className}
      role="menu"
      aria-label="User menu"
    >
      {/* Modern Avatar Button with User Info */}
      {varient === "classic" ? (
        <div
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={(e) => handleKeyPress(e, () => setOpen((prev) => !prev))}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Toggle user menu"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user?.name || "User"}'s avatar`}
              style={{
                width: isMobile ? "34px" : "40px",
                height: isMobile ? "34px" : "40px",
                borderRadius: "50%",
                objectFit: "cover" as const,
                border: `2px solid ${colors.borderLight}`,
                flexShrink: 0,
              }}
              loading="lazy"
              onError={(e) => {
                // ✅ Safe fallback to DiceBear initials avatar
                const target = e.target as HTMLImageElement;
                target.onerror = null; // prevent infinite loop
                target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                  user?.name || "User"
                )}`;
              }}
            />
          ) : (
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                user?.name || "User"
              )}`}
              alt="Default user avatar"
              style={{
                width: isMobile ? "34px" : "40px",
                height: isMobile ? "34px" : "40px",
                borderRadius: "50%",
                objectFit: "cover" as const,
                border: `2px solid ${colors.borderLight}`,
                flexShrink: 0,
              }}
              loading="lazy"
            />
          )}
        </div>
      ) : (
        <div
          ref={buttonRef}
          style={styles.avatarButton}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={(e) => handleKeyPress(e, () => setOpen((prev) => !prev))}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Toggle user menu"
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.surfaceHover;
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.surface;
            e.currentTarget.style.boxShadow = "none";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "none";
          }}
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.name}'s avatar`}
              style={styles.avatarImage}
              loading="lazy"
              onError={(e) => {
                // Fallback to default avatar on error
                const target = e.target as HTMLImageElement;
                target.src = `https://api.dicebear.com/9.x/glass/svg?seed=Kingston`;
              }}
            />
          ) : (
            <img
              src={`https://api.dicebear.com/9.x/glass/svg?seed=Kingston`}
              alt="Default user avatar"
              style={styles.avatarImage}
              loading="lazy"
            />
          )}
          {!isMobile && (
            <div style={styles.userInfo}>
              <div style={styles.userName} title={user?.name}>
                {user?.name || "Guest"}
              </div>
              {user?.email && (
                <div style={styles.userEmail} title={user.email}>
                  {user.email}
                </div>
              )}
            </div>
          )}
          <ChevronDown
            size={isMobile ? 14 : 16}
            style={styles.chevron}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Modern Dropdown Menu */}
      {open && (
        <div style={styles.dropdown} role="menu" aria-label="User options">
          {loading ? (
            <div style={styles.loadingText} role="status" aria-live="polite">
              Loading user information...
            </div>
          ) : user ? (
            <>
              {/* User Profile Section */}
              <div style={styles.userSection}>
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={`${user.name}'s profile picture`}
                    style={styles.dropdownAvatar}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`;
                    }}
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                    alt={`${user.name}'s default avatar`}
                    style={styles.dropdownAvatar}
                    loading="lazy"
                  />
                )}
                <div style={styles.dropdownUserInfo}>
                  <div style={styles.dropdownUserName} title={user.name}>
                    {user.name}
                  </div>
                  <div style={styles.dropdownUserEmail} title={user.email}>
                    {user.email}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div style={styles.dropdownSection}>
                {/* Profile Menu Item - Only show if enabled AND we have a profile URL */}
                {showProfileMenuItem && getProfileUrl() && (
                  <button
                    style={styles.menuItem}
                    onClick={handleProfileClick}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.surfaceHover;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    onKeyDown={(e) => handleKeyPress(e, handleProfileClick)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <User style={styles.icon} aria-hidden="true" />
                    <span style={styles.menuItemText}>{profileLabel}</span>
                  </button>
                )}

                {/* Settings Menu Item - Only show if enabled AND we have a settings URL */}
                {showSettingsMenuItem && settingsUrl && (
                  <button
                    style={styles.menuItem}
                    onClick={handleSettingsClick}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.surfaceHover;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    onKeyDown={(e) => handleKeyPress(e, handleSettingsClick)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Settings style={styles.icon} aria-hidden="true" />
                    <span style={styles.menuItemText}>{settingsLabel}</span>
                  </button>
                )}

                {/* View Profile Menu Item - Only show if enabled AND user has profile URL */}
                {showViewProfileMenuItem && user.profileUrl && (
                  <a
                    href={user.profileUrl}
                    target="_self"
                    rel="noopener noreferrer"
                    style={styles.menuItem}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.surfaceHover;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Mail style={styles.icon} aria-hidden="true" />
                    <span style={styles.menuItemText}>{viewProfileLabel}</span>
                  </a>
                )}
              </div>

              {/* Logout Section */}
              <div style={styles.dropdownSection}>
                <button
                  style={styles.logoutButton}
                  onClick={onLogout}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.surfaceHover;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onKeyDown={(e) => handleKeyPress(e, onLogout)}
                  role="menuitem"
                  tabIndex={0}
                >
                  <LogOut
                    style={{ ...styles.icon, color: colors.error }}
                    aria-hidden="true"
                  />
                  <span style={styles.menuItemText}>{logoutLabel}</span>
                </button>
              </div>
            </>
          ) : (
            <div style={styles.errorState} role="alert">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <AlertCircle size={16} aria-hidden="true" />
                <span>{error || "Not signed in"}</span>
              </div>
              {error && error !== "Not signed in" && (
                <button
                  style={styles.retryButton}
                  onClick={handleRetry}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accentHover;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
