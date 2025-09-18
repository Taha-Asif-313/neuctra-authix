import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AppCard from "../../components/dashboard/AppCard";
import { useApp } from "../../contexts/AppContext";

const ApplicationsPage = () => {
  const { token, admin } = useAuth();
  const {apps, setApps} = useApp();
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  // 🔹 Filter apps by search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredApps(apps);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = apps.filter(
        (app) =>
          app.applicationName.toLowerCase().includes(lowerQuery) ||
          app.category.toLowerCase().includes(lowerQuery)
      );
      setFilteredApps(filtered);
    }
  }, [searchQuery, apps]);

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
    return colors[category] || "bg-gray-500/20 text-gray-400";
  };
console.log(apps);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading apps...</p>;

  if (!apps.length)
    return <p className="text-center text-sm mt-10">No apps found.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">Applications</h2>
        {/* Search Field */}
        <div className="mb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or category..."
            className="w-full text-sm px-4 py-2 rounded bg-zinc-900 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* App Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => (
         <AppCard
              key={app.id}
              app={app}
              getCategoryColor={getCategoryColor}
              onActiveToggle={handleActiveToggle}
              onDelete={handleAppDeleted}
            />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
