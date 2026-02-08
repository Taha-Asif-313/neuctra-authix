import React, { useState, useEffect } from "react";
import {
  Shield,
  ArrowRight,
  Zap,
  Users,
  Star,
  Lock,
  UserCheck,
  Sparkles,
  TrendingUp,
  Code2,
  CheckCircle2,
  Github,
  Play,
  Terminal,
  Cpu,
  LogIn,
  Key,
  Settings,
  Database,
  Server,
  Cloud,
  Smartphone,
  Globe,
  ShieldCheck,
  Fingerprint,
  CpuIcon,
  Layers,
  Package,
  Code,
  ShieldAlert,
  FileJson,
  Infinity,
  ServerCrash,
  CloudLightning,
  Box,
  KeyRound,
  DatabaseZap,
  Workflow,
  GlobeLock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);

    // Generate floating icons
    const icons = [
      {
        icon: <Shield className="w-6 h-6 text-[#00c420]/40" />,
        x: 10,
        y: 20,
        delay: 0,
      },
      {
        icon: <Key className="w-5 h-5 text-[#00c420]/30" />,
        x: 85,
        y: 15,
        delay: 1,
      },
      {
        icon: <DatabaseZap className="w-6 h-6 text-[#00c420]/40" />,
        x: 15,
        y: 70,
        delay: 2,
      },
      {
        icon: <FileJson className="w-5 h-5 text-[#00c420]/30" />,
        x: 90,
        y: 65,
        delay: 3,
      },
      {
        icon: <Database className="w-6 h-6 text-[#00c420]/40" />,
        x: 25,
        y: 40,
        delay: 4,
      },
      {
        icon: <Server className="w-5 h-5 text-[#00c420]/30" />,
        x: 75,
        y: 35,
        delay: 5,
      },
      {
        icon: <CloudLightning className="w-6 h-6 text-[#00c420]/40" />,
        x: 40,
        y: 80,
        delay: 6,
      },
      {
        icon: <Box className="w-5 h-5 text-[#00c420]/30" />,
        x: 60,
        y: 85,
        delay: 7,
      },
      {
        icon: <GlobeLock className="w-6 h-6 text-[#00c420]/40" />,
        x: 80,
        y: 25,
        delay: 8,
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-[#00c420]/30" />,
        x: 20,
        y: 55,
        delay: 9,
      },
      {
        icon: <Workflow className="w-5 h-5 text-[#00c420]/40" />,
        x: 65,
        y: 60,
        delay: 10,
      },
      {
        icon: <Package className="w-6 h-6 text-[#00c420]/30" />,
        x: 35,
        y: 30,
        delay: 11,
      },
    ];
    setFloatingIcons(icons);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Complete Authentication Suite",
      description:
        "Pre-built React components + Express SDK + secure data storage. Everything you need for full-stack authentication.",
      stats: "Zero server setup required",
      color: "from-white/5 to-white/0",
    },
    {
      icon: <DatabaseZap className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Built-in Data Storage",
      description:
        "Store user profiles and app data as JSON. Perfect for client-side apps needing serverless data persistence.",
      stats: "Unlimited JSON storage",
      color: "from-white/5 to-white/0",
    },
    {
      icon: <Package className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "One Dashboard, Multiple Apps",
      description:
        "Create unlimited applications in your dashboard. Each app gets unique credentials for React or Express integration.",
      stats: "Unlimited apps per account",
      color: "from-white/5 to-white/0",
    },
    {
      icon: <ServerCrash className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Serverless Architecture",
      description:
        "Build full-featured apps without managing servers. We handle authentication, data storage, and scaling for you.",
      stats: "No server management needed",
      color: "from-white/5 to-white/0",
    },
  ];

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

  const workflowSteps = [
    {
      step: "1",
      title: "Create Account",
      description: "Sign up for Neuctra Authix dashboard",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      step: "2",
      title: "Create App",
      description: "Generate credentials for your application",
      icon: <Box className="w-5 h-5" />,
    },
    {
      step: "3",
      title: "Install SDK",
      description: "Add @neuctra/authix to your React or Express app",
      icon: <Package className="w-5 h-5" />,
    },
    {
      step: "4",
      title: "Store Data",
      description: "Use SDK to store user profiles and app data",
      icon: <DatabaseZap className="w-5 h-5" />,
    },
    {
      step: "5",
      title: "Go Live",
      description: "Deploy your app without managing authentication servers",
      icon: <CloudLightning className="w-5 h-5" />,
    },
  ];

  const stats = [
    { number: "∞", label: "Apps per Account", icon: <Infinity /> },
    { number: "99.99%", label: "Uptime SLA", icon: <Shield /> },
    { number: "100MB", label: "Data Storage/User", icon: <Database /> },
    { number: "<5min", label: "First Integration", icon: <Code2 /> },
  ];

  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Full-stack Developer",
      content:
        "Neuctra Authix replaced our entire backend. Authentication + data storage in one package saved us months of development.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "Solo Developer",
    },
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content:
        "We launched our MVP in 2 weeks using Authix. No server setup, just React frontend + Authix for everything backend.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "TechStart Inc",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO at ScaleUp",
      content:
        "The ability to create multiple client apps from one dashboard while maintaining separate data stores is revolutionary.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "ScaleUp Technologies",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-28 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#00c420]/10 to-transparent rounded-full blur-3xl"
          />
          
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#00c420]/10 to-transparent rounded-full blur-3xl"
          />

          {/* Floating Icons */}
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 1.2, 0],
                y: [0, -30, -50, 0],
                x: [0, Math.sin(index) * 20, Math.cos(index) * 20, 0]
              }}
              transition={{
                duration: 6,
                delay: item.delay * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              className="absolute"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#00c420]/20 to-[#00c420]/20 backdrop-blur-xl border border-[#00c420]/30 mb-6 sm:mb-8"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                All-in-One Auth & Data Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight"
            >
              Build Apps
              <br />
              <span className="bg-gradient-to-r from-[#00c420] via-[#00ff40] to-[#00c420] bg-clip-text text-transparent">
                Without Servers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
            >
              Authentication + Data Storage + User Management in one platform.
              <br className="hidden md:block" />
              Create unlimited apps, store JSON data, and deploy
              <span className="text-[#00c420] font-semibold"> serverless applications </span>
              with our SDK.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/signup"
                className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#00c420] to-[#00c420] rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-[#00c420]/30 hover:shadow-[#00c420]/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="truncate">Create Free Account</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#workflow"
                className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-base sm:text-lg border border-white/10 hover:bg-white/10 hover:border-[#00c420]/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                How It Works
              </motion.a>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300"
                >
                  <div className="text-[#00c420] mb-2 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Workflow Section */}
      <section id="workflow" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              How
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Neuctra Authix Works
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Complete platform to build and deploy serverless applications
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00c420]/20 to-transparent" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00c420] to-[#00c420] flex items-center justify-center text-lg font-bold">
                        {step.step}
                      </div>
                      <div className="p-2 bg-[#00c420]/20 rounded-lg">
                        <div className="text-[#00c420]">{step.icon}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              One Platform,
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Multiple Solutions
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`group relative bg-gradient-to-br ${
                  feature.color
                } backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 ${
                  activeFeature === i ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-4 sm:mb-6 transform transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-3 sm:mb-4 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#00c420] font-semibold text-sm sm:text-base">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    {feature.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#00c420]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
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

      {/* Testimonials */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Trusted by
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Developers Worldwide
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#00c420]/50 transition-all duration-500"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-[#00c420]/30"
                  />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">{t.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                    <p className="text-[#00c420] text-xs font-semibold mt-1">
                      {t.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  "{t.content}"
                </p>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c420] fill-current"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#00c420]/20 via-[#00c420]/20 to-[#00c420]/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00c420]/10 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
                Start Building Serverless Apps
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
                Authentication + Data Storage + User Management
                <br />
                <span className="text-[#00c420] font-bold">All in one platform</span>
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    Create Free Account
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="https://github.com/neuctra/authix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    View SDK on GitHub
                  </Link>
                </motion.div>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm">
                Free forever • Unlimited apps • No server setup • 5-minute integration
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;