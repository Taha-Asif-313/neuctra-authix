"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // or "next/link" if using Next.js
import { ArrowRight, Github } from "lucide-react";

export default function NeuctraAuthixCTASection() {
  return (
    <section className="relative py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#00c420]/20 via-[#00c420]/20 to-[#00c420]/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 overflow-hidden"
        >
          {/* Subtle Background Glow */}
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
              <span className="text-[#00c420] font-bold">
                All in one platform
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="group w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
  );
}
