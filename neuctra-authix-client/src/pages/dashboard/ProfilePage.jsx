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
  Camera,
  Upload,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
  Link,
  Image,
  Loader,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteAdminModal from "../../components/dashboard/DeleteAdminModal";

// Avatar Update Modal Component
const AvatarUpdateModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar || "");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || "");

  useEffect(() => {
    setAvatarUrl(currentAvatar || "");
    setPreviewUrl(currentAvatar || "");
  }, [currentAvatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatarUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    setLoading(true);
    try {
      // Validate URL format
      try {
        new URL(avatarUrl);
      } catch {
        toast.error("Please enter a valid URL");
        setLoading(false);
        return;
      }

      // Test if the image loads successfully
      await new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = () => reject(new Error("Image failed to load"));
        img.src = avatarUrl;
      });

      onSave(avatarUrl);
      toast.success("Avatar updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Invalid image URL or image failed to load");
      console.error("Image validation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setAvatarUrl(url);

    // Basic URL validation for preview
    try {
      new URL(url);
      setPreviewUrl(url);
    } catch {
      setPreviewUrl("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-700 max-w-md w-full">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl max-sm:text-lg font-semibold text-white flex items-center gap-2">
              <Camera size={20} />
              Update Profile Picture
            </h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-zinc-400 text-sm max-sm:hidden">
            Enter a URL for your new profile picture
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Preview */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-zinc-700 overflow-hidden mb-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <Image size={32} className="text-zinc-600" />
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-400 text-center">
                {previewUrl
                  ? "Preview"
                  : "Enter a valid image URL to see preview"}
              </p>
            </div>

            {/* URL Input */}
            <div>
              <label className="text-sm font-medium text-zinc-300 mb-2 block">
                Image URL
              </label>
              <div className="relative">
                <Link
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                  size={16}
                />
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full text-xs pl-8 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Tips */}
            <div>
              <p className="text-xs text-zinc-400">
                <strong>Tips:</strong> Use services like Imgur, Cloudinary, or
                upload to a CDN. Make sure the URL points directly to an image
                file (.jpg, .png, etc.).
              </p>
            </div>
          </div>

          <div className="flex max-sm:flex-col-reverse gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !avatarUrl.trim()}
              className="flex-1 text-sm px-4 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Update Avatar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Change Password Modal ---
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Password updated successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        onClose();
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error("Change password error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-700 max-w-md w-full">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Lock size={20} /> Change Password
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Current Password */}
          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            show={showPasswords.current}
            toggleShow={() =>
              setShowPasswords((p) => ({ ...p, current: !p.current }))
            }
          />

          {/* New Password */}
          <PasswordField
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            show={showPasswords.new}
            toggleShow={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            show={showPasswords.confirm}
            toggleShow={() =>
              setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
            }
          />

          <div className="flex max-sm:flex-col-reverse gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 text-sm px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium flex items-center justify-center"
            >
              {loading ? (
                <Loader size={16} className="animate-spin mr-2" />
              ) : null}
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Reusable password input field ---
const PasswordField = ({
  label,
  name,
  value,
  onChange,
  error,
  show,
  toggleShow,
}) => (
  <div>
    <label className="text-sm font-medium text-zinc-300 mb-1 block">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-3 pr-10 py-2.5 rounded-lg bg-zinc-800 border ${
          error ? "border-red-500" : "border-zinc-700"
        } text-white focus:ring-2 focus:ring-primary outline-none`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const ProfilePage = () => {
  const { admin, token, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  console.log(formData);

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-api-key": admin?.apiKey,
            },
          }
        );

        if (data.success) {
          setFormData(data.data);
        } else toast.error(data.message);
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
    setSaving(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/edit/${admin.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
        // Refresh the profile data
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "x-api-key": admin?.apiKey,
            },
          }
        );
        if (profileResponse.data.success) updateProfile(data.data);
        setFormData(profileResponse.data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpdate = async (newAvatarUrl) => {
    try {
      const updateData = { ...formData, avatarUrl: newAvatarUrl };
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/edit/${admin.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setFormData(updateData);
        updateProfile(updateData);
        toast.success("Avatar updated successfully!");
      }
    } catch (error) {
      console.error("Avatar update error:", error);
      toast.error("Failed to update avatar");
    }
  };

  const handleRegenerateApiKey = async () => {
    if (
      !window.confirm(
        "Are you sure you want to regenerate your API key? This will invalidate the current key."
      )
    )
      return;

    setRegeneratingKey(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/regenerate-api-key`,
        { adminId: admin.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("API key regenerated successfully");
        setFormData((prev) => ({ ...prev, apiKey: data.data.apiKey }));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("API key regeneration error:", err);
      toast.error("Failed to regenerate API key");
    } finally {
      setRegeneratingKey(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reload original data
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/admin/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-api-key": admin?.apiKey,
        },
      })
      .then(({ data }) => {
        if (data.success) setFormData(data.data);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <XCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Profile Not Found
        </h2>
        <p className="text-gray-400 text-sm text-center mb-4">
          Unable to load your profile information. Please try refreshing the
          page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary hover:bg-primary/90 rounded text-sm flex items-center cursor-pointer text-white"
        >
          <RefreshCw size={18} className="mr-2" />
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 pt-4">
      {/* Avatar Update Modal */}
      <AvatarUpdateModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        currentAvatar={formData.avatarUrl}
        onSave={handleAvatarUpdate}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteAdminModal
          adminUser={admin}
          appId={admin.appId}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => logout()}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start  gap-3 md:gap-6 w-full justify-between">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={
              formData.avatarUrl ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary object-cover shadow-lg"
          />
          {editMode && (
            <button
              onClick={() => setShowAvatarModal(true)}
              className="absolute bottom-0 right-1 bg-primary/90 p-2 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105"
            >
              <Camera size={16} className="text-white" />
            </button>
          )}
        </div>

        {/* Name + Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 truncate">
            {formData.name}
          </h1>
          <p className="text-gray-400 mb-3">Administrator</p>

          <div className="flex flex-wrap gap-3">
            {/* Email Verification Status */}
            <div className="flex flex-wrap gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  formData.isVerified
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {formData.isVerified ? (
                  <>
                    <ShieldCheck size={14} className="mr-1" />
                    Verified
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="mr-1" />
                    Not Verified
                  </>
                )}
              </span>

              {!formData.isVerified && (
                <button
                  onClick={() => navigate("/verify-email")}
                  className="px-3 py-1 bg-primary hover:bg-primary/90 text-white rounded-md text-sm"
                >
                  Verify Email
                </button>
              )}
            </div>

            <span className="inline-flex items-center px-3 py-1 bg-blue-500/5 text-blue-500 rounded-full text-sm">
              <Calendar size={14} className="mr-1" />
              Joined {new Date(formData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-row flex-wrap gap-3 text-sm">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-medium transition-colors"
          >
            <Key size={14} />
            Change Password
          </button>
          {editMode ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
              >
                {saving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-medium transition-colors"
              >
                <Edit size={14} />
                Edit
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-600/30 text-red-500 hover:text-red-300 rounded-lg font-medium transition-colors"
              >
                <Trash2 size={14} />
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-900/5 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 mb-3 text-sm">Total Apps</p>
              <p className="text-2xl font-bold text-white">
                {formData?._count?.apps ?? 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Box size={20} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-green-800/5 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 mb-3 text-sm">Managed Users</p>
              <p className="text-2xl font-bold text-white">
                {formData?._count?.users ?? 0}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="backdrop-blur-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <ProfileField
            icon={<Hash size={16} />}
            label="Admin ID"
            value={formData.id}
            isCopyable
          />

          <ProfileField
            icon={<User size={16} />}
            label="Full Name"
            name="name"
            value={formData.name}
            editable={editMode}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <ProfileField
            icon={<Mail size={16} />}
            label="Email Address"
            name="email"
            value={formData.email}
            editable={editMode}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email address"
          />

          <ProfileField
            icon={<Phone size={16} />}
            label="Phone Number"
            name="phone"
            value={formData.phone}
            editable={editMode}
            onChange={handleChange}
            type="tel"
            placeholder="Enter your phone number"
          />

          <ProfileField
            icon={<MapPin size={16} />}
            label="Address"
            name="address"
            value={formData.address}
            editable={editMode}
            onChange={handleChange}
            placeholder="Enter your address"
            fullWidth
          />

          <ProfileField
            icon={<Key size={16} />}
            label="API Key"
            value={formData.apiKey}
            isCopyable
            isSecret={!showApiKey}
            onToggleSecret={() => setShowApiKey(!showApiKey)}
          />
        </div>
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
  type = "text",
  placeholder,
  isCopyable,
  isSecret = false,
  onToggleSecret,
  onRegenerate,
  regenerating = false,
  fullWidth = false,
}) => {
  // ✅ Universal copy handler (with fallback)
  const handleCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast.success(`${label} copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "md:col-span-2" : ""}`}>
      {/* Label */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
        {icon}
        <span>{label}</span>
      </div>

      {/* Field container */}
      <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5">
        {editable && name ? (
          // Editable input
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500 px-1"
          />
        ) : isSecret ? (
          // Secret preview
          <span className="flex-1 text-white font-mono text-sm select-none">
            ••••••••••
          </span>
        ) : (
          // Normal preview
          <span className="flex-1 text-white text-sm truncate" title={value}>
            {value || "—"}
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 ml-2">
          {/* Copy */}
          {isCopyable && value && !editable && (
            <button
              onClick={handleCopy}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
              title="Copy to clipboard"
            >
              <Copy size={14} />
            </button>
          )}

          {/* Toggle Secret */}
          {isSecret && (
            <button
              onClick={onToggleSecret}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
              title={isSecret ? "Show value" : "Hide value"}
            >
              {isSecret ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          )}

          {/* Regenerate */}
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={regenerating}
              className="p-1 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-zinc-800 transition-colors"
              title="Regenerate"
            >
              <RefreshCw
                size={14}
                className={regenerating ? "animate-spin" : ""}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
