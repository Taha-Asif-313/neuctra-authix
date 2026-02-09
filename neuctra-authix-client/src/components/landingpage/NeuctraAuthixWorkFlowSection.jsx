import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  UserCheck,
  Box,
  Package,
  DatabaseZap,
  CloudLightning,
} from "lucide-react";

function WorkflowStep({
  id,
  step,
  title,
  description,
  icon,
  stairIndex,
  isInView,
  delay,
}) {
  const STAIR_HEIGHT = 28;
  const stepRef = useRef(null);

  // Staggered animation variants
  const stepVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
        y: { type: "spring", stiffness: 100, damping: 15 },
      },
    },
    hover: {
      y: -12,
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={stepRef}
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="relative"
      style={{
        transform: `translateY(calc(var(--stair-offset, 0px)))`,
      }}
    >
      {/* Staircase Glow Effect */}

      {/* Card */}
      <div
        id={id}
        className="relative bg-black rounded-2xl p-6 border border-white/10 hover:border-[#00c420]/50 transition-all duration-300 h-full shadow-lg shadow-black/20 group"
      >
        {/* Animated Step Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay, duration: 0.5, type: "spring" }}
          className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#00c420] to-[#00c420]/80 flex items-center justify-center text-lg font-bold shadow-lg shadow-[#00c420]/20 z-10"
        >
          {step}
        </motion.div>

        {/* Icon with Animation */}
        <motion.div
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: delay + 0.1, duration: 0.4 }}
          className="flex items-center gap-4 mb-4 ml-8"
        >
          <div className="p-3 bg-gradient-to-br from-[#00c420]/20 to-[#00c420]/5 rounded-xl text-[#00c420] text-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </motion.div>

        {/* Content with Staggered Animation */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
          className="text-xl font-bold text-white mb-2"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          className="text-gray-400 text-sm"
        >
          {description}
        </motion.p>
      </div>

      {/* Desktop-only stair offset with animation */}
      <style jsx>{`
        @media (min-width: 1024px) {
          div[id="${id}"] {
            --stair-offset: -${stairIndex * STAIR_HEIGHT}px;
            animation: stairFloat 3s ease-in-out infinite;
            animation-delay: ${stairIndex * 0.1}s;
          }
        }

        @keyframes stairFloat {
          0%,
          100% {
            transform: translateY(calc(var(--stair-offset, 0px)));
          }
          50% {
            transform: translateY(calc(var(--stair-offset, 0px) - 5px));
          }
        }
      `}</style>
    </motion.div>
  );
}

function AuthixWorkflow() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance active step when in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, 800);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.03 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[#00c420]/20 to-transparent rounded-2xl blur-3xl"
      />

      {/* Staircase Guide Lines */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-full pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: isInView ? "100%" : 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#00c420] to-transparent"
            style={{ top: `${20 + i * 15}%`, left: "10%", right: "10%" }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-end relative z-10">
        <WorkflowStep
          id="step-1"
          stairIndex={0}
          step="1"
          title="Create Account"
          description="Sign up for Neuctra Authix dashboard"
          icon={<UserCheck className="w-5 h-5" />}
          isInView={isInView}
          delay={0.1}
        />

        <WorkflowStep
          id="step-2"
          stairIndex={1}
          step="2"
          title="Create App"
          description="Generate credentials for your application"
          icon={<Box className="w-5 h-5" />}
          isInView={isInView}
          delay={0.2}
        />

        <WorkflowStep
          id="step-3"
          stairIndex={2}
          step="3"
          title="Install SDK"
          description="Add @neuctra/authix to your React or Express app"
          icon={<Package className="w-5 h-5" />}
          isInView={isInView}
          delay={0.3}
        />

        <WorkflowStep
          id="step-4"
          stairIndex={3}
          step="4"
          title="Store Data"
          description="Use SDK to store user profiles and app data"
          icon={<DatabaseZap className="w-5 h-5" />}
          isInView={isInView}
          delay={0.4}
        />

        <WorkflowStep
          id="step-5"
          stairIndex={4}
          step="5"
          title="Go Live"
          description="Deploy your app without managing authentication servers"
          icon={<CloudLightning className="w-5 h-5" />}
          isInView={isInView}
          delay={0.5}
        />
      </div>
    </div>
  );
}

export default function NeuctraAuthixWorkflowSection() {
  return (
    <section
      id="workflow"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            How
            <br />
            <span className="bg-gradient-to-r from-[#00c420] to-[#00c420] bg-clip-text text-transparent">
              Neuctra Authix Works
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Complete platform to build and deploy serverless applications
          </p>
        </motion.div>

        {/* Workflow Visualization */}
        <div className="relative lg:pt-20">
          <AuthixWorkflow />
        </div>
      </div>
    </section>
  );
}
