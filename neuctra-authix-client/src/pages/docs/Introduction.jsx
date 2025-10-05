import React from "react";
import CodeBlock from "../../components/docs/CodeBlock";
import {
  Shield,
  Zap,
  Code,
  Users,
  Lock,
  Globe,
  CheckCircle,
  Sparkles,
  Key,
  Cpu,
  Smartphone,
  Server,
  BookOpen,
  FileText
} from "lucide-react";

const Introduction = () => {
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "Bank-grade security with JWT tokens, encryption, and secure session management"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Optimized performance with minimal bundle size and instant authentication flows"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "TypeScript First",
      description: "Full TypeScript support with comprehensive type definitions and IntelliSense"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "User Management",
      description: "Complete user lifecycle management from signup to profile updates"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Zero Configuration",
      description: "Get started in minutes with sensible defaults and automatic optimizations"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Universal Compatibility",
      description: "Works with React, Next.js, Vue, and any modern JavaScript framework"
    }
  ];

  const quickStartCode = `import { setSdkConfig } from "@neuctra/authix-react";

// Configure once at app startup
setSdkConfig({
  baseUrl: "https://your-api.neuctra.com/v1",
  apiKey: "your-secure-api-key",
  appId: "your-unique-app-id"
});

// Start using authentication components
import { ReactSignedIn, ReactUserButton } from "@neuctra/authix-react";`;

  const installationCode = `npm install @neuctra/authix-react

# or with yarn
yarn add @neuctra/authix-react

# or with pnpm
pnpm add @neuctra/authix-react`;

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center max-sm:flex-col max-sm:items-start gap-3">
          <BookOpen className="w-8 h-8 text-[#00c420]" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Introduction to Neuctra Authix</h1>
        </div>
        
        <p className="text-lg text-gray-400 leading-relaxed">
          <strong className="text-white">Neuctra Authix</strong> is a comprehensive authentication SDK designed 
          to simplify user management, session handling, and secure access control for modern web applications. 
          Built with developers in mind, it provides enterprise-grade security with a developer-friendly API.
        </p>
      </div>

      {/* Overview Section */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <FileText className="w-6 h-6 text-[#00c420]" />
          Overview
        </h2>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 mb-4">
            Authix handles the complete authentication lifecycle, from user registration and login to 
            session management and secure API access. It's designed to work seamlessly with your existing 
            tech stack while providing robust security features out of the box.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420] flex-shrink-0" />
              <span>JWT-based authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420] flex-shrink-0" />
              <span>Secure session management</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420] flex-shrink-0" />
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420] flex-shrink-0" />
              <span>Email verification flows</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Sparkles className="w-6 h-6 text-[#00c420]" />
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-[#00c420]/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#00c420]/20 rounded-lg">
                  <div className="text-[#00c420]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Zap className="w-6 h-6 text-[#00c420]" />
          Quick Start
        </h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-[#00c420]" />
              Installation
            </h3>
            <CodeBlock code={installationCode} language="bash" />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#00c420]" />
                <span>15KB gzipped</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#00c420]" />
                <span>Zero dependencies</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#00c420]" />
                <span>Tree-shakeable</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-[#00c420]" />
              Configuration
            </h3>
            <CodeBlock code={quickStartCode} language="jsx" />
            
            <div className="bg-[#00c420]/10 border border-[#00c420]/20 rounded-lg p-4">
              <h4 className="font-semibold text-[#00c420] text-sm mb-2">Configuration Parameters</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <strong className="text-[#00c420]">baseUrl</strong>
                  <p className="text-gray-400 mt-1">Your Authix API endpoint</p>
                </div>
                <div>
                  <strong className="text-[#00c420]">apiKey</strong>
                  <p className="text-gray-400 mt-1">Application API key</p>
                </div>
                <div>
                  <strong className="text-[#00c420]">appId</strong>
                  <p className="text-gray-400 mt-1">Unique app identifier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Cpu className="w-6 h-6 text-[#00c420]" />
          Core Components
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 mb-6">
            Authix provides a set of React components that handle common authentication patterns, 
            allowing you to focus on building your application's core features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-lg">ReactSignedIn</h4>
              <p className="text-gray-400 text-sm">
                Conditionally renders content only when a user is authenticated. Perfect for 
                protecting sensitive components and creating authenticated-only views.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#00c420]">
                <CheckCircle className="w-3 h-3" />
                <span>Automatic auth checking</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white text-lg">ReactUserButton</h4>
              <p className="text-gray-400 text-sm">
                A complete user menu component with profile information, settings navigation, 
                and logout functionality. Fully customizable and accessible.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#00c420]">
                <CheckCircle className="w-3 h-3" />
                <span>Dropdown menu with user info</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white text-lg">ReactUserLogin</h4>
              <p className="text-gray-400 text-sm">
                A complete login form component with validation, error handling, and success 
                callbacks. Handles the entire authentication flow.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#00c420]">
                <CheckCircle className="w-3 h-3" />
                <span>Form validation & error states</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Server className="w-6 h-6 text-[#00c420]" />
          Architecture
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 mb-4">
            Authix follows a client-server architecture where the React SDK communicates with 
            the Authix backend API to handle authentication operations securely.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#00c420]/20 rounded-lg mt-1">
                <Smartphone className="w-4 h-4 text-[#00c420]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-2">Client Side</h4>
                <p className="text-gray-400 text-xs">
                  React components and hooks that manage UI state, handle user interactions, 
                  and securely store authentication tokens in localStorage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#00c420]/20 rounded-lg mt-1">
                <Server className="w-4 h-4 text-[#00c420]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-2">Server Side</h4>
                <p className="text-gray-400 text-xs">
                  Authix backend API that handles user validation, token generation, 
                  session management, and secure data storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[#00c420]/10 border border-[#00c420]/20 rounded-xl p-6">
        <h3 className="font-semibold text-white text-lg mb-3">Next Steps</h3>
        <p className="text-gray-300 text-sm mb-4">
          Ready to integrate Authix into your project? Continue to the installation guide 
          to get started with setting up the SDK and configuring your application.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/docs/installation" 
            className="bg-[#00c420] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#00a61a] transition-colors"
          >
            Installation Guide
          </a>
          <a 
            href="/docs/components" 
            className="border border-[#00c420] text-[#00c420] px-4 py-2 rounded text-sm font-semibold hover:bg-[#00c420]/10 transition-colors"
          >
            Component Reference
          </a>
        </div>
      </section>
    </div>
  );
};

export default Introduction;