import React from "react";
import { Check, Zap, Star, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    icon: <Zap className="w-6 h-6 text-[#00c420]" />,
    price: "$0",
    period: "/month",
    description: "For small projects and personal apps.",
    features: [
      "Up to 100 active users",
      "Basic authentication",
      "Email login support",
      "Community support",
    ],
    buttonText: "Get Started",
    buttonLink: "/register",
    highlight: false,
  },
  {
    name: "Pro",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    price: "$29",
    period: "/month",
    description: "Ideal for startups and SaaS apps.",
    features: [
      "Unlimited users",
      "OAuth & social logins",
      "Custom branding",
      "Priority email support",
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/register",
    highlight: true,
  },
  {
    name: "Enterprise",
    icon: <Building2 className="w-6 h-6 text-blue-400" />,
    price: "Custom",
    period: "",
    description: "For large organizations & enterprise-grade apps.",
    features: [
      "Dedicated infrastructure",
      "Advanced SSO & RBAC",
      "99.9% uptime SLA",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-gray-300 py-20 px-4 sm:px-8 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#00c420]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00c420]/10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Simple, Transparent{" "}
          <span className="text-[#00c420]">Pricing</span>
        </h1>
        <p className="mt-4 text-gray-400 text-base sm:text-lg">
          Choose a plan that fits your scale — upgrade anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`relative rounded-2xl p-6 sm:p-8 flex flex-col items-start justify-between shadow-lg backdrop-blur-lg border transition-all duration-500 ${
              plan.highlight
                ? "bg-[#00c420]/10 border-[#00c420]/40 shadow-[#00c420]/30"
                : "bg-white/5 border-gray-800"
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {plan.icon}
                <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
              </div>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">
                {plan.description}
              </p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-sm sm:text-base">
                  {plan.period}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1 w-full">
              {plan.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-gray-300 text-sm sm:text-base"
                >
                  <Check className="w-4 h-4 text-[#00c420] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Button */}
            <Link
              to={plan.buttonLink}
              className={`w-full text-center py-3 rounded-lg font-medium transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#00c420] text-black hover:shadow-lg hover:shadow-[#00c420]/30 hover:scale-[1.03]"
                  : "border border-gray-700 text-gray-300 hover:border-[#00c420] hover:text-[#00c420]"
              }`}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="relative text-center mt-20 text-gray-500 text-sm sm:text-base px-4">
        <p>
          Need a custom plan?{" "}
          <Link
            to="/contact"
            className="text-[#00c420] hover:underline"
          >
            Get in touch with our team
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Pricing;
