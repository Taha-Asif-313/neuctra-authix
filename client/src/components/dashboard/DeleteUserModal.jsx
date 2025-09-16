import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteUserModal = ({ user, appId,onClose, onConfirm }) => {
  const { admin } = useAuth();
  const [loading, setLoading] = useState(false);

  // Handle delete user
  const handleDeleteUser = async () => {
    try {
      setLoading(true)
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${
          appId
        }/delete/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": admin.apiKey,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "User deleted");
        onConfirm(user.id); // ✅ flows up to UserRow → AppDetail
        onClose();
      } else {
        toast.error(res.data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("DeleteUser Error:", err);
      toast.error(err.response?.data?.message || "Failed to delete user");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-900 shadow-lg w-96">
        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <b>{user?.name}</b>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUser}
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

export default DeleteUserModal;
