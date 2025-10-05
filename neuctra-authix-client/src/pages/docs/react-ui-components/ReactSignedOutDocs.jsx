// src/pages/docs/components/ReactSignedOut.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  LogOut,
  User,
  Zap,
  Code,
  Palette,
  Smartphone,
  Link2,
  Download,
  Upload,
  Bell,
  Settings,
  ArrowRight
} from "lucide-react";

const ReactSignedOutDocs = () => {
  const basicUsageCode = `import { ReactSignedOut } from "@neuctra/authix";

// Basic usage - shows content only when signed out
function HomePage() {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Our App</h1>
      </header>
      
      <ReactSignedOut>
        <div className="signup-cta">
          <h2>Join Our Community</h2>
          <p>Sign up to access exclusive features and content.</p>
          <button>Get Started</button>
        </div>
      </ReactSignedOut>
      
      <footer>
        <p>© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}`;

  const conditionalRenderingCode = `import { ReactSignedOut } from "@neuctra/authix";

// Conditional rendering with authentication flow
function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>MyApp</h1>
      </div>
      
      <div className="nav-actions">
        {/* Show auth buttons only when signed out */}
        <ReactSignedOut>
          <div className="auth-buttons">
            <button className="login-btn">Sign In</button>
            <button className="signup-btn">Get Started</button>
          </div>
        </ReactSignedOut>
        
        {/* Show user menu when signed in */}
        <ReactSignedOut>
          {null}
        </ReactSignedOut>
        <div className="user-menu">
          {/* User menu content for authenticated users */}
        </div>
      </div>
    </nav>
  );
}`;

  const defaultContentCode = `import { ReactSignedOut } from "@neuctra/authix";

// Using default content for signed-out state
function LandingPage() {
  return (
    <div className="landing-page">
      <ReactSignedOut>
        {/* Custom sign-out content */}
        <div className="premium-cta">
          <h2>Unlock Premium Features</h2>
          <p>Create an account to get started with our advanced tools.</p>
          <div className="feature-list">
            <div>✓ Advanced Analytics</div>
            <div>✓ Priority Support</div>
            <div>✓ Custom Templates</div>
          </div>
        </div>
      </ReactSignedOut>
      
      <ReactSignedOut>
        {/* Shows default signed-out content */}
      </ReactSignedOut>
    </div>
  );
}`;

  const integrationExampleCode = `import { ReactSignedOut, ReactUserLogin } from "@neuctra/authix";
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

  return (
    <div className="app">
      {/* Header with conditional content */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">MyApp</div>
          
          <ReactSignedOut>
            <div className="header-actions">
              <button onClick={() => document.getElementById('login-modal').showModal()}>
                Sign In
              </button>
              <button className="primary">Sign Up</button>
            </div>
          </ReactSignedOut>
        </div>
      </header>

      <main className="app-main">
        {/* Hero section only for signed-out users */}
        <ReactSignedOut>
          <section className="hero">
            <div className="hero-content">
              <h1>Welcome to MyApp</h1>
              <p>Transform your workflow with our powerful tools.</p>
              <div className="hero-actions">
                <button className="primary">Start Free Trial</button>
                <button>View Demo</button>
              </div>
            </div>
          </section>
        </ReactSignedOut>

        {/* Features section for all users */}
        <section className="features">
          <h2>Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Analytics</h3>
              <p>Track your performance with detailed insights</p>
            </div>
            <div className="feature-card">
              <h3>Automation</h3>
              <p>Automate repetitive tasks and save time</p>
            </div>
            <div className="feature-card">
              <h3>Collaboration</h3>
              <p>Work together with your team seamlessly</p>
            </div>
          </div>
        </section>

        {/* Login modal */}
        <dialog id="login-modal">
          <div className="modal-content">
            <ReactUserLogin onSuccess={handleLoginSuccess} />
          </div>
        </dialog>
      </main>
    </div>
  );
}`;

  const advancedUsageCode = `import { ReactSignedOut } from "@neuctra/authix";
import { useMemo } from "react";

function MarketingPage({ userData }) {
  // Memoize expensive marketing content
  const marketingContent = useMemo(() => (
    <div className="marketing-content">
      <div className="testimonial-section">
        <h2>Loved by Thousands</h2>
        <TestimonialCarousel />
      </div>
      <div className="pricing-section">
        <h2>Choose Your Plan</h2>
        <PricingTable />
      </div>
      <div className="integration-section">
        <h2>Works With Your Tools</h2>
        <IntegrationGrid />
      </div>
    </div>
  ), []);

  return (
    <div className="marketing-page">
      {/* Public header */}
      <header className="public-header">
        <nav>
          <div className="nav-logo">MyApp</div>
          <ReactSignedOut>
            <div className="nav-cta">
              <a href="/login">Sign In</a>
              <a href="/signup" className="cta-button">Get Started</a>
            </div>
          </ReactSignedOut>
        </nav>
      </header>

      {/* Conditionally render marketing content */}
      <ReactSignedOut>
        {marketingContent}
      </ReactSignedOut>

      {/* For authenticated users, show dashboard redirect */}
      <ReactSignedOut>
        {null}
      </ReactSignedOut>
      <div className="authenticated-redirect">
        <h2>Welcome Back!</h2>
        <p>You're already signed in. Head to your dashboard to continue.</p>
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    </div>
  );
}`;

  const multiComponentCode = `import { ReactSignedOut, ReactSignedIn } from "@neuctra/authix";

function SmartNavigation() {
  return (
    <nav className="smart-nav">
      <div className="nav-brand">
        <h1>MyApp</h1>
      </div>
      
      <div className="nav-content">
        {/* Public navigation items */}
        <ReactSignedOut>
          <div className="public-nav">
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/about">About</a>
          </div>
        </ReactSignedOut>
        
        {/* Private navigation items */}
        <ReactSignedIn>
          <div className="private-nav">
            <a href="/dashboard">Dashboard</a>
            <a href="/projects">Projects</a>
            <a href="/team">Team</a>
          </div>
        </ReactSignedIn>
        
        {/* Auth section */}
        <div className="nav-auth">
          <ReactSignedOut>
            <div className="auth-buttons">
              <a href="/login" className="login-btn">Sign In</a>
              <a href="/signup" className="signup-btn">Sign Up</a>
            </div>
          </ReactSignedOut>
          
          <ReactSignedIn>
            <div className="user-section">
              <UserAvatar />
              <UserDropdown />
            </div>
          </ReactSignedIn>
        </div>
      </div>
    </nav>
  );
}`;

  const propsTable = [
    {
      name: "children",
      type: "ReactNode",
      required: "No",
      default: "Default signed-out content",
      description: "Content to render when user is not authenticated. If not provided, shows default styled content with blue accent."
    }
  ];

  const features = [
    {
      icon: <EyeOff className="w-5 h-5" />,
      title: "Inverse Conditional Rendering",
      description: "Renders content only when user is NOT authenticated"
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      title: "Public Content Management",
      description: "Perfect for marketing pages, sign-up CTAs, and public features"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightweight Check",
      description: "Efficient localStorage verification with minimal performance impact"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Zero Configuration",
      description: "Works seamlessly with Authix authentication out of the box"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Flexible Content",
      description: "Accept custom children or use built-in default content"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Blue Accent Styling",
      description: "Beautiful default styling with blue accent borders for public content"
    }
  ];

  const useCases = [
    {
      title: "Marketing Pages",
      description: "Show hero sections, CTAs, and feature highlights to new visitors",
      example: "Landing pages, pricing pages, feature tours"
    },
    {
      title: "Authentication Prompts",
      description: "Display sign-in/sign-up buttons and authentication flows",
      example: "Login modals, registration forms, OAuth prompts"
    },
    {
      title: "Public Navigation",
      description: "Show public navigation items and hide private sections",
      example: "Public menu items, documentation links, support pages"
    },
    {
      title: "Content Gating",
      description: "Restrict premium content and show upgrade prompts",
      example: "Feature teasers, trial limitations, upgrade CTAs"
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
      title: "Inverse Render Decision",
      description: "Renders children if NOT authenticated, null otherwise",
      icon: <EyeOff className="w-4 h-4" />
    },
    {
      step: "4",
      title: "Error Handling",
      description: "Gracefully handles localStorage errors as unauthenticated",
      icon: <Shield className="w-4 h-4" />
    }
  ];

  const complementaryComponents = [
    {
      name: "ReactSignedIn",
      description: "Renders content only when user IS authenticated",
      useCase: "Protected content, user dashboards, private features"
    },
    {
      name: "ReactUserButton",
      description: "User profile dropdown with menu and logout",
      useCase: "Navigation bars, header menus, user settings access"
    },
    {
      name: "ReactUserLogin",
      description: "Complete login form with authentication",
      useCase: "Login pages, authentication modals, sign-in flows"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <LogOut className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
          ReactSignedOut Component
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          The inverse companion to ReactSignedIn - conditionally renders content only when 
          users are NOT authenticated. Perfect for marketing content, sign-up prompts, and public 
          features that should disappear once users log in.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <div className="text-blue-400">
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
          Wrap any content that should only be visible to signed-out users. Perfect for 
          call-to-action sections, sign-up prompts, and public marketing content.
        </p>
        <CodeBlock code={basicUsageCode} language="jsx" />
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
            <CheckCircle className="w-4 h-4" />
            Inverse Authentication Logic
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            The component uses the same robust auth checking as <code className="text-blue-300">ReactSignedIn</code> 
            but inverts the logic - rendering content only when <code className="text-blue-300">userInfo</code> is 
            missing or invalid in <code className="text-blue-300">localStorage</code>.
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
            Complementary Security
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            Use <code className="text-blue-300">ReactSignedOut</code> alongside <code className="text-blue-300">ReactSignedIn</code> 
            to create comprehensive authentication-based UI flows that seamlessly adapt to user login states.
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
          <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          Common Use Cases
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-white text-lg mb-2">{useCase.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{useCase.description}</p>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-xs text-blue-300 font-mono">{useCase.example}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditional Rendering */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Conditional Rendering Patterns
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Create sophisticated UI flows that adapt to authentication state. Perfect for navigation,
          feature gating, and progressive user experiences.
        </p>
        <CodeBlock code={conditionalRenderingCode} language="jsx" />
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
            <User className="w-4 h-4" />
            Smart UI Patterns
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            Combine with <code className="text-green-300">ReactSignedIn</code> to create 
            complementary UI sections that automatically switch between public and private 
            interfaces based on authentication state.
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
          When no children are provided, the component shows a beautifully styled default content 
          block with blue accent styling perfect for public content.
        </p>
        <CodeBlock code={defaultContentCode} language="jsx" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border-2 border-blue-500/30 rounded-xl p-6">
            <h4 className="text-blue-400 font-semibold mb-3 text-lg">Default Styling</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Blue accent border (public content)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Responsive padding and margins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Rounded corners (8px border radius)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Clear visual hierarchy for public content</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-3 text-lg">Custom Content</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Complete design control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Any React components</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Marketing-optimized layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>CTA-focused designs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Multi-Component Usage */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          Multi-Component Integration
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Combine with other Authix components to create comprehensive authentication-aware interfaces.
        </p>
        <CodeBlock code={multiComponentCode} language="jsx" />
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-purple-400 font-semibold mb-3 text-sm sm:text-base">
            <User className="w-4 h-4" />
            Component Ecosystem
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {complementaryComponents.map((component, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <h5 className="font-semibold text-white text-sm mb-1">{component.name}</h5>
                <p className="text-xs text-gray-400 mb-2">{component.description}</p>
                <p className="text-xs text-purple-300">{component.useCase}</p>
              </div>
            ))}
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
          Optimize performance for marketing pages with heavy content using React memoization patterns.
        </p>
        <CodeBlock code={advancedUsageCode} language="jsx" />
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
            <Zap className="w-4 h-4" />
            Marketing Page Optimization
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 mb-3">
            For content-rich marketing pages with carousels, animations, and complex layouts:
          </p>
          <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Memoize expensive marketing components with <code className="text-green-300">useMemo</code></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Lazy load heavy assets and components</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Use complementary components for seamless transitions</span>
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
          Full example showing integration with login flow, state management, and comprehensive 
          public/private content separation.
        </p>
        <CodeBlock code={integrationExampleCode} language="jsx" />
      </section>

      {/* Best Practices */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-4 text-lg sm:text-xl">
          <Shield className="w-5 h-5" />
          Implementation Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">UI/UX Patterns:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Use for public-facing content and CTAs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Combine with ReactSignedIn for complete flows</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Implement smooth transitions between states</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Provide clear paths to authentication</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Performance Considerations:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Memoize expensive public content</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Lazy load marketing assets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Optimize images and media for public pages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Use complementary component patterns</span>
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
                <span>Errors treated as unauthenticated state</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">User Experience:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>No content flash during auth checks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Immediate rendering decision</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Consistent public content display</span>
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
          Ready for Public Content!
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3">
          The ReactSignedOut component provides robust conditional rendering for public-facing content:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Inverse authentication checking - shows content only when signed out</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Perfect for marketing pages, CTAs, and public feature displays</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Beautiful default styling with blue accent borders</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Seamless integration with Authix component ecosystem</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Robust error handling treating errors as unauthenticated state</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactSignedOutDocs;