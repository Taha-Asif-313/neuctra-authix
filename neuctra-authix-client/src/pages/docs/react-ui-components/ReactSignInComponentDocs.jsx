// src/pages/docs/components/ReactSignInComponent.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  Lock,
  User,
  Zap,
  Code,
  Palette,
  Smartphone,
  Link2,
  Download,
  Upload,
  Bell,
  Settings
} from "lucide-react";

const ReactSignInComponentDocs = () => {
  const basicUsageCode = `import { ReactSignInComponent } from "@neuctra/authix-react";

// Basic usage - shows content only when signed in
function Dashboard() {
  return (
    <div className="dashboard">
      <header>
        <h1>My Dashboard</h1>
      </header>
      
      <ReactSignInComponent>
        <div className="sensitive-content">
          <h2>User Analytics</h2>
          <p>This content is only visible to authenticated users.</p>
          <button>View Reports</button>
        </div>
      </ReactSignInComponent>
      
      <footer>
        <p>Public footer content</p>
      </footer>
    </div>
  );
}`;

  const conditionalRenderingCode = `import { ReactSignInComponent } from "@neuctra/authix-react";

// Conditional rendering with fallback
function UserProfile() {
  return (
    <div className="profile-page">
      <ReactSignInComponent>
        {/* Authenticated content */}
        <div className="user-profile">
          <h2>Your Profile</h2>
          <p>Manage your account settings and preferences.</p>
          <button>Edit Profile</button>
        </div>
      </ReactSignInComponent>
      
      {/* Public fallback content */}
      <ReactSignInComponent>
        {null}
      </ReactSignInComponent>
      <div className="sign-in-prompt">
        <p>Please sign in to view your profile.</p>
        <a href="/login">Sign In</a>
      </div>
    </div>
  );
}`;

  const defaultContentCode = `import { ReactSignInComponent } from "@neuctra/authix-react";

// Using default content
function AdminPanel() {
  return (
    <div className="admin-layout">
      <ReactSignInComponent>
        {/* Custom admin content */}
        <div className="admin-tools">
          <h3>Administrator Tools</h3>
          <button>Manage Users</button>
          <button>View Analytics</button>
        </div>
      </ReactSignInComponent>
      
      <ReactSignInComponent>
        {/* Shows default signed-in content */}
      </ReactSignInComponent>
    </div>
  );
}`;

  const integrationExampleCode = `import { ReactSignInComponent, ReactUserLogin } from "@neuctra/authix-react";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth status on mount
    const checkAuthStatus = () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        setIsAuthenticated(Boolean(userInfo && userInfo !== "undefined"));
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
    
    // Listen for storage changes (other tabs)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLoginSuccess = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    localStorage.setItem("userToken", data.token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Application</h1>
        {isAuthenticated && (
          <button onClick={handleLogout}>Sign Out</button>
        )}
      </header>

      <main className="app-main">
        {!isAuthenticated ? (
          <ReactUserLogin onSuccess={handleLoginSuccess} />
        ) : (
          <ReactSignInComponent>
            <div className="authenticated-content">
              <h2>Welcome Back!</h2>
              <p>You have successfully signed in.</p>
              <div className="feature-grid">
                <div className="feature-card">
                  <h3>Dashboard</h3>
                  <p>View your personal dashboard</p>
                </div>
                <div className="feature-card">
                  <h3>Settings</h3>
                  <p>Manage your preferences</p>
                </div>
                <div className="feature-card">
                  <h3>Profile</h3>
                  <p>Update your information</p>
                </div>
              </div>
            </div>
          </ReactSignInComponent>
        )}
      </main>
    </div>
  );
}`;

  const advancedUsageCode = `import { ReactSignInComponent } from "@neuctra/authix-react";
import { useMemo } from "react";

function ComplexComponent({ userData }) {
  // Memoize expensive content to prevent re-renders
  const expensiveContent = useMemo(() => (
    <div className="expensive-component">
      <h2>Complex Dashboard</h2>
      {/* Expensive computations or large components */}
      <UserAnalyticsChart />
      <RecentActivityFeed />
      <PerformanceMetrics />
    </div>
  ), [userData]);

  return (
    <div>
      {/* Public header */}
      <header className="public-header">
        <h1>My App</h1>
      </header>

      {/* Conditionally render expensive content */}
      <ReactSignInComponent>
        {expensiveContent}
      </ReactSignInComponent>

      {/* Fallback for non-authenticated users */}
      <ReactSignInComponent>
        {null}
      </ReactSignInComponent>
      <div className="upgrade-prompt">
        <h2>Upgrade to Premium</h2>
        <p>Sign in to access advanced features</p>
        <a href="/pricing">View Plans</a>
      </div>
    </div>
  );
}`;

  const propsTable = [
    {
      name: "children",
      type: "ReactNode",
      required: "No",
      default: "Default signed-in content",
      description: "Content to render when user is authenticated. If not provided, shows default styled content."
    }
  ];

  const features = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Conditional Rendering",
      description: "Only renders content when user is authenticated based on localStorage"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Security First",
      description: "Automatically hides sensitive content from unauthenticated users"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightweight",
      description: "Minimal bundle impact with efficient auth checking"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Zero Configuration",
      description: "Works out of the box with Authix authentication system"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Flexible Content",
      description: "Accept custom children or use built-in default content"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Styled Defaults",
      description: "Beautiful default styling with green accent borders"
    }
  ];

  const useCases = [
    {
      title: "Protected Routes",
      description: "Wrap sensitive components or pages that require authentication",
      example: "User profiles, dashboards, admin panels"
    },
    {
      title: "Feature Flags",
      description: "Show premium features only to authenticated users",
      example: "Advanced tools, analytics, export options"
    },
    {
      title: "Content Gating",
      description: "Restrict access to specific content sections",
      example: "Member-only articles, videos, or downloads"
    },
    {
      title: "Progressive UI",
      description: "Enhance UI for logged-in users without separate pages",
      example: "Personalized greetings, quick actions"
    }
  ];

  const authFlow = [
    {
      step: "1",
      title: "Check localStorage",
      description: "Component checks for valid userInfo in localStorage",
      icon: <Download className="w-4 h-4" />
    },
    {
      step: "2",
      title: "Validate Data",
      description: "Ensures userInfo exists and is not 'undefined'",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      step: "3",
      title: "Render Decision",
      description: "Renders children if authenticated, null otherwise",
      icon: <Eye className="w-4 h-4" />
    },
    {
      step: "4",
      title: "Error Handling",
      description: "Gracefully handles localStorage errors",
      icon: <Shield className="w-4 h-4" />
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Lock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400 flex-shrink-0" />
          ReactSignInComponent
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          A lightweight, security-focused component that conditionally renders content only when 
          a user is authenticated. Perfect for protecting sensitive UI elements and creating 
          progressive user experiences.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <div className="text-green-400">
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
          Simply wrap any content that should only be visible to authenticated users. The component 
          automatically handles the authentication check and rendering logic.
        </p>
        <CodeBlock code={basicUsageCode} language="jsx" />
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
            <CheckCircle className="w-4 h-4" />
            Automatic Auth Checking
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            The component automatically checks <code className="text-green-300">localStorage</code> 
            for <code className="text-green-300">userInfo</code> and validates that it exists and 
            is not <code className="text-green-300">"undefined"</code>.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {authFlow.map((step, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-semibold text-sm">{step.step}</span>
              </div>
              <div className="flex justify-center mb-2 text-blue-400">
                {step.icon}
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
            <Shield className="w-4 h-4" />
            Security Note
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            This component provides client-side content protection. For sensitive data, always 
            implement server-side authentication checks and API authorization.
          </p>
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

      {/* Use Cases */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          Common Use Cases
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-white text-lg mb-2">{useCase.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{useCase.description}</p>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-xs text-purple-300 font-mono">{useCase.example}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditional Rendering */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
          Conditional Rendering Patterns
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Use different patterns to show content to authenticated users and fallbacks to others.
        </p>
        <CodeBlock code={conditionalRenderingCode} language="jsx" />
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-orange-400 font-semibold mb-2 text-sm sm:text-base">
            <User className="w-4 h-4" />
            Pattern Explanation
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            When <code className="text-orange-300">children</code> is <code className="text-orange-300">null</code>, 
            the component renders nothing, allowing you to structure conditional content with public fallbacks.
          </p>
        </div>
      </section>

      {/* Default Content */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0" />
          Default Content & Styling
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          When no children are provided, the component shows a beautifully styled default content block.
        </p>
        <CodeBlock code={defaultContentCode} language="jsx" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border-2 border-green-500/30 rounded-xl p-6">
            <h4 className="text-green-400 font-semibold mb-3 text-lg">Default Styling</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Green accent border</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Responsive padding and margins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Rounded corners (8px border radius)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Clear visual hierarchy</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-3 text-lg">Custom Content</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Complete design control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Any React components</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Complex layouts supported</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Integration with your design system</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Advanced Usage & Performance
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          For optimal performance with expensive components, use React memoization and strategic rendering.
        </p>
        <CodeBlock code={advancedUsageCode} language="jsx" />
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
            <Zap className="w-4 h-4" />
            Performance Optimization
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 mb-3">
            The authentication check is lightweight, but wrapping expensive components can benefit from:
          </p>
          <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span><code className="text-green-300">React.memo</code> for expensive children</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span><code className="text-green-300">useMemo</code> for complex computations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Lazy loading with <code className="text-green-300">React.lazy</code></span>
            </li>
          </ul>
        </div>
      </section>

      {/* Integration Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          Complete Integration Example
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Full example showing integration with login flow, state management, and authentication lifecycle.
        </p>
        <CodeBlock code={integrationExampleCode} language="jsx" />
      </section>

      {/* Best Practices */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-4 text-lg sm:text-xl">
          <Shield className="w-5 h-5" />
          Security Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Client-Side Protection:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Hide sensitive UI from unauthenticated users</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Prevent flash of protected content</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Graceful degradation for errors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Cross-tab authentication sync</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Server-Side Requirements:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span>Always validate API requests server-side</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span>Protect sensitive data endpoints</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span>Implement proper session management</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span>Use HTTPS in production</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg sm:text-xl">
          <Shield className="w-5 h-5" />
          Error Handling & Reliability
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Built-in Safeguards:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Try-catch around localStorage access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Validation for "undefined" strings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Null-safe userInfo checking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Silent failure on errors</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">User Experience:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>No content flash during checks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Immediate rendering decision</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Consistent behavior across browsers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Private browsing mode support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg sm:text-xl">
          <CheckCircle className="w-5 h-5" />
          Implementation Ready!
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3">
          The ReactSignInComponent provides robust conditional rendering for authenticated content:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Automatic authentication checking with localStorage integration</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Flexible content rendering with beautiful default styling</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Robust error handling for various edge cases</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Lightweight implementation with minimal performance impact</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Seamless integration with Authix authentication ecosystem</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactSignInComponentDocs;