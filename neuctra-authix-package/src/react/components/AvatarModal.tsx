import React, { useEffect, useState } from "react";
import {
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link2,
  Image,
} from "lucide-react";

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

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (url: string) => Promise<boolean>;
  colors: ThemeColors;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  colors,
}) => {
  const [newAvatar, setNewAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [validation, setValidation] = useState<{
    isValid: boolean;
    message: string;
    type: "success" | "error" | "warning" | null;
  }>({ isValid: false, message: "", type: null });

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Validate URL
  useEffect(() => {
    if (!newAvatar.trim()) {
      setValidation({ isValid: false, message: "", type: null });
      return;
    }

    try {
      const url = new URL(newAvatar);
      const isValidImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);

      if (isValidImage) {
        setValidation({
          isValid: true,
          message: "Valid image URL",
          type: "success",
        });
      } else {
        setValidation({
          isValid: false,
          message: "URL should point to an image file",
          type: "warning",
        });
      }
    } catch {
      setValidation({
        isValid: false,
        message: "Please enter a valid URL",
        type: "error",
      });
    }
  }, [newAvatar]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!newAvatar || !validation.isValid) return;

    setLoading(true);
    try {
      const success = await onUpdate(newAvatar);
      if (success) {
        setNewAvatar("");
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
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
        zIndex: 1000,
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
          animation: "modalSlideIn 0.3s ease-out",
        }}
        className="avatar-modal-container"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
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
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}40)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.accent,
                flexShrink: 0,
              }}
            >
              <Camera size={22} />
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
                Update Avatar
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close avatar modal"
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

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* URL Input */}
          <div>
            <label
              htmlFor="avatar-url"
              style={{
                display: "flex",
                marginBottom: "8px",
                color: colors.textPrimary,
                fontSize: "14px",
                fontWeight: 500,

                alignItems: "center",
                gap: "6px",
              }}
            >
              <Link2 size={16} />
              Avatar URL
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="url"
                id="avatar-url"
                placeholder="https://example.com/your-avatar.jpg"
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  paddingLeft: "44px",
                  borderRadius: "12px",
                  border: `1.5px solid ${
                    validation.type === "error"
                      ? colors.error
                      : validation.type === "success"
                      ? colors.success
                      : colors.border
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
                  e.target.style.borderColor =
                    validation.type === "error"
                      ? colors.error
                      : validation.type === "success"
                      ? colors.success
                      : colors.border;
                  e.target.style.boxShadow = "none";
                }}
                disabled={loading}
              />
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.textTertiary,
                }}
              >
                <Image size={18} />
              </div>
            </div>

            {/* Validation Message */}
            {validation.message && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "8px",
                  fontSize: "13px",
                  color:
                    validation.type === "success"
                      ? colors.success
                      : validation.type === "error"
                      ? colors.error
                      : colors.textTertiary,
                }}
              >
                {validation.type === "success" && <CheckCircle size={14} />}
                {validation.type === "error" && <AlertCircle size={14} />}
                {validation.type === "warning" && <AlertCircle size={14} />}
                {validation.message}
              </div>
            )}
          </div>

          {/* Preview */}
          {newAvatar && validation.type === "success" && (
            <div
              style={{
                padding: "16px",
                backgroundColor: `${colors.success}10`,
                border: `1px solid ${colors.success}20`,
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: colors.textSecondary,
                  fontSize: "13px",
                  fontWeight: 500,
                  margin: "0 0 12px 0",
                }}
              >
                Preview
              </p>
              <img
                src={newAvatar}
                alt="Avatar preview"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${colors.success}40`,
                  margin: "0 auto",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: isMobile ? "column-reverse" : "row",
            justifyContent: "flex-end",
            alignItems: "stretch",
            marginTop: "24px",
          }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: "10px 24px",
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
            onClick={handleSubmit}
            disabled={loading || !validation.isValid}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: "none",
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}E6)`,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor:
                loading || !validation.isValid ? "not-allowed" : "pointer",
              flex: isMobile ? "none" : 1,
              minWidth: isMobile ? "100%" : "140px",
              opacity: loading || !validation.isValid ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              boxShadow:
                loading || !validation.isValid
                  ? "none"
                  : `0 4px 12px ${colors.accent}40`,
            }}
            onMouseOver={(e) => {
              if (!loading && validation.isValid) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 6px 20px ${colors.accent}60`;
              }
            }}
            onMouseOut={(e) => {
              if (!loading && validation.isValid) {
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
              <>
                <Camera size={16} />
                Update Avatar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes modalSlideIn {
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
          
          .avatar-modal-container {
            animation: modalSlideIn 0.3s ease-out;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 480px) {
            .avatar-modal-container {
              padding: 20px 16px;
              margin: 0;
              border-radius: 16px 16px 0 0;
              max-height: 90vh;
              overflow-y: auto;
            }
          }
          
          @media (max-width: 360px) {
            .avatar-modal-container {
              padding: 16px 12px;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            .avatar-modal-container {
              animation: none;
            }
            
            * {
              transition: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AvatarModal;
