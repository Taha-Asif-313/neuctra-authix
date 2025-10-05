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
} from "lucide-react";
import { Link } from 'react-router-dom'

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);

    // Generate floating icons - ONLY for hero section
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
        icon: <Lock className="w-4 h-4 text-[#00c420]/40" />,
        x: 15,
        y: 70,
        delay: 2,
      },
      {
        icon: <UserCheck className="w-5 h-5 text-[#00c420]/30" />,
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
        icon: <Cloud className="w-4 h-4 text-[#00c420]/40" />,
        x: 40,
        y: 80,
        delay: 6,
      },
      {
        icon: <Smartphone className="w-5 h-5 text-[#00c420]/30" />,
        x: 60,
        y: 85,
        delay: 7,
      },
      {
        icon: <Globe className="w-6 h-6 text-[#00c420]/40" />,
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
        icon: <Fingerprint className="w-5 h-5 text-[#00c420]/40" />,
        x: 65,
        y: 60,
        delay: 10,
      },
      {
        icon: <CpuIcon className="w-6 h-6 text-[#00c420]/30" />,
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
      icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Pre-built React Components",
      description:
        "Drop-in authentication components that work out of the box. Fully customizable, accessible, and production-ready.",
      stats: "Install & ship in minutes",
      color: "from-white/5 to-white/0",
    },
    {
      icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Enterprise-Grade Security",
      description:
        "JWT tokens, secure session management, OTP verification, and role-based access control built-in.",
      stats: "Bank-level security",
      color: "from-white/5 to-white/0",
    },
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Complete User Management",
      description:
        "Full user lifecycle management from signup to profile updates. Everything you need at scale.",
      stats: "Unlimited users",
      color: "from-white/5 to-white/0",
    },
    {
      icon: <Code2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />,
      title: "Developer-First SDK",
      description:
        "Type-safe TypeScript SDK with intuitive API design. Works with any JavaScript framework.",
      stats: "npm install @neuctra/authix-react",
      color: "from-white/5 to-white/0",
    },
  ];

  const codeExamples = [
    {
      title: "Install Package",
      language: "bash",
      code: `npm install @neuctra/authix-react
# or
yarn add @neuctra/authix-react
# or
pnpm add @neuctra/authix-react`,
    },
    {
      title: "Configure SDK",
      language: "typescript",
      code: `import { setSdkConfig } from '@neuctra/authix-react';

setSdkConfig({
  baseUrl: 'https://api.neuctra.com/v1',
  apiKey: 'your-api-key',
  appId: 'your-app-id'
});`,
    },
    {
      title: "Use Components",
      language: "jsx",
      code: `import { ReactSignedIn, ReactUserButton } from '@neuctra/authix-react';

function App() {
  return (
    <ReactSignedIn>
      <ReactUserButton onLogout={handleLogout} />
    </ReactSignedIn>
  );
}`,
    },
    {
      title: "Complete Setup",
      language: "jsx",
      code: `// main.jsx
import { setSdkConfig } from '@neuctra/authix-react';

setSdkConfig({
  baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_AUTHIX_APP_ID
});`,
    },
  ];

  const sdkFeatures = [
    {
      title: "Authentication Components",
      items: [
        "ReactSignedIn",
        "ReactSignedOut",
        "ReactUserButton",
        "ReactUserLogin",
      ],
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "User Management",
      items: [
        "Conditional Rendering",
        "Session Management",
        "Profile Access",
        "Secure Logout",
      ],
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Security Features",
      items: [
        "JWT Tokens",
        "LocalStorage Security",
        "Auto Validation",
        "Error Handling",
      ],
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Framework Support",
      items: ["React", "Next.js", "Vite", "Create React App"],
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  const componentFeatures = [
    {
      name: "ReactSignedIn",
      description: "Conditionally renders content only for authenticated users",
      icon: <UserCheck className="w-4 h-4" />,
      benefits: [
        "Automatic auth checking",
        "Fallback content support",
        "Lightweight",
      ],
    },
    {
      name: "ReactUserButton",
      description: "Complete user dropdown with profile and logout",
      icon: <Users className="w-4 h-4" />,
      benefits: ["Avatar display", "Menu navigation", "Customizable URLs"],
    },
    {
      name: "ReactUserLogin",
      description: "Full login form with validation and success handling",
      icon: <LogIn className="w-4 h-4" />,
      benefits: ["Form validation", "Error states", "Success callbacks"],
    },
  ];

  const stats = [
    { number: "10M+", label: "API Calls/Month", icon: <TrendingUp /> },
    { number: "99.99%", label: "Uptime SLA", icon: <Shield /> },
    { number: "1000+", label: "Apps Powered", icon: <Zap /> },
    { number: "<5min", label: "Setup Time", icon: <Code2 /> },
  ];

  const testimonials = [
    {
      name: "Marcus Rodriguez",
      role: "CTO at StartupHub",
      content:
        "The React components are incredibly intuitive. Type safety and clear documentation made implementation a breeze.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "StartupHub",
    },
    {
      name: "Daniel Carter",
      role: "Software Architect at CloudLink",
      content:
        "Authix helped us unify login flows across multiple platforms effortlessly. The developer experience is top-notch.",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "CloudLink",
    },
    {
      name: "Ahmed Khan",
      role: "Engineering Manager at DevCore",
      content:
        "Authentication and user management have never been easier. Authix cut our setup time in half while improving security.",
      avatar:
        "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "DevCore",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section with Floating Icons */}
      <section className="relative pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background with floating icons - ONLY in hero section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#00c420]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#00c420]/10 to-transparent rounded-full blur-3xl" />

          {/* Floating Icons - ONLY in hero section */}
          {floatingIcons.map((item, index) => (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animationDelay: `${item.delay * 2}s`,
                animationDuration: "6s",
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#00c420]/20 to-[#00c420]/20 backdrop-blur-xl border border-[#00c420]/30 mb-6 sm:mb-8 hover:scale-105 transition-transform">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                @neuctra/authix-react • Production Ready
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              Authentication
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Pre-built React components + powerful SDK + complete user
              management.
              <br className="hidden md:block" />
              <span className="text-[#00c420] font-semibold">
                Everything you need
              </span>{" "}
              to add authentication in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
              <a
                href="/docs/installation"
                className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#00c420] to-[#00c420] rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-[#00c420]/30 hover:shadow-[#00c420]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="truncate">Get Started</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
              </a>

              <a
                href="#components"
                className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-base sm:text-lg border border-white/10 hover:bg-white/10 hover:border-[#00c420]/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                View Components
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300 hover:scale-105"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Everything You Need,
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Nothing You Don't
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Focus on building your app. We'll handle authentication, security,
              and user management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${
                  feature.color
                } backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] ${
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Features */}
      <section
        id="components"
        className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#00c420]/5 to-transparent"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Powerful React Components
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Ready to Use
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {componentFeatures.map((component, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00c420]/20 rounded-lg">
                    <div className="text-[#00c420]">{component.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {component.name}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {component.description}
                </p>
                <div className="space-y-2">
                  {component.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#00c420]"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SDK Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {sdkFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-[#00c420] mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {feature.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Code Examples */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {codeExamples.map((example, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-[#00c420]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border-b border-white/10">
                  <span className="font-bold text-[#00c420] text-sm sm:text-base">
                    {example.title}
                  </span>
                  <span className="text-xs text-gray-500 uppercase">
                    {example.language}
                  </span>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto">
                  <code className="text-xs sm:text-sm text-gray-300 font-mono">
                    {example.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Loved by
              <br />
              <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#00c420]/50 transition-all duration-500 hover:scale-105"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-[#00c420]/20 via-[#00c420]/20 to-[#00c420]/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00c420]/10 to-transparent" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
                Start Building Today
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
                Join thousands of developers using{" "}
                <span className="text-[#00c420] font-bold">
                  @neuctra/authix-react
                </span>{" "}
                to power their authentication.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  to="/docs/installation"
                  className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  to="https://github.com/neuctra/authix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  View on GitHub
                </Link>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm">
                Free forever • No credit card required • 5 minutes to integrate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            filter: brightness(1);
          }
          25% {
            transform: translateY(-12px) rotate(3deg) scale(1.05);
            filter: brightness(1.1);
          }
          50% {
            transform: translateY(-20px) rotate(-2deg) scale(1.1);
            filter: brightness(1.15);
          }
          75% {
            transform: translateY(-10px) rotate(2deg) scale(1.05);
            filter: brightness(1.05);
          }
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            filter: brightness(1);
          }
        }

        .animate-float {
          animation: float 3.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transform-origin: center;
          will-change: transform, filter;
        }
      `}</style>
    </div>
  );
};

export default Home;
