import React, { useState, useEffect } from "react";
import { X, Globe, Smartphone, Server, Code, Save, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useApp } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";
import CustomDropdown from "../CustomDropdown";
import TextareaField from "../utils/TextareaField";
import SelectField from "../utils/SelectField";
import InputField from "../utils/InputField";

const EditApp = ({ appData, appId, onClose, onSave }) => {
  const { apps, setApps } = useApp();
  const { admin } = useAuth();

  const [formData, setFormData] = useState({
    name: appData?.applicationName || "",
    description: appData?.description || "",
    category: appData?.category || "",
    platform: appData?.platform || "web",
    techStack: Array.isArray(appData?.techStack) ? appData.techStack : [],
    newTech: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Retail",
    "Content",
    "Entertainment",
    "Business",
    "Analytics",
    "Education",
    "Finance",
    "Health",
    "Other",
  ];

  const platforms = [
    { value: "web", label: "Web Application", icon: Globe },
    { value: "mobile", label: "Mobile App", icon: Smartphone },
    { value: "desktop", label: "Desktop App", icon: Server },
    { value: "api", label: "API/Backend", icon: Code },
  ];

  // Keep formData in sync if appData changes
  useEffect(() => {
    setFormData({
      name: appData?.applicationName || "",
      description: appData?.description || "",
      category: appData?.category || "",
      platform: appData?.platform || "web",
      techStack: Array.isArray(appData?.techStack) ? appData.techStack : [],
      newTech: "",
    });
  }, [appData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const idToUpdate = appData?.id || appId;

      if (!idToUpdate) {
        toast.error("App ID is missing!");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User token missing, please login again");
        return;
      }

      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/edit/${idToUpdate}`,
        {
          applicationName: formData.name,
          category: formData.category,
          description: formData.description,
          platform: formData.platform,
          techStack: formData.techStack,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const updated = res?.data?.updatedApp;

      if (res?.data?.success && updated?.id) {
        setApps((prev) =>
          Array.isArray(prev)
            ? prev.map((app) => (app?.id === updated.id ? updated : app))
            : [],
        );

        toast.success(res.data.message || "App updated successfully!");
        onSave?.(updated);
        onClose?.();
      } else {
        toast.error(res?.data?.message || "Failed to update app");
      }
    } catch (err) {
      console.error("Update App Error:", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-zinc-950 rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-6">
          <div className="flex items-center gap-2">
            <Edit size={20} className="text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Edit Application
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-900 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Name + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                label="Application Name"
                name="name"
                required
                placeholder="Enter application name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <SelectField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={categories.map((c) => ({
                  label: c,
                  value: c,
                }))}
                required
              />
            </div>

            {/* Description */}
            <TextareaField
              label="Description"
              name="description"
              required
              rows={3}
              placeholder="Describe your application's purpose and functionality"
              value={formData.description}
              onChange={handleInputChange}
            />

            {/* Platform */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-gray-200">
                Platform *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map(({ value, label, icon: Icon }) => (
                  <div
                    key={value}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, platform: value }))
                    }
                    className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition
                  ${
                    formData.platform === value
                      ? "border-primary bg-primary/10"
                      : "border-zinc-700 hover:border-zinc-500"
                  }
                `}
                  >
                    <Icon size={20} className="text-gray-300 mb-1 sm:mb-2" />
                    <p className="text-xs text-gray-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-6 pb-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApp;
