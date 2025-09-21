import React from "react";
import {
  Shield,
  Mail,
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  Star,
  Eye,
  Lock,
  UserCheck,
  ChevronDown,
  Sparkles,
  Globe,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#00c420]" />,
      title: "Lightning Fast",
      description:
        "Experience blazing fast authentication with our optimized system built for performance.",
      stats: "99.9% uptime",
    },
    {
      icon: <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#00c420]" />,
      title: "Military-Grade Security",
      description:
        "Advanced encryption and security protocols keep your data safe from any threats.",
      stats: "256-bit encryption",
    },
    {
      icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-[#00c420]" />,
      title: "Seamless Experience",
      description:
        "Intuitive design that your users will love, with zero friction authentication.",
      stats: "< 2 second login",
    },
    {
      icon: <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-[#00c420]" />,
      title: "Advanced Analytics",
      description:
        "Deep insights with real-time analytics and comprehensive user behavior tracking.",
      stats: "Real-time data",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "This authentication system revolutionized our development workflow. Implementation was seamless and our security is now bulletproof.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Senior Engineer at StartupX",
      content:
        "The most powerful and developer-friendly auth solution I've encountered. Saved us months of development time.",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "CTO at InnovateLab",
      content:
        "Incredible performance and reliability. Our user authentication has never been smoother or more secure.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10M+", label: "Users Protected" },
    { number: "99.99%", label: "Uptime Guaranteed" },
    { number: "500+", label: "Companies Trust Us" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b  from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 md:px-6 py-2 rounded-full bg-primary/15 backdrop-blur-xl border border-primary mb-6 md:mb-8">
              <Sparkles className="w-4 h-4 text-[#00c420] mr-2" />
              <span className="text-xs font-medium">
                Now with AI-powered security detection
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Authentication <span className="text-primary">Redefined</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl md:max-w-4xl mx-auto mb-10 md:mb-12 leading-relaxed">
              The next-generation authentication platform that combines
              <span className="text-[#00c420] font-semibold">
                {" "}
                unbreakable security
              </span>{" "}
              with
              <span className="text-primary font-semibold">
                {" "}
                lightning-fast performance
              </span>
              . Build the future of secure applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 md:mb-16">
              <button className="group relative px-8 md:px-10 py-3 bg-gradient-to-br from-primary to-gray-950 text-sm md:text-base rounded-lg shadow-2xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center font-bold transform hover:scale-105">
                <span className="relative flex items-center">
                  Start Building
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              <button className="group px-8 md:px-10 py-3 bg-gray-900/50 backdrop-blur-xl text-gray-300 rounded-lg shadow-xl hover:shadow-2xl hover:text-white hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-gray-700 font-semibold text-sm md:text-base">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl md:max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-4xl font-bold text-[#00c420] mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Enterprise-Grade <span className="text-[#00c420]">Features</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
              Everything you need for secure, scalable, and seamless user
              authentication
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-gray-900 to-black p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-gray-800 hover:border-[#00c420]/30 transition-all duration-500 hover:scale-105"
              >
                <div className="mb-4 md:mb-6">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                  {feature.description}
                </p>
                <div className="inline-flex items-center text-[#00c420] font-semibold text-xs md:text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Developers <span className="text-[#00c420]">Love</span> Us
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
              See what industry professionals are saying about our platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-gray-700 hover:border-[#00c420]/30 transition-all duration-500"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl object-cover border-2 border-gray-600"
                  />
                  <div className="ml-3 md:ml-4">
                    <h4 className="font-bold text-white text-base md:text-lg">
                      {t.name}
                    </h4>
                    <p className="text-gray-400 text-xs md:text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-lg">
                  "{t.content}"
                </p>
                <div className="flex">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 md:w-5 md:h-5 text-[#00c420] fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-zinc-950 via-gray-950 to-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8">
            Ready to Transform
            <br className="hidden sm:block" />
            Your Authentication?
          </h2>
          <p className="text-base md:text-2xl  max-w-2xl md:max-w-4xl mx-auto mb-8 md:mb-12 font-medium">
            Join thousands of developers who have revolutionized their security
            infrastructure
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <button className="group inline-flex items-center px-8 md:px-12 py-4 md:py-6 bg-black text-white rounded-xl md:rounded-2xl shadow-2xl hover:scale-105 transition-transform font-bold text-base md:text-xl">
              Get Started Free
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="group inline-flex items-center px-8 md:px-12 py-4 md:py-6 bg-black/20 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-xl hover:bg-white/30 transition-all duration-300 font-bold text-base md:text-xl border border-black/20">
              Schedule Demo
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          <p className="mt-6 md:mt-8 text-black/60 font-medium text-xs md:text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
