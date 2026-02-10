import React from "react";
import { Check, Zap, Star, Building2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    icon: <Zap className="w-6 h-6 text-[#00c420]" />,
    price: "$0",
    period: "/month",
    description: "For experiments, demos, and personal projects.",
    features: [
      "Up to 100 active users",
      "Email & password authentication",
      "Basic user management",
      "Community support",
    ],
    buttonText: "Get Started",
    buttonLink: "/register",
    highlight: false,
    popular: false,
  },

  {
    name: "Growth",
    icon: <Sparkles className="w-6 h-6 text-green-400" />,
    price: "$9",
    period: "/month",
    description: "Perfect for indie developers and early-stage startups.",
    features: [
      "Up to 10,000 active users",
      "Email + OAuth (Google, GitHub, etc.)",
      "Custom app branding",
      "JWT & session management",
      "Basic analytics & logs",
      "Email support",
    ],
    buttonText: "Upgrade to Growth",
    buttonLink: "/register",
    highlight: false,
    popular: false,
  },

  {
    name: "Pro",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    price: "$29",
    period: "/month",
    description: "Built for scaling SaaS products and teams.",
    features: [
      "Unlimited users",
      "All OAuth & social providers",
      "Advanced security controls (encryption, GDPR & SOC2)",
      "Custom domains & branding",
      "Advanced analytics, logs & monitoring",
      "Priority support & faster SLAs",
      "99.5% uptime SLA",
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/register",
    highlight: true,
    popular: true,
  },

  {
    name: "Enterprise",
    icon: <Building2 className="w-6 h-6 text-blue-400" />,
    price: "Custom",
    period: "",
    description: "Enterprise-grade authentication at massive scale.",
    features: [
      "Dedicated infrastructure & isolated apps",
      "SSO, SAML, RBAC & advanced permissions",
      "Advanced audit logs & compliance reporting",
      "Custom SLAs (99.9% uptime)",
      "Dedicated account manager",
      "24/7 phone & Slack support",
      "Custom contracts & enterprise integrations",
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact",
    highlight: false,
    popular: false,
  },
];




const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-gray-300 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 left-10 w-80 h-80 bg-[#00c420]/20 blur-3xl rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#00c420]/10 blur-3xl rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00c420]/5 blur-3xl rounded-full"
        />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center max-w-4xl mx-auto mb-16 lg:mb-20 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#00c420]/10 border border-[#00c420]/30 text-[#00c420] text-sm font-semibold"
        >
          <Sparkles className="w-4 h-4" />
          <span>Transparent Pricing</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Simple,{" "}
          <span className="bg-gradient-to-r from-[#00c420] to-green-400 bg-clip-text text-transparent">
            Transparent
          </span>{" "}
          Pricing
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Choose a plan that fits your scale — upgrade or downgrade anytime. 
          <span className="font-medium"> No hidden fees.</span>
        </p>
      </motion.div>

      {/* Pricing Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover="hover"
            className={`relative rounded-2xl p-6 sm:p-8 flex flex-col h-full backdrop-blur-lg border-2 transition-all duration-500 ${
              plan.highlight
                ? "bg-gradient-to-br from-[#00c420]/10 via-[#00c420]/5 to-transparent border-[#00c420]/40 shadow-2xl shadow-[#00c420]/20"
                : "bg-white/5 border-gray-800/50 hover:border-gray-700/80"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-gradient-to-r from-[#00c420] to-green-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              </motion.div>
            )}

            {/* Header Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {plan.icon}
                </motion.div>
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              </div>
              
              <p className="text-gray-400 mb-6 text-base leading-relaxed">
                {plan.description}
              </p>
              
              <div className="flex items-end gap-2 mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-lg mb-1">
                  {plan.period}
                </span>
              </div>

              {/* Features List */}
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 mb-8"
              >
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-gray-300 text-base"
                  >
                    <Check className="w-5 h-5 text-[#00c420] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={plan.buttonLink}
                className={`w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 block ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[#00c420] to-green-500 text-black hover:shadow-2xl hover:shadow-[#00c420]/40 hover:scale-105"
                    : "border-2 border-gray-700 text-gray-300 hover:border-[#00c420] hover:text-[#00c420] hover:bg-[#00c420]/5"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative text-center mt-16 lg:mt-20 px-4"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 sm:p-10 border border-gray-800/50 max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            All plans include
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300 text-sm sm:text-base">
            {["30-day free trial", "No credit card required", "Cancel anytime", "24/7 support"].map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center justify-center gap-2 py-2"
              >
                <Check className="w-4 h-4 text-[#00c420]" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-base mt-8"
        >
          Need a custom plan?{" "}
          <Link
            to="/contact"
            className="text-[#00c420] hover:underline font-medium"
          >
            Get in touch with our team
          </Link>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Pricing;