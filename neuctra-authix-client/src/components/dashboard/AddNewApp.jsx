import React, { useState } from "react";
import {
  X,
  Globe,
  Smartphone,
  Server,
  Code,
  Save,
  ArrowLeft,
  Plus,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import CustomDropdown from "../CustomDropdown";
import InputField from "../utils/InputField";
import SelectField from "../utils/SelectField";
import TextareaField from "../utils/TextareaField";

const AddNewApp = ({ onClose, onSave }) => {
  const { admin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    platform: "web",
  });

  const categories = [
    { label: "Retail", value: "retail" },
    { label: "Content", value: "content" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Business", value: "business" },
    { label: "Analytics", value: "analytics" },
    { label: "Education", value: "education" },
    { label: "Finance", value: "finance" },
    { label: "Health", value: "health" },
    { label: "Other", value: "other" },
  ];

  const platforms = [
    { value: "web", label: "Web Application", icon: Globe },
    { value: "mobile", label: "Mobile App", icon: Smartphone },
    { value: "desktop", label: "Desktop App", icon: Server },
    { value: "api", label: "API/Backend", icon: Code },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/apps/create`,
        {
          applicationName: formData.name,
          category: formData.category,
          description: formData.description,
          platform: formData.platform,
          techStack: formData.techStack, // optional
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "x-api-key": admin.apiKey,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || "App created successfully!");
        onSave(res.data.data); // refresh local state
        onClose();
      } else {
        toast.error(res.data.message || "Failed to create app");
      }
    } catch (err) {
      console.error("Create App Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-zinc-950 rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-6 sm:px-6">
          {/* Title with Icon */}
          <div className="flex items-center gap-3">
            <Plus size={20} className="text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Create New Application
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-900 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Application Name */}
              <InputField
                className="bg-"
                label="Application Name"
                name="name"
                required
                placeholder="Enter application name"
                value={formData.name}
                onChange={handleInputChange}
                error={!formData.name}
              />

              {/* Category */}
              <SelectField
                label="Category"
                name="category"
                options={categories}
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Select category"
                error={!formData.category}
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
              error={!formData.description}
            />

            {/* Platform */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-gray-200">
                Platform <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platforms.map(({ value, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, platform: value }))
                    }
                    className={`p-3 sm:p-4 border rounded-lg text-left transition
                ${
                  formData.platform === value
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/20"
                }
              `}
                  >
                    <Icon size={20} className="text-gray-300 mb-1 sm:mb-2" />
                    <p className="text-xs text-gray-300">{label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-6 pb-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer sm:w-auto px-4 py-2.5 text-sm text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer sm:w-auto px-7 py-3 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Creating..."
              ) : (
                <>
                  <Save size={16} />
                  Create Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewApp;
