import React, { useState } from "react";
import { Edit, Trash2, User, Eye } from "lucide-react";

const UserRow = ({ user, appId, onDelete, onEdit, onView }) => {
  return (
    <>
      <tr className="hover:bg-zinc-950/80 transition">
        {/* Avatar */}
        <td className="px-4 sm:px-6 py-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-gray-400" />
          )}
        </td>

        {/* ID */}
        <td className="px-4 sm:px-6 py-4 text-gray-200">{user.id}</td>

        {/* Name */}
        <td className="px-4 sm:px-6 py-4 text-gray-200">{user.name}</td>

        {/* Email */}
        <td className="px-4 sm:px-6 py-4 text-gray-200">{user.email}</td>

        {/* Role */}
        <td className="px-4 sm:px-6 py-4 text-gray-200">{user.role}</td>

        {/* Actions */}
        <td className="px-4 sm:px-6 py-4">
          <div className="flex justify-end">
            {/* View Details */}
            <button
              onClick={() => onView(user)}
              className="p-2 rounded-lg text-green-400 hover:bg-zinc-900"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Edit User */}
            <button
              onClick={() => onEdit(user)}
              className="p-2 rounded-lg text-blue-400 hover:bg-zinc-900"
            >
              <Edit className="w-4 h-4" />
            </button>

            {/* Delete User */}
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
