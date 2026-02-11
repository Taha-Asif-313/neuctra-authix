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
  AlertTriangle
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

  const envExample = `# .env
VITE_AUTHIX_API_KEY=your_api_key_here
VITE_AUTHIX_APP_ID=your_app_id_here`;

  const setupCode = `import { NeuctraAuthix } from "@neuctra/authix";

export const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID,
});`;

  const quickStartCode = `import { authix } from "./authixInit";

// Signup
export const signup = async (name, email, password) => {
  return await authix.signupUser({
    name,
    email,
    password,
  });
};

// Login
export const login = async (email, password) => {
  return await authix.loginUser({
    email,
    password,
  });
};`;

  return (
    <div className="space-y-8 text-gray-300">

      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl lg:text-4xl font-bold text-white">
          <Settings className="w-8 h-8 text-blue-400" />
          Installation & Setup
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Follow these steps to install and configure <strong>Neuctra Authix</strong> securely in your application.
          Setup takes less than 5 minutes.
        </p>
      </div>

      {/* Step 0 */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold text-lg mb-4">
          <Wrench className="w-5 h-5" />
          Before You Start
        </h3>

        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400" />
            Get your <strong>API Key</strong> from the Authix Dashboard
          </li>
          <li className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-400" />
            Get your <strong>App ID</strong> from the Dashboard
          </li>
          <li className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-400" />
            Base URL: <code className="bg-black/30 px-2 py-1 rounded text-xs">https://server.authix.neuctra.com/api</code>
          </li>
        </ul>
      </section>

      {/* Step 1 */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
          <Download className="w-6 h-6 text-green-400" />
          Step 1: Install the SDK
        </h2>

        <CodeBlock tabs={installTabs} />
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
          <Shield className="w-6 h-6 text-purple-400" />
          Step 2: Add Environment Variables (Recommended)
        </h2>

        <p className="text-gray-400 text-sm">
          Never hardcode API keys in your source code. Use environment variables instead.
        </p>

        <CodeBlock code={envExample} language="bash" />
      </section>

      {/* Step 3 */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
          <Settings className="w-6 h-6 text-orange-400" />
          Step 3: Initialize Authix
        </h2>

        <p className="text-gray-400 text-sm">
          Create a single instance and export it for use across your application.
        </p>

        <CodeBlock code={setupCode} language="typescript" />
      </section>

      {/* Step 4 */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
          <Rocket className="w-6 h-6 text-red-400" />
          Step 4: Start Authenticating Users
        </h2>

        <CodeBlock code={quickStartCode} language="typescript" />
      </section>

      {/* Production Tips */}
      <section className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 text-yellow-400 font-semibold text-lg mb-4">
          <AlertTriangle className="w-5 h-5" />
          Production Tips
        </h3>

        <ul className="space-y-3 text-sm text-gray-300">
          <li>• Always validate user input before calling SDK methods</li>
          <li>• Handle errors using try/catch blocks</li>
          <li>• Never expose secret keys in public repositories</li>
          <li>• Store session tokens securely (httpOnly cookies recommended)</li>
        </ul>
      </section>

      {/* Final CTA */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold text-lg mb-4">
          <CheckCircle className="w-5 h-5" />
          You're Ready 🚀
        </h3>

        <p className="text-sm text-gray-300 mb-4">
          Authix is now fully installed and configured. You can start building secure authentication flows immediately.
        </p>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-green-400" />
            Create users → <code className="bg-black/30 px-1 rounded text-xs">signupUser()</code>
          </li>
          <li className="flex items-center gap-2">
            <LogIn className="w-4 h-4 text-green-400" />
            Login users → <code className="bg-black/30 px-1 rounded text-xs">loginUser()</code>
          </li>
          <li className="flex items-center gap-2">
            <User className="w-4 h-4 text-green-400" />
            Update profiles → <code className="bg-black/30 px-1 rounded text-xs">updateUser()</code>
          </li>
          <li className="flex items-center gap-2">
            <Database className="w-4 h-4 text-green-400" />
            Store user data → <code className="bg-black/30 px-1 rounded text-xs">addUserData()</code>
          </li>
        </ul>
      </section>

    </div>
  );
};

export default AuthixSdkInstallation;
