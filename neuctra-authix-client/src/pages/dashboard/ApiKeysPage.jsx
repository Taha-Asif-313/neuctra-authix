import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { Key, RefreshCw, Copy, ShieldOff, Loader, X } from "lucide-react";

const ConfirmModal = ({ title, message, onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-950 w-full max-w-md rounded-2xl border border-zinc-900 shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 text-white bg-gradient-to-r from-primary to-green-500 hover:from-primary hover:to-green-400 transition shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ApiKeysPage = () => {
  const { token } = useAuth();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, type: null });

  // 🔹 Fetch API Key
  const fetchApiKey = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/api-key`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) setApiKey(data.data.apiKey);
      else toast.error(data.message);
    } catch (err) {
      console.error("Fetch API Key error:", err);
      toast.error("Failed to fetch API key");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  // 🔹 Generate new key
  const generateKey = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/api-key/generate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setApiKey(data.data.apiKey || data.apiKey);
        toast.success("New API key generated");
      } else toast.error(data.message);
    } catch (err) {
      console.error("Generate API Key error:", err);
      toast.error("Failed to generate API key");
    } finally {
      setModal({ open: false, type: null });
    }
  };

  // 🔹 Revoke key
  const revokeKey = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/api-key/revoke`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setApiKey(null);
        toast.success("API key revoked");
      } else toast.error(data.message);
    } catch (err) {
      console.error("Revoke API Key error:", err);
      toast.error("Failed to revoke API key");
    } finally {
      setModal({ open: false, type: null });
    }
  };

  // 🔹 Copy key
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("Copied to clipboard");
  };

  if (loading)
    return (
      <p className="text-center text-gray-400 flex items-center justify-center gap-2">
        <Loader className="animate-spin" size={18} /> Loading API Key...
      </p>
    );

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Key size={22} className="text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            API Keys Management
          </h2>
        </div>
      </div>

      {/* Card */}
      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-4">
        {apiKey ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3  rounded-lg">
            {/* API Key (truncate on large, wrap on small) */}
            <p className="text-white text-xs sm:text-sm truncate sm:w-4/5 break-all">
              {apiKey}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-zinc-700/10 hover:bg-zinc-600 text-gray-300"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={() => setModal({ open: true, type: "generate" })}
                className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-600"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setModal({ open: true, type: "revoke" })}
                className="p-2 rounded-lg bg-red-600/10 hover:bg-red-600 hover:text-white text-red-600"
              >
                <ShieldOff size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <p className="text-gray-400 mb-4">No active API key found</p>
            <button
              onClick={() => setModal({ open: true, type: "generate" })}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 flex items-center gap-2 text-sm sm:text-base"
            >
              <RefreshCw size={16} /> Generate New Key
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modals */}
      {modal.open && modal.type === "generate" && (
        <ConfirmModal
          title="Generate New API Key"
          message="Generating a new API key will revoke the old one. Continue?"
          onConfirm={generateKey}
          onCancel={() => setModal({ open: false, type: null })}
        />
      )}

      {modal.open && modal.type === "revoke" && (
        <ConfirmModal
          title="Revoke API Key"
          message="Are you sure you want to revoke this API key?"
          onConfirm={revokeKey}
          onCancel={() => setModal({ open: false, type: null })}
        />
      )}
    </div>
  );
};

export default ApiKeysPage;
