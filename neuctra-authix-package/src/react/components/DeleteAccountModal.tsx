import {
  X,
  Trash2,
  Loader2,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Database,
  UserX,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
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

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  userId: string;
  colors: ThemeColors;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  userId,
  colors,
}) => {
  const authix = useAuthix();
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [step, setStep] = useState<
    "warning" | "confirmation" | "processing" | "success"
  >("warning");
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    if (typeof window === "undefined") return;

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
      const data = await authix.deleteUser({
        userId,
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
                flexDirection: "column-reverse",
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

export default DeleteAccountModal;
