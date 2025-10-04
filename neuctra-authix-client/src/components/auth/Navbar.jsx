// components/Navigation.jsx
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = scrollPosition > 50 || mobileMenuOpen;

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-primary/20"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <img
                  src="/logo.png"
                  alt="Neuctra Authix"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-sm sm:text-base tracking-tight">
                Neuctra <span className="text-primary">Authix</span>
              </span>
            </Link>

            {/* Center Nav (Desktop Only) */}
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Testimonials", "Pricing", "Docs"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-emerald-400 text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-3">
              {/* Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-emerald-400 rounded-lg transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-gradient-to-r from-primary to-green-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                aria-label="Toggle Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-black border-l border-primary/20 shadow-2xl z-[60] transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-primary/20">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="Neuctra Authix"
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold">
              Neuctra <span className="text-primary">Authix</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex flex-col justify-between h-[calc(100%-64px)]">
          <div className="p-6 space-y-4">
            {["Features", "Testimonials", "Pricing", "Docs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-emerald-400 text-lg py-2 border-b border-gray-800/50"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="p-6 space-y-3 border-t border-gray-800/50">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center text-gray-300 hover:text-emerald-400 py-3 rounded-lg border border-gray-700 hover:border-primary/50 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-primary to-green-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.03] hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
