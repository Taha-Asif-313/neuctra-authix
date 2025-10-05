// src/pages/docs/Installation.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";


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
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">⚙️ Installation & Setup</h1>
      
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-blue-400 font-semibold mb-3">📋 Before You Start</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>Get your <strong>API Key</strong> from the Authix dashboard</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>Get your <strong>App ID</strong> from the Authix dashboard</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>Use <code className="bg-black/30 px-1 py-0.5 rounded">https://authix.neuctra.com/api</code> as your base URL</span>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Install the Package</h2>
          <p className="text-gray-400 mb-4">
            Choose your preferred package manager to install Authix SDK:
          </p>
          <CodeBlock tabs={installTabs} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. SDK Configuration</h2>
          <p className="text-gray-400 mb-4">
            Initialize the SDK with your app credentials. You only need to do this once in your app.
          </p>
          <CodeBlock code={setupCode} language="typescript" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Quick Start Example</h2>
          <p className="text-gray-400 mb-4">
            Here's a complete example to get you started immediately:
          </p>
          <CodeBlock code={quickStartCode} language="typescript" />
        </section>

        <section className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
          <h3 className="text-green-400 font-semibold mb-3">🎉 You're All Set!</h3>
          <p className="text-gray-300 text-sm">
            You've successfully installed and configured Authix. Now you can:
          </p>
          <ul className="text-sm text-gray-300 mt-2 space-y-1">
            <li>• Create user accounts with <code>authix.signup()</code></li>
            <li>• Authenticate users with <code>authix.login()</code></li>
            <li>• Manage user profiles with <code>authix.updateUser()</code></li>
            <li>• Store custom user data with <code>authix.addUserData()</code></li>
            <li>• Implement security features like password reset and email verification</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AuthixSdkInstallation;