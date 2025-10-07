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
  Zap,
  Shield,
  Key,
  Users,
  Database,
  Cloud,
  Lock,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * SupportPage Component - Modern Documentation Style
 * 
 * A comprehensive support center with documentation-style layout,
 * featuring search, categorized FAQs, and multiple support channels.
 * 
 * @component
 * @example
 * return <SupportPage />
 */
const SupportPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  /**
   * Categorized FAQ data structure
   */
  const faqCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          q: "How do I sign up as an admin?",
          a: "Go to the signup page, provide your name, email, and password. An API key will be automatically generated for you."
        },
        {
          q: "How can I log in to the dashboard?",
          a: "Enter your registered email and password. If correct, you'll receive a JWT token for secure access to the admin panel."
        },
        {
          q: "What are the system requirements?",
          a: "Our platform works on all modern browsers. For mobile apps, we support iOS 12+ and Android 8+. No special hardware required."
        }
      ]
    },
    {
      id: "authentication",
      name: "Authentication",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          q: "I forgot my password, what should I do?",
          a: "Click 'Forgot password?' on the login screen. You will receive an OTP via email to reset your password securely."
        },
        {
          q: "How do I verify my email?",
          a: "After signing up, go to your profile and request a verification OTP. Enter the OTP sent to your email to complete verification."
        },
        {
          q: "Can I use JWT and API Key authentication together?",
          a: "Yes. JWT is used for admin login sessions, while API Keys can be used to integrate your apps with the authentication system."
        }
      ]
    },
    {
      id: "api-keys",
      name: "API & Keys",
      icon: Key,
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          q: "How can I regenerate my API key?",
          a: "Navigate to 'API Key Settings' in your dashboard and click 'Generate New Key'. Your old key will be revoked automatically."
        },
        {
          q: "Where do I find my API documentation?",
          a: "Complete API documentation is available in the 'Developers' section of your dashboard, including code samples and SDKs."
        },
        {
          q: "Is there rate limiting on API calls?",
          a: "Yes, we implement rate limiting to ensure service stability. Check your plan details for specific limits and upgrade if needed."
        }
      ]
    },
    {
      id: "account",
      name: "Account & Billing",
      icon: Users,
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          q: "What happens if my subscription expires?",
          a: "Your account will automatically downgrade to the Free plan once the subscription period ends. Data is preserved for 30 days."
        },
        {
          q: "Can I delete my account permanently?",
          a: "Yes, deleting your admin account will also delete all associated apps and users. This action is irreversible and requires confirmation."
        },
        {
          q: "How do I upgrade my plan?",
          a: "Go to Billing in your dashboard, select your desired plan, and complete the payment. Upgrade takes effect immediately."
        }
      ]
    },
    {
      id: "data",
      name: "Data & Reports",
      icon: Database,
      color: "from-indigo-500 to-purple-500",
      faqs: [
        {
          q: "How do I download my admin report?",
          a: "Go to 'Reports' in your dashboard and select a format (JSON, CSV, Excel, or PDF) to export your data with custom date ranges."
        },
        {
          q: "Is my user data encrypted?",
          a: "Yes, all sensitive data is encrypted at rest and in transit using AES-256 encryption. We follow industry security standards."
        },
        {
          q: "Can I export all my user data?",
          a: "Yes, you can export complete user datasets from the Data Management section. Large exports may be delivered via email."
        }
      ]
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      icon: Smartphone,
      color: "from-yellow-500 to-orange-500",
      faqs: [
        {
          q: "Why am I not receiving OTP or verification emails?",
          a: "Check your spam/junk folder. Ensure emails from our domain are not blocked. If issues persist, contact support with your email provider details."
        },
        {
          q: "My API calls are failing, what should I check?",
          a: "Verify your API key, check rate limits, ensure proper authentication headers, and validate your request format against our documentation."
        },
        {
          q: "The dashboard is loading slowly, what can I do?",
          a: "Clear your browser cache, try a different browser, or check your internet connection. If problems continue, contact our support team."
        }
      ]
    }
  ];

/**
 * Support channel options
 */
const supportOptions = [
  {
    icon: Mail,
    title: "Email Support",
    desc: "Get detailed help from our technical support team via email",
    action: "neuctra@gmail.com",
    link: "mailto:neuctra@gmail.com", // opens email client
    gradient: "from-blue-500 to-cyan-500",
  },
  // {
  //   icon: MessageSquare,
  //   title: "Live Chat",
  //   desc: "Instant help from our support agents for urgent issues",
  //   action: "Start Chat",
  //   link: "https://neuctra.com/chat", // your live chat page or widget
  //   gradient: "from-green-500 to-emerald-500",
  // },
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Comprehensive guides, API references, and tutorials",
    action: "View Docs",
    link: "/docs", // your docs site
    gradient: "from-purple-500 to-pink-500",
  },
  // {
  //   icon: LifeBuoy,
  //   title: "Community Forum",
  //   desc: "Connect with other developers and share solutions",
  //   action: "Join Forum",
  //   link: "https://community.neuctra.com", // your forum/community
  //   gradient: "from-orange-500 to-red-500",
  // },
];


  /**
   * Filter FAQs based on search term and active category
   */
  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.name, categoryId: category.id }))
  );

  const filteredFaqs = allFaqs.filter(faq =>
    (activeCategory === "all" || faq.categoryId === activeCategory) &&
    (faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.a.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  /**
   * Toggle FAQ item expansion
   */
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen">
      <div className="max-sm:px-3">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary text-sm font-semibold tracking-wide">
              24/7 Support Available
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive documentation, guides, and support for your authentication system. 
            Find answers, explore features, and get help when you need it.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search documentation, FAQs, and guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg placeholder-slate-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-20">
          {supportOptions.map(({ icon: Icon, title, desc, action, gradient, link }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative p-8 z-10">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${gradient} mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 group-hover:bg-clip-text transition-all duration-300">
                  {title}
                </h3>
                <p className="text-slate-300 text-base mb-6 leading-relaxed group-hover:text-slate-200 transition-colors">
                  {desc}
                </p>
                <Link to={link} className="inline-flex items-center gap-3 text-base font-semibold text-white hover:text-slate-300 transition-all duration-300 group/btn">
                  {action}
                  <ExternalLink
                    size={18}
                    className="transition-transform duration-300"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation Categories */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Documentation Categories
            </h2>
            <p className="text-slate-400 text-lg">
              Explore our organized documentation by category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-1 text-left group ${
                    activeCategory === category.id
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:shadow-xl hover:shadow-primary/5"
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{category.name}</h3>
                  <p className="text-slate-400 text-sm">
                    {category.faqs.length} articles
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Quick answers to common questions about {activeCategory === "all" ? "all topics" : faqCategories.find(c => c.id === activeCategory)?.name.toLowerCase()}
            </p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map(({ q, a, category }, idx) => (
              <div
                key={idx}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-primary/5"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-700/20 transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300">
                        {category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-white group-hover:text-blue-100 transition-colors pr-8">
                      {q}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openFaqIndex === idx ? (
                      <ChevronUp
                        size={24}
                        className="text-slate-400 group-hover:text-primary transition-colors"
                      />
                    ) : (
                      <ChevronDown
                        size={24}
                        className="text-slate-400 group-hover:text-primary transition-colors"
                      />
                    )}
                  </div>
                </button>
                <div
                  className={`px-8 transition-all duration-500 ${
                    openFaqIndex === idx
                      ? "pb-6 max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="border-t border-slate-700/50 pt-6">
                    <p className="text-slate-300 leading-relaxed text-lg">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results State */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 text-xl mb-3">No results found</div>
              <p className="text-slate-500">
                Try searching with different keywords or browse by category
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-12 border-t border-slate-800">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Still need help?
          </h3>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of our platform. 
            We're committed to providing timely and effective solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-primary text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25 text-lg">
              Contact Support Team
            </button>
            <button className="border-2 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1 backdrop-blur-sm">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;