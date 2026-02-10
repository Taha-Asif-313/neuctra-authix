"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Terminal,
  ArrowRight,
  Play,
  Shield,
  Database,
  Code2,
  Infinity,
  User,
  BadgeQuestionMark,
  Circle,
  CircleQuestionMark,
} from "lucide-react";

export default function NeuctraAuthixHeroSection() {
  const stats = [
    { number: "Infinite", label: "Apps per Account", icon: <Infinity /> },
    { number: "99.99%", label: "Uptime SLA", icon: <Shield /> },
    { number: "100MB", label: "Data Storage/User", icon: <Database /> },
    { number: "<5min", label: "First Integration", icon: <Code2 /> },
  ];
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-28 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Modern Orb Background (Static) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left Orb */}
        <div
          className="
    absolute top-1/2 -left-1/2
    -translate-y-1/2
    w-[140%] h-[140%]
    rounded-full
    bg-[radial-gradient(circle_at_30%_50%,rgba(0,196,32,0.22),transparent_65%)]
    blur-2xl
    opacity-70
  "
        />

        {/* Right Orb */}
        <div
          className="
    absolute top-1/2 -right-1/2
    -translate-y-1/2
    w-[140%] h-[140%]
    rounded-full
    bg-[radial-gradient(circle_at_70%_50%,rgba(0,196,32,0.16),transparent_65%)]
    blur-2xl
    opacity-60
  "
        />

        {/* Soft Vertical Glow */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-b from-transparent via-[#00c420]/5 to-transparent
      opacity-40
    "
        />
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
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary mb-6 sm:mb-8"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs font-semibold">
              All-in-One Auth & Data Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6"
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
            className="text-base sm:text-lg max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
          >
            Authentication + Data Storage + User Management in one platform.
            <br className="hidden md:block" />
            Create unlimited apps, store JSON data, and deploy
            <span className="text-[#00c420] font-semibold">
              {" "}
              serverless applications{" "}
            </span>
            with our SDK.
          </motion.p>

        {/* CTA */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
>
  {/* Primary CTA */}
  <motion.a
    href="/signup"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative w-full sm:w-auto px-8 py-4 bg-primary rounded-2xl font-bold flex items-center gap-3 justify-center transition-all duration-300"
  >
    <User className="w-5 h-5" />
    Create Free Account
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </motion.a>

  {/* Secondary CTA */}
  <motion.a
    href="/docs"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="group w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-semibold text-white border border-white/20 flex items-center gap-3 justify-center hover:bg-white/20 transition-all duration-300"
  >
    <CircleQuestionMark className="w-5 h-5" />
    How It Works
  </motion.a>
</motion.div>


          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }}>
                <div className="text-[#00c420] mb-2 flex justify-center opacity-70">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
