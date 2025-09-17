import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteAppModal = ({ app,appId, onCancel, onConfirm }) => {
  const [loading, setloading] = useState(false);
  const { admin } = useAuth();

  /** 🔹 Delete App */
  const handleDeleteApp = async () => {
    try {
      setloading(true);
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

        onConfirm && onConfirm(app.id); // 👈 notify parent to remove from list
      } else {
        toast.error(data.message || "Failed to delete app");
      }
    } catch (err) {
      console.error("Delete App Error:", err);
      toast.error("Error deleting app");
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-zinc-950 p-6 mx-auto rounded-lg border border-zinc-900 shadow-lg w-96">
        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <b>{app?.applicationName}</b>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteApp}
            disabled={loading}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-500 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAppModal;
