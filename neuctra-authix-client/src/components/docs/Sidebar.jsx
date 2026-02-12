import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BookOpen,
  Search,
  Menu,
  X,
  Lock,
  Code,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Home,
  Github,
  ExternalLink,
  Sparkles,
  Zap,
  Shield,
  Users,
  Atom,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  const categories = [
    {
      category: "Getting Started",
      icon: Sparkles,
      items: [
        { title: "Introduction", path: "/docs" },
        { title: "Installation", path: "/docs/installation", badge: "Updated" },
      ],
    },
    {
      category: "SDK Integration",
      icon: Code,
      items: [
        { title: "Introduction", path: "/docs/authix-sdk-introduction" },
        { title: "Installation", path: "/docs/authix-sdk-installation" },
        {
          title: "Auth & User Management",
          path: "/docs/auth-and-user-management",
        },
        { title: "User Data Management", path: "/docs/user-data-management" },
        { title: "App Data Management", path: "/docs/app-data-management" },
      ],
    },
    {
      category: "React UI Components",
      icon: Atom,
      items: [
        { title: "React Setup", path: "/docs/react-setup-docs" },
        { title: "User Login", path: "/docs/react-user-login-docs" },
        { title: "User Signup", path: "/docs/react-user-signup-docs" },
        {
          title: "User Email Verification",
          path: "/docs/react-user-verify-docs",
        },
        { title: "User Profile", path: "/docs/react-user-profile-docs" },
        { title: "User Button", path: "/docs/react-user-button-docs" },
        {
          title: "SignIn Component",
          path: "/docs/react-signin-component-docs",
        },
        {
          title: "SignOut Component",
          path: "/docs/react-signout-component-docs",
        },
      ],
    },
    {
      category: "Help & Support",
      icon: HelpCircle,
      items: [
        {
          title: "Support Center",
          path: "mailto:neuctraauthix@gmail.com", // opens email client
        },
      ],
    },
  ];

  useEffect(() => {
    const initialExpanded = {};
    categories.forEach((section) => {
      initialExpanded[section.category] = true;
    });
    setExpandedSections(initialExpanded);
  }, []);

  const filteredCategories = categories.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.path.toLowerCase().includes(query.toLowerCase()),
    ),
  }));

  const toggleSection = (category) => {
    setExpandedSections((prev) => {
      const isCurrentlyOpen = prev[category];

      // Close all sections first
      const newState = {};

      categories.forEach((section) => {
        newState[section.category] = false;
      });

      // Open clicked one (unless it was already open)
      newState[category] = !isCurrentlyOpen;

      return newState;
    });
  };

  const isSectionActive = (items) =>
    items.some((item) => location.pathname === item.path);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src="/logo.png" width={40} height={40} alt="logo" />
          </Link>
          <div>
            <h2 className="text-lg font-bold text-white">
              Neuctra Authix Docs
            </h2>
            <p className="text-xs text-zinc-400">v1.2</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-300 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 border-r border-zinc-800 bg-zinc-950 backdrop-blur-sm transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="pt-6 px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link to="/">
                  <img src="/logo.png" width={40} height={40} alt="logo" />
                </Link>
                <div>
                  <h2 className="text-md font-bold text-white">
                    Neuctra Authix Docs
                  </h2>
                  <p className="text-sm text-zinc-400">v1.2</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 focus:ring-2 focus:ring-[#00c420] focus:border-[#00c420] outline-none transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              {filteredCategories.map(({ category, icon: Icon, items }) => {
                if (items.length === 0) return null;

                const isActive = isSectionActive(items);
                const isExpanded = expandedSections[category];

                return (
                  <div key={category} className="space-y-2">
                    <button
                      onClick={() => toggleSection(category)}
                      className={`flex items-center justify-between w-full p-3 rounded-md transition-all duration-200 group ${
                        isActive
                          ? "bg-[#00c420]/20 text-white"
                          : "hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={`${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"}`}
                        />
                        <span
                          className={`font-semibold text-sm ${isActive ? "text-white" : "text-zinc-300 group-hover:text-white"}`}
                        >
                          {category}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${isActive ? "text-white" : "text-zinc-400"}`}
                        />
                      ) : (
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${isActive ? "text-white" : "text-zinc-400"}`}
                        />
                      )}
                    </button>

                    <div
                      className={`space-y-1 ml-4 transition-all duration-300 ${
                        isExpanded
                          ? "opacity-100 max-h-96"
                          : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      {items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === "/docs"}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between group relative pl-3 pr-2 py-2 rounded-md transition-all duration-200 ${
                              isActive
                                ? "text-[#00c420]"
                                : "hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="text-sm font-medium">
                                {item.title}
                              </span>
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <span
                                    className={`px-2 py-0.5 text-xs rounded-full ${
                                      item.badge === "New"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-[#00c420]/10 text-[#00c420]"
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                {isActive && (
                                  <div className="w-2 h-2 bg-[#00c420] rounded-full animate-pulse" />
                                )}
                              </div>
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
