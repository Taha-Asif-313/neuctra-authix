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
  BookOpen,
  FileText,
  Workflow,
} from "lucide-react";

const Introduction = () => {
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise-Grade Security",
      description:
        "Secure JWT authentication, encrypted sessions, and protected API communication.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Serverless Architecture",
      description:
        "No backend required. Authix handles authentication and structured data storage for you.",
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Developer Friendly SDK",
      description:
        "Simple setup, flexible API access, and seamless integration with modern frameworks.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "User Lifecycle Management",
      description:
        "Manage signup, login, roles, sessions, and profile updates easily.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Multi-App Control",
      description:
        "Manage multiple apps with isolated data from one dashboard.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Framework Agnostic",
      description:
        "Works with React, Next.js, Vue, and any JavaScript framework.",
    },
  ];

  const installationCode = `npm install @neuctra/authix

# or
yarn add @neuctra/authix

# or
pnpm add @neuctra/authix`;

  const quickStartCode = `// authixInit.js

import { NeuctraAuthix } from "@neuctra/authix";

export const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "YOUR_NEUCTRA_AUTHIX_API_KEY",
  appId: "YOUR_NEUCTRA_AUTHIX_APP_ID",
});

// Import authix anywhere in your app and start using it`;

  return (
    <div className="space-y-12 text-gray-300">

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center max-sm:flex-col max-sm:items-start gap-3">
          <BookOpen className="w-8 h-8 text-[#00c420]" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Introduction to Neuctra Authix
          </h1>
        </div>

        <p className="text-lg text-gray-400 leading-relaxed">
          <strong className="text-white">Neuctra Authix</strong> is a modern
          serverless authentication and user management platform. It helps you
          securely manage users, sessions, and application data — without
          building your own backend.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <FileText className="w-6 h-6 text-[#00c420]" />
          Overview
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 mb-6">
            Instead of creating complex authentication systems from scratch,
            Authix gives you a secure cloud API to handle login, signup,
            sessions, roles, and structured JSON storage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              "JWT-based authentication",
              "Secure session management",
              "Structured JSON data storage",
              "Multi-application dashboard",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-[#00c420]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <Workflow className="w-6 h-6 text-[#00c420]" />
          How Authix Works (Simple Workflow)
        </h2>

        <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 space-y-6">

          <div className="space-y-2">
            <h3 className="text-white font-semibold">1️⃣ User Signs Up / Logs In</h3>
            <p className="text-gray-400 text-sm">
              The user submits email & password from your frontend app.
            </p>
          </div>

          <div className="text-center text-[#00c420] font-mono text-sm">
            Frontend ➜ Authix API
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold">2️⃣ Authix Verifies User</h3>
            <p className="text-gray-400 text-sm">
              Authix securely validates credentials and generates a JWT token.
            </p>
          </div>

          <div className="text-center text-[#00c420] font-mono text-sm">
            Authix API ➜ JWT Token ➜ Frontend
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold">3️⃣ Secure Requests</h3>
            <p className="text-gray-400 text-sm">
              Your app sends the JWT token with every protected request.
            </p>
          </div>

          <div className="text-center text-[#00c420] font-mono text-sm">
            Frontend ➜ Authix API (with Token)
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold">4️⃣ Data Access & Management</h3>
            <p className="text-gray-400 text-sm">
              Authix verifies the token and allows secure access to user data,
              roles, or structured JSON storage.
            </p>
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            1️⃣ Install Package
          </h3>
          <CodeBlock code={installationCode} language="bash" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            2️⃣ Initialize Authix
          </h3>
          <CodeBlock code={quickStartCode} language="javascript" />
        </div>

        <div className="bg-zinc-900/60 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">
            Configuration Parameters
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <strong>baseUrl</strong>
              <p className="text-gray-400 mt-1">
                Official Authix API endpoint
              </p>
            </div>
            <div>
              <strong>apiKey</strong>
              <p className="text-gray-400 mt-1">
                Your secret API key from dashboard
              </p>
            </div>
            <div>
              <strong>appId</strong>
              <p className="text-gray-400 mt-1">
                Unique ID for your application
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;