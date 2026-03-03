"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Database,
  Code2,
  Infinity,
  User,
  CircleQuestionMark,
} from "lucide-react";

export default function NeuctraAuthixHeroSection() {
  const stats = [
    { number: "Unlimited", label: "Apps per Account", icon: <Infinity className="w-5 h-5" /> },
    { number: "99.99%", label: "Uptime SLA", icon: <Shield className="w-5 h-5" /> },
    { number: "<5 min", label: "Integration Time", icon: <Code2 className="w-5 h-5" /> },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-28 md:pt-32 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle_at_30%_50%,rgba(0,196,32,0.22),transparent_65%)] blur-3xl opacity-60" />
        <div className="absolute top-1/2 -right-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(0,196,32,0.16),transparent_65%)] blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wide">
            Secure • Serverless • Scalable
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
        >
          Authentication & Data
          <br />
          <span className="bg-gradient-to-r from-[#00c420] via-[#00ff40] to-[#00c420] bg-clip-text text-transparent">
            Without Backend Complexity
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Neuctra Authix handles authentication, user management,
          and structured JSON storage — so you can focus entirely on
          building your product.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-14"
        >
          {/* Primary */}
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-primary rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <User className="w-5 h-5" />
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="/docs"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-semibold border border-white/20 flex items-center gap-3 hover:bg-white/20 transition-all duration-300"
          >
            <CircleQuestionMark className="w-5 h-5" />
            View Documentation
          </motion.a>
        </motion.div>

        {/* Trust Text */}
        <p className="text-sm text-gray-500 mb-12">
          No credit card required • Instant API access • Production ready
        </p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
            >
              <div className="flex justify-center text-[#00c420] mb-3 opacity-80">
                {stat.icon}
              </div>
              <div className="text-2xl font-extrabold">{stat.number}</div>
              <div className="text-gray-400 text-sm mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}