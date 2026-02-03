import React from 'react';
import { X, Mail, KeyRound, Loader2, Send, CheckCircle } from 'lucide-react';
import { UserInfo } from '../../api/login.js';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (e: React.FormEvent) => Promise<void>;
  onSendOTP: () => Promise<void>;
  verifyFormData: {
    email: string;
    otp: string;
  };
  setVerifyFormData: React.Dispatch<React.SetStateAction<{
    email: string;
    otp: string;
  }>>;
  otpSent: boolean;
  verifying: boolean;
  user?: UserInfo | null;
  colors: {
    surface: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    surfaceLight: string;
    accent: string;
    accentHover: string;
  };
  darkMode: boolean;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  onSendOTP,
  verifyFormData,
  setVerifyFormData,
  otpSent,
  verifying,
  user,
  colors,
  darkMode,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setVerifyFormData({ email: user?.email || "", otp: ""});
  };

  return (
    <div 
      className="modal-overlay" 
      style={{ 
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' 
      }}
    >
      <div 
        className="verify-email-modal"
        style={{ 
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="modal-header">
          <h3 style={{ color: colors.textPrimary }}>Verify Your Email</h3>
          <button
            onClick={handleClose}
            className="close-btn"
            style={{ color: colors.textTertiary }}
            aria-label="Close verification modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form className="verify-form" onSubmit={onVerify}>
          <div className="form-group">
            <label style={{ color: colors.textSecondary }}>Email</label>
            <div className="input-container">
              <Mail size={18} style={{ color: colors.textTertiary }} aria-hidden="true" />
              <input
                type="email"
                value={verifyFormData.email}
                onChange={(e) => setVerifyFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.textPrimary,
                  borderColor: colors.border,
                }}
                required
                aria-required="true"
                aria-label="Email address"
              />
            </div>
          </div>

          {otpSent && (
            <div className="form-group">
              <label style={{ color: colors.textSecondary }}>OTP</label>
              <div className="input-container">
                <KeyRound size={18} style={{ color: colors.textTertiary }} aria-hidden="true" />
                <input
                  type="text"
                  value={verifyFormData.otp}
                  onChange={(e) => setVerifyFormData(prev => ({ ...prev, otp: e.target.value }))}
                  placeholder="Enter OTP"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.textPrimary,
                    borderColor: colors.border,
                  }}
                  required
                  aria-required="true"
                  aria-label="One-time password"
                />
              </div>
            </div>
          )}

          <div className="modal-actions">
            {!otpSent ? (
              <button
                type="button"
                onClick={onSendOTP}
                disabled={verifying}
                className="btn-primary"
                style={{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                  opacity: verifying ? 0.7 : 1,
                }}
                aria-label={verifying ? "Sending OTP" : "Send OTP"}
              >
                {verifying ? (
                  <Loader2 size={16} className="spinner" aria-hidden="true" />
                ) : (
                  <Send size={16} aria-hidden="true" />
                )}
                {verifying ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={verifying}
                className="btn-primary"
                style={{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                  opacity: verifying ? 0.7 : 1,
                }}
                aria-label={verifying ? "Verifying email" : "Verify email"}
              >
                {verifying ? (
                  <Loader2 size={16} className="spinner" aria-hidden="true" />
                ) : (
                  <CheckCircle size={16} aria-hidden="true" />
                )}
                {verifying ? "Verifying..." : "Verify Email"}
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .verify-email-modal {
          width: 100%;
          max-width: 440px;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background-color: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
        }

        .verify-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-container svg {
          position: absolute;
          left: 12px;
          pointer-events: none;
        }

        .input-container input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border-radius: 8px;
          border: 1px solid;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
          background-color: transparent;
        }

        .input-container input:focus {
          border-color: ${colors.accent};
          box-shadow: 0 0 0 3px ${colors.accent}20;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .modal-actions .btn-primary {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
        }

        .modal-actions .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .modal-actions .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .close-btn, .modal-actions .btn-primary {
            transition: none;
          }
          
          .spinner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};