import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Search, BookOpen, HelpCircle, Code, Lock } from "lucide-react";
import Sidebar from "../components/docs/Sidebar";

const DocsLayout = () => {
  return (
    <div className="flex h-screen bg-black text-gray-200 border border-zinc-800">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto prose prose-invert">
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;
