import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FileJson,
  FileSpreadsheet,
  FileText,
  FileDown,
  Download,
  User,
  Grid,
  BarChart3,
  Search,
  ChevronDown,
  Filter,
  X,
  Smartphone,
  Globe,
  Server,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const AdminReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [downloading, setDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/report`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data.data);

      if (data.success) setReport(data.data);
      else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (format) => {
    setDownloading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/report?format=${format}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: format === "json" ? "json" : "blob",
        }
      );

      if (format === "json") {
        const dataStr = JSON.stringify(response.data, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `admin-report-${
          new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        toast.success("Report downloaded as JSON!");
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `admin-report-${new Date().toISOString().split("T")[0]}.${
          format === "excel" ? "xlsx" : format
        }`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Report downloaded as ${format.toUpperCase()}`);
    } catch (err) {
      console.error("Report error:", err);
      toast.error("Failed to download report");
    } finally {
      setDownloading(false);
    }
  };

  const getPlatformIcon = (platform) => {
    if (platform?.toLowerCase().includes("web"))
      return <Globe size={16} className="text-primary" />;
    if (platform?.toLowerCase().includes("mobile"))
      return <Smartphone size={16} className="text-green-400" />;
    if (platform?.toLowerCase().includes("server"))
      return <Server size={16} className="text-purple-400" />;
    return <Globe size={16} className="text-gray-400" />;
  };

  const filteredApps =
    report?.apps?.filter(
      (app) =>
        app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.platform?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const filteredUsers =
    report?.users?.filter(
      (user) =>
        (statusFilter === "all" ||
          (statusFilter === "active" && user.isActive) ||
          (statusFilter === "inactive" && !user.isActive)) &&
        (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("name");
  };

  if (loading) return <ReportSkeleton />;

  if (!report)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center backdrop-blur-sm max-w-md w-full">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">
            Failed to Load Report
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            Unable to fetch report data. Please check your connection and try
            again.
          </p>
          <button
            onClick={fetchReport}
            className="px-6 py-2 text-sm bg-primary hover:bg-primary/80 rounded text-zinc-100 font-medium transition-colors flex items-center justify-center mx-auto"
          >
            <RefreshCw size={18} className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 rounded-lg text-zinc-100 p-4 sm:p-6">
      <header className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
            Admin Dashboard
          </h1>
          <p className="text-zinc-400 mt-2">
            Comprehensive overview of your platform
          </p>
        </div>

        {/* Download Reports Section */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 max-w-md w-full">
          <div className="flex items-center gap-2 mb-3">
            <Download size={20} className="text-primary" />
            <h3 className="font-medium text-zinc-100">Export Reports</h3>
          </div>
          <p className="text-zinc-400 text-sm mb-3">
            Download your data in different formats
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => downloadReport("json")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-blue-600/20 text-zinc-100 rounded-lg transition-colors text-sm disabled:opacity-50 border border-zinc-700"
            >
              <FileJson size={16} /> JSON
            </button>
            <button
              onClick={() => downloadReport("csv")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-blue-600/20 text-zinc-100 rounded-lg transition-colors text-sm disabled:opacity-50 border border-zinc-700"
            >
              <FileText size={16} /> CSV
            </button>
            <button
              onClick={() => downloadReport("excel")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-blue-600/20 text-zinc-100 rounded-lg transition-colors text-sm disabled:opacity-50 border border-zinc-700"
            >
              <FileSpreadsheet size={16} /> Excel
            </button>
            <button
              onClick={() => downloadReport("pdf")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-blue-600/20 text-zinc-100 rounded-lg transition-colors text-sm disabled:opacity-50 border border-zinc-700"
            >
              <FileDown size={16} /> PDF
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-zinc-800 mb-6 -mx-4 sm:mx-0 px-4 sm:px-0">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "apps", label: "Applications", icon: Grid },
          { id: "users", label: "Users", icon: User },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-3 font-medium capitalize whitespace-nowrap min-w-max ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-5 border border-blue-800/30">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-500/20 mr-4">
                <User className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-zinc-100">
                  {report.users?.length || 0}
                </p>
              </div>
            </div>
            <div className="mt-3 text-xs text-blue-400 flex items-center">
              <BarChart3 size={12} className="mr-1" />
              {Math.round(
                (report.users?.filter((u) => u.isActive).length /
                  (report.users?.length || 1)) *
                  100
              )}
              % active
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-2xl p-5 border border-green-800/30">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500/20 mr-4">
                <Grid className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Total Apps</p>
                <p className="text-2xl font-bold text-zinc-100">
                  {report.apps?.length || 0}
                </p>
              </div>
            </div>
            <div className="mt-3 text-xs text-green-400 flex items-center">
              <BarChart3 size={12} className="mr-1" />
              {report.apps?.filter((a) => a.isActive).length || 0} active
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-5 border border-purple-800/30">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-500/20 mr-4">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Platform Health</p>
                <p className="text-2xl font-bold text-zinc-100">98%</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-purple-400">
              All systems operational
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 rounded-2xl p-5 border border-amber-800/30">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-500/20 mr-4">
                <Calendar className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Report Generated</p>
                <p className="text-sm font-medium text-zinc-100">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-3 text-xs text-amber-400">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Apps Tab */}
      {activeTab === "apps" && (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden mb-8 border border-zinc-800">
          <div className="p-4 sm:p-6 border-b border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Application Overview
                </h2>
                <p className="text-zinc-400 text-sm">
                  {filteredApps.length} of {report.apps?.length} applications
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applications..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100"
                >
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800/50">
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Application
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Platform
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Users
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-zinc-100">
                        {app.name}
                      </div>
                      <div className="text-xs text-zinc-400">ID: {app.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {app.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-zinc-300">
                        {getPlatformIcon(app.platform)}
                        {app.platform}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-zinc-100">
                          {app.usersCount}
                        </span>
                        <div className="w-16 bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                (app.usersCount /
                                  Math.max(
                                    ...report.apps.map((a) => a.usersCount || 0)
                                  )) *
                                  100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          app.isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {app.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No applications found matching your search</p>
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800">
          <div className="p-4 sm:p-6 border-b border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  User Management
                </h2>
                <p className="text-zinc-400 text-sm">
                  {filteredUsers.length} of {report.users?.length} users
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800/50">
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    User
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Contact
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    App Access
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-zinc-100">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-400">ID: {user.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-primary" />
                          <span className="text-zinc-100">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-xs">
                            <Phone size={12} className="text-green-400" />
                            <span className="text-zinc-400">{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-zinc-300">
                        {user.appId ? (
                          <span className="bg-primary/5 text-primary px-2 py-1 rounded text-xs">
                            {user.appId}
                          </span>
                        ) : (
                          <span className="text-zinc-500">No app access</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No users found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Skeleton loading component
const ReportSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-100 p-4 sm:p-6">
      <div className="animate-pulse">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="h-8 bg-zinc-800 rounded w-48 mb-2"></div>
            <div className="h-4 bg-zinc-800 rounded w-64"></div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4 w-full lg:w-80 border border-zinc-700">
            <div className="h-5 bg-zinc-700 rounded w-32 mb-3"></div>
            <div className="h-4 bg-zinc-700 rounded w-48 mb-3"></div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-8 bg-zinc-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-12 bg-zinc-800 rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-zinc-800 rounded-2xl p-5 h-24 border border-zinc-700"
            ></div>
          ))}
        </div>

        <div className="bg-zinc-800 rounded-2xl p-6 h-96 mb-8 border border-zinc-700"></div>
      </div>
    </div>
  );
};

export default AdminReportPage;
