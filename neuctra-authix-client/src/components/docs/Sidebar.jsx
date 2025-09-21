import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Search, Menu, X, Lock, Code, HelpCircle } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Example docs data (you can replace this with your real structure)
  const categories = [
    {
      category: "Getting Started",
      icon: BookOpen,
      items: [
        { title: "Introduction", path: "/docs/introduction" },
        { title: "Installation", path: "/docs/installation" },
        { title: "Quickstart", path: "/docs/quickstart" },
      ],
    },
    {
      category: "Authentication",
      icon: Lock,
      items: [
        { title: "Signup", path: "/docs/signup" },
        { title: "Login", path: "/docs/login" },
      ],
    },
    {
      category: "Neuctra Authix Sdk",
      icon: Code,
      items: [
        { title: "Full Guide", path: "/docs/neuctra-authix-sdk" }
      ],
    },
    {
      category: "Help",
      icon: HelpCircle,
      items: [
        { title: "Common Errors", path: "/docs/errors" },
        { title: "Support", path: "/docs/support" },
      ],
    },
  ];

  // Apply search filter
  const filteredCategories = categories.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen size={20} className="text-primary" /> SDK Docs
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Drawer (mobile) + Static (desktop) */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 border-r border-zinc-800 p-4 bg-zinc-950 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header (mobile only) */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={20} className="text-primary" /> SDK Docs
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Categories & Items */}
        <div className="space-y-4 overflow-y-auto h-[calc(100%-90px)] pr-1">
          {filteredCategories.map(
            ({ category, icon: Icon, items }) =>
              items.length > 0 && (
                <div key={category}>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <Icon size={16} className="text-primary" />
                    {category}
                  </div>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={() => setIsOpen(false)} // close drawer on mobile
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-sm transition ${
                              isActive
                                ? "bg-zinc-800 text-primary"
                                : "hover:bg-zinc-800 text-gray-300"
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
