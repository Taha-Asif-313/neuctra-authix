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
  const { admin, token } = useAuth(); // ✅ bring token also
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [appState, setAppState] = useState(app || {});

  // Keep local state in sync with parent prop changes
  useEffect(() => {
    setAppState(app);
  }, [app]);

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

  /** 🔹 Toggle Active Status */
  const handleToggleStatus = async () => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/status/${appState.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": admin.apiKey,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setAppState(data.updatedApp); // ✅ update local card
        onActiveToggle(data.updatedApp); // ✅ notify parent
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Toggle Status Error:", err);
      toast.error("Error updating status");
    }
  };

  /** 🔹 View App (fetch single app) */
  const handleView = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/${appState.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("App loaded successfully");
        navigate(`/dashboard/app/${appState.id}`, { state: data.data });
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
  console.log(app);

  return (
    <>
      <div className="bg-zinc-950 border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
        {/* App Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
              {appState.applicationName?.charAt(0)}
            </div>
            <div>
              <p className="text-base font-semibold text-white">
                {appState.applicationName}
              </p>
              <span
                className={`px-2 py-0.5 text-[10px] rounded-full ${getCategoryColor(
                  appState.category
                )}`}
              >
                {appState.category}
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

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">{appState.description}</p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users size={14} className="text-gray-400 mr-1" />
            <span className="text-sm text-white">
              {appState._count.users || 0}
            </span>
            <span
              className={`text-xs ml-2 ${
                appState._count.users >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {appState._count.users >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(appState._count.users || 0)}%
            </span>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              appState.isActive
                ? "bg-green-600/20 text-green-400"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {appState.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          {/* Toggle */}
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(!!appState?.isActive)}
                onChange={handleToggleStatus}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <span className="ml-2 text-sm text-gray-400">
              {appState.isActive ? "Enabled" : "Disabled"}
            </span>
          </div>

          {/* Open */}
          <button
            onClick={() => navigate(`/dashboard/app/${appState.id}`)}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-primary hover:bg-primary/30 text-white rounded-lg transition"
          >
            <span>View Details</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteModalOpen && (
        <DeleteAppModal
          app={appState}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            onDelete && onDelete(appState.id);
            setDeleteModalOpen(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <EditApp
          appData={appState}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedApp) => {
            setAppState(updatedApp); // ✅ update immediately
            onActiveToggle(updatedApp); // ✅ sync with parent
            setEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default AppCard;
