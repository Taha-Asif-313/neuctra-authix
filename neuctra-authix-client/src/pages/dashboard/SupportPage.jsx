import React from "react";
import { Mail, BookOpen, ExternalLink, FileBox } from "lucide-react";
import { Link } from "react-router-dom";

const SupportPage = () => {
  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      desc: "Get detailed help from our technical support team via email",
      action: "neuctra@gmail.com",
      link: "mailto:neuctra@gmail.com",
    },
    {
      icon: BookOpen,
      title: "Documentation",
      desc: "Comprehensive guides, API references, and tutorials",
      action: "View Docs",
      link: "/docs",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white rounded-xl px-4 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Neuctra Authix Support</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Explore our support options and documentation to get started quickly.
        </p>
      </div>

      {/* Section Intro */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <div className="p-4 rounded-xl bg-primary/10">
            <FileBox className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">Documentation Categories</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Explore our organized documentation by category
            </p>
          </div>
        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportOptions.map(({ icon: Icon, title, desc, action, link }) => {
            const isExternal = link.startsWith("http") || link.startsWith("mailto");

            return isExternal ? (
              <a
                key={title}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-900 hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="relative p-6 z-10">
                  <div className="inline-flex p-3 rounded-2xl bg-zinc-800 mb-4 transition-transform duration-300 shadow-md">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                  <p className="text-zinc-300 text-sm mb-4 leading-snug group-hover:text-zinc-200">
                    {desc}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    {action}
                    <ExternalLink size={16} />
                  </div>
                </div>
              </a>
            ) : (
              <Link
                key={title}
                to={link}
                className="group block relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-900 hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="relative p-6 z-10">
                  <div className="inline-flex p-3 rounded-2xl bg-zinc-800 mb-4 transition-transform duration-300 shadow-md">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                  <p className="text-zinc-300 text-sm mb-4 leading-snug group-hover:text-zinc-200">
                    {desc}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    {action}
                    <ExternalLink size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;