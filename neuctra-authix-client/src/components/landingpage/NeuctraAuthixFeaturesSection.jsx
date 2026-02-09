"use client";

import { motion } from "framer-motion";
import {
  DatabaseZap,
  Layers,
  Package,
  ServerCrash,
  TrendingUp,
} from "lucide-react";

export default function NeuctraAuthixFeaturesSection() {
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
      icon: (
        <DatabaseZap className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />
      ),
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
      icon: (
        <ServerCrash className="w-10 h-10 sm:w-12 sm:h-12 text-[#00c420]" />
      ),
      title: "Serverless Architecture",
      description:
        "Build full-featured apps without managing servers. We handle authentication, data storage, and scaling for you.",
      stats: "No server management needed",
      color: "from-white/5 to-white/0",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
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

        {/* Features Grid */}
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
              } backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="mb-4 sm:mb-6">{feature.icon}</div>

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
  );
}
