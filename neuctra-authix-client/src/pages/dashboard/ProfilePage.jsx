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
import DeleteAdminModal from "../../components/dashboard/ProfilePage/DeleteAdminModal";
import ProfileField from "../../components/dashboard/ProfilePage/ProfileField";
import AvatarUpdateModal from "../../components/dashboard/ProfilePage/AvatarUpdateModal";
import ChangePasswordModal from "../../components/dashboard/ProfilePage/ChangePasswordModal";
import CustomLoader from "../../components/utils/CustomLoader";

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
              Authorization: `Bearer ${token}`,
              "x-api-key": admin?.apiKey,
            },
          },
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
  }, [admin, token]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/edit/${admin.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
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
          },
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
        { headers: { Authorization: `Bearer ${token}` } },
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
    return <CustomLoader />;
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
              `https://api.dicebear.com/9.x/initials/svg?seed=${admin.name}`
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
        <div className="bg-zinc-900/60 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-3 text-sm">Total Apps</p>
              <p className="text-2xl font-bold text-white">
                {formData?._count?.apps ?? 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Box size={20} className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-3 text-sm">Managed Users</p>
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

export default ProfilePage;
