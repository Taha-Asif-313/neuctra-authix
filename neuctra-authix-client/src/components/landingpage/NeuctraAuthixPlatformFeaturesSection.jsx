"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code,
  DatabaseZap,
  Layers,
  ShieldAlert,
} from "lucide-react";
import CodeBlock from "../docs/CodeBlock";

export default function NeuctraAuthixPlatformFeaturesSection() {
  return (
    <div className="relative">
      {/* ===== Platform Features Section ===== */}
      <section className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-transparent via-[#00c420]/5 to-transparent">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 md:mb-6 leading-tight">
              Complete
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Platform Features
              </span>
            </h2>
          </motion.div>

          {/* Features Table - Mobile Friendly Alternative */}
          <div className="sm:overflow-hidden sm:rounded-xl border border-white/10">
            {/* Desktop Table Layout */}
            <div className="hidden sm:block">
              {/* Table Header */}
              <div className="grid grid-cols-4 border-b border-white/10 bg-white/5">
                <div className="p-4 sm:p-5 md:p-6 border-r border-white/10">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-[#00c420]" />
                    <span className="font-semibold text-white">Dashboard</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 border-r border-white/10">
                  <div className="flex items-center gap-3">
                    <DatabaseZap className="w-5 h-5 text-[#00c420]" />
                    <span className="font-semibold text-white">
                      Data Storage
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 border-r border-white/10">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-[#00c420]" />
                    <span className="font-semibold text-white">
                      Integration
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#00c420]" />
                    <span className="font-semibold text-white">Security</span>
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-white/10">
                {[
                  [
                    "Create unlimited apps",
                    "User JSON storage",
                    "React components",
                    "JWT-based auth",
                  ],
                  [
                    "Manage app credentials",
                    "App-level data storage",
                    "Express middleware",
                    "End-to-end encryption",
                  ],
                  [
                    "View analytics & logs",
                    "Real-time updates",
                    "TypeScript support",
                    "GDPR compliant",
                  ],
                  [
                    "User management",
                    "Secure encryption",
                    "REST API access",
                    "SOC 2 certified",
                  ],
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-4">
                    {row.map((cell, cellIndex) => (
                      <div
                        key={cellIndex}
                        className="p-4 sm:p-5 md:p-6 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#00c420] flex-shrink-0" />
                          <span className="text-gray-300 text-sm sm:text-base">
                            {cell}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Cards Layout */}
            <div className="sm:hidden space-y-4 p-4">
              {[
                {
                  title: "Dashboard",
                  icon: Layers,
                  features: [
                    "Create unlimited apps",
                    "Manage app credentials",
                    "View analytics & logs",
                    "User management",
                  ],
                },
                {
                  title: "Data Storage",
                  icon: DatabaseZap,
                  features: [
                    "User JSON storage",
                    "App-level data storage",
                    "Real-time updates",
                    "Secure encryption",
                  ],
                },
                {
                  title: "Integration",
                  icon: Code,
                  features: [
                    "React components",
                    "Express middleware",
                    "TypeScript support",
                    "REST API access",
                  ],
                },
                {
                  title: "Security",
                  icon: ShieldAlert,
                  features: [
                    "JWT-based auth",
                    "End-to-end encryption",
                    "GDPR compliant",
                    "SOC 2 certified",
                  ],
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <section.icon className="w-5 h-5 text-[#00c420]" />
                    <h3 className="font-semibold text-white">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 pl-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00c420] flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Code Examples / Steps Section ===== */}
      <section className="relative py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 bg-primary/5">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-5 sm:px-8 lg:px-8 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
          {/* Example 1 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-start">
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                1. Neuctra Authix SDK
              </h3>

              <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg">
                Install the Authix SDK using your preferred package manager.
              </p>

              <ul className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm sm:text-base">
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  <code className="text-xs xs:text-sm font-mono break-all">
                    npm install @neuctra/authix
                  </code>
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  <code className="text-xs xs:text-sm font-mono break-all">
                    yarn add @neuctra/authix
                  </code>
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  <code className="text-xs xs:text-sm font-mono break-all">
                    pnpm add @neuctra/authix
                  </code>
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-lg xs:rounded-xl">
              <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative overflow-x-auto">
                <CodeBlock
                  language="shell"
                  code={`npm install @neuctra/authix

# or
yarn add @neuctra/authix

# or
pnpm add @neuctra/authix`}
                />
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-start">
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                2. Initialize Authix Instance
              </h3>

              <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg">
                Create a single Authix instance to centrally manage
                authentication, API keys, and app configuration across your
                application.
              </p>

              <ul className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm sm:text-base">
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Create a dedicated{" "}
                  <code className="text-xs xs:text-sm font-mono">
                    authix.ts
                  </code>{" "}
                  file
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Initialize{" "}
                  <code className="text-xs xs:text-sm font-mono">
                    NeuctraAuthix
                  </code>{" "}
                  with{" "}
                  <code className="text-xs xs:text-sm font-mono">appId</code> &{" "}
                  <code className="text-xs xs:text-sm font-mono">apiKey</code>
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Reuse this instance anywhere in your app
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-lg xs:rounded-xl">
              <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative overflow-x-auto">
                <CodeBlock
                  language="ts"
                  code={`// src/authix.ts
import { NeuctraAuthix } from "@neuctra/authix";

export const Authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "your_neuctra_authix_api_key",
  appId: "your_neuctra_authix_app_id",
});`}
                />
              </div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-start">
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                3. Wrap App with{" "}
                <code className="text-xs xs:text-sm font-mono">
                  AuthixProvider
                </code>
              </h3>

              <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg">
                To use Authix pre-built UI components and access authentication
                state, wrap your React app with{" "}
                <code className="text-xs xs:text-sm font-mono">
                  AuthixProvider
                </code>
                .
              </p>

              <ul className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm sm:text-base">
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Import{" "}
                  <code className="text-xs xs:text-sm font-mono">
                    AuthixProvider
                  </code>{" "}
                  from{" "}
                  <code className="text-xs xs:text-sm font-mono">
                    @neuctra/authix
                  </code>
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Pass your initialized{" "}
                  <code className="text-xs xs:text-sm font-mono">Authix</code>{" "}
                  instance
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Enable global auth state & UI components
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-lg xs:rounded-xl">
              <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative overflow-x-auto">
                <CodeBlock
                  language="jsx"
                  code={`// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthixProvider } from "@neuctra/authix";
import { Authix } from "./authix";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthixProvider authix={Authix}>
    <App />
  </AuthixProvider>
);`}
                />
              </div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                4. Categorized User Data Storage
              </h3>

              <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg">
                Authix stores user data in <strong>categories</strong>. Each
                data object must belong to a{" "}
                <code className="text-xs xs:text-sm font-mono">
                  dataCategory
                </code>
                , making it easy to organize, query, and scale user data across
                multiple use cases.
              </p>

              <ul className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm sm:text-base">
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  <code className="text-xs xs:text-sm font-mono">
                    dataCategory
                  </code>{" "}
                  is <strong>required</strong> for every user data entry
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Store multiple data types per user (preferences, products,
                  notes, etc.)
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Clean separation of concerns & better data scalability
                </li>
              </ul>

              <div className="rounded-lg xs:rounded-xl bg-white/5 border border-white/10 p-2.5 xs:p-3 sm:p-4 text-gray-400 text-xs xs:text-sm">
                <strong className="text-white">Why categories?</strong>
                <br />
                Categories allow you to store different kinds of user data
                independently. For example, a single user can have separate
                categories like{" "}
                <code className="text-xs xs:text-sm font-mono">
                  user_products
                </code>
                ,{" "}
                <code className="text-xs xs:text-sm font-mono">user_notes</code>
                , or{" "}
                <code className="text-xs xs:text-sm font-mono">
                  preferences
                </code>{" "}
                without mixing schemas.
              </div>
            </div>

            {/* Code Block */}
            <div className="relative overflow-hidden rounded-lg xs:rounded-xl">
              <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative overflow-x-auto">
                <CodeBlock
                  language="ts"
                  code={`// Store user preferences
await Authix.addUserData({
  userId: "user_123",
  dataCategory: "preferences",
  data: {
    theme: "dark",
    notifications: true,
  },
});

// Store user products
await Authix.addUserData({
  userId: "user_123",
  dataCategory: "user_products",
  data: {
    productId: "prod_001",
    name: "Pro Subscription",
    expiresAt: "2026-01-01",
  },
});

// Store user notes
await Authix.addUserData({
  userId: "user_123",
  dataCategory: "user_notes",
  data: {
    title: "Welcome Note",
    content: "User upgraded to premium plan",
  },
});

// Fetch all user data
const userData = await Authix.getUserData({
  userId: "user_123",
});`}
                />
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                5. Use Neuctra Authix Pre-built UI Components
              </h3>

              <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg">
                Authix provides ready-to-use React components that automatically
                handle authentication states such as signed-in and signed-out
                users, so you don't have to build auth UI from scratch.
              </p>

              <ul className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm sm:text-base">
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Show login UI when the user is signed out
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Automatically render UI for signed-in users
                </li>
                <li className="flex items-center gap-1.5 xs:gap-2 text-gray-400">
                  <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-[#00c420] flex-shrink-0" />
                  Built-in user button with profile & logout actions
                </li>
              </ul>

              <div className="rounded-lg xs:rounded-xl bg-white/5 border border-white/10 p-2.5 xs:p-3 sm:p-4 text-gray-400 text-xs xs:text-sm">
                <strong className="text-white">How it works</strong>
                <br />
                Authix UI components react to authentication state provided by{" "}
                <code className="text-xs xs:text-sm font-mono">
                  AuthixProvider
                </code>
                . When a user signs in or out, the UI updates automatically—no
                manual state handling required.
              </div>
            </div>

            {/* Code Block */}
            <div className="relative overflow-hidden rounded-lg xs:rounded-xl">
              <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative overflow-x-auto">
                <CodeBlock
                  language="jsx"
                  code={`import {
  ReactSignedIn,
  ReactSignedOut,
  ReactUserLogin,
  ReactUserButton
} from "@neuctra/authix";

const AuthTemplate = () => {
  return (
    <>
      <ReactSignedOut>
        <ReactUserLogin />
      </ReactSignedOut>

      <ReactSignedIn>
        <ReactUserButton />
      </ReactSignedIn>
    </>
  );
};

export default AuthTemplate;`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
