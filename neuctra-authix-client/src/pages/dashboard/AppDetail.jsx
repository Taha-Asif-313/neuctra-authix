import React, { use, useEffect, useRef, useState } from "react";
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
  Eye,
  Database,
  User,
  Book,
  BookOpen,
  Badge,
} from "lucide-react";
import AddNewUser from "../../components/dashboard/AddNewUser";
import EditApp from "../../components/dashboard/EditApp";
import UserRow from "../../components/dashboard/UserRow";
import { useAuth } from "../../contexts/AuthContext";
import DeleteAppModal from "../../components/dashboard/DeleteAppModal";
import EditUser from "../../components/dashboard/EditUser";
import DeleteUserModal from "../../components/dashboard/DeleteUserModal";
import InputField from "../../components/utils/InputField";
import CustomLoader from "../../components/utils/CustomLoader";
import SetupGuides from "../../components/guide/SetupGuides";
import AppDataModal from "../../components/dashboard/modals/AppDataModal";
import UserDataModal from "../../components/dashboard/modals/UserDataModal";

const AppDetail = () => {
  const { id } = useParams();
  const { admin } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [appDataModalOpen, setAppDataModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isUserDataOpen, setIsUserDataOpen] = useState(false);
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
  const [showGuide, setShowGuide] = useState(false);

  const navigate = useNavigate();
  console.log(app);

  // fetch app + users
  useEffect(() => {
    const fetchApp = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/apps/${id}`,
          { withCredentials: true },
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
  }, [id]);

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
    return u.id.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  if (loading) {
    return <CustomLoader />;
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
      <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex-1 space-y-5 sm:space-y-6">
            {/* App Name + Icon */}
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Icon */}
              <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-primary text-white text-lg sm:text-xl font-bold shadow-lg">
                {app.applicationName?.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                {/* App Name */}
                <h1 className="text-xl sm:text-3xl font-semibold text-white tracking-tight break-words">
                  {app.applicationName}
                </h1>

                {/* App ID */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-gray-400 mt-1">
                  <span className="whitespace-nowrap">App ID:</span>

                  <span className="text-gray-300 break-all">{app.id}</span>

                  <button
                    onClick={() => handleCopy(app.id)}
                    className="p-1 rounded-md hover:bg-zinc-700 transition"
                  >
                    <Copy size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            {app.description && (
              <p className="text-sm text-gray-300 leading-relaxed">
                {app.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-[11px] sm:text-xs text-gray-300">
                {app.category}
              </span>

              <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-[11px] sm:text-xs text-gray-300">
                {app.platform}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border ${
                  app.isActive
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {app.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-full xl:w-auto flex flex-col gap-5">
            {/* Free Plan Stats */}
            {admin.package === "free" && (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 w-full xl:w-[380px] shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                    FREE PLAN
                  </span>

                  <button className="text-[11px] sm:text-xs text-primary font-medium hover:underline">
                    Upgrade
                  </button>
                </div>

                <div className="space-y-4">
                  {/* App Docs */}
                  <div>
                    <div className="flex justify-between text-[11px] sm:text-xs text-gray-400 mb-1">
                      <span>App Documents</span>
                      <span>{app.appData?.length || 0} / 500</span>
                    </div>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            ((app.appData?.length || 0) / 500) * 100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* User Docs */}
                  <div>
                    <div className="flex justify-between text-[11px] sm:text-xs text-gray-400 mb-1">
                      <span>Users Documents</span>
                      <span>
                        {app.users.reduce((total, user) => {
                          const userDocCount = Array.isArray(user.data)
                            ? user.data.length
                            : 0;
                          return total + userDocCount;
                        }, 0)}{" "}
                        / 1000
                      </span>
                    </div>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (app.users.reduce((total, user) => {
                              const userDocCount = Array.isArray(user.data)
                                ? user.data.length
                                : 0;
                              return total + userDocCount;
                            }, 0) /
                              1000) *
                              100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Dropdown */}
            <div className="flex justify-end">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition shadow-md"
                >
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-zinc-900 border border-zinc-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden z-50">
                    <button
                      onClick={() => {
                        setAppDataModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-purple-400 hover:bg-zinc-800 transition"
                    >
                      <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                      View Data
                    </button>

                    <button
                      onClick={() => setEditAppModalOpen(true)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-blue-400 hover:bg-zinc-800 transition"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      Edit App
                    </button>

                    <button
                      onClick={() => setDeleteAppModalOpen(true)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 transition"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      Delete App
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="mt-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white truncate">
            {showGuide ? "App Setup Guide" : "Manage Users"}
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            {/* Toggle Guide/Users */}
            <button
              onClick={() => setShowGuide((prev) => !prev)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition bg-zinc-800 hover:bg-zinc-700 text-white w-full sm:w-auto"
            >
              <BookOpen size={14} />
              {showGuide ? "Show Users" : "Show Setup Guide"}
            </button>

            {!showGuide && (
              <>
                {/* Search */}
                <div className="w-full sm:w-64">
                  <InputField
                    name="search"
                    placeholder="Search by ID or Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    prefixIcon={Search}
                    className="bg-zinc-900 h-9 border border-zinc-800 w-full"
                  />
                </div>

                {/* Add User Button */}
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-1.5 rounded-md text-sm font-medium shadow-md w-full sm:w-auto"
                >
                  <UserPlus className="w-4 h-4" />
                  Add User
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        {showGuide ? (
          <SetupGuides app={app} />
        ) : (
          <div className="w-full">
            {filteredUsers.length === 0 ? (
              <p className="py-16 text-center text-sm text-gray-400">
                No matching users found.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full text-sm text-left text-gray-300 min-w-[500px]">
                  <thead className="bg-zinc-900/90 text-white text-xs tracking-wider">
                    <tr>
                      <th className="px-4 sm:px-6 py-3">Avatar</th>
                      <th className="px-4 sm:px-6 py-3">ID</th>
                      <th className="px-4 sm:px-6 py-3">Name</th>
                      <th className="px-4 sm:px-6 py-3">Email</th>
                      <th className="px-4 sm:px-6 py-3">Role</th>
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
                        onViewData={(u) => {
                          setSelectedUserData(u);
                          setIsUserDataOpen(true);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {appDataModalOpen && (
        <AppDataModal
          isOpen={appDataModalOpen}
          onClose={() => setAppDataModalOpen(false)}
          app={app}
        />
      )}

      {isUserDataOpen && selectedUserData && (
        <UserDataModal
          isOpen={isUserDataOpen}
          onClose={() => {
            setIsUserDataOpen(false);
            setSelectedUserData(null);
          }}
          user={selectedUserData}
          appId={app.id} // optional if needed in modal
        />
      )}

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
              prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
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
