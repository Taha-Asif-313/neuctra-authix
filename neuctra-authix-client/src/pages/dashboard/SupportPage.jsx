import React from "react";
import { Mail, MessageSquare, BookOpen, LifeBuoy } from "lucide-react";

const SupportPage = () => {
  const faqs = [
    {
      q: "How do I reset my password?",
      a: "Go to the login page, click 'Forgot password?', and follow the instructions sent to your email.",
    },
    {
      q: "Why am I not receiving verification emails?",
      a: "Please check your spam/junk folder and ensure that emails from our domain are not blocked.",
    },
    {
      q: "Can I use the app on multiple devices?",
      a: "Yes, you can log in from multiple devices. For security, you’ll be asked to verify each device.",
    },
  ];

  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      desc: "Get direct help from our support team.",
      action: "support@yourapp.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      desc: "Chat with our support agents in real-time.",
      action: "Start Chat",
    },
    {
      icon: BookOpen,
      title: "Documentation",
      desc: "Read our guides and setup instructions.",
      action: "View Docs",
    },
    {
      icon: LifeBuoy,
      title: "Community",
      desc: "Ask questions and share ideas with others.",
      action: "Join Forum",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Support & Help Center
          </h1>
          <p className="text-gray-400">
            We’re here to help you get the most out of your authentication app.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportOptions.map(({ icon: Icon, title, desc, action }) => (
            <div
              key={title}
              className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow hover:shadow-lg transition"
            >
              <Icon size={28} className="text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm mb-4">{desc}</p>
              <button className="text-primary hover:underline text-sm">
                {action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, idx) => (
              <div
                key={idx}
                className="p-5 bg-zinc-900 rounded-xl border border-zinc-800"
              >
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
