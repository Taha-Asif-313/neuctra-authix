// src/pages/docs/setup/ReactSetup.jsx

import React from "react";
import {
  Download,
  Shield,
  Zap,
  CheckCircle,
  Package,
  FileText,
  Lock,
} from "lucide-react";
import CodeBlock from "../../../components/docs/CodeBlock";

const ReactSetupDocs = () => {
  const installationCode = `npm install @neuctra/authix

# or with yarn
yarn add @neuctra/authix

# or with pnpm
pnpm add @neuctra/authix`;

  const createInstanceCode = `// src/neuctraAuthixInit.js

import { NeuctraAuthix } from "@neuctra/authix";

// Initialize with your app credentials
export const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "your-api-key",
  appId: "your-app-id"
});`;

  const providerSetupCode = `// main.jsx or index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { AuthixProvider } from "@neuctra/authix";
import App from "./App";
import { authix } from "./neuctraAuthixInit";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthixProvider authix={authix}>
    <App />
  </AuthixProvider>
);`;

  const envExampleCode = `# .env (Do NOT commit this file)

VITE_AUTHIX_BASE_URL=https://server.authix.neuctra.com/api
VITE_AUTHIX_API_KEY=your-api-key
VITE_AUTHIX_APP_ID=your-app-id`;

  const envInstanceCode = `// src/neuctraAuthixInit.js

import { NeuctraAuthix } from "@neuctra/authix";

// Initialize using environment variables
export const authix = new NeuctraAuthix({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});`;

  const setupSteps = [
    {
      step: "1",
      title: "Install Package",
      description: "Install @neuctra/authix",
    },
    {
      step: "2",
      title: "Create Authix Instance",
      description: "Create neuctraAuthixInit.js and export authix",
    },
    {
      step: "3",
      title: "Wrap with Provider",
      description: "Wrap your app with <AuthixProvider>",
    },
    {
      step: "4",
      title: "Start Building",
      description: "Use Authix features anywhere in your app",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <Shield className="w-8 h-8 text-blue-400" />
          React SDK Setup
        </h1>

        <p className="text-lg text-gray-400 max-w-4xl">
          Install Authix, create an instance, and wrap your application with
          AuthixProvider to enable authentication and user features across your
          entire app.
        </p>
      </div>

      {/* Quick Setup */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Zap className="w-6 h-6 text-yellow-400" />
          Quick Setup Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {setupSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-semibold text-sm">
                  {step.step}
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Download className="w-6 h-6 text-green-400" />
          Installation
        </h2>

        <CodeBlock code={installationCode} language="bash" />

        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2">
            <Package className="w-4 h-4" />
            Package Info
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              <strong>Package:</strong> @neuctra/authix
            </li>
            <li>
              <strong>Dependencies:</strong> React 16.8+
            </li>
            <li>
              <strong>Tree-shakeable:</strong> Yes
            </li>
          </ul>
        </div>
      </section>

      {/* Create Instance */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <FileText className="w-6 h-6 text-purple-400" />
          Create Authix Instance
        </h2>

        <p className="text-gray-400">
          Create a single initialization file where you configure and export
          your Authix instance.
        </p>

        <CodeBlock code={createInstanceCode} language="javascript" />
      </section>

      {/* Environment Variables */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Lock className="w-6 h-6 text-green-400" />
          Environment Variables (Recommended)
        </h2>

        <CodeBlock code={envExampleCode} language="bash" />
        <CodeBlock code={envInstanceCode} language="javascript" />
      </section>

      {/* Provider Setup */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Shield className="w-6 h-6 text-blue-400" />
          Wrap with AuthixProvider
        </h2>

        <p className="text-gray-400">
          Wrap your entire application and pass the authix instance.
        </p>

        <CodeBlock code={providerSetupCode} language="jsx" />

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="text-blue-400 font-semibold mb-2">Important</h4>
          <p className="text-sm text-gray-300">
            The <code>authix</code> instance must be passed to
            <code> AuthixProvider </code>
            so authentication and user data features work throughout your app.
          </p>
        </div>
      </section>

      {/* Ready Section */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-xl">
          <CheckCircle className="w-5 h-5" />
          You're Ready 🚀
        </h3>

        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Use Authix login & signup methods</li>
          <li>• Store and retrieve user data</li>
          <li>• Protect routes with authentication</li>
          <li>• Manage user sessions securely</li>
        </ul>
      </section>
    </div>
  );
};

export default ReactSetupDocs;
