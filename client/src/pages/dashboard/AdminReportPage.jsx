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
} from "lucide-react";

const AdminReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
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

    fetchReport();
  }, []);

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
        console.log(response.data);
        toast.success("Report fetched (check console)");
        return;
      }

      // Create a file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `admin-report.${format === "excel" ? "xlsx" : format}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Report downloaded as ${format}`);
    } catch (err) {
      console.error("Report error:", err);
      toast.error("Failed to download report");
    } finally {
      setDownloading(false);
    }
  };

  // Loading state
  if (loading) return <ReportSkeleton />;

  // Error state
  if (!report)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center p-8 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">
            Failed to Load Report
          </h2>
          <p className="text-zinc-400 mb-6">
            Unable to fetch report data. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-zinc-100 font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Admin Dashboard</h1>
          <p className="text-zinc-400 mt-2">
            Comprehensive overview of your platform
          </p>
        </div>

        {/* Download Reports Section */}
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Download size={20} className="text-primary" />
            <h3 className="font-medium text-zinc-100">Export Reports</h3>
          </div>
          <p className="text-zinc-400 text-sm mb-3">
            Download your data in different formats
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => downloadReport("json")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
            >
              <FileJson size={16} /> JSON
            </button>
            <button
              onClick={() => downloadReport("csv")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
            >
              <FileText size={16} /> CSV
            </button>
            <button
              onClick={() => downloadReport("excel")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
            >
              <FileSpreadsheet size={16} /> Excel
            </button>
            <button
              onClick={() => downloadReport("pdf")}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
            >
              <FileDown size={16} /> PDF
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-800 mb-6">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "apps", label: "Applications", icon: Grid },
          { id: "users", label: "Users", icon: User },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 font-medium capitalize ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-xl p-5 shadow-lg border border-zinc-800">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/20 mr-4">
                <User className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-zinc-100">
                  {report.users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-5 shadow-lg border border-zinc-800">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500/20 mr-4">
                <Grid className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Total Apps</p>
                <p className="text-2xl font-bold text-zinc-100">
                  {report.apps.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-5 shadow-lg border border-zinc-800">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-500/20 mr-4">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Admin</p>
                <p className="text-lg font-medium text-zinc-100 truncate">
                  {report.adminName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apps Tab */}
      {activeTab === "apps" && (
        <div className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden mb-8 border border-zinc-800">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-100">
              Application Overview
            </h2>
            <p className="text-zinc-400 text-sm">
              Manage and review all applications
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Name
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
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {report.apps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-zinc-800/50 transition-colors"
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
                    <td className="py-3 px-4 text-zinc-300">{app.platform}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-zinc-100">
                          {app.usersCount}
                        </span>
                        <div className="w-16 bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                (app.usersCount /
                                  Math.max(
                                    ...report.apps.map((a) => a.usersCount)
                                  )) *
                                  100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-800">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">
                User Management
              </h2>
              <p className="text-zinc-400 text-sm">
                View and manage all registered users
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-zinc-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    User
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Contact
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    App Id
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-zinc-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {report.users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-zinc-100">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-400">ID: {user.id}</div>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="mb-1 text-zinc-100">{user.email}</div>
                      <div className=" text-zinc-400">
                        {user.phone || "No phone"}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="max-w-xs">
                        {user.appId || " No apps assigned"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
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
        </div>
      )}
    </div>
  );
};

// Skeleton loading component
const ReportSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="animate-pulse">
        <div className="flex justify-between mb-8">
          <div>
            <div className="h-8 bg-zinc-900 rounded w-48 mb-2"></div>
            <div className="h-4 bg-zinc-900 rounded w-64"></div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 w-80 border border-zinc-800">
            <div className="h-5 bg-zinc-800 rounded w-32 mb-3"></div>
            <div className="h-4 bg-zinc-800 rounded w-48 mb-3"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-8 bg-zinc-800 rounded w-16"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-10 bg-zinc-900 rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 rounded-xl p-5 h-24 border border-zinc-800"
            ></div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 h-96 mb-8 border border-zinc-800"></div>
      </div>
    </div>
  );
};

export default AdminReportPage;
