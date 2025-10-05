// src/pages/docs/setup/ReactSetup.jsx
import React from "react";

import {
  Download,
  Settings,
  Shield,
  Zap,
  Code,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Terminal,
  Globe,
  Key,
  Package,
  FileText,
  Cpu,
  Lock
} from "lucide-react";
import CodeBlock from "../../../components/docs/CodeBlock";

const ReactSetupDocs = () => {
  const installationCode = `npm install @neuctra/authix-react

# or with yarn
yarn add @neuctra/authix-react

# or with pnpm
pnpm add @neuctra/authix-react`;

  const basicSetupCode = `import { setSdkConfig } from "@neuctra/authix-react";

// Configure once at app startup
setSdkConfig({
  baseUrl: "https://your-auth-api.com/api",
  apiKey: "your-api-key-here",
  appId: "your-app-id-here"
});`;

  const envSetupCode = `import { setSdkConfig } from "@neuctra/authix-react";

// Using environment variables (recommended for security)
setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});`;

  const completeAppSetupCode = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { setSdkConfig } from "@neuctra/authix-react";
import App from './App';

// Configure Authix SDK before rendering your app
setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});

// Validate configuration
try {
  // This will throw an error if any required config is missing
  setSdkConfig({
    baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
    apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
    appId: import.meta.env.VITE_AUTHIX_APP_ID
  });
} catch (error) {
  console.error('Authix configuration error:', error);
  // Handle configuration error (show error page, etc.)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;

  const envExampleCode = `# .env file (never commit to version control!)
VITE_AUTHIX_BASE_URL=https://your-auth-api.com/api
VITE_AUTHIX_API_KEY=8232634ab8bc4a5704f3c81c0a59f0ea59287d6a6582ae664db0fbe3fd6b1229
VITE_AUTHIX_APP_ID=29fa533f2d50e25cd17b4ab8b66f53a0

# .env.example (safe to commit - shows required variables)
VITE_AUTHIX_BASE_URL=
VITE_AUTHIX_API_KEY=
VITE_AUTHIX_APP_ID=`;

  const nextjsSetupCode = `// pages/_app.js or app/layout.js (Next.js)
import { setSdkConfig } from "@neuctra/authix-react";

export default function MyApp({ Component, pageProps }) {
  // Configure once when app loads
  if (typeof window !== 'undefined') {
    setSdkConfig({
      baseUrl: process.env.NEXT_PUBLIC_AUTHIX_BASE_URL,
      apiKey: process.env.NEXT_PUBLIC_AUTHIX_API_KEY,
      appId: process.env.NEXT_PUBLIC_AUTHIX_APP_ID
    });
  }

  return <Component {...pageProps} />;
}`;

  const verificationCode = `import { getSdkConfig } from "@neuctra/authix-react";

// Verify configuration in development
if (process.env.NODE_ENV === 'development') {
  const config = getSdkConfig();
  console.log('Authix Config:', {
    baseUrl: config.baseUrl ? '✓ Set' : '✗ Missing',
    apiKey: config.apiKey ? '✓ Set' : '✗ Missing',
    appId: config.appId ? '✓ Set' : '✗ Missing'
  });
}`;

  const errorHandlingCode = `import { setSdkConfig } from "@neuctra/authix-react";

function initializeAuth() {
  try {
    setSdkConfig({
      baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
      apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
      appId: import.meta.env.VITE_AUTHIX_APP_ID
    });
    return true;
  } catch (error) {
    console.error('Failed to initialize Authix:', error);
    
    // Show user-friendly error in development
    if (process.env.NODE_ENV === 'development') {
      alert('Authix configuration missing. Please check your environment variables.');
    }
    
    return false;
  }
}

// Call this before using any Authix components
const authInitialized = initializeAuth();`;

  const configStructure = [
    {
      field: "baseUrl",
      type: "string",
      required: true,
      example: "https://api.yourapp.com/auth/v1",
      description: "Base URL of your Authix API server"
    },
    {
      field: "apiKey",
      type: "string",
      required: true,
      example: "8232634ab8bc4a5704f3c81c0a59f0ea59287d6a6582ae664db0fbe3fd6b1229",
      description: "Your application's API key for authentication"
    },
    {
      field: "appId",
      type: "string",
      required: true,
      example: "29fa533f2d50e25cd17b4ab8b66f53a0",
      description: "Unique identifier for your application"
    }
  ];

  const environmentVariables = [
    {
      name: "VITE_AUTHIX_BASE_URL",
      framework: "Vite",
      description: "Base URL for Authix API endpoints",
      required: true
    },
    {
      name: "VITE_AUTHIX_API_KEY",
      framework: "Vite",
      description: "API key for authenticating with Authix",
      required: true
    },
    {
      name: "VITE_AUTHIX_APP_ID",
      framework: "Vite",
      description: "Application identifier",
      required: true
    },
    {
      name: "NEXT_PUBLIC_AUTHIX_BASE_URL",
      framework: "Next.js",
      description: "Base URL for Authix API endpoints",
      required: true
    },
    {
      name: "NEXT_PUBLIC_AUTHIX_API_KEY",
      framework: "Next.js",
      description: "API key for authenticating with Authix",
      required: true
    },
    {
      name: "NEXT_PUBLIC_AUTHIX_APP_ID",
      framework: "Next.js",
      description: "Application identifier",
      required: true
    },
    {
      name: "REACT_APP_AUTHIX_BASE_URL",
      framework: "Create React App",
      description: "Base URL for Authix API endpoints",
      required: true
    },
    {
      name: "REACT_APP_AUTHIX_API_KEY",
      framework: "Create React App",
      description: "API key for authenticating with Authix",
      required: true
    },
    {
      name: "REACT_APP_AUTHIX_APP_ID",
      framework: "Create React App",
      description: "Application identifier",
      required: true
    }
  ];

  const setupSteps = [
    {
      step: "1",
      title: "Install Package",
      description: "Add Authix React SDK to your project",
      icon: <Download className="w-4 h-4" />
    },
    {
      step: "2",
      title: "Configure Environment",
      description: "Set up environment variables",
      icon: <Settings className="w-4 h-4" />
    },
    {
      step: "3",
      title: "Initialize SDK",
      description: "Call setSdkConfig in your app entry point",
      icon: <Code className="w-4 h-4" />
    },
    {
      step: "4",
      title: "Verify Setup",
      description: "Test configuration and start using components",
      icon: <CheckCircle className="w-4 h-4" />
    }
  ];

  const frameworkExamples = [
    {
      name: "Vite",
      setup: `// main.jsx
import { setSdkConfig } from "@neuctra/authix-react";

setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});`
    },
    {
      name: "Next.js",
      setup: `// app/layout.jsx or pages/_app.js
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
      setup: `// index.js
import { setSdkConfig } from "@neuctra/authix-react";

setSdkConfig({
  baseUrl: process.env.REACT_APP_AUTHIX_BASE_URL,
  apiKey: process.env.REACT_APP_AUTHIX_API_KEY,
  appId: process.env.REACT_APP_AUTHIX_APP_ID
});`
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Settings className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
          React SDK Setup & Configuration
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          Get started with Authix React SDK in minutes. Configure once and use powerful authentication 
          components throughout your application with a simple, secure setup process.
        </p>
      </div>

      {/* Setup Steps */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
          Quick Setup Guide
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {setupSteps.map((step, index) => (
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
      </section>

      {/* Installation */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Installation
        </h2>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white text-lg">Install via npm</h3>
          </div>
          <CodeBlock code={installationCode} language="bash" />
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm">
              <CheckCircle className="w-4 h-4" />
              Package Details
            </h4>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
              <li><strong>Package:</strong> @neuctra/authix-react</li>
              <li><strong>Size:</strong> ~15KB (gzipped)</li>
              <li><strong>Dependencies:</strong> React 16.8+, TypeScript optional</li>
              <li><strong>Tree-shakeable:</strong> Yes - only import what you use</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Basic Configuration */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
          Basic Configuration
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400">
          Configure the SDK once at your application's entry point. The configuration is stored 
          as a singleton and used by all Authix components.
        </p>
        
        <CodeBlock code={basicSetupCode} language="jsx" />
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
            <Shield className="w-4 h-4" />
            Singleton Pattern
          </h4>
          <p className="text-xs sm:text-sm text-gray-300">
            The SDK uses a singleton configuration pattern. Call <code className="text-blue-300">setSdkConfig</code> 
            once at application startup, and all components will automatically use the same configuration.
          </p>
        </div>
      </section>

      {/* Configuration Structure */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          Configuration Structure
        </h2>
        
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Field</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Type</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Required</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Example</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {configStructure.map((field, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 font-mono text-blue-400 text-xs sm:text-sm">{field.field}</td>
                    <td className="p-3 sm:p-4 font-mono text-green-400 text-xs sm:text-sm">{field.type}</td>
                    <td className="p-3 sm:p-4">
                      <span className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                        field.required ? "text-red-400" : "text-yellow-400"
                      }`}>
                        {field.required ? (
                          <>
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            Required
                          </>
                        ) : (
                          "Optional"
                        )}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 font-mono text-yellow-400 text-xs sm:text-sm">{field.example}</td>
                    <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Environment Variables (Recommended)
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400">
          For security and flexibility, use environment variables to store your configuration. 
          This keeps sensitive keys out of your codebase and allows different configurations per environment.
        </p>
        
        <CodeBlock code={envSetupCode} language="jsx" />
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
            <Key className="w-4 h-4" />
            Environment File Setup
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 mb-3">
            Create a <code className="text-green-300">.env</code> file in your project root:
          </p>
          <CodeBlock code={envExampleCode} language="bash" />
        </div>
      </section>

      {/* Framework-Specific Setup */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
          Framework-Specific Setup
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          {frameworkExamples.map((framework, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-white text-lg mb-3">{framework.name}</h3>
              <CodeBlock code={framework.setup} language="jsx" />
            </div>
          ))}
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Variable</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Framework</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Description</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-white">Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {environmentVariables.map((envVar, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 sm:p-4 font-mono text-blue-400 text-xs sm:text-sm">{envVar.name}</td>
                    <td className="p-3 sm:p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                        {envVar.framework}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm">{envVar.description}</td>
                    <td className="p-3 sm:p-4">
                      <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        Required
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complete App Setup */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          Complete Application Setup
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400">
          Here's a complete example showing how to set up Authix in your main application file 
          with proper error handling and validation.
        </p>
        
        <CodeBlock code={completeAppSetupCode} language="jsx" />
      </section>

      {/* Verification & Debugging */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
          Verification & Debugging
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400">
          Verify your configuration is set correctly and debug any issues during development.
        </p>
        
        <CodeBlock code={verificationCode} language="jsx" />
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-yellow-400 font-semibold mb-2 text-sm sm:text-base">
            <AlertCircle className="w-4 h-4" />
            Development Tips
          </h4>
          <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
            <li>• Check browser console for configuration status</li>
            <li>• Verify environment variables are loaded correctly</li>
            <li>• Ensure all three required fields are provided</li>
            <li>• Test with a simple component like ReactSignedIn first</li>
          </ul>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          Error Handling
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400">
          Proper error handling ensures your application gracefully handles configuration issues.
        </p>
        
        <CodeBlock code={errorHandlingCode} language="jsx" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-2 text-sm">Common Errors</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span>"baseUrl, apiKey, and appId are required"</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span>Environment variables not loaded</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span>Invalid API endpoint</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">Solutions</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-blue-400" />
                <span>Check .env file exists and variables are set</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-blue-400" />
                <span>Restart dev server after changing .env</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-blue-400" />
                <span>Verify API endpoint is accessible</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-4 text-lg sm:text-xl">
          <Lock className="w-5 h-5" />
          Security Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Configuration Security:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Never commit .env files to version control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Use different keys for development and production</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Rotate API keys regularly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Use HTTPS in production environments</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Production Checklist:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Set environment variables in your hosting platform</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Test configuration in staging environment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Monitor API usage and errors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Implement proper error boundaries</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg sm:text-xl">
          <CheckCircle className="w-5 h-5" />
          Ready to Build!
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-3">
          Your Authix React SDK is now configured and ready to use. Next steps:
        </p>
        <ul className="text-sm sm:text-base text-gray-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Start using authentication components like ReactSignedIn and ReactSignedOut</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Implement ReactUserButton for user menus</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Add ReactUserLogin for authentication flows</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>Explore advanced features and customization options</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactSetupDocs;