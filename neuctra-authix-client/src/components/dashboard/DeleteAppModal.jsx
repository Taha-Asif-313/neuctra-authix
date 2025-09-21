import React, { useState } from "react";
import { Loader2, Trash2, X, AlertTriangle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteAppModal = ({ app, onCancel, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const { admin } = useAuth();

  /** 🔹 Delete App */
  const handleDeleteApp = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/delete/${app.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": admin.apiKey,
          },
        }
      );

      if (data.success) {
        toast.success("App deleted successfully");
        onConfirm && onConfirm(app.id); // 👈 notify parent
        onCancel();
      } else {
        toast.error(data.message || "Failed to delete app");
      }
    } catch (err) {
      console.error("Delete App Error:", err);
      toast.error(err.response?.data?.message || "Error deleting app");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-950 w-full max-w-md rounded-2xl border border-zinc-900 shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-900/20">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-white">Confirm Delete</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-300 text-sm leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {app?.applicationName}
            </span>
            ? This action cannot be undone.
          </p>
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
            onClick={handleDeleteApp}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAppModal;
