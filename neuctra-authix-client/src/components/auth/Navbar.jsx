// components/Navigation.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Key } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollPosition > 50 || mobileMenuOpen
          ? "bg-black backdrop-blur-md py-3 shadow-xl"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 grid-cols-2 justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center w-10 h-10">
              <img src="/logo.png" alt="logo" />
            </div>
            <span className="text-sm font-bold text-white">
              Neuctra <span className="text-primary italic">Authix</span>
            </span>
          </div>

          <div className="hidden md:flex items-center text-sm space-x-8">
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
              href="#"
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

          <div className="flex items-center justify-end text-sm space-x-4">
            <div className="hidden md:flex space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 flex items-center gap-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Key size={18} />
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <Menu className="w-7 h-7 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gray-800 shadow-xl">
          <div className="px-4 py-6 space-y-6">
            <a
              href="#features"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="/docs"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <div className="pt-4 border-t border-gray-800 space-y-4">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
