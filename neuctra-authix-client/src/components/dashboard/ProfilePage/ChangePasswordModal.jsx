import axios from "axios";
import { Loader, Lock, X } from "lucide-react";
import toast from "react-hot-toast";
import PasswordField from "../../utils/PasswordField";
import { useState } from "react";

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
        },
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

export default ChangePasswordModal;
