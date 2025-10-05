// src/pages/docs/components/ReactUserLogin.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  LogIn,
  Palette,
  Settings,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Code,
  Zap
} from "lucide-react";

const ReactUserLoginDocs = () => {
  const basicUsageCode = `import { ReactUserLogin } from "@neuctra/authix";

// Basic usage
function LoginPage() {
  return (
    <ReactUserLogin
      onSuccess={(user) => {
        console.log("Login successful:", user);
        // Redirect user or update app state
      }}
      onError={(error) => {
        console.error("Login failed:", error);
        // Show error message to user
      }}
    />
  );
}`;

  const fullPropsCode = `import { ReactUserLogin } from "@neuctra/authix";

// Full customization
function CustomLoginPage() {
  return (
    <ReactUserLogin
      // Branding
      logoUrl="/logo.png"
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
      footerText="Your custom footer text"
      
      // Styling
      primaryColor="#00C214"
      gradient="linear-gradient(135deg, #22c55e, #00C214)"
      darkMode={true}
      
      // Navigation
      signupUrl="/signup"
      
      // Callbacks
      onSuccess={(user) => {
        console.log("User logged in:", user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/dashboard';
      }}
      onError={(error) => {
        console.error("Login error:", error);
        alert('Login failed: ' + error.message);
      }}
    />
  );
}`;

  const integrationExampleCode = `import { ReactUserLogin } from "@neuctra/authix";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (user) {
    return <Dashboard user={user} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ReactUserLogin
        darkMode={false}
        primaryColor="#3B82F6"
        onSuccess={(user) => {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        }}
        onError={(error) => {
          console.error('Login failed:', error);
        }}
      />
    </div>
  );
}`;

  const propsTable = [
    {
      name: "logoUrl",
      type: "string",
      default: "undefined",
      description: "URL to your logo image. If not provided, shows a user icon"
    },
    {
      name: "title",
      type: "string",
      default: '"Sign In to Your Account"',
      description: "Main heading text for the login form"
    },
    {
      name: "subtitle",
      type: "string",
      default: '"Welcome back! Please enter your details"',
      description: "Subtitle text below the main heading"
    },
    {
      name: "footerText",
      type: "string",
      default: '"Secure authentication powered by Neuctra Authix"',
      description: "Footer text at the bottom of the form"
    },
    {
      name: "primaryColor",
      type: "string",
      default: '"#00C214"',
      description: "Primary brand color for buttons, links, and accents"
    },
    {
      name: "gradient",
      type: "string",
      default: '"linear-gradient(135deg, #22c55e, #00C214)"',
      description: "CSS gradient for the submit button"
    },
    {
      name: "darkMode",
      type: "boolean",
      default: "true",
      description: "Toggle between dark and light theme"
    },
    {
      name: "signupUrl",
      type: "string",
      default: "undefined",
      description: "URL for the 'Create new account' link"
    },
    {
      name: "onSuccess",
      type: "(user: any) => void",
      default: "undefined",
      description: "Callback function when login is successful"
    },
    {
      name: "onError",
      type: "(error: any) => void",
      default: "undefined",
      description: "Callback function when login fails"
    }
  ];

  const features = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Password Visibility Toggle",
      description: "Users can show/hide password for better usability"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Forgot Password Flow",
      description: "Built-in password reset with OTP verification"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Responsive",
      description: "Automatically adapts to different screen sizes"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Fully Customizable",
      description: "Colors, text, and styling can be easily customized"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Zero Configuration",
      description: "Works out of the box with your Authix SDK config"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Error Handling",
      description: "Built-in error states and success messages"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-3xl lg:text-4xl font-bold text-white">
          <LogIn className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
          ReactUserLogin Component
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          A beautiful, fully-featured login component that handles authentication, 
          password reset, and user experience out of the box. No API calls needed!
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
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Basic Usage
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Get started with minimal configuration. The component works out of the box with your existing Authix SDK configuration.
        </p>
        <CodeBlock code={basicUsageCode} language="jsx" />
      </section>

      {/* Props Documentation */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          Props & Customization
        </h2>
        
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Prop</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Type</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Default</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {propsTable.map((prop, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 font-mono text-blue-400 text-xs sm:text-sm">{prop.name}</td>
                    <td className="p-3 sm:p-4 font-mono text-green-400 text-xs sm:text-sm">{prop.type}</td>
                    <td className="p-3 sm:p-4 font-mono text-yellow-400 text-xs sm:text-sm">{prop.default}</td>
                    <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full Customization Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
          Full Customization
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Customize every aspect of the login form to match your brand and application design.
        </p>
        <CodeBlock code={fullPropsCode} language="jsx" />
      </section>

      {/* Integration Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Code className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
          Real-world Integration
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Here's how you might integrate the login component into a real application with user state management.
        </p>
        <CodeBlock code={integrationExampleCode} language="jsx" />
      </section>

      {/* Live Demo Preview */}
      <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
          Component Preview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Dark Mode</h3>
            <div className="bg-black border border-white/10 rounded-xl p-6 flex justify-center">
              <div className="scale-90 transform origin-center">
                {/* This would be your actual component in a real scenario */}
                <div className="bg-black rounded-lg p-6 border border-white/10 min-w-[280px]">
                  <div className="text-center mb-4">
                    <User className="w-10 h-10 text-green-400 mx-auto mb-2" />
                    <h3 className="text-white font-bold text-xl">Sign In to Your Account</h3>
                    <p className="text-gray-400 text-sm">Welcome back! Please enter your details</p>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Enter your email" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-10 text-white text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="password"
                        placeholder="Enter your password" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-10 text-white text-sm"
                      />
                      <Eye className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Light Mode</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-center">
              <div className="scale-90 transform origin-center">
                <div className="bg-white rounded-lg p-6 border border-gray-200 min-w-[280px]">
                  <div className="text-center mb-4">
                    <User className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <h3 className="text-gray-900 font-bold text-xl">Sign In to Your Account</h3>
                    <p className="text-gray-600 text-sm">Welcome back! Please enter your details</p>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Enter your email" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-10 text-gray-900 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="password"
                        placeholder="Enter your password" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-10 text-gray-900 text-sm"
                      />
                      <Eye className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
          The ReactUserLogin component is ready to drop into your application. It automatically:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Handles login authentication with your Authix backend</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Manages password reset flow with OTP verification</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Provides responsive design for all devices</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Includes built-in error handling and loading states</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserLoginDocs;