"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";

export default function NeuctraAuthixCTASection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl"
        >
          {/* Subtle grid texture */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:24px_24px]" />

          <div className="relative z-10 px-5 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-white">
              Build auth & Manage user data
              <span className="block text-[#00c420] mt-2">
                without backend headaches
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 px-2 sm:px-0">
              Neuctra Authix gives you authentication, user data storage, and UI
              components in one clean SDK — ready in minutes.
            </p>

            {/* CTA */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c420] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold hover:bg-[#00b31c] transition"
              >
                Get started for free
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="https://github.com/neuctra/authix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-medium text-gray-300 hover:bg-white/5 transition"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </div>

            <p className="mt-6 sm:mt-8 text-xs text-gray-500">
              Free forever • No credit card • Unlimited apps
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
