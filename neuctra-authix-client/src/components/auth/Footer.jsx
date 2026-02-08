// components/Footer.jsx
import React from "react";
import { Heart, Twitter, Github, Linkedin, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img
                src="/logo.png"
                alt="logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">Neuctra Authix</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Modern authentication solutions for modern applications.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Github"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            Made with
            <HeartHandshake className="w-4 h-4 mx-1 text-red-500" />
            by <span className="ml-1 font-medium">Neuctra</span> ©{" "}
            {new Date().getFullYear()}
          </p>

          <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
