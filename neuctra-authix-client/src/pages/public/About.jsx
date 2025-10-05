import React from "react";
import { motion } from "framer-motion";
import { Users, Rocket, Target, Sparkles, Globe } from "lucide-react";

const About = () => {
  return (
    <section className="min-h-screen bg-black text-gray-300 px-6 py-24 relative overflow-hidden">
      {/* Glow Backgrounds */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00c420]/10 border border-[#00c420]/20 rounded-full text-[#00c420]"
          >
            <Users className="w-4 h-4" />
            <span>About Us</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Empowering Authentication for Everyone
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We’re on a mission to simplify authentication for developers and teams — 
            providing secure, modern, and elegant identity solutions.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12 text-gray-400">
          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 mb-4 text-[#00c420]">
              <Target className="w-6 h-6" />
              <h2 className="text-xl font-semibold text-white">Our Mission</h2>
            </div>
            <p>
              At Neuctra, our mission is to make secure authentication effortless. 
              We help developers integrate beautiful, production-ready auth flows without the complexity — 
              so they can focus on what truly matters: building great products.
            </p>
          </motion.section>

          {/* Vision */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 mb-4 text-[#00c420]">
              <Rocket className="w-6 h-6" />
              <h2 className="text-xl font-semibold text-white">Our Vision</h2>
            </div>
            <p>
              We envision a world where authentication feels invisible yet secure. 
              Where every app, from startups to enterprises, can offer world-class login experiences with minimal setup.
            </p>
          </motion.section>

          {/* Core Values */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 mb-4 text-[#00c420]">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl font-semibold text-white">Our Values</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="text-white font-medium">Transparency:</span> We build with honesty and clarity.</li>
              <li><span className="text-white font-medium">Security:</span> Every line of code prioritizes user safety.</li>
              <li><span className="text-white font-medium">Innovation:</span> We constantly push to redefine what’s possible in auth.</li>
              <li><span className="text-white font-medium">Community:</span> Our tools are for developers, by developers.</li>
            </ul>
          </motion.section>

          {/* Global Reach */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 mb-4 text-[#00c420]">
              <Globe className="w-6 h-6" />
              <h2 className="text-xl font-semibold text-white">Global Impact</h2>
            </div>
            <p>
              Our authentication solutions power developers and businesses across multiple countries, 
              ensuring reliability, scalability, and performance at every level.
            </p>
          </motion.section>
        </div>
      </div>
    </section>
  );
};

export default About;
