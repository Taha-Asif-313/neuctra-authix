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
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "Solo Developer",
    },
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content:
        "We launched our MVP in 2 weeks using Authix. No server setup, just React frontend + Authix for everything backend.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "TechStart Inc",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO at ScaleUp",
      content:
        "The ability to create multiple client apps from one dashboard while maintaining separate data stores is revolutionary.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
      company: "ScaleUp Technologies",
    },
  ];
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            Trusted by
            <br />
            <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
              Developers Worldwide
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#00c420]/50 transition-all duration-500"
            >
              {/* User */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-[#00c420]/30"
                />
                <div>
                  <h4 className="font-bold text-base sm:text-lg">{t.name}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                  <p className="text-[#00c420] text-xs font-semibold mt-1">
                    {t.company}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
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
