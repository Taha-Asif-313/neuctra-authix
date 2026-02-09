"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code, Code2, Database, DatabaseZap, Layers, Package, Server, ShieldAlert } from "lucide-react";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#00c420]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary cursor-pointer transition-all duration-300"
            >
              <div className="text-[#00c420] mb-3 sm:mb-4">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Dashboard Features</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  Create unlimited apps
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  Manage app credentials
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  View analytics & logs
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  User management
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#00c420]/20 to-transparent backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300"
            >
              <div className="text-[#00c420] mb-3 sm:mb-4">
                <DatabaseZap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Data Storage</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  User JSON storage
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  App-level data storage
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  Real-time updates
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  Secure encryption
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#00c420]/20 to-transparent backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300"
            >
              <div className="text-[#00c420] mb-3 sm:mb-4">
                <Code className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">SDK & Integration</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  React components
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  Express middleware
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  TypeScript support
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  REST API access
                </li>
              </ul>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#00c420]/20 to-transparent backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300"
            >
              <div className="text-[#00c420] mb-3 sm:mb-4">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Security & Compliance</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  JWT-based auth
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  GDPR compliant
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
                  SOC 2 certified
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Code Examples / Steps Section ===== */}
      <section className="relative py-16 bg-green-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Example 1 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Step 1: Install Authix SDK</h3>
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
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Step 2: Wrap App with AuthProvider</h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Create a single Authix instance to manage authentication configuration in your React app.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Import <code>AuthProvider</code> from <code>@neuctra/authix</code>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Wrap your app and pass <code>appId</code> & <code>apiKey</code>
                </li>
              </ul>
            </div>
            <div>
              <CodeBlock
                language="jsx"
                code={`import { AuthProvider } from '@neuctra/authix';

function App() {
  return (
    <AuthProvider
      appId="your-app-id"
      apiKey="your-api-key"
    >
      <YourApp />
    </AuthProvider>
  );
}`}
              />
            </div>
          </div>

          {/* Example 3 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Step 3: Store User & App Data</h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Use the Authix SDK to store user profile information and app-specific data securely.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Store user preferences and metadata
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Store application data like settings and feature flags
                </li>
              </ul>
            </div>
            <div>
              <CodeBlock
                language="javascript"
                code={`// Store user profile data
await authix.user.set({
  preferences: { theme: 'dark' },
  metadata: { plan: 'premium' }
});

// Store app data
await authix.app.data.set('settings', {
  featureFlags: { beta: true },
  config: { version: '2.0' }
});`}
              />
            </div>
          </div>

          {/* Example 4 */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Step 4: Express Middleware Integration</h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Use Authix middleware in your Express app to protect routes and access user data securely.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Apply authixMiddleware to your API routes
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#00c420]" />
                  Protect endpoints and access user data safely
                </li>
              </ul>
            </div>
            <div>
              <CodeBlock
                language="javascript"
                code={`const { authixMiddleware } = require('@neuctra/authix');

app.use('/api', authixMiddleware({
  appId: process.env.AUTHIX_APP_ID,
  apiKey: process.env.AUTHIX_API_KEY
}));

// Protected route with user data
app.get('/api/profile', (req) => {
  const userData = req.authix.user.get();
  return res.json(userData);
});`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
