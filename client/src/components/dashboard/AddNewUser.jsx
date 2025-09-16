import React, { useState } from "react";
import axios from "axios";
import { X, User, Mail, Lock, UserCheck, UserX, Plus } from "lucide-react";

const AddNewUser = ({ onClose, onSave, appId }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/create`,
        { ...formData, appId }, // pass appId too
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        onSave(res.data.data); // send new user back to parent
        onClose();
      }
    } catch (err) {
      console.error("CreateUser Error:", err);
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4 backdrop-blur-sm">
      <div className="bg-zinc-950 p-6 rounded-2xl shadow-2xl w-full max-w-md relative border border-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New User</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Name Field */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full pl-9 pr-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-700">
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
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium bg-zinc-900 text-gray-300 rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-medium bg-gradient-to-r from-green-600 to-primary text-white rounded-lg hover:from-primary hover:to-green-400 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Plus size={16} />
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
