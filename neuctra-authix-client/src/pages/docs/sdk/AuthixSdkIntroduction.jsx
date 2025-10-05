// src/pages/docs/Introduction.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Rocket,
  Shield,
  Users,
  Database,
  Target,
  Wrench,
  Key,
  Hash,
  Link2,
  Download,
  Settings,
  LogIn,
  User,
  Mail,
  Lock,
  FileText
} from "lucide-react";

const AuthixSdkIntroduction = () => {
  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Rocket className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-400 flex-shrink-0" />
          Introduction to Authix
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          <strong>Neuctra Authix</strong> is your complete authentication solution that handles user management, security, and data storage in one simple SDK. Think of it as your app's security guard + data manager!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-8">
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">Secure Authentication</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">Sign up, login, password reset with enterprise security</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">User Management</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">Update profiles, manage users, handle permissions</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">User Data Storage</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">Store user-specific data like notes, preferences, blogs</p>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          What You'll Learn
        </h2>
        <ul className="space-y-3 px-2 sm:space-y-4 text-gray-400">
          <li className="flex items-start gap-2 sm:gap-3">
          
            <div className="text-sm sm:text-base">
              <strong>Setup:</strong> How to install and configure Authix in your app
            </div>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
  
            <div className="text-sm sm:text-base">
              <strong>Authentication:</strong> User signup, login, and session management
            </div>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
      
            <div className="text-sm sm:text-base">
              <strong>User Management:</strong> Update profiles, change passwords, delete accounts
            </div>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
         
            <div className="text-sm sm:text-base">
              <strong>Security Features:</strong> Password reset, email verification, OTP
            </div>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
         
            <div className="text-sm sm:text-base">
              <strong>User Data:</strong> Store custom data for each user (notes, blogs, preferences)
            </div>
          </li>
        </ul>
      </div>

      {/* What You Need Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 sm:mb-4 text-lg sm:text-xl">
          <Wrench className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          What You Need
        </h3>
        <ul className="text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-3">
          <li className="flex items-center gap-2 sm:gap-3">
            <Key className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span>Your App ID (get this from your Authix dashboard)</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span>API Key (get this from your Authix dashboard)</span>
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
            <span className="break-all">
              Base URL: <code className="bg-black/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">https://authix.neuctra.com/api</code>
            </span>
          </li>
        </ul>
      </div>

      {/* Installation Section */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
          Installation Command
        </h3>
        <CodeBlock
          language="bash"
          code={`npm install @neuctra/authix`}
        />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <p className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
          Ready to start? Let's begin with the setup and create your first user!
        </p>
      </div>
    </div>
  );
};

export default AuthixSdkIntroduction;