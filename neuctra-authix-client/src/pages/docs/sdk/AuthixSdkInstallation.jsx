// src/pages/docs/Installation.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Settings,
  Key,
  Hash,
  Link2,
  Download,
  Wrench,
  Rocket,
  CheckCircle,
  Shield,
  UserPlus,
  LogIn,
  User,
  Database,
  Mail
} from "lucide-react";

const AuthixSdkInstallation = () => {
  const installTabs = [
    {
      name: "NPM",
      code: "npm install @neuctra/authix",
      language: "bash"
    },
    {
      name: "Yarn",
      code: "yarn add @neuctra/authix",
      language: "bash"
    },
    {
      name: "PNPM",
      code: "pnpm add @neuctra/authix",
      language: "bash"
    }
  ];

  const setupCode = `import { NeuctraAuthix } from "@neuctra/authix";

// Initialize with your app credentials
const authix = new NeuctraAuthix({
  baseUrl: "https://authix.neuctra.com/api",  // Authix API URL
  apiKey: "your_api_key_here",                // Get from Authix dashboard
  appId: "your_app_id_here"                   // Get from Authix dashboard
});

// Now you're ready to use all Authix features!`;

  const quickStartCode = `// Quick Start Example
import { NeuctraAuthix } from "@neuctra/authix";

const authix = new NeuctraAuthix({
  baseUrl: "https://authix.neuctra.com/api",
  apiKey: "your_api_key",
  appId: "your_app_id"
});

// Sign up a new user
async function createUser() {
  try {
    const user = await authix.signup({
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "securePassword123"
    });
    console.log("User created:", user);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

createUser();`;

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Settings className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
          Installation & Setup
        </h1>
      </div>

      {/* Before You Start Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 sm:mb-4 text-lg sm:text-xl">
          <Wrench className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          Before You Start
        </h3>
        <ul className="text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-3">
          <li className="flex items-center gap-2 sm:gap-3">
            <Key className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span>Get your <strong>API Key</strong> from the Authix dashboard</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span>Get your <strong>App ID</strong> from the Authix dashboard</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span className="break-all">
              Use <code className="bg-black/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">https://authix.neuctra.com/api</code> as your base URL
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {/* Install Package Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
            1. Install the Package
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Choose your preferred package manager to install Authix SDK:
          </p>
          <CodeBlock tabs={installTabs} />
        </section>

        {/* SDK Configuration Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
            2. SDK Configuration
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Initialize the SDK with your app credentials. You only need to do this once in your app.
          </p>
          <CodeBlock code={setupCode} language="typescript" />
        </section>

        {/* Quick Start Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
            3. Quick Start Example
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Here's a complete example to get you started immediately:
          </p>
          <CodeBlock code={quickStartCode} language="typescript" />
        </section>

        {/* You're All Set Section */}
        <section className="bg-green-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 sm:mb-4 text-lg sm:text-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            You're All Set!
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
            You've successfully installed and configured Authix. Now you can:
          </p>
          <ul className="text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2">
              <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>
                Create user accounts with <code className="bg-black/30 px-1 py-0.5 rounded text-xs">authix.signup()</code>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <LogIn className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>
                Authenticate users with <code className="bg-black/30 px-1 py-0.5 rounded text-xs">authix.login()</code>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>
                Manage user profiles with <code className="bg-black/30 px-1 py-0.5 rounded text-xs">authix.updateUser()</code>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Database className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>
                Store custom user data with <code className="bg-black/30 px-1 py-0.5 rounded text-xs">authix.addUserData()</code>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span>Implement security features like password reset and email verification</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AuthixSdkInstallation;