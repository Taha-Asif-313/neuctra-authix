import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MetaData from "../components/utils/MetaData";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex max-h-screen text-gray-100">
      {/* Meta for SEO */}
      <MetaData
        title="Neuctra Authix Dashboard - Manage Your Apps & Users"
        description="Access Neuctra Authix dashboard to create apps, manage users, monitor data storage, and configure authentication for your applications."
        keywords="Neuctra Authix dashboard, user management, app management, authentication, serverless, SDK, data storage"
      />

      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 max-h-screen overflow-y-auto bg-black p-4 md:p-6 max-sm:pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
