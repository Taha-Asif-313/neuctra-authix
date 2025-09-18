import React, { useState } from "react";
import {
  X,
  Globe,
  Smartphone,
  Server,
  Code,
  Save,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import CustomDropdown from "../CustomDropdown";

const AddNewApp = ({ onClose, onSave }) => {
  const { admin } = useAuth();
  console.log(admin);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    platform: "web",
    techStack: [],
    newTech: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTech = () => {
    if (
      formData.newTech.trim() &&
      !formData.techStack.includes(formData.newTech.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, prev.newTech.trim()],
        newTech: "",
      }));
    }
  };

  const removeTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
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
        }
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
      <div className="bg-black rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-6 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-900 transition"
            >
              <X size={20} className="" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Create New Application
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
          )}

          {/* Step 2: Technology Stack */}
          {currentStep === 2 && (
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-medium text-white">
                Technology Stack
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={formData.newTech}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newTech: e.target.value,
                    }))
                  }
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTech())
                  }
                  className="flex-1 px-3 sm:px-4 py-2 bg-zinc-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Add a technology (e.g., React, Node.js)"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-900 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

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
