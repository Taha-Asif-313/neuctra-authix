import React, { useState, useEffect } from "react";
import {
  Shield,
  Mail,
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  Star,
  Lock,
  UserCheck,
  ChevronDown,
  Sparkles,
  Globe,
  TrendingUp,
  Code2,
  Boxes,
  CheckCircle2,
  Github,
  Play,
  Terminal,
} from "lucide-react";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />,
      title: "Pre-built React Components",
      description:
        "Drop-in SignIn, SignUp, Profile, and OAuth components. Fully customizable, accessible, and production-ready out of the box.",
      stats: "Install & ship in minutes",
      color: "from-primary/20 to-emerald-600/20",
    },
    {
      icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />,
      title: "Enterprise-Grade Security",
      description:
        "JWT tokens, httpOnly cookies, OTP verification, password reset flows, and role-based access control built-in.",
      stats: "Bank-level encryption",
      color: "from-primary/20 to-green-500/20",
    },
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />,
      title: "Complete User Management",
      description:
        "Full CRUD operations, user profiles, extra data storage, and admin controls. Everything you need to manage users at scale.",
      stats: "Unlimited users",
      color: "from-green-500/20 to-primary/20",
    },
    {
      icon: <Code2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />,
      title: "Developer-First SDK",
      description:
        "Type-safe TypeScript SDK with intuitive API design. Works seamlessly with React, Next.js, Node.js, and any JavaScript framework.",
      stats: "npm install @neuctra/authix",
      color: "from-emerald-600/20 to-green-600/20",
    },
  ];

  const codeExamples = [
    {
      title: "Install Package",
      language: "bash",
      code: `npm install @neuctra/authix
# or
yarn add @neuctra/authix`,
    },
    {
      title: "Initialize SDK",
      language: "typescript",
      code: `import { NeuctraAuthix } from '@neuctra/authix';

const authix = new NeuctraAuthix({
  baseUrl: 'https://api.authix.neuctra.com',
  apiKey: 'your-api-key',
  appId: 'your-app-id'
});`,
    },
    {
      title: "Sign Up User",
      language: "typescript",
      code: `const newUser = await authix.signup({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePassword123',
  role: 'user'
});`,
    },
    {
      title: "Login & Get Profile",
      language: "typescript",
      code: `const { token } = await authix.login({
  email: 'john@example.com',
  password: 'securePassword123',
  appId: 'your-app-id'
});

const profile = await authix.getProfile({ token });`,
    },
  ];

  const sdkFeatures = [
    {
      title: "User Authentication",
      items: [
        "Signup",
        "Login",
        "Logout",
        "Password Reset",
        "OTP Verification",
      ],
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "User Management",
      items: [
        "Update Profile",
        "Change Password",
        "Delete User",
        "Get Profile",
      ],
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Extra Data Storage",
      items: ["Add Data", "Update Data", "Fetch Data", "Delete Data"],
      icon: <Boxes className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Security Features",
      items: [
        "JWT Tokens",
        "Email Verification",
        "Password Recovery",
        "Role-Based Access",
      ],
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Lead Developer at TechFlow",
      content:
        "Integrated @neuctra/authix in under 30 minutes. The pre-built components saved us weeks of development time.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "TechFlow",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO at StartupHub",
      content:
        "The SDK is incredibly intuitive. Type safety and clear documentation made implementation a breeze.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "StartupHub",
    },
    {
      name: "Emily Zhang",
      role: "Full Stack Engineer at Innovate",
      content:
        "Best auth solution I've used. Clean API, great docs, and the extra data storage feature is a game-changer.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "Innovate",
    },
  ];

  const stats = [
    { number: "10M+", label: "API Calls/Month", icon: <TrendingUp /> },
    { number: "99.99%", label: "Uptime SLA", icon: <Shield /> },
    { number: "1000+", label: "Apps Powered", icon: <Zap /> },
    { number: "<5min", label: "Setup Time", icon: <Code2 /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-green-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-26 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary/20 to-green-500/20 backdrop-blur-xl border border-primary/30 mb-6 sm:mb-8 hover:scale-105 transition-transform">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                @neuctra/authix • Production Ready
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight">
              Authentication
              <br />
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Pre-built React components + powerful SDK + complete user
              management.
              <br className="hidden md:block" />
              <span className="text-primary font-semibold">
                Everything you need
              </span>{" "}
              to add authentication in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
              <a
                href="https://www.npmjs.com/package/@neuctra/authix"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-green-500 rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="truncate">npm install @neuctra/authix</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
              </a>

              <a
                href="#demo"
                className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-base sm:text-lg border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                View Demo
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-primary mb-2 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1">
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
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
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
                  activeFeature === i ? "ring-2 ring-primary/50" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-4 sm:mb-6 transform  transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-3 sm:mb-4 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Features Grid */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              Powerful SDK,
              <br />
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Simple API
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {sdkFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-primary mb-3 sm:mb-4">
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
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
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
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border-b border-white/10">
                  <span className="font-bold text-primary text-sm sm:text-base">
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
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">{t.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                    <p className="text-primary text-xs font-semibold mt-1">
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-current"
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
          <div className="relative bg-gradient-to-br from-primary/20 via-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
                Start Building Today
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
                Join thousands of developers using{" "}
                <span className="text-primary font-bold">
                  @neuctra/authix
                </span>{" "}
                to power their authentication.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <a
                  href="https://www.npmjs.com/package/@neuctra/authix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                </a>

                <a
                  href="https://github.com/neuctra/authix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  View on GitHub
                </a>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm">
                Free forever • No credit card required • 5 minutes to integrate
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
