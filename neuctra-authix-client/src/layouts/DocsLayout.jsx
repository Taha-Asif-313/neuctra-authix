import React from "react";
import { Outlet } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import Sidebar from "../components/docs/Sidebar";
import MetaData from "../components/utils/MetaData";

const DocsLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-gray-200">
      {/* Meta for SEO */}
      <MetaData
        title="Neuctra Authix Docs - Complete Authentication & Data Storage Guide"
        description="Official documentation for Neuctra Authix. Learn how to integrate authentication, serverless data storage, and user management into your React or Express applications."
        keywords="Neuctra Authix, authentication, serverless data storage, user management, React SDK, Express SDK, auth docs"
      />

      {/* Sidebar (self-handled for mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-gray-800">
        {/* Top Header (Desktop Only) */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-10 py-4 border-b border-gray-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00c420]" />
            <h1 className="text-lg lg:text-xl font-semibold text-white tracking-tight">
              Documentation
            </h1>
          </div>

          {/* Search Input */}
          <div className="relative w-40 sm:w-52 lg:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00c420] focus:ring-1 focus:ring-[#00c420] transition"
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <section className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-6 overflow-y-auto prose prose-invert max-w-none">
          <Outlet />
        </section>

        {/* Footer (optional for mobile UX) */}
        <footer className="mt-auto md:hidden text-center text-xs text-gray-500 py-5 border-t border-zinc-800 bg-zinc-950/80">
          © {new Date().getFullYear()} Neuctra Authix Docs — All rights
          reserved.
        </footer>
      </main>
    </div>
  );
};

export default DocsLayout;
