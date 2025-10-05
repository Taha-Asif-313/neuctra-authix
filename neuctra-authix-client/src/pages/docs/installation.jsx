import React from "react";
import CodeBlock from "../../components/docs/CodeBlock";
import {
  Download,
  Package,
  Settings,
  Key,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Installation = () => {
  const installTabs = [
    {
      name: "NPM",
      code: "npm install @neuctra/authix-react",
      language: "bash"
    },
    {
      name: "Yarn",
      code: "yarn add @neuctra/authix-react",
      language: "bash"
    },
    {
      name: "PNPM",
      code: "pnpm add @neuctra/authix-react",
      language: "bash"
    }
  ];

  const basicConfigCode = `import { setSdkConfig } from "@neuctra/authix-react";

// Configure once at app startup
setSdkConfig({
  baseUrl: "https://your-auth-api.com/api",
  apiKey: "your-api-key-here",
  appId: "your-app-id-here"
});`;

  const envConfigCode = `import { setSdkConfig } from "@neuctra/authix-react";

// Using environment variables (recommended)
setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});`;

  const completeExampleCode = `// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setSdkConfig } from "@neuctra/authix-react";
import App from './App';

// Configure Authix (do this once)
setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});

// Start your app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;

  const configStructure = [
    {
      field: "baseUrl",
      type: "string",
      required: true,
      description: "Base URL of your Authix API server"
    },
    {
      field: "apiKey",
      type: "string",
      required: true,
      description: "Your application's API key for authentication"
    },
    {
      field: "appId",
      type: "string",
      required: true,
      description: "Unique identifier for your application"
    }
  ];

  const frameworkExamples = [
    {
      name: "Vite",
      code: `// main.jsx
import { setSdkConfig } from "@neuctra/authix-react";

setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});`
    },
    {
      name: "Next.js",
      code: `// app/layout.jsx or pages/_app.js
import { setSdkConfig } from "@neuctra/authix-react";

if (typeof window !== 'undefined') {
  setSdkConfig({
    baseUrl: process.env.NEXT_PUBLIC_AUTHIX_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_AUTHIX_API_KEY,
    appId: process.env.NEXT_PUBLIC_AUTHIX_APP_ID
  });
}`
    },
    {
      name: "Create React App",
      code: `// index.js
import { setSdkConfig } from "@neuctra/authix-react";

setSdkConfig({
  baseUrl: process.env.REACT_APP_AUTHIX_BASE_URL,
  apiKey: process.env.REACT_APP_AUTHIX_API_KEY,
  appId: process.env.REACT_APP_AUTHIX_APP_ID
});`
    }
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Download className="w-8 h-8 text-[#00c420]" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Installation</h1>
        </div>
        
        <p className="text-lg text-gray-400 leading-relaxed">
          Get started with Neuctra Authix by installing the React SDK and configuring your application. 
          This guide covers installation, configuration, and framework-specific setup.
        </p>
      </div>

      {/* Installation Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-[#00c420]" />
          <h2 className="text-2xl font-semibold text-white">Package Installation</h2>
        </div>
        
        <p className="text-gray-400">
          Install the Authix React SDK using your preferred package manager. The package includes 
          all components, TypeScript definitions, and utilities.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <CodeBlock tabs={installTabs} />
        </div>

        <div className="bg-[#00c420]/10 border border-[#00c420]/20 rounded-lg p-4">
          <h4 className="font-semibold text-[#00c420] text-sm mb-3">Package Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-[#00c420]">Bundle Size</strong>
              <p className="text-gray-400">~15KB (gzipped)</p>
            </div>
            <div>
              <strong className="text-[#00c420]">Dependencies</strong>
              <p className="text-gray-400">React 16.8+</p>
            </div>
            <div>
              <strong className="text-[#00c420]">TypeScript</strong>
              <p className="text-gray-400">Full support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-[#00c420]" />
          <h2 className="text-2xl font-semibold text-white">SDK Configuration</h2>
        </div>
        
        <p className="text-gray-400">
          Configure the SDK once at your application entry point. The configuration uses a 
          singleton pattern and is automatically available to all Authix components.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Basic Configuration</h3>
            <CodeBlock code={basicConfigCode} language="jsx" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Environment Variables (Recommended)</h3>
            <CodeBlock code={envConfigCode} language="jsx" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h4 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-[#00c420]" />
            Configuration Parameters
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 font-semibold text-white">Parameter</th>
                  <th className="text-left p-3 font-semibold text-white">Type</th>
                  <th className="text-left p-3 font-semibold text-white">Required</th>
                  <th className="text-left p-3 font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {configStructure.map((field, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono text-[#00c420] text-xs">{field.field}</td>
                    <td className="p-3 font-mono text-green-400 text-xs">{field.type}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        Required
                      </span>
                    </td>
                    <td className="p-3 text-gray-300 text-xs">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Framework-Specific Setup */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-[#00c420]" />
          <h2 className="text-xl font-semibold text-white">Framework-Specific Setup</h2>
        </div>

        <p className="text-gray-400">
          Different frameworks have different patterns for environment variables and application 
          initialization. Here are examples for popular frameworks.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {frameworkExamples.map((framework, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold text-white text-sm mb-3">{framework.name}</h3>
              <CodeBlock code={framework.code} language="jsx" />
            </div>
          ))}
        </div>

        <div className="bg-[#00c420]/10 border border-[#00c420]/20 rounded-lg p-4">
          <h4 className="font-semibold text-[#00c420] text-sm mb-3">Environment Variables</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <strong className="text-[#00c420]">Vite</strong>
              <p className="text-gray-400 mt-1">VITE_AUTHIX_*</p>
            </div>
            <div>
              <strong className="text-[#00c420]">Next.js</strong>
              <p className="text-gray-400 mt-1">NEXT_PUBLIC_AUTHIX_*</p>
            </div>
            <div>
              <strong className="text-[#00c420]">Create React App</strong>
              <p className="text-gray-400 mt-1">REACT_APP_AUTHIX_*</p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Complete Example</h2>
        
        <p className="text-gray-400">
          Here's a complete example showing how to set up Authix in a typical React application 
          with proper error handling and environment variable usage.
        </p>

        <CodeBlock code={completeExampleCode} language="jsx" />

        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00c420]" />
            Next Steps
          </h4>
          <p className="text-gray-400 text-sm">
            Once configured, you can start using Authix components like{' '}
            <code className="text-[#00c420]">ReactSignedIn</code>,{' '}
            <code className="text-[#00c420]">ReactSignedOut</code>, and{' '}
            <code className="text-[#00c420]">ReactUserButton</code> in your application.
          </p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Troubleshooting</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-white text-sm mb-3">Common Issues</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Environment variables not loading</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Invalid API endpoint</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Missing configuration values</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="font-semibold text-white text-sm mb-3">Solutions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#00c420] mt-0.5 flex-shrink-0" />
                <span>Restart dev server after changing .env</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#00c420] mt-0.5 flex-shrink-0" />
                <span>Verify API endpoint is accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#00c420] mt-0.5 flex-shrink-0" />
                <span>Check all three config values are provided</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Installation;