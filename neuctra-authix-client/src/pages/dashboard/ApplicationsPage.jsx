import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AppCard from "../../components/dashboard/AppCard";
import { useApp } from "../../contexts/AppContext";
import {
  Box,
  Search,
  Filter,
  Grid,
  List,
  Loader,
  Plus,
  X,
  ChevronDown,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import AddNewApp from "../../components/dashboard/AddNewApp";

const CustomDropdown = ({
  options,
  value,
  onChange,
  icon: Icon,
  placeholder,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        className="w-full flex items-center justify-between pl-3 pr-3 py-2.5 rounded-lg bg-zinc-900 text-white border border-zinc-800 text-sm hover:border-zinc-600 transition-colors"
      >
        <div className="flex items-center">
          {Icon && <Icon size={16} className="text-primary mr-2" />}
          <span className="text-sm">{selectedOption.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 py-2 bg-zinc-900 text-sm border border-zinc-800 rounded-lg shadow-lg">
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
                <Check size={16} className="text-primary mr-2" />
              ) : (
                <div className="w-4 h-4 mr-2"></div>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationsPage = () => {
  const { token, admin } = useAuth();
  const { apps, setApps } = useApp();
  const [showNewAppForm, setShowNewAppForm] = useState(false);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (categoryFilter !== "all") count++;
    if (sortBy !== "name") count++;
    setActiveFiltersCount(count);
  }, [searchQuery, categoryFilter, sortBy]);

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
          setFilteredApps(res.data.data);

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

  // 🔹 Filter and sort apps
  useEffect(() => {
    let filtered = [...apps];

    // Apply search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicationName.toLowerCase().includes(lowerQuery) ||
          (app.description &&
            app.description.toLowerCase().includes(lowerQuery)) ||
          app.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((app) => app.category === categoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.applicationName.localeCompare(b.applicationName);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        default:
          return 0;
      }
    });

    setFilteredApps(filtered);
  }, [searchQuery, categoryFilter, apps, sortBy]);

  // 🔹 Handle deletion
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
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSortBy("name");
  };

  // Prepare dropdown options
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const sortOptions = [
    { value: "name", label: "Sort by Name" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader className="animate-spin text-primary mb-3" size={32} />
        <p className="text-gray-400">Loading applications...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="p-3 bg-primary/10 rounded-lg mr-3">
            <Box className="text-primary" size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Applications</h2>
            <p className="text-sm text-gray-400">
              Manage your connected applications
            </p>
          </div>
          {apps.length > 0 && (
            <span className="hidden md:inline-block ml-4 px-2.5 py-1 bg-zinc-800 rounded-full text-xs text-gray-300">
              {filteredApps.length} of {apps.length}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Create New App Button */}
          {admin && (
            <button
              onClick={() => setShowNewAppForm(true)}
              className="flex items-center px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
            >
              <Plus size={18} className="mr-1.5" />
              <span className="inline">New App</span>
            </button>
          )}

          {/* View Toggle */}
          <div className="flex bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
                }`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
                }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Results Count */}
      {apps.length > 0 && (
        <div className="md:hidden flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">
            Showing {filteredApps.length} of {apps.length} applications
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Filters Section */}
      <div className=" rounded-xl  mb-6 ">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-zinc-900 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle for Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center text-sm justify-center px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-300"
          >
            <SlidersHorizontal size={14} className="mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 w-5 h-5 text-white flex items-center justify-center bg-primary text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        <div
          className={`${showFilters ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-4 mt-4 md:mt-3`}
        >
          {/* Category Filter */}
          <CustomDropdown
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
            icon={Filter}
            placeholder="All Categories"
            className="md:w-48"
          />

          {/* Sort Filter */}
          <CustomDropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="md:w-48"
          />

          {/* Clear Filters Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <X size={16} className="mr-1.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!apps.length ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-zinc-900/30 rounded-xl border-2 border-dashed border-zinc-700/50 p-6">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            <Box className="text-primary" size={40} />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No applications yet
          </h3>
          <p className="text-gray-400 text-sm text-center mb-6 max-w-md">
            Get started by adding your first application to the dashboard.
          </p>
          {admin && (
            <button
              onClick={() => setShowNewAppForm(true)}
              className="flex items-center px-5 py-2.5 text-sm bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20"
            >
              <Plus size={18} className="mr-1.5" />
              Create Your First App
            </button>
          )}
        </div>
      ) : !filteredApps.length ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-zinc-900/30 rounded-xl p-6">
          <div className="p-4 bg-zinc-800 rounded-full mb-4">
            <Search className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-400 text-sm text-center mb-6">
            No applications match your current filters.
          </p>
          <button
            onClick={clearFilters}
            className="flex items-center px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <X size={16} className="mr-1.5" />
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                : "space-y-4"
            }
          >
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                viewMode={viewMode}
                getCategoryColor={getCategoryColor}
                onActiveToggle={handleActiveToggle}
                onDelete={handleAppDeleted}
              />
            ))}
          </div>


        </>
      )}

      {/* Add New App Modal */}
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
    </div>
  );
};

export default ApplicationsPage;
