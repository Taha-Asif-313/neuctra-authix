import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  Users,
  ArrowUpRight,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import EditApp from "./EditApp";
import DeleteAppModal from "./DeleteAppModal";

const AppCard = ({ app, getCategoryColor, onActiveToggle, onDelete }) => {
  const { admin, token } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [appState, setAppState] = useState(app || {});

  // 🔄 Keep local state synced with parent
  useEffect(() => {
    setAppState(app || {});
  }, [app]);

  // 🖱️ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** 🟢 Toggle Active Status (App + Users) */
  const handleToggleStatus = async () => {
    if (!appState?.id) return toast.error("App ID is missing!");

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/status/${appState.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": admin?.apiKey || "",
          },
        },
      );

      if (data.success) {
        // backend now returns { data: { ...updatedApp, users, _count, activeUsers, totalUsers } }
        const updatedApp = data.data || data.updatedApp;

        setAppState(updatedApp);
        onActiveToggle?.(updatedApp);
        toast.success(data.message || "Status updated!");
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Toggle Status Error:", err);
      toast.error("Error updating status");
    }
  };

  /** 👁️ View App */
  const handleView = async () => {
    if (!appState?.id) return toast.error("App ID is missing!");

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/${appState.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        navigate(`/dashboard/app/${appState.id}`, { state: data.data || {} });
        toast.success("App loaded successfully");
      } else {
        toast.error(data.message || "Failed to fetch app");
      }
    } catch (err) {
      console.error("View App Error:", err);
      toast.error("Error fetching app");
    } finally {
      setDropdownOpen(false);
    }
  };

  // 📊 Safe nested stats
  const totalUsers = appState?.totalUsers ?? appState?._count?.users ?? 0;
  const activeUsers = appState?.activeUsers ?? 0;
  const inactiveUsers = totalUsers - activeUsers;

  return (
    <>
      <div className="bg-zinc-900 border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
              {appState?.applicationName?.charAt(0) || "?"}
            </div>
            <div>
              <p className="text-base font-semibold text-white">
                {appState?.applicationName || "Untitled"}
              </p>
              <span
                className={`px-2 py-0.5 text-[10px] rounded-full ${
                  getCategoryColor?.(appState?.category) || "bg-primary/10"
                }`}
              >
                {appState?.category || "Unknown"}
              </span>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-gray-400 hover:text-white p-1 rounded"
            >
              <MoreVertical size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg z-20">
                <button
                  onClick={handleView}
                  className="flex items-center gap-2 w-full px-3 py-3 text-sm text-gray-200 hover:bg-zinc-800"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="flex items-center gap-2 w-full px-3 py-3 text-sm text-blue-400 hover:bg-zinc-800"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => setDeleteModalOpen(true)}
                  className="flex items-center gap-2 w-full px-3 py-3 text-sm text-red-400 hover:bg-zinc-800"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {/* Total Users */}
            <div className="flex items-center">
              <Users size={14} className="text-gray-400 mr-1" />
              <span className="text-sm text-white">{totalUsers} users</span>
            </div>

            {/* Active / Inactive Breakdown */}
            <span className="text-xs text-gray-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1 text-green-500">
                {activeUsers} active
              </span>
              <span className="flex items-center gap-1 text-red-500">
                {inactiveUsers} inactive
              </span>
            </span>
          </div>

          {/* App Status */}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              appState?.isActive
                ? "bg-green-600/10 text-green-500"
                : "bg-red-600/10 text-red-500"
            }`}
          >
            {appState?.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(appState?.isActive)}
                onChange={handleToggleStatus}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <span className="ml-2 text-sm text-gray-400">
              {appState?.isActive ? "Enabled" : "Disabled"}
            </span>
          </div>

          <button
            onClick={() =>
              appState?.id
                ? navigate(`/dashboard/app/${appState.id}`)
                : toast.error("App ID is missing!")
            }
            className="flex items-center gap-1 px-3 py-2 text-sm bg-primary hover:bg-primary/90 cursor-pointer text-white rounded-lg transition"
          >
            <span>View Details</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && (
        <DeleteAppModal
          app={appState}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            if (appState?.id) onDelete?.(appState.id);
            setDeleteModalOpen(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <EditApp
          appData={appState}
          appId={appState?.id}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedApp) => {
            setAppState(updatedApp || appState);
            onActiveToggle?.(updatedApp || appState);
            setEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default AppCard;
