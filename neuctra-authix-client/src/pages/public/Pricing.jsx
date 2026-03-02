import React from "react";
import { Check, Zap, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    icon: <Zap className="w-6 h-6 text-primary" />,
    price: "$0",
    period: "/month",
    description: "For experiments, demos, and personal projects.",
    features: [
      "5 apps",
      "Up to 10,000 active users",
      "Email & password authentication",
      "Basic user management",
      "1000 document storage per user",
      "500 document storage per app",
      "Community support",
    ],
    buttonText: "Get Started",
    buttonLink: "/register",
    highlight: false,
    popular: false,
  },
  {
    name: "Premium",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    price: "$15.99",
    period: "/month",
    description:
      "Unlimited everything — perfect for serious projects and startups.",
    features: [
      "Unlimited apps",
      "Unlimited active users",
      "Unlimited document storage per app",
      "Unlimited document storage per user",
      "Priority support",
      "99.99% uptime SLA",
    ],
    buttonText: "Upgrade to Premium",
    buttonLink: "/register",
    highlight: true,
    popular: true,
  },
];

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-16 px-4"
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

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        {plans.map((plan) => (
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
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-gradient-to-r from-[#00c420] to-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              </motion.div>
            )}

            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                {plan.icon}
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6 text-base leading-relaxed">
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-2 mb-6 sm:mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-lg mb-1">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <motion.ul className="space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-gray-300 text-base"
                  >
                    <Check className="w-5 h-5 text-[#00c420] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div
    
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={plan.buttonLink}
                  className={`w-full text-center py-3 sm:py-4 px-6 rounded-xl font-semibold transition-all duration-300 block ${
                    plan.highlight
                      ? "bg-gradient-to-r from-[#00c420] to-green-500 hover:shadow-2xl hover:shadow-[#00c420]/40 "
                      : "border-2 border-gray-700 text-gray-300 hover:border-[#00c420] hover:text-[#00c420] hover:bg-[#00c420]/5"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Pricing;
