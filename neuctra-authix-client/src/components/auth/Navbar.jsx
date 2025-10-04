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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-3 shadow-xl border-b border-gray-800/50"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Grid layout for desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Logo Section */}
          <Link to={"/"} className="flex z-50 items-center gap-2">
            <div className="w-10 h-10 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Neuctra Authix"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold text-base max-lg:hidden tracking-tight">
              Neuctra <span className="text-primary italic">Authix</span>
            </span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:grid place-items-center">
            <div className="flex items-center gap-8 text-sm font-medium">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="/docs"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Right: Buttons & Mobile Toggle */}
          <div className="flex justify-end items-center">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-primary text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden  ml-2 z-50 rounded-lg text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-5 text-center">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            Documentation
          </a>

          {/* Auth Buttons (Mobile) */}
          <div className="pt-5 border-t border-gray-800 space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
