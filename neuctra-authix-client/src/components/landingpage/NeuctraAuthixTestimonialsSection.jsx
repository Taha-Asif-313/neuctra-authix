"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function NeuctraAuthixTestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Full-stack Developer",
      content:
        "Neuctra Authix replaced our entire backend. Authentication + data storage in one package saved us months of development.",
      rating: 5,
      company: "Solo Developer",
    },
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content:
        "We launched our MVP in 2 weeks using Authix. No server setup, just React frontend + Authix for everything backend.",
      rating: 5,
      company: "TechStart Inc",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO at ScaleUp",
      content:
        "The ability to create multiple client apps from one dashboard while maintaining separate data stores is revolutionary.",
      rating: 5,
      company: "ScaleUp Technologies",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            Trusted by
            <br />
            <span className="text-primary">
              Developers Worldwide
            </span>
          </h2>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            See why thousands of developers rely on Neuctra Authix for fast, secure, serverless authentication and data management.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-primary cursor-pointer transition-all"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 flex items-center justify-center font-black rounded-xl bg-[#00c420]/10 text-[#00c420] text-lg sm:text-xl">
                  {t.name[0]}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-white text-sm sm:text-base lg:text-lg">
                    {t.name}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                  <p className="text-[#00c420] text-xs sm:text-sm font-semibold">
                    {t.company}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                “{t.content}”
              </p>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c420] fill-current"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
