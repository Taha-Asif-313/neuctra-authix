import React from "react";
import {
  Shield,
  KeyRound,
  Cpu,
  Zap,
  Fingerprint,
  Users,
  Lock,
  Code2,
  Gauge,
  Globe,
  Cloud,
  Activity,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const primaryColor = "#00c420"; // Authix theme color

const featureData = [
  {
    icon: <Shield className="w-8 h-8 text-[#00c420]" />,
    title: "Enterprise Security",
    description:
      "Protect your users with 256-bit encryption, advanced hashing, and AI-powered threat detection.",
  },
  {
    icon: <KeyRound className="w-8 h-8 text-[#00c420]" />,
    title: "Passwordless Auth",
    description:
      "Enable magic links, passkeys, or OTPs — eliminating passwords for seamless login.",
  },
  {
    icon: <Users className="w-8 h-8 text-[#00c420]" />,
    title: "User Management",
    description:
      "Manage users, roles, and permissions through a unified, modern dashboard.",
  },
  {
    icon: <Fingerprint className="w-8 h-8 text-[#00c420]" />,
    title: "Biometric Login",
    description:
      "Support Face ID, fingerprint, and other biometric authentication for modern devices.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-[#00c420]" />,
    title: "SDK Integration",
    description:
      "Lightweight SDKs and pre-built React components make integration effortless.",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#00c420]" />,
    title: "Lightning Fast",
    description:
      "Global multi-region edge infrastructure ensures <200ms authentication responses.",
  },
  {
    icon: <Gauge className="w-8 h-8 text-[#00c420]" />,
    title: "Analytics & Insights",
    description:
      "Track active sessions, user behavior, and usage patterns with real-time dashboards.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-[#00c420]" />,
    title: "Scalable Infrastructure",
    description:
      "Handle millions of requests effortlessly, perfect for startups or enterprises.",
  },
  {
    icon: <Activity className="w-8 h-8 text-[#00c420]" />,
    title: "Real-Time Monitoring",
    description:
      "Detect login anomalies, spikes, and suspicious activity instantly.",
  },
  {
    icon: <Globe className="w-8 h-8 text-[#00c420]" />,
    title: "Global Edge Network",
    description:
      "Multiple regional deployments reduce latency and maximize uptime.",
  },
  {
    icon: <Lock className="w-8 h-8 text-[#00c420]" />,
    title: "Role-Based Access",
    description: "Granular access control for users and teams with ease.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#00c420]" />,
    title: "AI-Powered Detection",
    description:
      "Fraud prevention, anomaly detection, and dynamic security adjustments with AI.",
  },
];

const Features = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-gray-300 py-28 px-5 md:px-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#00c420]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00c420]/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-3xl md:max-w-4xl mx-auto mb-16 px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#00c420]/10 border border-[#00c420]/30 text-[#00c420] text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Powering the Next Generation of Authentication
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Powerful <span className="text-[#00c420]">Features</span> for Modern
            Apps
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Built for developers. Trusted by enterprises. Designed for speed,
            security, and simplicity.
          </p>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {featureData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-gray-800 hover:border-[#00c420]/40 hover:shadow-[0_0_25px_#00c420]/20 transition-all duration-500 hover:scale-[1.03] text-center sm:text-left"
          >
            <div className="mb-5 flex justify-center sm:justify-start">
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center mt-20 md:mt-24 px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Ready to secure your application?
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-8">
          Start integrating{" "}
          <span className="text-[#00c420]">Neuctra Authix</span> in minutes. No
          credit card required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/register"
            className="px-6 sm:px-8 py-3 bg-primary text-white rounded-lg font-semibold transition-all duration-300 text-center"
          >
            Get Started Free
          </a>
          <a
            href="/docs"
            className="px-6 sm:px-8 py-3 border border-gray-700 rounded-lg text-gray-300 hover:text-[#00c420] hover:border-[#00c420] transition-all duration-300 text-center"
          >
            View Documentation
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
