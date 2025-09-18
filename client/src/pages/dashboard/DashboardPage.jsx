import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  List,
  Plus,
  TrendingUp,
  Users,
  Activity,
  Shield,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useApp } from "../../contexts/AppContext";
import AddNewApp from "../../components/dashboard/AddNewApp";
import AppCard from "../../components/dashboard/AppCard";
import toast from "react-hot-toast";
import axios from "axios";

const DashboardPage = () => {
  const { token } = useAuth();
  const { apps, setApps } = useApp();
  const [showNewAppForm, setShowNewAppForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

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
    };
    return colors[category] || "bg-primary/10 text-primary";
  };

  return (
    <div className="space-y-6">
      {showNewAppForm && (
        <AddNewApp
          onClose={() => setShowNewAppForm(false)}
          onSave={(newApp) => {
            setApps((prev) => [...prev, newApp]);
            setShowNewAppForm(false);
          }}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-md:hidden">
          <h1 className="text-2xl font-bold text-white">Your Applications</h1>
          <p className="text-gray-400 mt-1">
            Manage and monitor all your connected apps
          </p>
        </div>

        <div className="flex justify-between items-center gap-3">
          {/* View Toggle */}
          <div className="flex max-md:justify-between bg-zinc-950 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List size={18} />
            </button>
          </div>

          {/* Add New App Button */}
          <button
            onClick={() => setShowNewAppForm(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            <span>New App</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary/5 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Apps</p>
              <p className="text-2xl font-bold text-white mt-1">
                {apps.length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <LayoutGrid size={20} className="text-blue-400" />
            </div>
          </div>
          <p className="text-green-400 text-sm mt-3 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            +12% from last month
          </p>
        </div>

        <div className="bg-primary/5 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-white mt-1">
                {apps.reduce((acc, app) => acc + app.users, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Users size={20} className="text-green-400" />
            </div>
          </div>
          <p className="text-green-400 text-sm mt-3 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            +8.2% from last month
          </p>
        </div>

        <div className="bg-primary/5 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Apps</p>
              <p className="text-2xl font-bold text-white mt-1">
                {apps.filter((app) => app.isActive).length}
              </p>
            </div>
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Activity size={20} className="text-amber-400" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3">4 inactive</p>
        </div>

        <div className="bg-primary/5 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Security Score</p>
              <p className="text-2xl font-bold text-white mt-1">98%</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Shield size={20} className="text-purple-400" />
            </div>
          </div>
          <p className="text-green-400 text-sm mt-3">All systems secure</p>
        </div>
      </div>

      {/* Apps Grid/List View */}
      <div
        className={`grid gap-5 ${
          viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {apps.length > 0 ? (
          apps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              getCategoryColor={getCategoryColor}
              onActiveToggle={handleActiveToggle}
              onDelete={handleAppDeleted}
            />
          ))
        ) : (
          <p className="w-full col-span-full text-center pt-20 text-sm">
            No apps found. Create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
