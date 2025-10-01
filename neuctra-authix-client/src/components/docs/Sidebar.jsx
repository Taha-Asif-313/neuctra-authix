import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  Users
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  // Enhanced docs data structure
  const categories = [
    {
      category: "Getting Started",
      icon: Sparkles,
      items: [
        { title: "Introduction", path: "/docs/introduction", badge: "New" },
        { title: "Installation", path: "/docs/installation", badge: "Updated" },
        { title: "Quickstart Guide", path: "/docs/quickstart" },
        { title: "Migration Guide", path: "/docs/migration" },
      ],
    },
    {
      category: "Authentication",
      icon: Shield,
      items: [
        { title: "Signup & Registration", path: "/docs/signup" },
        { title: "Login Flow", path: "/docs/login" },
        { title: "Password Reset", path: "/docs/password-reset" },
        { title: "Email Verification", path: "/docs/email-verification" },
        { title: "Social Auth", path: "/docs/social-auth" },
      ],
    },
    {
      category: "SDK Integration",
      icon: Code,
      items: [
        { title: "Neuctra Authix SDK", path: "/docs/neuctra-authix-sdk" },
        { title: "Frontend Integration", path: "/docs/frontend-integration" },
        { title: "Backend Integration", path: "/docs/backend-integration" },
        { title: "API Reference", path: "/docs/api-reference" },
        { title: "Webhooks", path: "/docs/webhooks" },
      ],
    },
    {
      category: "User Management",
      icon: Users,
      items: [
        { title: "User Profiles", path: "/docs/user-profiles" },
        { title: "Session Management", path: "/docs/session-management" },
        { title: "Role-Based Access", path: "/docs/rbac" },
      ],
    },
    {
      category: "Help & Support",
      icon: HelpCircle,
      items: [
        { title: "Common Errors", path: "/docs/errors" },
        { title: "Troubleshooting", path: "/docs/troubleshooting" },
        { title: "Best Practices", path: "/docs/best-practices" },
        { title: "Support Center", path: "/docs/support" },
      ],
    },
  ];

  // Initialize expanded sections
  useEffect(() => {
    const initialExpanded = {};
    categories.forEach((section) => {
      initialExpanded[section.category] = true;
    });
    setExpandedSections(initialExpanded);
  }, []);

  // Filter categories based on search
  const filteredCategories = categories.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.path.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  const toggleSection = (category) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const isSectionActive = (items) => {
    return items.some(item => location.pathname === item.path);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#00c420] to-green-400 rounded-lg">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Neuctra Docs
            </h2>
            <p className="text-xs text-gray-400">v2.1.0</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 border-r border-gray-800 bg-gradient-to-b from-gray-900 to-black backdrop-blur-sm transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#00c420] to-green-400 rounded-xl">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Neuctra Docs
                  </h2>
                  <p className="text-sm text-gray-400">v2.1.0</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-[#00c420] focus:border-[#00c420] outline-none backdrop-blur-sm transition-all"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-800">
            <div className="grid grid-cols-2 gap-2">
              <NavLink
                to="/"
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-sm group"
              >
                <Home size={16} className="text-gray-400 group-hover:text-white" />
                <span className="text-gray-300 group-hover:text-white">Home</span>
              </NavLink>
              <a
                href="https://github.com/neuctra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-sm group"
              >
                <Github size={16} className="text-gray-400 group-hover:text-white" />
                <span className="text-gray-300 group-hover:text-white">GitHub</span>
              </a>
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
                      className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 group ${
                        isActive ? 'bg-[#00c420]/10 border border-[#00c420]/20' : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon 
                          size={18} 
                          className={`${
                            isActive ? 'text-[#00c420]' : 'text-gray-400 group-hover:text-gray-300'
                          }`} 
                        />
                        <span className={`font-semibold text-sm ${
                          isActive ? 'text-[#00c420]' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {category}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${
                            isActive ? 'text-[#00c420]' : 'text-gray-400'
                          }`} 
                        />
                      ) : (
                        <ChevronRight 
                          size={16} 
                          className={`transition-transform ${
                            isActive ? 'text-[#00c420]' : 'text-gray-400'
                          }`} 
                        />
                      )}
                    </button>

                    <div className={`space-y-1 ml-4 transition-all duration-300 ${
                      isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between group relative pl-3 pr-2 py-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-[#00c420]/20 text-[#00c420] border-l-2 border-[#00c420]"
                                : "hover:bg-gray-800/30 text-gray-400 hover:text-gray-300"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="text-sm font-medium">{item.title}</span>
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                                    item.badge === "New" 
                                      ? "bg-green-500/20 text-green-400" 
                                      : "bg-[#00c420]/20 text-[#00c420]"
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                                {isActive && (
                                  <div className="w-1 h-1 bg-[#00c420] rounded-full animate-pulse" />
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Zap size={20} className="text-[#00c420]" />
                <span className="text-sm font-semibold text-white">Pro Tip</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Use our interactive examples to test API endpoints directly in the documentation.
              </p>
              <button className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#00c420] hover:bg-green-600 rounded-lg transition-colors text-sm font-medium text-white">
                <ExternalLink size={14} />
                Try Live Examples
              </button>
            </div>
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