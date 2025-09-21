import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Search, BookOpen, HelpCircle, Code, Lock } from "lucide-react";

const categories = [
  {
    category: "Getting Started",
    icon: BookOpen,
    items: [
      { title: "Introduction", path: "introduction" },
      { title: "Installation", path: "installation" },
      { title: "Quickstart", path: "quickstart" },
    ],
  },
  {
    category: "Authentication",
    icon: Lock,
    items: [
      { title: "Signup", path: "signup" },
      { title: "Login", path: "login" },
    ],
  },
  {
    category: "Users",
    icon: Code,
    items: [
      { title: "Update User", path: "update-user" },
      { title: "Delete User", path: "delete-user" },
    ],
  },
  {
    category: "Profile",
    icon: Lock,
    items: [{ title: "Get Profile", path: "get-profile" }],
  },
  {
    category: "Troubleshooting",
    icon: HelpCircle,
    items: [
      { title: "Common Errors", path: "errors" },
      { title: "Support", path: "support" },
    ],
  },
];

const DocsLayout = () => {
  const [query, setQuery] = useState("");

  const filteredCategories = categories.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <div className="flex h-screen bg-zinc-950 text-gray-200 border border-zinc-800">
      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-800 p-4 bg-zinc-900">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-primary" /> SDK Docs
        </h2>

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

        {/* Categories */}
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto prose prose-invert max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;
