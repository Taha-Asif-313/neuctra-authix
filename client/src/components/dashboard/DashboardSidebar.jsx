import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Grid3X3,
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  BarChart3,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Applications", path: "/dashboard/apps", icon: Grid3X3 },
  { name: "Reports", path: "/dashboard/admin-report", icon: BarChart3 },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Profile", path: "/dashboard/profile" },
      { name: "Api Management", path: "/dashboard/apikeys" },
      { name: "Notifications", path: "/dashboard/settings/notifications" },
    ],
  },
  { name: "Support", path: "/dashboard/support", icon: HelpCircle },
];

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { admin } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleSubMenu = (itemName) =>
    setExpandedItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("apps");
    window.location.href = "/login";
  };

  const isItemActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => location.pathname === sub.path);
    }
    return false;
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative h-screen w-64 bg-zinc-950 border-r border-black flex flex-col z-30
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5 text-xl font-bold text-white flex items-center justify-between">
          <Link to={"/dashboard"} className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/logo.png" size={20} />
            </div>
            <span className="text-sm">
              Neuctra <span className="text-primary italic font-black">Authix</span>
            </span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);
            const isExpanded = expandedItems[item.name];

            return (
              <div key={item.name}>
                <div
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
                    ${isActive ? "bg-primary text-white" : "hover:bg-primary/15 text-gray-300"}
                  `}
                  onClick={() => (item.subItems ? toggleSubMenu(item.name) : setSidebarOpen(false))}
                >
                  <Link
                    to={item.path || "#"}
                    className="flex items-center space-x-3 flex-1"
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleSubMenu(item.name);
                      } else setSidebarOpen(false);
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>

                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="bg-green-900 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <button>{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</button>
                    )}
                  </div>
                </div>

                {item.subItems && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                          location.pathname === sub.path
                            ? "text-primary text-sm bg-opacity-50"
                            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Admin Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link
            to={"/dashboard/profile"}
            className="flex items-center space-x-3 p-3 text-gray-300"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {admin.avatarUrl ? (
                <img className="object-top" src={admin.avatarUrl} alt="avatar" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{admin.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </Link>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600/10 text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-lg w-lg">
            <h2 className="text-lg font-bold text-white mb-4">Confirm Logout</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded text-sm bg-zinc-800 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded text-sm bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
