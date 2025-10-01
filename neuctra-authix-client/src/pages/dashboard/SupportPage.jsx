import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  BookOpen,
  LifeBuoy,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
} from "lucide-react";

const SupportPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // FAQs based on your backend features
  const faqs = [
    {
      q: "How do I sign up as an admin?",
      a: "Go to the signup page, provide your name, email, and password. An API key will be automatically generated for you.",
    },
    {
      q: "How can I log in?",
      a: "Enter your registered email and password. If correct, you'll receive a JWT token for secure access.",
    },
    {
      q: "I forgot my password, what should I do?",
      a: "Click 'Forgot password?' on the login screen. You will receive an OTP via email to reset your password.",
    },
    {
      q: "How do I verify my email?",
      a: "After signing up, go to your profile and request a verification OTP. Enter the OTP sent to your email to complete verification.",
    },
    {
      q: "How can I regenerate my API key?",
      a: "Navigate to 'API Key Settings' in your dashboard and click 'Generate New Key'. Your old key will be revoked automatically.",
    },
    {
      q: "What happens if my subscription expires?",
      a: "Your account will automatically downgrade to the Free plan once the subscription period ends.",
    },
    {
      q: "Can I delete my account permanently?",
      a: "Yes, deleting your admin account will also delete all associated apps and users. This action is irreversible.",
    },
    {
      q: "How do I download my admin report?",
      a: "Go to 'Reports' in your dashboard and select a format (JSON, CSV, Excel, or PDF) to export your data.",
    },
    {
      q: "Why am I not receiving OTP or verification emails?",
      a: "Check your spam/junk folder. Ensure that emails from our domain are not blocked. If the issue persists, contact support.",
    },
    {
      q: "Can I use JWT and API Key authentication together?",
      a: "Yes. JWT is used for admin login, while API Keys can be used to integrate your apps with the authentication system.",
    },
  ];

  // Support options
  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      desc: "Contact our support team directly via email.",
      action: "support@neuctra.com",
      gradient: "from-primary to-cyan-500",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      desc: "Chat with support agents in real-time for urgent help.",
      action: "Start Chat",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: BookOpen,
      title: "Documentation",
      desc: "Read setup instructions, API usage, and troubleshooting guides.",
      action: "View Docs",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: LifeBuoy,
      title: "Community Forum",
      desc: "Share your issues and solutions with other developers.",
      action: "Join Forum",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen rounded-xl text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary text-sm font-medium">
              24/7 Support Available
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Get help with your apps, users, and admin account management
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-20">
          {supportOptions.map(
            ({ icon: Icon, title, desc, action, gradient }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 z-10">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {desc}
                  </p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group/btn">
                    {action}
                    <ExternalLink
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map(({ q, a }, idx) => (
              <div
                key={idx}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-600"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors"
                >
                  <h3 className="font-semibold text-lg pr-4">{q}</h3>
                  {openFaqIndex === idx ? (
                    <ChevronUp
                      size={20}
                      className="text-gray-400 flex-shrink-0"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-gray-400 flex-shrink-0"
                    />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    openFaqIndex === idx
                      ? "pb-5 max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed">{a}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No results found</div>
              <p className="text-gray-500">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 mb-4">Still need help?</p>
          <button className="bg-gradient-to-r from-primary to-emerald-600 hover:from-emerald-600 hover:to-primary text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1">
            Contact Support Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
