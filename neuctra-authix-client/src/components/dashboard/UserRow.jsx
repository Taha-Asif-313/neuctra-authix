import React, { useState } from "react";
import { Edit, Trash2, Loader2 } from "lucide-react";
import EditUser from "./EditUser";
import DeleteUserModal from "./DeleteUserModal";

const UserRow = ({ user, appId, onDelete, onEdit }) => {
  return (
    <>
      <tr className="hover:bg-zinc-800/50 transition">
        <td className="px-4 sm:px-6 py-4 text-white">{user.id}</td>
        <td className="px-4 sm:px-6 py-4 text-gray-200">
          {user.name}
        </td>
        <td className="px-4 sm:px-6 py-4 text-gray-200">{user.email}</td>
        <td className="px-4 sm:px-6 py-4">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(user)}
              className="p-2 rounded-lg text-blue-400 hover:bg-zinc-900"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(user)}
              className="p-2 rounded-lg text-red-400 hover:bg-zinc-900"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserRow;
