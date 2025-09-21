import React, { useState, useEffect } from "react";
import { X, Globe, Smartphone, Server, Code, Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useApp } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";
import CustomDropdown from "../CustomDropdown";

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
        }
      );

      const updated = res?.data?.updatedApp;

      
      if (res?.data?.success && updated?.id) {
        setApps((prev) =>
          Array.isArray(prev)
            ? prev.map((app) => (app?.id === updated.id ? updated : app))
            : []
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
      <div className="bg-black rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-900 transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Edit Application
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Application Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Enter application name"
                />
              </div>

              <div>
                <CustomDropdown
                    label="Category"
                    options={categories}
                    value={formData.category}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, category: val }))
                    }
                    required
                  />  
              
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full text-sm px-3 sm:px-4 py-2 sm:py-3 bg-zinc-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Describe your application's purpose and functionality"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Platform *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map(({ value, label, icon: Icon }) => (
                  <div
                    key={value}
                    className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition ${
                      formData.platform === value
                        ? "border-primary bg-primary/10"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, platform: value }))
                    }
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
              className="w-full sm:w-auto px-4 py-2 text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
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
