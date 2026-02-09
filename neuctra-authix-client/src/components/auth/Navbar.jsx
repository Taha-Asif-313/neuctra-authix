// components/Navigation.jsx
import { Menu, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { admin, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = scrollPosition > 50 || mobileMenuOpen;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-lg py-3 shadow-xl border-b border-white/5"
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-2 col-start-1">
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Neuctra Authix"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white font-bold text-sm tracking-tight whitespace-nowrap">
                  Neuctra <span className="text-[#00c420]">Authix</span>
                </span>
              </Link>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center justify-center col-start-2">
              <div className="flex items-center gap-8">
                {["Home","Features", "Pricing", "About", "Docs"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-primary text-sm font-medium transition-all whitespace-nowrap"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 col-start-3">
              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center gap-3">
                {isAuthenticated && admin ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 text-gray-300 hover:text-[#00c420] rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm font-medium whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-300 hover:text-[#00c420] rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2 flex items-center gap-2 bg-gradient-to-r from-[#00c420] to-green-500 text-white rounded-md hover:shadow-lg hover:shadow-[#00c420]/20 transform transition-all text-[13px] font-medium"
                    >
                      <User size={14} />
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c420]/50"
                aria-label="Toggle Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-[#00c420]/20 shadow-2xl z-[60] transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#00c420]/10">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Neuctra Authix"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold text-lg">
              Neuctra <span className="text-[#00c420]">Authix</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c420]/50"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col h-[calc(100%-80px)]">
          {/* Navigation Links */}
          <div className="flex-1 p-6 space-y-1">
            {["Features", "About", "Pricing", "Docs"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center text-gray-300 hover:text-[#00c420] text-lg font-medium py-4 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-b-0"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="p-6 space-y-4 border-t border-[#00c420]/10 bg-black/50">
            {isAuthenticated && admin ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center text-gray-300 hover:text-[#00c420] py-3 px-4 rounded-xl border border-gray-700 hover:border-[#00c420]/50 transition-all duration-300 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center text-gray-300 hover:text-[#00c420] py-3 px-4 rounded-xl border border-gray-700 hover:border-[#00c420]/50 transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-[#00c420] to-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#00c420]/20 transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
