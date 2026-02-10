import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Rocket,
  Target,
  Sparkles,
  Globe,
  Cpu,
  Shield,
  Zap,
  Code,
  Layers,
  Database,
  Cloud,
  CheckCircle,
  ArrowRight,
  Fingerprint,
  Lock,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Security First",
      description:
        "Enterprise-grade encryption, RBAC, and AI-driven threat detection",
    },
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Lightning Fast",
      description: "Serverless architecture with global edge infrastructure",
    },
    {
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Developer First",
      description:
        "Built by developers, for developers with comprehensive SDKs",
    },
    {
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Seamless Integration",
      description: "Pre-built React components and Express SDKs",
    },
    {
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Scalable Storage",
      description: "Serverless JSON storage with multi-region replication",
    },
    {
      icon: <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Zero Infrastructure",
      description: "No servers to manage, fully serverless platform",
    },
  ];

  const features = [
    "Passwordless & biometric authentication",
    "Multi-factor verification",
    "Real-time analytics & monitoring",
    "Multi-region edge infrastructure",
    "Role-based access control",
    "AI-driven threat detection",
  ];

  return (
    <section className="min-h-screen bg-black text-gray-300 px-4 xs:px-6 sm:px-8 py-20 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated Background Elements - Responsive Sizes */}
      <div className="absolute top-1/4 left-4 xs:left-6 sm:left-10 w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#00c420]/5 blur-xl sm:blur-2xl md:blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-4 xs:right-6 sm:right-10 w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#00c420]/5 blur-xl sm:blur-2xl md:blur-3xl rounded-full animate-pulse delay-1000" />

      {/* Grid Pattern - Responsive Size */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,196,32,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,196,32,0.03)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] md:bg-[size:40px_40px] opacity-20" />

      <div className="relative max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-2 xs:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#00c420]/10 to-[#00c420]/5 rounded-full text-[#00c420] font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">About Neuctra Authix</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Redefining Authentication
            <br className="hidden sm:block" />
            <span className="text-[#00c420]">
              for the Serverless Era
            </span>
          </h1>

          <p className="text-gray-200 text-sm xs:text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Neuctra Authix is a{" "}
            <span className="text-white font-medium">
              cutting-edge, serverless authentication platform
            </span>{" "}
            developed by{" "}
            <a
              href="https://neuctra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00c420] hover:text-[#00c420]/80 font-semibold transition-colors"
            >
              Neuctra
            </a>
            , empowering developers with secure, scalable user management
            without infrastructure complexity.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group"
          >
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full backdrop-blur-md hover:border-[#00c420]/30 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-[#00c420]/10 rounded-lg">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c420]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                At Neuctra Authix, our mission is to{" "}
                <span className="text-white font-medium">
                  eliminate authentication complexity
                </span>
                . We provide developers with enterprise-grade security through
                serverless architecture, enabling seamless integration with
                pre-built React components, Express SDKs, and secure JSON
                storage—all while maintaining zero infrastructure overhead.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group"
          >
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full backdrop-blur-md hover:border-[#00c420]/30 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-[#00c420]/10 rounded-lg">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c420]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                We envision a future where{" "}
                <span className="text-white font-medium">
                  authentication is invisible yet impenetrable
                </span>
                . Every application—from ambitious startups to global
                enterprises—can deliver frictionless login experiences with
                real-time threat intelligence and multi-region scalability, all
                deployed in minutes, not months.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c420]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 h-full hover:bg-white/10 hover:border-[#00c420]/30 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-[#00c420]/10 rounded-lg group-hover:bg-[#00c420]/20 transition-colors">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-12 sm:mb-14 md:mb-16 lg:mb-20 backdrop-blur-md"
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-[#00c420]/10 rounded-lg">
                  <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c420]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Enterprise Features
                </h2>
              </div>
              <div className="grid gap-2 sm:gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#00c420] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mt-6 lg:mt-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-[#00c420]/10 rounded-lg">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c420]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Global Infrastructure
                </h3>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Powered by Neuctra's global edge network, Authix delivers
                sub-50ms latency worldwide with multi-region replication and
                automatic failover.
              </p>
              <div className="flex items-center text-[#00c420] font-medium">
                <a
                  href="https://neuctra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 hover:gap-2 sm:hover:gap-3 transition-all text-sm sm:text-base"
                >
                  Learn more about Neuctra
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technology Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center px-2 sm:px-0"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full mb-4 sm:mb-6">
            <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-[#00c420]" />
            <span className="text-gray-300 text-sm sm:text-base">
              Powered by Neuctra
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Built for Modern Development
          </h2>
          <p className="text-gray-400 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Neuctra Authix combines{" "}
            <span className="text-white font-medium">serverless architecture</span>{" "}
            with{" "}
            <span className="text-white font-medium">developer-friendly tooling</span>,
            providing a comprehensive authentication solution trusted by
            startups and enterprises alike. As part of the Neuctra ecosystem,
            we're committed to pushing the boundaries of what's possible in
            cloud security.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;