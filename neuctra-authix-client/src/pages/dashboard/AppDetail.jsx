import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Loader2,
  UserPlus,
  Trash2,
  Edit,
  MoreVertical,
  Copy,
  Search,
} from "lucide-react";
import AddNewUser from "../../components/dashboard/AddNewUser";
import EditApp from "../../components/dashboard/EditApp";
import UserRow from "../../components/dashboard/UserRow";
import { useAuth } from "../../contexts/AuthContext";
import DeleteAppModal from "../../components/dashboard/DeleteAppModal";
import EditUser from "../../components/dashboard/EditUser";
import DeleteUserModal from "../../components/dashboard/DeleteUserModal";

const AppDetail = () => {
  const { id } = useParams();
  const { admin } = useAuth();
  const token = localStorage.getItem("token");
    const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteAppModalOpen, setDeleteAppModalOpen] = useState(false);
  const [editAppModalOpen, setEditAppModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [app, setApp] = useState(null);
  const [copied, setCopied] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  // fetch app + users
  useEffect(() => {
    const fetchApp = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/apps/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setApp(data.data);
          setUsers(data.data.users || []);
        }
      } catch (err) {
        console.error("Fetch App Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id, token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = (text) => {
    try {
      // Create a hidden textarea
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);

      // Select and copy
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const success = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (!success) throw new Error("execCommand failed");

      setCopied(true);
      toast.success("App ID copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy App ID");
    }
  };

    // Filter users by ID or Email
  const filteredUsers = users.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.id.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-400" />
      </div>
    );
  }

  if (!app) {
    return (
      <p className="text-center text-gray-400 text-sm">
        App not found or you don’t have access.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* App Info */}
      <div className="bg-gradient-to-r  from-zinc-900 to-zinc-950/5 rounded-2xl p-6 shadow-2xl">
        <div className="relative flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-6">
          {/* Left: App Details */}
          <div className="space-y-4">
            <div className="flex max-sm:flex-col max-sm:items-start items-center gap-4">
              <span className="h-14 w-14 flex items-center justify-center rounded-2xl bg-primary text-white font-bold text-lg shadow-md">
                {app.applicationName?.charAt(0)}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {app.applicationName}
                </h1>
                {/* App ID */}
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs max-sm:hidden text-gray-400">App ID:</p>
                  <span className="text-xs text-gray-200 truncate max-w-[200px]">
                    {app.id}
                  </span>
                  <button
                    onClick={() => handleCopy(app.id)}
                    className="p-1 rounded-md hover:bg-zinc-800 text-gray-300"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {app.description}
            </p>

            <div className="flex gap-3 flex-wrap text-xs sm:text-sm text-gray-300">
              <span className="px-3 py-1 bg-zinc-800/80 rounded-full">
                {app.category}
              </span>
              <span className="px-3 py-1 bg-zinc-800/80 rounded-full">
                {app.platform}
              </span>
              <span
                className={`px-3 py-1 rounded-full font-medium ${
                  app.isActive
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {app.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div
            className="relative max-sm:absolute top-0 right-0 self-start sm:self-auto"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="p-2 rounded-xl hover:bg-zinc-800 text-gray-300"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {dropdownOpen && (
              <div
                className="
        absolute right-0 mt-2 
        w-44 
        bg-zinc-900 border border-zinc-800 
        rounded-xl shadow-xl 
        overflow-hidden z-50 
        animate-fadeIn
      "
              >
                <button
                  onClick={() => setEditAppModalOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-blue-400 hover:bg-zinc-800 transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => setDeleteAppModalOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Users */}
           <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 mt-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Manage Users
          </h2>

          <div className="flex items-center gap-3">
            {/* 🔍 Search Input */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              onClick={() => setAddModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-md text-sm transition font-medium shadow-md"
            >
              <UserPlus className="w-4 h-4" /> Add User
            </button>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">
            No matching users found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm text-left text-gray-300 min-w-[500px]">
              <thead className="bg-zinc-900/90 text-gray-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 sm:px-6 py-3">ID</th>
                  <th className="px-4 sm:px-6 py-3">Name</th>
                  <th className="px-4 sm:px-6 py-3">Email</th>
                  <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onEdit={(u) => setEditUser(u)}
                    onDelete={(u) => setDeleteUser(u)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {addModalOpen && (
        <AddNewUser
          appId={app.id}
          onClose={() => setAddModalOpen(false)}
          onSave={(newUser) => setUsers((prev) => [...prev, newUser])}
        />
      )}

      {/* Delete App Confirm Modal */}
      {deleteAppModalOpen && (
        <DeleteAppModal
          app={app}
          appId={app.id}
          onCancel={() => setDeleteAppModalOpen(false)}
          onConfirm={() => {
            setDeleteAppModalOpen(false);
            navigate("/dashboard");
          }}
        />
      )}

      {/* Edit App Modal */}
      {editAppModalOpen && (
        <EditApp
          appData={app}
          appId={app.id}
          onClose={() => setEditAppModalOpen(false)}
          onSave={(updatedData) => setApp(updatedData)}
        />
      )}

      {/* Edit User Modal */}
      {editUser && (
        <EditUser
          userData={editUser}
          userId={editUser.id}
          appId={app.id}
          onClose={() => setEditUser(null)}
          onSave={(updatedUser) => {
            if (!updatedUser?.id) {
              console.error("Updated user missing ID:", updatedUser);
              return;
            }
            setUsers((prev) =>
              prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            setEditUser(null);
          }}
        />
      )}

      {/* Delete User Modal */}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          appId={app.id}
          onClose={() => setDeleteUser(null)}
          onConfirm={(deletedId) => {
            setUsers((prev) => prev.filter((u) => u.id !== deletedId));
            setDeleteUser(null);
          }}
        />
      )}
    </div>
  );
};

export default AppDetail;
