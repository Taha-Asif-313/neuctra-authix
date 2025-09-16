import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Key,
  Calendar,
  Trash2,
  Save,
  Copy,
  Edit,
  ShieldCheck,
  Hash,
  Box,
  Users,
} from "lucide-react";

const ProfilePage = () => {
  const { admin, token, logout } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-api-key": admin.apiKey,
            },
          }
        );

        if (data.success) setFormData(data.data);
        else toast.error(data.message);
      } catch (err) {
        console.error("Profile fetch error:", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (admin?.id) fetchProfile();
  }, [admin]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/edit/${admin.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
      } else toast.error(data.message);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/${admin.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Account deleted");
        logout();
      } else toast.error(data.message);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed");
    }
  };

  console.log(formData);

  if (loading)
    return <p className="text-center text-gray-400">Loading profile...</p>;
  if (!formData)
    return <p className="text-center text-red-400">Profile not found</p>;

  return (
    <div className="px-5 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={formData.avatarUrl || "https://via.placeholder.com/80"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border border-zinc-700 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
          <p className="text-gray-400">Administrator</p>
        </div>
      </div>

      {/* Fields Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProfileField
          icon={<Hash size={16} />}
          label="ID"
          value={formData.id}
          isCopyable
        />

        <ProfileField
          icon={<User size={16} />}
          label="Name"
          name="name"
          value={formData.name}
          editable={editMode}
          onChange={handleChange}
        />

        <ProfileField
          icon={<Mail size={16} />}
          label="Email"
          name="email"
          value={formData.email}
          editable={editMode}
          onChange={handleChange}
        />

        <ProfileField
          icon={<Phone size={16} />}
          label="Phone"
          name="phone"
          value={formData.phone}
          editable={editMode}
          onChange={handleChange}
        />

        <ProfileField
          icon={<MapPin size={16} />}
          label="Address"
          name="address"
          value={formData.address}
          editable={editMode}
          onChange={handleChange}
        />

        <ProfileField
          icon={<User size={16} />}
          label="Avatar URL"
          name="avatarUrl"
          value={formData.avatarUrl}
          editable={editMode}
          onChange={handleChange}
        />

        <ProfileField
          icon={<Key size={16} />}
          label="API Key"
          value={formData.apiKey}
          isCopyable
        />

        <ProfileField
          icon={<ShieldCheck size={16} />}
          label="Status"
          value={formData.isActive ? "Active" : "Inactive"}
        />

        <ProfileField
          icon={<Calendar size={16} />}
          label="Joined"
          value={new Date(formData.createdAt).toLocaleDateString()}
        />
      </div>

      {/* Apps Section */}
      <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Box size={18} /> Apps
        </h3>
        <p className="text-gray-300 text-sm">
          {formData?._count?.apps ?? 0} apps
        </p>
      </div>

      {/* Users Section */}
      <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Users size={18} /> Users
        </h3>
        <p className="text-gray-300 text-sm">
          {formData?._count?.users ?? 0} users
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-6 border-t border-zinc-800">
        {editMode ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-sm bg-primary/15 text-primary rounded-lg hover:bg-primary hover:text-white cursor-pointer"
          >
            <Save size={16} /> Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-5 py-2 bg-zinc-800 flex items-center gap-2 text-sm text-white rounded-lg hover:bg-primary cursor-pointer"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        )}

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-5 py-2 text-sm bg-red-700/15 text-red-600 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

const ProfileField = ({
  icon,
  label,
  value,
  editable,
  name,
  onChange,
  isCopyable,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400 mt-1 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm mb-1 text-gray-500 flex items-center gap-2">
          {label}
          {isCopyable && value && (
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-white"
            >
              <Copy size={14} />
            </button>
          )}
        </p>
        {editable && name ? (
          <input
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-primary"
          />
        ) : (
          <p className="text-white text-xs truncate w-full max-w-full">
            {value || "—"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
