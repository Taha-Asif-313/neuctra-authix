import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  List,
  Plus,
  TrendingUp,
  Users,
  Activity,
  Shield,
  Search,
  Filter,
  X,
  ChevronDown,
  Loader,
  BarChart3,
  Eye,
  EyeOff,
  Smartphone,
  Globe,
  Server,
  Box,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import AddNewApp from "../../components/dashboard/AddNewApp";
import AppCard from "../../components/dashboard/AppCard";
import toast from "react-hot-toast";
import axios from "axios";

const CustomDropdown = ({
  options,
  value,
  onChange,
  icon: Icon,
  placeholder,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || {
    label: placeholder,
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between pl-3 pr-3 py-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 transition-colors"
      >
        <div className="flex items-center">
          {Icon && <Icon size={16} className="text-primary mr-2" />}
          <span className="text-sm">{selectedOption.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 py-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-left text-white hover:bg-zinc-700 transition-colors"
            >
              {value === option.value ? (
                <div className="w-4 h-4 mr-2 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-4 h-4 mr-2 border border-zinc-600 rounded-full"></div>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const { token } = useAuth();
  const { apps, setApps } = useApp();
  const [showNewAppForm, setShowNewAppForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (categoryFilter !== "all") count++;
    setActiveFiltersCount(count);
  }, [searchQuery, categoryFilter]);

  // 🔹 Fetch apps on mount
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/apps/allapps`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setApps(res.data.data);

          // Extract unique categories
          const uniqueCategories = [
            ...new Set(res.data.data.map((app) => app.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          toast.error(res.data.message || "Failed to fetch apps");
        }
      } catch (err) {
        console.error("Fetch Apps Error:", err);
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchApps();
  }, [token]);

  // Filter apps based on search and category
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      searchQuery === "" ||
      app.applicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.description &&
        app.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || app.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const activeApps = apps.filter((app) => app.isActive).length;
  const totalUsers = apps.reduce((acc, app) => acc + (app.users || 0), 0);

  // 🔹 Handle deletion (remove from state instantly)
  const handleAppDeleted = (deletedId) => {
    setApps((prev) => prev.filter((a) => a.id !== deletedId));
  };

  const handleActiveToggle = (updatedApp) => {
    setApps((prev) =>
      prev.map((a) => (a.id === updatedApp.id ? updatedApp : a))
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      Retail: "bg-pink-500/20 text-pink-400",
      Content: "bg-blue-500/20 text-blue-400",
      Entertainment: "bg-purple-500/20 text-purple-400",
      Business: "bg-amber-500/20 text-amber-400",
      Analytics: "bg-green-500/20 text-green-400",
      Education: "bg-indigo-500/20 text-indigo-400",
      Web: "bg-cyan-500/20 text-cyan-400",
      Mobile: "bg-orange-500/20 text-orange-400",
    };
    return colors[category] || "bg-primary/20 text-primary";
  };

  const getPlatformIcon = (platform) => {
    if (platform?.toLowerCase().includes("web")) return <Globe size={16} />;
    if (platform?.toLowerCase().includes("mobile"))
      return <Smartphone size={16} />;
    if (platform?.toLowerCase().includes("server")) return <Server size={16} />;
    return <Globe size={16} />;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  // Prepare dropdown options
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader className="animate-spin text-primary mb-4" size={32} />
        <p className="text-gray-400">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showNewAppForm && (
        <AddNewApp
          onClose={() => setShowNewAppForm(false)}
          onSave={(newApp) => {
            setApps((prev) => [...prev, newApp]);
            setShowNewAppForm(false);
            toast.success("Application created successfully!");
          }}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <p className="text-gray-200 text-sm">
            Monitor and manage all your applications
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-zinc-900 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition ${
                viewMode === "list"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>

          {/* Add New App Button */}
          <button
            onClick={() => setShowNewAppForm(true)}
            className="flex items-center text-sm gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg transition shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            <span className="inline">New App</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-900/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Apps</p>
              <p className="text-2xl font-bold text-white mt-1">
                {apps.length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <LayoutGrid size={20} className="text-blue-400" />
            </div>
          </div>
          <p className="text-green-400 text-sm mt-3 flex items-center">
            <TrendingUp size={14} className="mr-1" />+
            {Math.floor(apps.length * 0.12)} from last month
          </p>
        </div>

        <div className="bg-green-900/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-white mt-1">
                {totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Users size={20} className="text-green-400" />
            </div>
          </div>
          <p className="text-green-400 text-sm mt-3 flex items-center">
            <TrendingUp size={14} className="mr-1" />+
            {Math.floor(totalUsers * 0.082)} from last month
          </p>
        </div>

        <div className="bg-amber-900/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Apps</p>
              <p className="text-2xl font-bold text-white mt-1">{activeApps}</p>
            </div>
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Activity size={20} className="text-amber-400" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3 flex items-center">
            {apps.length - activeApps > 0 ? (
              <>
                <EyeOff size={14} className="mr-1 text-amber-400" />
                {apps.length - activeApps} inactive
              </>
            ) : (
              <>
                <Eye size={14} className="mr-1 text-green-400" />
                All active
              </>
            )}
          </p>
        </div>

        <div className="bg-purple-900/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Security Score</p>
              <p className="text-2xl font-bold text-white mt-1">98%</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Shield size={20} className="text-purple-400" />
            </div>
          </div>
          <p className="text-green-400 text-sm mt-3 flex items-center">
            <BarChart3 size={14} className="mr-1" />
            All systems secure
          </p>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">Your Applications</h2>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            <X size={14} className="mr-1" />
            Clear filters
          </button>
        )}
      </div>

      {/* Apps Grid/List View */}
      {filteredApps.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-zinc-900/30 rounded-2xl border-2 border-dashed border-zinc-700/50 p-8 text-center">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            <Box size={40} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No applications found
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md">
            {searchQuery || categoryFilter !== "all"
              ? "No applications match your current filters. Try adjusting your search criteria."
              : "You haven't created any applications yet. Get started by adding your first app."}
          </p>
          {searchQuery || categoryFilter !== "all" ? (
            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors"
            >
              <X size={16} className="mr-1.5" />
              Clear all filters
            </button>
          ) : (
            <button
              onClick={() => setShowNewAppForm(true)}
              className="flex items-center text-sm px-5 py-2.5 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} className="mr-1.5" />
              Create Your First App
            </button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              : "space-y-4"
          }
        >
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              viewMode={viewMode}
              getCategoryColor={getCategoryColor}
              getPlatformIcon={getPlatformIcon}
              onActiveToggle={handleActiveToggle}
              onDelete={handleAppDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
