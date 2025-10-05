// src/pages/docs/components/ReactUserSignUp.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  UserPlus,
  Palette,
  Settings,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Code,
  Zap,
  Shield,
  Loader2
} from "lucide-react";

const ReactUserSignUpDocs = () => {
  const basicUsageCode = `import { ReactUserSignUp } from "@neuctra/authix";

// Basic usage
function SignupPage() {
  return (
    <ReactUserSignUp
      onSuccess={(user) => {
        console.log("Signup successful:", user);
        // Redirect user or update app state
      }}
      onError={(error) => {
        console.error("Signup failed:", error);
        // Show error message to user
      }}
    />
  );
}`;

  const fullPropsCode = `import { ReactUserSignUp } from "@neuctra/authix";

// Full customization
function CustomSignupPage() {
  return (
    <ReactUserSignUp
      // Branding
      logoUrl="/logo.png"
      title="Join Our Platform"
      subtitle="Create your account to get started"
      footerText="Your custom footer text"
      
      // Styling
      primaryColor="#00C214"
      gradient="linear-gradient(135deg, #22c55e, #00C214)"
      darkMode={true}
      
      // Features
      showAvatar={true}
      
      // Navigation
      loginUrl="/login"
      
      // Callbacks
      onSuccess={(user) => {
        console.log("User created:", user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/dashboard';
      }}
      onError={(error) => {
        console.error("Signup error:", error);
        alert('Signup failed: ' + error.message);
      }}
    />
  );
}`;

  const integrationExampleCode = `import { ReactUserSignUp, ReactUserLogin } from "@neuctra/authix";
import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <ReactUserLogin
            darkMode={false}
            signupUrl="#"
            onSuccess={(user) => {
              console.log('Logged in:', user);
              localStorage.setItem('user', JSON.stringify(user));
            }}
          />
        ) : (
          <ReactUserSignUp
            darkMode={false}
            loginUrl="#"
            showAvatar={true}
            onSuccess={(user) => {
              console.log('Signed up:', user);
              localStorage.setItem('user', JSON.stringify(user));
            }}
          />
        )}
        
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
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
      default: '"Create Your Account"',
      description: "Main heading text for the signup form"
    },
    {
      name: "subtitle",
      type: "string",
      default: '"Join our platform today"',
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
      name: "showAvatar",
      type: "boolean",
      default: "false",
      description: "Show optional avatar URL field with preview"
    },
    {
      name: "loginUrl",
      type: "string",
      default: "undefined",
      description: "URL for the 'Already have an account?' link"
    },
    {
      name: "onSuccess",
      type: "(user: any) => void",
      default: "undefined",
      description: "Callback function when signup is successful"
    },
    {
      name: "onError",
      type: "(error: any) => void",
      default: "undefined",
      description: "Callback function when signup fails"
    }
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "User Registration",
      description: "Complete signup form with name, email, and password"
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: "Avatar Support",
      description: "Optional avatar URL field with live preview"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Password Visibility",
      description: "Toggle password visibility for better usability"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Form Validation",
      description: "Built-in validation for all required fields"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Responsive",
      description: "Perfectly adapts to all screen sizes"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Error Handling",
      description: "Comprehensive error states and success messages"
    }
  ];

  const validationRules = [
    {
      field: "Name",
      rules: ["Required field", "Accepts any text input"]
    },
    {
      field: "Email",
      rules: ["Required field", "Valid email format", "Real-time validation"]
    },
    {
      field: "Password",
      rules: ["Required field", "Minimum 6 characters", "Visibility toggle"]
    },
    {
      field: "Avatar URL",
      rules: ["Optional field", "URL format validation", "Live image preview"]
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400 flex-shrink-0" />
          ReactUserSignUp Component
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          A beautiful, fully-featured signup component that handles user registration, 
          form validation, and avatar management out of the box. No API calls needed!
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
          Get started with minimal configuration. The component handles all signup logic automatically.
        </p>
        <CodeBlock code={basicUsageCode} language="jsx" />
      </section>

      {/* Validation Rules */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
          Built-in Validation
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          The component includes comprehensive form validation with real-time error feedback.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validationRules.map((rule, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-white text-sm sm:text-base mb-3">{rule.field}</h4>
              <ul className="space-y-2">
                {rule.rules.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
          Customize every aspect of the signup form to match your brand, including optional avatar support.
        </p>
        <CodeBlock code={fullPropsCode} language="jsx" />
      </section>

      {/* Integration Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Code className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
          Auth Flow Integration
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Combine with ReactUserLogin to create a complete authentication flow in your application.
        </p>
        <CodeBlock code={integrationExampleCode} language="jsx" />
      </section>

      {/* Live Demo Preview */}
      <section className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Component Preview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">With Avatar Field</h3>
            <div className="bg-black border border-white/10 rounded-xl p-6 flex justify-center">
              <div className="scale-90 transform origin-center">
                <div className="bg-black rounded-lg p-6 border border-white/10 min-w-[280px]">
                  <div className="text-center mb-4">
                    <User className="w-10 h-10 text-green-400 mx-auto mb-2" />
                    <h3 className="text-white font-bold text-xl">Create Your Account</h3>
                    <p className="text-gray-400 text-sm">Join our platform today</p>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Enter your full name" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-10 text-white text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Enter your email address" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-10 text-white text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="password"
                        placeholder="Create a secure password" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-10 text-white text-sm"
                      />
                      <Eye className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                    <div className="relative">
                      <Image className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Avatar URL (optional)" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-10 text-white text-sm"
                      />
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold">
                      Create Account
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
                    <h3 className="text-gray-900 font-bold text-xl">Create Your Account</h3>
                    <p className="text-gray-600 text-sm">Join our platform today</p>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Enter your full name" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-10 text-gray-900 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        placeholder="Enter your email address" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-10 text-gray-900 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="password"
                        placeholder="Create a secure password" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-10 text-gray-900 text-sm"
                      />
                      <Eye className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold">
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Feature Details */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-3 text-lg sm:text-xl">
          <Image className="w-5 h-5" />
          Avatar URL Feature
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Features:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Optional field (not required for signup)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Live image preview as user types</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Automatic error handling for invalid URLs</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Usage:</h4>
            <CodeBlock 
              code={`<ReactUserSignUp \n  showAvatar={true} \n  // ... other props \n/>`} 
              language="jsx"
              className="text-xs"
            />
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
          The ReactUserSignUp component is ready to drop into your application. It automatically:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Handles user registration with your Authix backend</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Validates all form fields in real-time</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Manages optional avatar URLs with preview</span>
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

export default ReactUserSignUpDocs;