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
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import LogoutModal from "./LogoutModal";

const navItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Applications", path: "/dashboard/apps", icon: Grid3X3 },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Profile", path: "/dashboard/profile" },
      { name: "API Management", path: "/dashboard/apikeys" },
      { name: "Change Password", path: "/dashboard/change-password" },
    ],
  },
  { name: "Support", path: "/dashboard/support", icon: HelpCircle },
];

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { admin, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const toggleSubMenu = (itemName) =>
    setExpandedItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }));

  const handleLogout = async () => {
    await logout();
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
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0
          h-screen w-72
          bg-zinc-950 border-r border-zinc-800
          flex flex-col
          z-40
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-zinc-800 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src="/logo.png" className="w-9 h-9" />
            <span className="text-lg font-semibold text-white">
              Neuctra <span className="text-primary font-bold">Authix</span>
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);
            const isExpanded = expandedItems[item.name];

            return (
              <div key={item.name}>
                <div
                  className={`
      relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
      ${isActive ? "bg-zinc-900 text-primary" : "text-gray-200 hover:bg-zinc-900 hover:text-white"}
    `}
                >
                  {/* Left content */}
                  <Link
                    to={item.path || "#"}
                    className="flex items-center gap-3 flex-1"
                    onClick={() => {
                      setSidebarOpen(false); // close mobile sidebar
                    }}
                  >
                    {item.icon && (
                      <item.icon
                        size={19}
                        className={isActive ? "text-primary" : ""}
                      />
                    )}
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>

                  {/* Right chevron for items with submenus */}
                  {item.subItems && (
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="text-gray-400 p-1"
                    >
                      {expandedItems[item.name] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {item.subItems && (
                  <div
                    className={`ml-6 mt-2 space-y-1 transition-all duration-300 overflow-hidden ${
                      expandedItems[item.name]
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`
            block px-4 py-2 text-sm rounded-lg transition
            ${
              location.pathname === sub.path
                ? "bg-primary/10 text-primary"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }
          `}
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

        {/* Plan Section */}
        <div className="px-4 mt-4 mb-2">
          <div className="bg-zinc-900/50 p-3 rounded-lg flex items-center justify-between">
            <span
              className={`text-sm font-medium ${admin.package === "free" ? "text-yellow-400" : "text-primary"}`}
            >
              {admin.package === "free" ? "Free Plan" : "Premium Plan"}
            </span>
            {admin.package === "free" && (
              <Link
                to="/dashboard/upgrade"
                className="text-xs font-semibold bg-primary/5 text-primary px-2 py-1 rounded hover:bg-primary/20 transition"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-zinc-800">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-700">
              <img
                className="w-full h-full object-cover"
                src={
                  admin.avatarUrl
                    ? admin.avatarUrl
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${admin?.name}`
                }
                alt="avatar"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {admin?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-400 truncate">Administrator</p>
            </div>
          </Link>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              text-red-500 bg-red-500/5 hover:bg-red-500/10 transition"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
