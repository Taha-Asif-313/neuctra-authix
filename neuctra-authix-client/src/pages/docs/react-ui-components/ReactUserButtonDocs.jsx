// src/pages/docs/components/ReactUserButton.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  User,
  LogOut,
  Settings,
  Mail,
  ChevronDown,
  Palette,
  Smartphone,
  Zap,
  Code,
  Link2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  Download,
  Upload,
  Bell
} from "lucide-react";

const ReactUserButtonDocs = () => {
  const basicUsageCode = `import { ReactUserButton } from "@neuctra/authix-react";

// Basic usage with logout handler
function Navigation() {
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1>My App</h1>
        <ReactUserButton 
          onLogout={handleLogout}
          darkMode={true}
          primaryColor="#00C214"
        />
      </div>
    </nav>
  );
}`;

  const withUserDataCode = `import { ReactUserButton } from "@neuctra/authix-react";

// Using with pre-loaded user data
function Dashboard({ user }) {
  const handleLogout = () => {
    // Your logout logic
    console.log('User logged out');
  };

  return (
    <header>
      <ReactUserButton
        propUser={user}
        onLogout={handleLogout}
        darkMode={false}
        primaryColor="#3B82F6"
      />
    </header>
  );
}`;

  const customUrlsCode = `import { ReactUserButton } from "@neuctra/authix-react";

function AppHeader() {
  const handleLogout = () => {
    // Logout implementation
  };

  return (
    <ReactUserButton
      onLogout={handleLogout}
      profileUrl="/user/profile"
      settingsUrl="/user/settings"
      showProfileMenuItem={true}
      showSettingsMenuItem={true}
      showViewProfileMenuItem={false}
      profileLabel="My Profile"
      settingsLabel="Account Settings"
      logoutLabel="Log Out"
      darkMode={true}
      primaryColor="#8B5CF6"
    />
  );
}`;

  const fullCustomizationCode = `import { ReactUserButton } from "@neuctra/authix-react";

function CustomUserButton() {
  const userData = {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://example.com/avatar.jpg",
    profileUrl: "https://example.com/profiles/john"
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <ReactUserButton
      propUser={userData}
      onLogout={handleLogout}
      darkMode={false}
      primaryColor="#EC4899"
      profileUrl="/dashboard/profile"
      settingsUrl="/dashboard/settings"
      showProfileMenuItem={true}
      showSettingsMenuItem={true}
      showViewProfileMenuItem={true}
      profileLabel="Edit Profile"
      settingsLabel="Preferences"
      viewProfileLabel="Public Profile"
      logoutLabel="Sign Out"
      className="custom-user-button"
    />
  );
}`;

  const integrationExampleCode = `import { ReactUserButton, ReactUserLogin } from "@neuctra/authix-react";
import { useState, useEffect } from "react";

function AppLayout() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  };

  if (!isLoggedIn) {
    return <ReactUserLogin onSuccess={(data) => {
      setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      localStorage.setItem('userToken', data.token);
    }} />;
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">MyApp</div>
          <div className="header-actions">
            <ReactUserButton
              propUser={user}
              onLogout={handleLogout}
              darkMode={true}
              primaryColor="#00C214"
              profileUrl="/profile"
              settingsUrl="/settings"
              showProfileMenuItem={true}
              showSettingsMenuItem={true}
              profileLabel="My Profile"
              settingsLabel="Settings"
              logoutLabel="Log Out"
            />
          </div>
        </div>
      </header>
      <main className="app-main">
        {/* Your app content */}
      </main>
    </div>
  );
}`;

  const propsTable = [
    {
      name: "onLogout",
      type: "() => void",
      required: "Yes",
      default: "-",
      description: "Callback function called when user clicks logout"
    },
    {
      name: "propUser",
      type: "UserInfo | null",
      required: "No",
      default: "null",
      description: "Pre-loaded user data. If not provided, fetches from localStorage"
    },
    {
      name: "darkMode",
      type: "boolean",
      required: "No",
      default: "true",
      description: "Toggle between dark and light theme"
    },
    {
      name: "primaryColor",
      type: "string",
      required: "No",
      default: '"#3b82f6"',
      description: "Primary brand color for accents and hover states"
    },
    {
      name: "profileUrl",
      type: "string",
      required: "No",
      default: "undefined",
      description: "URL for the profile menu item navigation"
    },
    {
      name: "settingsUrl",
      type: "string",
      required: "No",
      default: "undefined",
      description: "URL for the settings menu item navigation"
    },
    {
      name: "showProfileMenuItem",
      type: "boolean",
      required: "No",
      default: "true",
      description: "Show/hide the profile menu item"
    },
    {
      name: "showSettingsMenuItem",
      type: "boolean",
      required: "No",
      default: "true",
      description: "Show/hide the settings menu item"
    },
    {
      name: "showViewProfileMenuItem",
      type: "boolean",
      required: "No",
      default: "true",
      description: "Show/hide the view profile menu item"
    },
    {
      name: "profileLabel",
      type: "string",
      required: "No",
      default: '"My Profile"',
      description: "Custom label for profile menu item"
    },
    {
      name: "settingsLabel",
      type: "string",
      required: "No",
      default: '"Settings"',
      description: "Custom label for settings menu item"
    },
    {
      name: "viewProfileLabel",
      type: "string",
      required: "No",
      default: '"View Profile"',
      description: "Custom label for view profile menu item"
    },
    {
      name: "logoutLabel",
      type: "string",
      required: "No",
      default: '"Sign Out"',
      description: "Custom label for logout button"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      default: '""',
      description: "Additional CSS class for the wrapper element"
    }
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "User Avatar & Info",
      description: "Displays user avatar, name, and email with fallbacks"
    },
    {
      icon: <ChevronDown className="w-5 h-5" />,
      title: "Smart Dropdown",
      description: "Adaptive positioning that avoids viewport edges"
    },
    {
      icon: <Link2 className="w-5 h-5" />,
      title: "Custom URLs",
      description: "Configurable navigation links for profile and settings"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Optimized",
      description: "Responsive design with touch-friendly interactions"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Error Handling",
      description: "Graceful error states with retry functionality"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Theme Support",
      description: "Dark/light mode with customizable primary colors"
    }
  ];

  const menuItems = [
    {
      name: "Profile",
      icon: <User className="w-4 h-4" />,
      prop: "showProfileMenuItem",
      default: true,
      description: "Navigates to user profile page",
      requires: "profileUrl"
    },
    {
      name: "Settings",
      icon: <Settings className="w-4 h-4" />,
      prop: "showSettingsMenuItem",
      default: true,
      description: "Navigates to settings page",
      requires: "settingsUrl"
    },
    {
      name: "View Profile",
      icon: <Mail className="w-4 h-4" />,
      prop: "showViewProfileMenuItem",
      default: true,
      description: "Opens public profile in new tab",
      requires: "user.profileUrl"
    },
    {
      name: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      prop: "Always visible",
      default: true,
      description: "Signs out the user",
      requires: "onLogout callback"
    }
  ];

  const userInfoStructure = [
    {
      field: "id",
      type: "string",
      required: true,
      description: "Unique user identifier"
    },
    {
      field: "name",
      type: "string",
      required: true,
      description: "User's display name"
    },
    {
      field: "email",
      type: "string",
      required: true,
      description: "User's email address"
    },
    {
      field: "avatarUrl",
      type: "string",
      required: false,
      description: "URL to user's avatar image"
    },
    {
      field: "profileUrl",
      type: "string",
      required: false,
      description: "URL to user's public profile"
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 flex-shrink-0" />
          ReactUserButton Component
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          A sophisticated user menu button that displays user information, provides quick access 
          to profile settings, and handles logout functionality with beautiful, accessible dropdown menus.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <div className="text-purple-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">{feature.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Basic Usage */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
          Basic Usage
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          The component automatically handles user data loading from localStorage and provides 
          a complete user menu experience out of the box.
        </p>
        <CodeBlock code={basicUsageCode} language="jsx" />
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
            <Shield className="w-4 h-4" />
            Automatic User Data Handling
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            When <code className="text-blue-300">propUser</code> is not provided, the component 
            automatically checks <code className="text-blue-300">localStorage</code> for user 
            information and validates it with your Authix backend.
          </p>
        </div>
      </section>

      {/* User Data Structure */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          User Data Structure
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          The component expects user data in this format. All fields are automatically handled when using Authix authentication.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Field</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Type</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Required</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {userInfoStructure.map((field, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 font-mono text-blue-400 text-xs sm:text-sm">{field.field}</td>
                    <td className="p-3 sm:p-4 font-mono text-green-400 text-xs sm:text-sm">{field.type}</td>
                    <td className="p-3 sm:p-4">
                      <span className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                        field.required ? "text-red-400" : "text-yellow-400"
                      }`}>
                        {field.required ? (
                          <>
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            Required
                          </>
                        ) : (
                          "Optional"
                        )}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Menu Items Configuration */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
          Menu Items Configuration
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Customize which menu items appear and their behavior. Items only show when their required conditions are met.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-orange-400">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white text-base">{item.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.default ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                }`}>
                  {item.default ? "Default: ON" : "Default: OFF"}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">{item.description}</p>
              
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Code className="w-3 h-3 text-purple-400" />
                  <span>Prop: <code className="text-purple-300">{item.prop}</code></span>
                </div>
                {item.requires !== "Always visible" && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Requires: <code className="text-green-300">{item.requires}</code></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Props Documentation */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Code className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
          Props & Configuration
        </h2>
        
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Prop</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Type</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Required</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Default</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {propsTable.map((prop, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 font-mono text-blue-400 text-xs sm:text-sm">{prop.name}</td>
                    <td className="p-3 sm:p-4 font-mono text-green-400 text-xs sm:text-sm">{prop.type}</td>
                    <td className="p-3 sm:p-4">
                      <span className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                        prop.required === "Yes" ? "text-red-400" : "text-yellow-400"
                      }`}>
                        {prop.required === "Yes" ? (
                          <>
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            Required
                          </>
                        ) : (
                          "Optional"
                        )}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 font-mono text-yellow-400 text-xs sm:text-sm">{prop.default}</td>
                    <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom URLs Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          Custom URLs & Navigation
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Configure custom navigation URLs for profile and settings pages. Menu items only appear when their respective URLs are provided.
        </p>
        <CodeBlock code={customUrlsCode} language="jsx" />
      </section>

      {/* Pre-loaded User Data */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Using Pre-loaded User Data
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          For better performance and immediate display, pass pre-loaded user data to avoid additional API calls.
        </p>
        <CodeBlock code={withUserDataCode} language="jsx" />
      </section>

      {/* Full Customization */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0" />
          Full Customization
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Complete example showing all customization options including colors, labels, and navigation URLs.
        </p>
        <CodeBlock code={fullCustomizationCode} language="jsx" />
      </section>

      {/* Integration Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          Complete Integration Example
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          How to integrate the user button into a complete authentication flow with login state management.
        </p>
        <CodeBlock code={integrationExampleCode} language="jsx" />
      </section>

      {/* Smart Features */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-4 text-lg sm:text-xl">
          <Smartphone className="w-5 h-5" />
          Smart Features & Accessibility
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Responsive Behavior:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Adaptive dropdown positioning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Mobile-optimized compact view</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Viewport boundary detection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Touch-friendly interactions</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Accessibility:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Keyboard navigation support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Screen reader friendly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>ARIA labels and roles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Focus management</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg sm:text-xl">
          <Shield className="w-5 h-5" />
          Error Handling & Fallbacks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Automatic Fallbacks:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>DiceBear avatars for missing images</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Graceful loading states</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>User validation with backend</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Retry functionality for errors</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">User Experience:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Non-intrusive error messages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Session expiration handling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Network error recovery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Progressive enhancement</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg sm:text-xl">
          <CheckCircle className="w-5 h-5" />
          Ready to Use!
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3">
          The ReactUserButton component provides a complete user menu solution:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Automatic user data management with localStorage integration</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Smart dropdown positioning that avoids viewport edges</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Configurable menu items with conditional visibility</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Mobile-responsive design with touch optimization</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Comprehensive error handling with user-friendly fallbacks</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserButtonDocs;