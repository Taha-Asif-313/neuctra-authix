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
      title: "Enterprise-Grade Security",
      description:
        "Secure JWT authentication, encrypted sessions, and protected API communication."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Serverless Architecture",
      description:
        "No backend required. Authix handles authentication and structured data storage for you."
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Developer Friendly SDK",
      description:
        "Simple initialization, flexible API access, and seamless framework compatibility."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "User Lifecycle Management",
      description:
        "Handle signup, login, sessions, roles, and profile updates effortlessly."
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Multi-App Control",
      description:
        "Manage multiple applications with isolated data stores from one dashboard."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Framework Agnostic",
      description:
        "Works with React, Next.js, Vue, and any modern JavaScript framework."
    }
  ];

  const installationCode = `npm install @neuctra/authix

# or with yarn
yarn add @neuctra/authix

# or with pnpm
pnpm add @neuctra/authix`;

  const quickStartCode = `// authixInit.js

import { NeuctraAuthix } from "@neuctra/authix";

export const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "YOUR_NEUCTRA_AUTHIX_API_KEY",
  appId: "YOUR_NEUCTRA_AUTHIX_APP_ID",
});

// Now you can import and use authix anywhere in your app
`;

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center max-sm:flex-col max-sm:items-start gap-3">
          <BookOpen className="w-8 h-8 text-[#00c420]" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Introduction to Neuctra Authix
          </h1>
        </div>

        <p className="text-lg text-gray-400 leading-relaxed">
          <strong className="text-white">Neuctra Authix</strong> is a serverless
          authentication and user management platform that eliminates backend
          complexity. It provides secure login flows, structured JSON data
          storage, and multi-application control — all from a centralized
          dashboard.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <FileText className="w-6 h-6 text-[#00c420]" />
          Overview
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 mb-4">
            Neuctra Authix replaces traditional backend authentication systems by
            securely managing users, sessions, JWT tokens, and structured
            application data through a scalable cloud API. Developers can
            integrate Authix in minutes and focus entirely on building product
            features instead of infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420]" />
              <span>JWT-based authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420]" />
              <span>Secure session management</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420]" />
              <span>Structured JSON data storage</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#00c420]" />
              <span>Multi-application dashboard</span>
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
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-[#00c420]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#00c420]/20 rounded-lg">
                  <div className="text-[#00c420]">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-white text-sm">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                {feature.description}
              </p>
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

        {/* Installation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-[#00c420]" />
            Installation
          </h3>

          <CodeBlock code={installationCode} language="bash" />
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-[#00c420]" />
            Create Authix Instance
          </h3>

          <CodeBlock code={quickStartCode} language="javascript" />

          <div className="bg-zinc-900/60 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2">
              Configuration Parameters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <strong className="">baseUrl</strong>
                <p className="text-gray-400 mt-1">
                  Authix API endpoint (use official production URL)
                </p>
              </div>
              <div>
                <strong className="">apiKey</strong>
                <p className="text-gray-400 mt-1">
                  Your Neuctra Authix API key
                </p>
              </div>
              <div>
                <strong className="">appId</strong>
                <p className="text-gray-400 mt-1">
                  Your unique application ID from dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
