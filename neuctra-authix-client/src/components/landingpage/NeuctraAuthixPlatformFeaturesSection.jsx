"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code,
  Code2,
  Database,
  DatabaseZap,
  Layers,
  Package,
  Server,
  ShieldAlert,
} from "lucide-react";
import CodeBlock from "../docs/CodeBlock";

export default function NeuctraAuthixPlatformFeaturesSection() {
  return (
    <div className="relative">
      {/* ===== Platform Features Section ===== */}
      <section className="relative py-14 bg-gradient-to-b from-transparent via-[#00c420]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Complete
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Platform Features
              </span>
            </h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Dashboard Features",
                icon: Layers,
                items: [
                  "Create unlimited apps",
                  "Manage app credentials",
                  "View analytics & logs",
                  "User management",
                ],
              },
              {
                title: "Data Storage",
                icon: DatabaseZap,
                items: [
                  "User JSON storage",
                  "App-level data storage",
                  "Real-time updates",
                  "Secure encryption",
                ],
              },
              {
                title: "SDK & Integration",
                icon: Code,
                items: [
                  "React components",
                  "Express middleware",
                  "TypeScript support",
                  "REST API access",
                ],
              },
              {
                title: "Security & Compliance",
                icon: ShieldAlert,
                items: [
                  "JWT-based auth",
                  "End-to-end encryption",
                  "GDPR compliant",
                  "SOC 2 certified",
                ],
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative rounded-2xl p-[1px] cursor-pointer bg-gradient-to-br from-[#00c420]/40 via-transparent to-transparent"
              >
                <div className="relative h-full rounded-2xl bg-black/70 backdrop-blur-xl p-6 border border-white/10 transition-all duration-300 group-hover:border-[#00c420]/50">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-[#00c420]/10" />

                  {/* Icon */}
                  <div className="relative z-10 w-11 h-11 rounded-xl bg-[#00c420]/15 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-[#00c420]" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-lg font-semibold mb-4 tracking-tight">
                    {feature.title}
                  </h3>

                  {/* List */}
                  <ul className="relative z-10 space-y-2">
                    {feature.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Code Examples / Steps Section ===== */}
      <section className="relative py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Example 1 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                1. Neuctra Authix SDK
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Install the Authix SDK using your preferred package manager.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  <code>npm install @neuctra/authix</code>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  <code>yarn add @neuctra/authix</code>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  <code>pnpm add @neuctra/authix</code>
                </li>
              </ul>
            </div>
            <div>
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

          {/* Example 2 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                2. Initialize Authix Instance
              </h3>

              <p className="text-gray-300 text-base sm:text-lg">
                Create a single Authix instance to centrally manage
                authentication, API keys, and app configuration across your
                application.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Create a dedicated <code>authix.ts</code> file
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Initialize <code>NeuctraAuthix</code> with <code>appId</code>{" "}
                  & <code>apiKey</code>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Reuse this instance anywhere in your app
                </li>
              </ul>
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative">
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
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                3. Wrap App with <code>AuthixProvider</code>
              </h3>

              <p className="text-gray-300 text-base sm:text-lg">
                To use Authix pre-built UI components and access authentication
                state, wrap your React app with <code>AuthixProvider</code>.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Import <code>AuthixProvider</code> from{" "}
                  <code>@neuctra/authix</code>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Pass your initialized <code>Authix</code> instance
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Enable global auth state & UI components
                </li>
              </ul>
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative">
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
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                4. Categorized User Data Storage
              </h3>

              <p className="text-gray-300 text-base sm:text-lg">
                Authix stores user data in <strong>categories</strong>. Each
                data object must belong to a <code>dataCategory</code>, making
                it easy to organize, query, and scale user data across multiple
                use cases.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  <code>dataCategory</code> is <strong>required</strong> for
                  every user data entry
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Store multiple data types per user (preferences, products,
                  notes, etc.)
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Clean separation of concerns & better data scalability
                </li>
              </ul>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-gray-400 text-sm">
                <strong className="text-white">Why categories?</strong>
                <br />
                Categories allow you to store different kinds of user data
                independently. For example, a single user can have separate
                categories like <code>user_products</code>,{" "}
                <code>user_notes</code>, or <code>preferences</code> without
                mixing schemas.
              </div>
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative">
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

// Fetch all user data (all categories)
const userData = await Authix.getUserData({
  userId: "user_123",
});`}
                />
              </div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                5. Use Neuctra Authix Pre-built UI Components
              </h3>

              <p className="text-gray-300 text-base sm:text-lg">
                Authix provides ready-to-use React components that automatically
                handle authentication states such as signed-in and signed-out
                users, so you don’t have to build auth UI from scratch.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Show login UI when the user is signed out
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Automatically render UI for signed-in users
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Built-in user button with profile & logout actions
                </li>
              </ul>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-gray-400 text-sm">
                <strong className="text-white">How it works</strong>
                <br />
                Authix UI components react to authentication state provided by{" "}
                <code>AuthixProvider</code>. When a user signs in or out, the UI
                updates automatically—no manual state handling required.
              </div>
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#00c420]/10 blur-xl opacity-30" />
              <div className="relative">
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
      {/* Shown only when user is signed out */}
      <ReactSignedOut>
        <ReactUserLogin />
      </ReactSignedOut>

      {/* Shown only when user is signed in */}
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
