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

// const navItems = [
//   {
//     name: "Overview",
//     path: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Applications",
//     path: "/dashboard/apps",
//     icon: Grid3X3,
//     subItems: [
//       { name: "App Details", path: "/dashboard/app/1" },
//       { name: "New App", path: "/dashboard/app/new" },
//       { name: "Analytics", path: "/dashboard/app/analytics" },
//     ],
//   },
//   {
//     name: "Reports",
//     path: "/dashboard/reports",
//     icon: BarChart3,
//   },
//   {
//     name: "Documents",
//     path: "/dashboard/documents",
//     icon: FileText,
//     badge: 7,
//   },
//   {
//     name: "Settings",
//     path: "/dashboard/settings",
//     icon: Settings,
//     subItems: [
//       { name: "Profile", path: "/dashboard/settings/profile" },
//       { name: "Security", path: "/dashboard/settings/security" },
//       { name: "Notifications", path: "/dashboard/settings/notifications" },
//     ],
//   },
//   {
//     name: "Support",
//     path: "/dashboard/support",
//     icon: HelpCircle,
//   },
// ];

// Define navigation items with icons and optional sub-items


const navItems = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    path: "/dashboard/apps",
    icon: Grid3X3,
  },
  {
    name: "Reports",
    path: "/dashboard/admin-report",
    icon: BarChart3,
  },
  {
    name: "Documents",
    path: "/dashboard/documents",
    icon: FileText,
    badge: 7,
  },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Profile", path: "/dashboard/profile" },
      { name: "Api Management", path: "/dashboard/apikeys" },
      { name: "Notifications", path: "/dashboard/settings/notifications" },
    ],
  },
  {
    name: "Support",
    path: "/dashboard/support",
    icon: HelpCircle,
  },
];

const DashboardSidebar = ({sidebarOpen, setSidebarOpen}) => {
  const { admin } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("apps");
    window.location.href = "/login";
  };

  // Check if a nav item or its subitems is active
  const isItemActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some(
        (subItem) => location.pathname === subItem.path
      );
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
        max-h-screen
      `}
      >
        <div className="p-5 text-xl font-bold text-white flex items-center justify-between">
          <Link to={"/dashboard"} className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/logo.png" size={20} />
            </div>
            <span className="text-sm">
              Neuctra{" "}
              <span className="text-primary italic font-black">Authix</span>
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = isItemActive(item);
            const isExpanded = expandedItems[item.name];

            return (
              <div key={item.name}>
                <div
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-primary/15 text-gray-300"
                    }
                  `}
                  onClick={() =>
                    item.subItems
                      ? toggleSubMenu(item.name)
                      : setSidebarOpen(false)
                  }
                >
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 flex-1"
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleSubMenu(item.name);
                      } else {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <IconComponent size={20} />
                    <span>{item.name}</span>
                  </Link>

                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="bg-green-900 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <button>
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {item.subItems && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`
                          block px-4 py-2 rounded-lg text-sm transition-all
                          ${
                            location.pathname === subItem.path
                              ? "text-white bg-primary bg-opacity-50"
                              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                          }
                        `}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            to={"/dashboard/profile"}
            className="flex items-center space-x-3 p-3 text-gray-300"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {admin.avatarUrl ? (
                <img className="object-top" src={admin.avatarUrl} alt="logo" />
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
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg  bg-red-600/10 text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
