"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import axios from "axios";
import ReactJson from "react-json-view";

export default function UserDataModal({ isOpen, onClose, user }) {
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Fetch User Data
  useEffect(() => {
    if (!isOpen || !user?.id) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/user/data/${user.id}`,
          { withCredentials: true },
        );

        if (!res.data.success) {
          throw new Error("Failed to fetch user data");
        }

        setJsonData(res.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isOpen, user?.id]);

  // Clear User Data
  const confirmClearUserData = async () => {
    try {
      setClearing(true);
      setError(null);

      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/user/data/clear/${user.id}`,
        {},
        { withCredentials: true },
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to clear user data");
      }

      setJsonData([]);
      setShowConfirm(false);
      setConfirmText("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setClearing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm">
      {/* Modal container */}
      <div className="relative flex flex-col w-full mx-auto bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg overflow-hidden h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white truncate">
              User Data Viewer
            </h2>
            <p className="text-xs text-gray-400 truncate">
              {user?.name || user?.email} ({user?.id})
            </p>
          </div>

          <div className="flex items-center gap-2 mt-3 md:mt-0 flex-wrap">
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear User Data
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
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading user data...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm">{error}</div>
          ) : (
            <ReactJson
              src={jsonData || []}
              theme="monokai"
              collapsed={1}
              enableClipboard
              displayDataTypes={false}
              displayObjectSize={false}
              name={false}
              indentWidth={2}
              style={{
                backgroundColor: "transparent",
                fontSize: "14px",
                minHeight: "200px",
              }}
            />
          )}
        </div>
      </div>

      {/* 🔴 Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-2">
              Confirm User Data Deletion
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              This will permanently delete all stored data for this user.
              <br />
              Type <span className="text-red-500 font-mono">DELETE</span> to
              confirm.
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Type DELETE"
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                }}
                className="px-4 py-2 rounded-lg bg-zinc-700 text-sm text-gray-300 hover:bg-zinc-600 transition w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={confirmClearUserData}
                disabled={confirmText !== "DELETE" || clearing}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition disabled:opacity-50 w-full sm:w-auto mt-2 sm:mt-0"
              >
                {clearing && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
