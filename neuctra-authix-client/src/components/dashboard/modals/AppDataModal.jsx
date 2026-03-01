"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import axios from "axios";

export default function AppDataModal({ isOpen, onClose, app }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [jsonData, setJsonData] = useState("");

  // Fetch App Data when modal opens
  useEffect(() => {
    if (!isOpen || !app?.id) return;

   const fetchAppData = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/app/${app.id}/data`,
      {
        withCredentials: true, // if using cookies/auth
      }
    );

    if (!res.data.success) {
      throw new Error("Failed to fetch app data");
    }

    setItem(res.data.data); // Store the entire response for later use (e.g., ID)
console.log(item);

    // Get the actual appData array
    const data = res.data;

    // Format JSON nicely
    setJsonData(JSON.stringify(data, null, 2));
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

    fetchAppData();
  }, [isOpen, app?.id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const parsedData = JSON.parse(jsonData);

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/app/${app.id}/data/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) throw new Error("Failed to save changes");
    } catch (err) {
      setError(
        err instanceof SyntaxError
          ? "Invalid JSON format"
          : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
        <div>
          <h2 className="text-lg font-semibold text-white">
            JSON Editor
          </h2>
          <p className="text-xs text-gray-400">
            {app?.applicationName} ({app?.id})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading app data...
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        ) : (
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}