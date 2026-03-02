import React from "react";
import { Link } from "react-router-dom";
import { Menu, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { admin, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-30
        h-16
        bg-zinc-950 border-b border-zinc-800
        flex items-center justify-between
        px-4 md:px-8
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-900 transition"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-gray-500 hidden md:block">
            Welcome back,{" "}
            <span className="text-primary font-medium">
              {admin?.name || "Admin"}
            </span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Support */}
        <Link
          to="/dashboard/support"
          className="
            p-2 rounded-lg
            text-gray-200
            hover:text-primary
            hover:bg-zinc-900
            transition
          "
        >
          <HelpCircle size={20} />
        </Link>

        {/* Logout */}
        <button
          onClick={async () => await logout()}
          className="
            p-2 rounded-lg
            text-gray-200
            hover:text-red-500
            hover:bg-zinc-900
            transition
          "
        >
          <LogOut size={20} />
        </button>

        {/* Profile */}
        <Link
          to="/dashboard/profile"
          className="
            flex items-center gap-3
            pl-3
            border-l border-zinc-800
          "
        >
          <img
            src={
              admin?.avatarUrl
                ? admin.avatarUrl
                : `https://api.dicebear.com/9.x/initials/svg?seed=${admin?.name}`
            }
            alt="avatar"
            className="
              w-9 h-9
              rounded-full
              object-cover
              ring-2 ring-transparent
              hover:ring-primary
              transition
            "
          />

          <div className="hidden md:block">
            <p className="text-sm font-medium text-white truncate">
              {admin?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;