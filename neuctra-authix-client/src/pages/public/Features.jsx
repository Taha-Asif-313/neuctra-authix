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

const primaryColor = "#00c420"; // theme color

const featureData = [
  {
    icon: <Shield className="w-8 h-8 text-[#00c420]" />,
    title: "Enterprise Security",
    description:
      "Protect your users with 256-bit encryption, advanced hashing algorithms, and AI-powered threat detection.",
  },
  {
    icon: <KeyRound className="w-8 h-8 text-[#00c420]" />,
    title: "Passwordless Auth",
    description:
      "Let users sign in with magic links, passkeys, or one-time codes — no passwords required.",
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
      "Enable Face ID and fingerprint authentication for supported browsers and devices.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-[#00c420]" />,
    title: "SDK Integration",
    description:
      "Integrate Authix into any JavaScript framework with our lightweight SDKs and prebuilt React components.",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#00c420]" />,
    title: "Lightning Fast",
    description:
      "Authentication responses under 200ms worldwide with multi-region edge infrastructure.",
  },
  {
    icon: <Gauge className="w-8 h-8 text-[#00c420]" />,
    title: "Analytics & Insights",
    description:
      "Track active sessions, conversion rates, and usage with our built-in analytics dashboard.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-[#00c420]" />,
    title: "Scalable Infrastructure",
    description:
      "Designed to handle millions of requests seamlessly — whether you're a startup or an enterprise.",
  },
  {
    icon: <Activity className="w-8 h-8 text-[#00c420]" />,
    title: "Real-Time Monitoring",
    description:
      "Monitor login attempts, suspicious activities, and usage spikes in real-time.",
  },
  {
    icon: <Globe className="w-8 h-8 text-[#00c420]" />,
    title: "Global Edge Network",
    description:
      "Deployed across multiple regions for ultra-low latency and maximum uptime.",
  },
  {
    icon: <Lock className="w-8 h-8 text-[#00c420]" />,
    title: "Role-Based Access (RBAC)",
    description:
      "Set fine-grained access controls for different users and teams with ease.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#00c420]" />,
    title: "AI-Powered Detection",
    description:
      "Prevent fraud, detect anomalies, and adapt dynamically with AI-driven intelligence.",
  },
];

const Features = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-gray-300 py-20 px-5 md:px-10 overflow-hidden">
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#00c420]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#00c420]/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-3xl md:max-w-4xl mx-auto mb-16 px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#00c420]/10 border border-[#00c420]/30 text-[#00c420] text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Powering the Next Generation of Authentication</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Powerful <span className="text-[#00c420]">Features</span> for Modern Apps
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Built for developers. Trusted by enterprises. Designed for speed,
            security, and simplicity.
          </p>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {featureData.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-gray-800 hover:border-[#00c420]/40 hover:shadow-[0_0_25px_#00c42033] transition-all duration-500 hover:scale-[1.03] text-center sm:text-left"
          >
            <div className="mb-5 flex justify-center sm:justify-start">{f.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
              {f.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {f.description}
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
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to build secure authentication?
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-8">
          Start integrating <span className="text-[#00c420]">Neuctra Authix</span> in minutes. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/register"
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00c420] to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00c420]/30 transition-all duration-300 text-center"
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
