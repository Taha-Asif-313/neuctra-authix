import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Settings, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { admin, logout } = useAuth();
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
  return (
    <>
      <header className="h-16 bg-zinc-950 border-b border-black flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-900 md:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        </div>

        <div className="flex gap-3 items-center ">
          <button
            onClick={() => logout()}
            className="p-2 rounded-full hover:bg-gray-800 relative"
          >
            <LogOut size={20} />
          </button>
          <Link
            to={"/dashboard/support"}
            className="p-2 rounded-full hover:bg-gray-800 relative"
          >
            <HelpCircle size={20} />
          </Link>
          <Link className="p-2" to={"/dashboard/profile"}>
            <img
              src={
                admin.avatarUrl
                  ? admin.avatarUrl
                  : `https://api.dicebear.com/9.x/initials/svg?seed=${admin.name}`
              }
              alt="logo"
              className="w-8 h-8 rounded-full object-cover object-top"
            />
          </Link>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
