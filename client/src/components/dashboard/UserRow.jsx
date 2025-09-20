import React, { useState } from "react";
import { Edit, Trash2, Loader2 } from "lucide-react";
import EditUser from "./EditUser";
import DeleteUserModal from "./DeleteUserModal";

const UserRow = ({ user, appId, onDelete, onUpdate }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <tr className="hover:bg-zinc-800/50 transition">
        <td className="px-4 sm:px-6 py-4 font-medium text-white">
          {user.name}
        </td>
        <td className="px-4 sm:px-6 py-4 text-gray-200">{user.email}</td>
        <td className="px-4 sm:px-6 py-4">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="p-2 rounded-lg text-blue-400 hover:bg-zinc-900"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setdeleteModalOpen(true)}
              className="p-2 rounded-lg text-red-400 hover:bg-zinc-900"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Edit User Modal */}
      {editModalOpen && (
        <EditUser
          userData={user}
          userId={user.id}
          appId={appId}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedUser) => {
            onUpdate(updatedUser); // ✅ notify parent
            setEditModalOpen(false);
          }}
        />
      )}

      {/* Delete User Modal */}
      {deleteModalOpen && (
        <DeleteUserModal
          user={user}
          appId={appId}
          onClose={() => setdeleteModalOpen(false)}
          onConfirm={(deletedUserId) => {
            onDelete(deletedUserId); // ✅ notify parent
            setdeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default UserRow;
