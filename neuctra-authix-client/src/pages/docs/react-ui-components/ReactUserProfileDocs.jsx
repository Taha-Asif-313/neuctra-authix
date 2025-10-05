// src/pages/docs/components/ReactUserProfile.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  User,
  Edit3,
  Save,
  Camera,
  Key,
  Trash2,
  Shield,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Eye,
  Lock,
  Database,
  Smartphone,
  Palette,
  Settings,
  Zap,
  Download,
  Upload,
  Bell,
  UserCheck,
  Settings2
} from "lucide-react";

const ReactUserProfileDocs = () => {
  const basicUsageCode = `import { ReactUserProfile } from "@neuctra/authix";

// Basic usage with token
function ProfilePage() {
  const userToken = "your_jwt_token_here"; // Get from login response
  
  return (
    <ReactUserProfile 
      token={userToken}
      onUpdate={(user) => {
        console.log("Profile updated:", user);
      }}
    />
  );
}`;

  const withUserPropCode = `import { ReactUserProfile } from "@neuctra/authix";

// Using with pre-loaded user data
function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <ReactUserProfile 
        token={user.token}
        user={user}
        darkMode={false}
        primaryColor="#3B82F6"
      />
    </div>
  );
}`;

  const fullCustomizationCode = `import { ReactUserProfile } from "@neuctra/authix";

function CustomProfilePage() {
  const userToken = localStorage.getItem('userToken');
  const userData = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <ReactUserProfile
      token={userToken}
      user={userData}
      darkMode={true}
      primaryColor="#00C214"
      onUpdate={(updatedUser) => {
        // Handle profile updates
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        showNotification('Profile updated successfully!');
      }}
      onError={(error) => {
        console.error('Profile update failed:', error);
        showNotification('Update failed: ' + error.message, 'error');
      }}
    />
  );
}`;

  const integrationExampleCode = `import { ReactUserProfile, ReactUserLogin } from "@neuctra/authix";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('userInfo');
    const savedToken = localStorage.getItem('userToken');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  if (!user) {
    return (
      <ReactUserLogin
        onSuccess={(loginData) => {
          setUser(loginData.user);
          setToken(loginData.token);
          localStorage.setItem('userInfo', JSON.stringify(loginData.user));
          localStorage.setItem('userToken', loginData.token);
        }}
      />
    );
  }

  return (
    <div className="app-layout">
      <header>
        <h1>Welcome, {user.name}</h1>
        <ReactUserProfile
          token={token}
          user={user}
          darkMode={true}
          primaryColor="#00C214"
          onUpdate={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
          }}
        />
      </header>
    </div>
  );
}`;

  const propsTable = [
    {
      name: "token",
      type: "string",
      required: "Yes",
      default: "-",
      description: "JWT token for authentication (from login response)"
    },
    {
      name: "user",
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
      default: '"#00C214"',
      description: "Primary brand color for buttons and accents"
    }
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Profile Management",
      description: "View and edit personal information in real-time"
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Avatar Upload",
      description: "Change profile picture with URL validation and preview"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Password Change",
      description: "Secure password update with validation"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Account Security",
      description: "Delete account with multi-step confirmation"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Responsive",
      description: "Perfect experience on all devices"
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Real-time Updates",
      description: "Instant feedback with success/error notifications"
    }
  ];

  const userFields = [
    {
      field: "name",
      icon: <User className="w-4 h-4" />,
      type: "text",
      editable: true,
      description: "User's full name"
    },
    {
      field: "email",
      icon: <Mail className="w-4 h-4" />,
      type: "email",
      editable: true,
      description: "Email address (used for login)"
    },
    {
      field: "phone",
      icon: <Phone className="w-4 h-4" />,
      type: "tel",
      editable: true,
      description: "Phone number (optional)"
    },
    {
      field: "address",
      icon: <MapPin className="w-4 h-4" />,
      type: "text",
      editable: true,
      description: "Physical address (optional)"
    },
    {
      field: "avatarUrl",
      icon: <Camera className="w-4 h-4" />,
      type: "url",
      editable: true,
      description: "Profile picture URL"
    }
  ];

  const securityFeatures = [
    {
      title: "Change Password",
      description: "Update password with current password verification",
      steps: ["Enter current password", "Create new password", "Confirm new password"],
      icon: <Key className="w-4 h-4" />
    },
    {
      title: "Delete Account",
      description: "Permanently remove account with safety confirmations",
      steps: ["Warning screen", "Type confirmation phrase", "Processing", "Success"],
      icon: <Trash2 className="w-4 h-4" />
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
          ReactUserProfile Component
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          A comprehensive user profile management component that handles profile editing, 
          avatar updates, password changes, and account deletion with beautiful modals and 
          real-time validation.
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
          The component requires a JWT token for authentication. It automatically handles 
          user data fetching and management.
        </p>
        <CodeBlock code={basicUsageCode} language="jsx" />
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
            <Shield className="w-4 h-4" />
            Token Requirement
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            The <code className="text-blue-300">token</code> prop is required and should be the JWT token 
            received from the login response. This ensures secure communication with your Authix backend.
          </p>
        </div>
      </section>

      {/* User Fields */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Profile Fields
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          The profile component manages these user fields with built-in validation and editing capabilities.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Field</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Type</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Editable</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {userFields.map((field, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center gap-2">
                        <div className="text-blue-400">{field.icon}</div>
                        <span className="font-mono text-blue-300 text-xs sm:text-sm">{field.field}</span>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 font-mono text-green-400 text-xs sm:text-sm">{field.type}</td>
                    <td className="p-3 sm:p-4">
                      {field.editable ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-400 text-xs sm:text-sm">No</span>
                      )}
                    </td>
                    <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Props Documentation */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
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

      {/* Security Features */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          Security Features
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <div className="text-red-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">Process:</h4>
                <ol className="space-y-2 text-sm text-gray-300">
                  {feature.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {stepIndex + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-loaded User Data */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Using Pre-loaded User Data
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          For better performance, you can pass pre-loaded user data to avoid additional API calls.
        </p>
        <CodeBlock code={withUserPropCode} language="jsx" />
      </section>

      {/* Full Customization */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
          Full Customization
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Customize the appearance and behavior to match your application's design system.
        </p>
        <CodeBlock code={fullCustomizationCode} language="jsx" />
      </section>

      {/* Integration Example */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Settings2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
          Complete Integration Example
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Here's how to integrate the profile component into a complete authentication flow.
        </p>
        <CodeBlock code={integrationExampleCode} language="jsx" />
      </section>

      {/* Avatar Feature Details */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-3 text-lg sm:text-xl">
          <Camera className="w-5 h-5" />
          Avatar Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-3">Features:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>URL validation with live preview</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Image format detection (JPG, PNG, GIF, WebP)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Fallback to generated avatar if URL fails</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Real-time validation feedback</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Usage:</h4>
            <div className="bg-black/30 rounded-lg p-4">
              <pre className="text-xs text-gray-200">
                {`// Avatar updates automatically\n// when user provides valid URL\n\n// Fallback avatar uses DiceBear\n// with user's name as seed`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Experience */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg sm:text-xl">
          <Smartphone className="w-5 h-5" />
          Mobile-Optimized Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Responsive Design:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Adaptive layout for all screen sizes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Touch-friendly buttons and inputs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Optimized modal experiences</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Reduced motion support</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Accessibility:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>ARIA labels and roles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Keyboard navigation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Screen reader friendly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>High contrast support</span>
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
          The ReactUserProfile component provides a complete user management solution:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Automatic user data management with localStorage integration</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Beautiful, accessible modals for all operations</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Real-time validation and error handling</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Mobile-responsive design with touch optimization</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Security-first approach with proper confirmations</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserProfileDocs;