import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Loader2,
  UserPlus,
  Trash2,
  Edit,
  X,
  MoreVertical,
  Copy,
} from "lucide-react";
import AddNewUser from "../../components/dashboard/AddNewUser";
import EditApp from "../../components/dashboard/EditApp";
import UserRow from "../../components/dashboard/UserRow";
import { useAuth } from "../../contexts/AuthContext";
import DeleteAppModal from "../../components/dashboard/DeleteAppModal";

const AppDetail = () => {
  const { id } = useParams();
  const { admin } = useAuth();
  const token = localStorage.getItem("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteAppModalOpen, setDeleteAppModalOpen] = useState(false);
  const [editAppModalOpen, setEditAppModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [app, setApp] = useState(null);
  const [copied, setCopied] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.log(data);

        if (data.success) {
          setApp(data.data);
          setUsers(data.data.users || []);
        } else {
          setApp(staticApp);
          setUsers(staticUsers);
        }
      } catch (err) {
        console.error("Fetch App Error:", err);
        setApp(staticApp);
        setUsers(staticUsers);
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

  // Handle Update User
  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  // Handle Delete User
  const handleDeleteUser = async (deletedUserId) => {
    setUsers((prev) => prev.filter((u) => u.id !== deletedUserId));
  };

// ✅ Single Copy Function
const handleCopy = (text) => {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopied(true);
    toast.success("App ID copied!");
    setTimeout(() => setCopied(false), 2000); // reset copied state
  } catch (err) {
    console.error("Copy failed:", err);
    toast.error("Failed to copy App ID");
  }
};



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
    <div className="max-w-6xl mx-auto space-y-3">
      {/* App Info */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          {/* Left: App Details */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
                {app.applicationName?.charAt(0)}
              </span>
              <div>
                {app.applicationName}
                {/* App ID */}
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400">App ID:</p>
                  <span className="text-xs text-gray-200 truncate max-w-[200px]">
                    {app.id}
                  </span>
                  <button
                    onClick={() => handleCopy(app.id)}
                    className="p-1 rounded-md hover:bg-zinc-700 text-gray-300"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </h1>
            <p className="text-sm text-gray-300 mb-3">{app.description}</p>

            <div className="flex gap-3 flex-wrap text-xs sm:text-sm text-gray-300">
              <span className="px-3 py-1 bg-black rounded-full">
                {app.category}
              </span>
              <span className="px-3 py-1 bg-black rounded-full">
                {app.platform}
              </span>
              <span
                className={`px-3 py-1 rounded-full ${
                  app.isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {app.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-black"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 overflow-hidden mt-2 w-40 bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => setEditAppModalOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-blue-400 hover:bg-zinc-800"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => setDeleteAppModalOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-zinc-800"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="bg-zinc-950 rounded-xl p-5 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Manage Users
          </h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm transition"
          >
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>

        {users.length === 0 ? (
          <p className="py-20 text-center text-sm">No users added yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm text-left text-gray-300 min-w-[500px]">
              <thead className="bg-zinc-900/90 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Name</th>
                  <th className="px-4 sm:px-6 py-3">Email</th>
                  <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    appId={app.id}
                    user={user}
                    onDelete={handleDeleteUser}
                    onUpdate={handleUpdateUser}
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
          onSave={(newUser) => {
            // Save user locally or call API
            setUsers((prev) => [...prev, newUser]);
          }}
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
    </div>
  );
};

export default AppDetail;
