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
      icon: Layers,
      title: "Complete Authentication Suite",
      description:
        "Pre-built React components, Express SDK, and secure storage — everything needed for full-stack auth.",
      stat: "Zero server setup",
    },
    {
      icon: DatabaseZap,
      title: "Built-in Data Storage",
      description:
        "Store user profiles and app data as JSON. Ideal for modern client-side & serverless apps.",
      stat: "Unlimited JSON storage",
    },
    {
      icon: Package,
      title: "One Dashboard, Multiple Apps",
      description:
        "Create unlimited apps from one dashboard. Each app gets its own credentials and environment.",
      stat: "Unlimited apps",
    },
    {
      icon: ServerCrash,
      title: "Serverless by Default",
      description:
        "No infrastructure to manage. Authix handles auth, data, scaling, and security.",
      stat: "Zero backend ops",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,196,32,0.15),transparent_20%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            One Platform.
            <br />
            <span className="text-[#00c420]">Infinite Possibilities.</span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Auth, data, and scale — designed as a single, serverless experience.
          </p>
        </motion.div>

        {/* Feature Flow */}
        <div className="relative space-y-20">
          {/* Vertical glow line */}
          <div className="absolute left-7 top-3.5 h-full w-px bg-gradient-to-b from-[#00c420]/40 via-[#00c420]/20 to-transparent hidden sm:block" />

          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative flex items-start gap-6 sm:gap-10 w-full"
              >
                {/* Number */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-primary font-bold text-lg sm:text-xl">
                    {i + 1}
                  </div>
                  <span className="absolute inset-0 rounded-full bg-[#00c420]/20 blur-xl opacity-40" />
                </div>

                {/* Icon + Content */}
                <div className="flex-1 flex items-start justify-between gap-4">
                  {/* Content */}
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-[#00c420] font-semibold text-sm">
                      <TrendingUp className="w-4 h-4" />
                      {feature.stat}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-white/5">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#00c420]" />
                    </div>
                    <span className="absolute inset-0 rounded-full bg-[#00c420]/20 blur-xl opacity-50" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
