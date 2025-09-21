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
  Plus,
  AlertCircle,
  CheckCircle,
  Loader,
  AppWindow,
  Phone,
  MapPin,
  Image,
} from "lucide-react";

const AddNewUser = ({ onClose, onSave, appId }) => {
  const [loading, setLoading] = useState(false);
  const [appStatus, setAppStatus] = useState({ isActive: false, name: "" });
  const [checkingAppStatus, setCheckingAppStatus] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatarUrl: "",
    isActive: true,
    role: "user",
  });

  // Check app status when component mounts
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
        console.log(res.data.data);

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
      toast.error("Cannot create user for an inactive app");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/signup`,
        { ...formData, appId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        onSave(res.data.user);
        onClose();
      }
    } catch (err) {
      console.error("CreateUser Error:", err);
      toast.error(err.response?.data?.message || "Failed to create user");
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
            Verifying if the app is active before creating a new user...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 px-4 backdrop-blur-sm flex justify-center py-8 overflow-y-auto">
      <div className="bg-zinc-950 rounded-2xl shadow-2xl w-full max-w-6xl relative border border-zinc-900 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New User</h2>
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

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto  p-6 space-y-6">
          {/* App Status */}
          {!appStatus.isActive ? (
            <div className="p-4 rounded-xl bg-red-900/20 border border-red-800/50 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-medium text-red-300">
                  App Inactive
                </h3>
                <p className="text-xs text-red-400 mt-1">
                  This app is currently inactive. Please activate the app first.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-green-900/20 border border-green-800/50 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-medium text-green-300">
                  App Active
                </h3>
                <p className="text-xs text-green-400 mt-1">
                  This app is active. You can create new users.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form
            name="addUserForm"
            id="addUserForm"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"
          >
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
                focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
                    required
                    disabled={!appStatus.isActive}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
                focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
                    required
                    disabled={!appStatus.isActive}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
                focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
                    required
                    disabled={!appStatus.isActive}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
                focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
                    disabled={!appStatus.isActive}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
                focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
                    disabled={!appStatus.isActive}
                  />
                </div>
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
                  className="w-full pl-3 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
              focus:ring-1 focus:ring-primary focus:border-transparent outline-none appearance-none"
                  disabled={!appStatus.isActive}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 flex flex-col items-center justify-start">
              {/* Avatar URL */}
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Avatar URL
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="url"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    placeholder="Enter avatar image URL"
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 
                focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
                    disabled={!appStatus.isActive}
                  />
                </div>
              </div>

              {/* Avatar Preview */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-700 w-full">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full object-cover border border-zinc-700 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center rounded-full bg-zinc-800 text-gray-500 border border-zinc-700">
                    <User size={32} />
                  </div>
                )}
                <p className="text-xs text-gray-400">Avatar Preview</p>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-700 w-full">
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
                    } 
                peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:rounded-full after:h-5 after:w-5 after:transition-all 
                ${
                  !appStatus.isActive
                    ? "peer-checked:bg-gray-600"
                    : "peer-checked:bg-primary"
                }`}
                  ></div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer (sticky) */}
        <div className="flex justify-end gap-3 px-6 py-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium bg-zinc-900 text-gray-300 rounded-md hover:bg-zinc-700 transition-colors flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="submit"
            form="addUserForm"
            disabled={!appStatus.isActive || loading}
            className={`px-4 py-2.5 text-xs font-medium text-white rounded-md transition-all flex items-center gap-2 shadow-lg 
        ${
          !appStatus.isActive
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-gradient-to-r from-green-600 to-primary hover:from-primary hover:to-green-400 shadow-lg shadow-primary/20"
        }`}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            {loading ? "Creating..." : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
