import React, { useState, useRef, useEffect } from "react";
import { Trash2, Loader2, X, AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteAdminModal = ({ adminUser, appId, onClose, onConfirm }) => {
  const { admin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(1);
  const [confirmationText, setConfirmationText] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const inputRef = useRef(null);
  
  const requiredText = `delete ${adminUser?.name || "this admin"}`;
  
  // Focus input when entering confirmation step
  useEffect(() => {
    if (confirmationStep === 2 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [confirmationStep]);

  // Reset confirmation when modal closes
  useEffect(() => {
    return () => {
      setConfirmationStep(1);
      setConfirmationText("");
      setDeleteConfirmed(false);
    };
  }, []);

  // Check if confirmation text matches
  useEffect(() => {
    setDeleteConfirmed(confirmationText.toLowerCase() === requiredText.toLowerCase());
  }, [confirmationText, requiredText]);

  // Handle delete admin
  const handleDeleteAdmin = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/${adminUser.id}`,
        {
          data: { appId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": admin.apiKey,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Admin deleted successfully");
        onConfirm(adminUser.id);
        onClose();
      } else {
        toast.error(res.data.message || "Failed to delete admin");
        setConfirmationStep(1);
        setConfirmationText("");
      }
    } catch (err) {
      console.error("DeleteAdmin Error:", err);
      toast.error(err.response?.data?.message || "Failed to delete admin");
      setConfirmationStep(1);
      setConfirmationText("");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToConfirm = () => {
    // REMOVED: No longer preventing self-deletion
    // Admins can now delete their own accounts
    setConfirmationStep(2);
  };

  const handleProceedToFinal = () => {
    if (deleteConfirmed) {
      setConfirmationStep(3);
    }
  };

  const handleBack = () => {
    if (confirmationStep === 3) {
      setConfirmationStep(2);
    } else if (confirmationStep === 2) {
      setConfirmationStep(1);
      setConfirmationText("");
    }
  };

  const getStepTitle = () => {
    switch (confirmationStep) {
      case 1: return "Confirm Delete";
      case 2: return "Type Confirmation";
      case 3: return "Final Verification";
      default: return "Confirm Delete";
    }
  };

  const getStepIcon = () => {
    switch (confirmationStep) {
      case 1: return <AlertTriangle size={20} className="text-red-500" />;
      case 2: return <ShieldAlert size={20} className="text-orange-500" />;
      case 3: return <CheckCircle size={20} className="text-red-500" />;
      default: return <AlertTriangle size={20} className="text-red-500" />;
    }
  };

  // Check if deleting own account
  const isDeletingOwnAccount = adminUser?.id === admin?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm h-screen">
      <div className="bg-zinc-950 w-full max-w-md rounded-2xl border border-zinc-900 shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-900/20">
              {getStepIcon()}
            </div>
            <h2 className="text-lg font-semibold text-white">
              {getStepTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    confirmationStep >= step 
                      ? "bg-red-600 text-white" 
                      : "bg-zinc-800 text-gray-400"
                  }`}>
                    {confirmationStep > step ? (
                      <CheckCircle size={16} />
                    ) : (
                      step
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-400">
                    {step === 1 ? "Warning" : step === 2 ? "Type" : "Final"}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    confirmationStep > step ? "bg-red-600" : "bg-zinc-800"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {confirmationStep === 1 ? (
            <>
              <div className="mb-4 p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium mb-1">
                  ⚠️ Critical Action
                </p>
                <p className="text-red-300 text-xs">
                  Deleting an admin will permanently remove their access and all associated data.
                </p>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  {adminUser?.name}
                </span>
                ? This action cannot be undone.
              </p>
              
              {/* Warning for self-deletion (but allowed) */}
              {isDeletingOwnAccount && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <p className="text-red-400 text-sm font-medium">
                    ⚠️ You are deleting YOUR OWN account
                  </p>
                  <p className="text-red-300 text-xs mt-1">
                    Warning: You will lose all access immediately. Make sure another admin can manage the system.
                  </p>
                </div>
              )}
            </>
          ) : confirmationStep === 2 ? (
            <>
              <div className="mb-4 p-3 bg-orange-900/10 border border-orange-900/30 rounded-lg">
                <p className="text-orange-400 text-sm font-medium mb-1">
                  🔒 Type Confirmation Phrase
                </p>
                <p className="text-orange-300 text-xs">
                  Type the exact phrase below to proceed to final verification.
                </p>
              </div>
              
              <p className="text-gray-300 text-sm mb-2">
                Type this exact phrase:{" "}
                <span className="font-mono font-bold text-white bg-zinc-800 px-2 py-1 rounded">
                  {requiredText}
                </span>
              </p>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Type the confirmation phrase:
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={`Type "${requiredText}" here`}
                  disabled={loading}
                  autoComplete="off"
                  spellCheck="false"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {deleteConfirmed && (
                      <span className="text-green-400 text-xs flex items-center gap-1">
                        <CheckCircle size={12} />
                        Phrase matches. You can proceed.
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-xs text-gray-400 hover:text-white transition"
                    disabled={loading}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium mb-1">
                  ⚠️ FINAL VERIFICATION
                </p>
                <p className="text-red-300 text-xs">
                  This is your last chance to cancel. The deletion will be permanent.
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-red-900/30 rounded">
                    <AlertTriangle size={16} className="text-red-400" />
                  </div>
                  <p className="text-sm font-medium text-white">You are about to delete:</p>
                </div>
                <div className="ml-9">
                  <p className="text-white font-medium">{adminUser?.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{adminUser?.email}</p>
                  {isDeletingOwnAccount && (
                    <p className="text-red-400 text-xs mt-1 font-medium">⚠️ THIS IS YOUR OWN ACCOUNT</p>
                  )}
                </div>
              </div>
              
              <div className="p-3 bg-zinc-800/50 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">Consequences:</span>
                </p>
                <ul className="text-gray-400 text-xs mt-1 ml-4 list-disc space-y-1">
                  <li>Admin will lose all access immediately</li>
                  <li>All their sessions will be terminated</li>
                  <li>This action cannot be undone</li>
                  <li>No data recovery possible</li>
                  {isDeletingOwnAccount && (
                    <li className="text-red-400 font-medium">You will be logged out immediately</li>
                  )}
                </ul>
              </div>
              
              <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-400" />
                  You've typed: <span className="font-mono text-white">{confirmationText}</span>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          {confirmationStep === 1 ? (
            <>
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToConfirm}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={16} />
                Proceed
              </button>
            </>
          ) : confirmationStep === 2 ? (
            <>
              <button
                onClick={handleBack}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleProceedToFinal}
                disabled={!deleteConfirmed || loading}
                className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={16} />
                Verify & Continue
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition disabled:opacity-50"
              >
                Cancel Deletion
              </button>
              <button
                onClick={handleDeleteAdmin}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 transition shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Permanently
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAdminModal;