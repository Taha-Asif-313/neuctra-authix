import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { Key, RefreshCw, Copy, ShieldOff, Loader, X } from "lucide-react";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-950 rounded-2xl w-full max-w-sm p-5 border border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onCancel} className="p-1 rounded hover:bg-zinc-900">
            <X size={18} className="text-gray-300" />
          </button>
        </div>
        <p className="text-gray-400 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-gray-300 hover:text-white rounded-lg border border-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Confirm
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
    <div className="px-5 space-y-8">
      <div className="flex items-center gap-3">
        <Key size={22} className="text-primary" />
        <h2 className="text-2xl font-bold text-white">API Keys Management</h2>
      </div>

      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-4">
        <p className="text-sm">
          Your API key allows apps to authenticate securely with the server.
        </p>

        {apiKey ? (
          <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 rounded-lg">
            <p className="text-white text-xs truncate w-4/5">{apiKey}</p>
            <div className="flex gap-2">
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
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 flex items-center gap-2"
            >
              <RefreshCw size={16} /> Generate New Key
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
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
