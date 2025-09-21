import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  X,
  User,
  Mail,
  Lock,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle,
  Loader,
  Phone,
  MapPin,
  Image,
  Save,
} from "lucide-react";

const EditUser = ({ userData, userId, appId, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [checkingAppStatus, setCheckingAppStatus] = useState(true);
  const [appStatus, setAppStatus] = useState({ isActive: false, name: "" });
  console.log(userData);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    password: "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    avatarUrl: userData?.avatarUrl || "",
    isActive: userData?.isActive ?? true,
    role: userData?.role || "user",
  });

  // Check app status
  useEffect(() => {
    const checkAppStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/apps/${appId}/status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          setAppStatus({
            isActive: res.data.data.isActive,
            name: res.data.data.name,
          });
        }
      } catch (err) {
        console.error("Check app status error:", err);
        toast.error("Failed to verify app status");
      } finally {
        setCheckingAppStatus(false);
      }
    };

    checkAppStatus();
  }, [appId]);

  // Keep form synced with latest userData
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
        phone: userData.phone || "",
        address: userData.address || "",
        avatarUrl: userData.avatarUrl || "",
        isActive: userData.isActive ?? true,
        role: userData.role || "user",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appStatus.isActive) {
      toast.error("Cannot edit user in an inactive app");
      return;
    }

    setLoading(true);
    try {
      const idToUpdate = userData?.id || userId;
      if (!idToUpdate) {
        toast.error("User ID missing!");
        return;
      }

      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/users/update/${idToUpdate}`,
        { ...formData, appId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "User updated successfully!");
        onSave?.(res.data.data);
        onClose?.();
      }
    } catch (err) {
      console.error("UpdateUser Error:", err);
      toast.error(err.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAppStatus) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4 backdrop-blur-sm">
        <div className="bg-zinc-950 p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-zinc-900 flex flex-col items-center">
          <Loader className="h-8 w-8 text-primary animate-spin mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Checking App Status
          </h3>
          <p className="text-sm text-gray-400 text-center">
            Verifying if the app is active before editing user...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 px-4 backdrop-blur-sm flex justify-center py-8 overflow-y-auto">
      <div className="bg-zinc-950 rounded-2xl shadow-2xl w-full max-w-5xl relative border border-zinc-900 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <p className="text-xs text-gray-500">App: {appStatus.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Status Banner */}
          {!appStatus.isActive ? (
            <div className="p-4 rounded-xl bg-red-900/20 border border-red-800/50 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-300">
                  App Inactive
                </h3>
                <p className="text-xs text-red-400 mt-1">
                  This app is currently inactive. Please activate it first.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-green-900/20 border border-green-800/50 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-green-300">
                  App Active
                </h3>
                <p className="text-xs text-green-400 mt-1">
                  You can safely edit user details.
                </p>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                placeholder="Enter full name"
                required
                disabled={!appStatus.isActive}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                placeholder="Enter email"
                required
                disabled={!appStatus.isActive}
              />
            </div>

            {/* Password (optional) */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                New Password (leave blank to keep unchanged)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                placeholder="Enter new password"
                disabled={!appStatus.isActive}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                placeholder="Enter phone"
                disabled={!appStatus.isActive}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                placeholder="Enter address"
                disabled={!appStatus.isActive}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                disabled={!appStatus.isActive}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary"
                placeholder="Enter avatar URL"
                disabled={!appStatus.isActive}
              />
            </div>
          </div>

          {/* Avatar Preview */}
          <div className="flex items-center gap-4 mt-4">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-full border border-zinc-700 object-cover"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-gray-500">
                <User size={28} />
              </div>
            )}
            <p className="text-xs text-gray-400">Avatar Preview</p>
          </div>

          {/* Account Status */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-700 mt-6">
            <div className="flex items-center gap-3">
              {formData.isActive ? (
                <UserCheck className="h-5 w-5 text-green-500" />
              ) : (
                <UserX className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="text-xs font-medium text-gray-300">
                  Account Status
                </p>
                <p className="text-xs text-gray-500">
                  {formData.isActive
                    ? "User can access the system"
                    : "User account is disabled"}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={handleToggle}
                className="sr-only peer"
                disabled={!appStatus.isActive}
              />
              <div
                className={`w-11 h-6 ${
                  !appStatus.isActive ? "bg-gray-800" : "bg-gray-700"
                } rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  !appStatus.isActive
                    ? "peer-checked:bg-gray-600"
                    : "peer-checked:bg-primary"
                }`}
              ></div>
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium flex items-center gap-2 bg-zinc-900 text-gray-300 rounded-md hover:bg-zinc-700 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={!appStatus.isActive || loading}
              className={`px-4 py-2.5 text-xs font-medium text-white rounded-md transition-all flex items-center gap-2 ${
                !appStatus.isActive
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-green-500 hover:from-green-500 hover:to-primary"
              }`}
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
