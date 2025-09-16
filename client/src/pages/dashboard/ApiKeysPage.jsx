import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { Key, RefreshCw, Copy, ShieldOff, Loader } from "lucide-react";

const ApiKeysPage = () => {
  const { token } = useAuth();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch API Key
  const fetchApiKey = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/api-key`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      
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
  const handleGenerate = async () => {
    if (
      !window.confirm(
        "Generating a new API key will revoke the old one. Continue?"
      )
    )
      return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/api-key/generate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setApiKey(data.apiKey);
        toast.success("New API key generated");
      } else toast.error(data.message);
    } catch (err) {
      console.error("Generate API Key error:", err);
      toast.error("Failed to generate API key");
    }
  };

  // 🔹 Revoke key
  const handleRevoke = async () => {
    if (!window.confirm("Are you sure you want to revoke this API key?")) return;

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

      <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-4">
        <p className="text-sm text-gray-400">
          Your API key allows apps to authenticate securely with the server.
        </p>

        {apiKey ? (
          <div className="flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-lg">
            <p className="text-white text-sm truncate w-4/5">{apiKey}</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-gray-300"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={handleGenerate}
                className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={handleRevoke}
                className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400"
              >
                <ShieldOff size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <p className="text-gray-400 mb-4">No active API key found</p>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 flex items-center gap-2"
            >
              <RefreshCw size={16} /> Generate New Key
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeysPage;
