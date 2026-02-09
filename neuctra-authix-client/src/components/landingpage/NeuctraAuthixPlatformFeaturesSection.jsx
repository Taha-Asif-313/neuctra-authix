"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code, Code2, Database, DatabaseZap, Layers, Package, Server, ShieldAlert } from "lucide-react";

export default function NeuctraAuthixPlatformFeaturesSection() {
      const codeExamples = [
    {
      title: "Install & Configure",
      language: "bash",
      code: `npm install @neuctra/authix-react
# or for Express
npm install @neuctra/authix-express`,
      icon: <Package />,
    },
    {
      title: "React - Complete Setup",
      language: "jsx",
      code: `import { AuthProvider } from '@neuctra/authix-react';

function App() {
  return (
    <AuthProvider
      appId="your-app-id"
      apiKey="your-api-key"
    >
      <YourApp />
    </AuthProvider>
  );
}`,
      icon: <Code2 />,
    },
    {
      title: "Store User Data",
      language: "javascript",
      code: `// Store user profile data
await authix.user.set({
  preferences: { theme: 'dark' },
  metadata: { plan: 'premium' }
});

// Store app data
await authix.app.data.set('settings', {
  featureFlags: { beta: true },
  config: { version: '2.0' }
});`,
      icon: <Database />,
    },
    {
      title: "Express Middleware",
      language: "javascript",
      code: `const { authixMiddleware } = require('@neuctra/authix-express');

app.use('/api', authixMiddleware({
  appId: process.env.AUTHIX_APP_ID,
  apiKey: process.env.AUTHIX_API_KEY
}));

// Protected route with user data
app.get('/api/profile', (req) => {
  const userData = req.authix.user.get();
  return res.json(userData);
});`,
      icon: <Server />,
    },
  ];

  const platformFeatures = [
    {
      title: "Dashboard Features",
      items: [
        "Create unlimited apps",
        "Manage app credentials",
        "View analytics & logs",
        "User management",
      ],
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#00c420]/20 to-transparent",
    },
    {
      title: "Data Storage",
      items: [
        "User JSON storage",
        "App-level data storage",
        "Real-time updates",
        "Secure encryption",
      ],
      icon: <DatabaseZap className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#00c420]/20 to-transparent",
    },
    {
      title: "SDK & Integration",
      items: [
        "React components",
        "Express middleware",
        "TypeScript support",
        "REST API access",
      ],
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#00c420]/20 to-transparent",
    },
    {
      title: "Security & Compliance",
      items: [
        "JWT-based auth",
        "End-to-end encryption",
        "GDPR compliant",
        "SOC 2 certified",
      ],
      icon: <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#00c420]/20 to-transparent",
    },
  ];
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#00c420]/5 to-transparent">
      <div className="max-w-7xl mx-auto">
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

        {/* SDK Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {platformFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300`}
            >
              <div className="text-[#00c420] mb-3 sm:mb-4">
                {feature.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                {feature.title}
              </h3>

              <ul className="space-y-1 sm:space-y-2">
                {feature.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420] flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Code Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {codeExamples.map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-[#00c420]/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border-b border-white/10">
                <div className="text-[#00c420]">{example.icon}</div>
                <span className="font-bold text-[#00c420] text-sm sm:text-base">
                  {example.title}
                </span>
                <span className="text-xs text-gray-500 uppercase ml-auto">
                  {example.language}
                </span>
              </div>

              <pre className="p-4 sm:p-6 overflow-x-auto">
                <code className="text-xs sm:text-sm text-gray-300 font-mono">
                  {example.code}
                </code>
              </pre>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
