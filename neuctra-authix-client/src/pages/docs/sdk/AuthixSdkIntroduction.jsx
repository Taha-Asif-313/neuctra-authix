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
} from "lucide-react";

const AuthixSdkIntroduction = () => {
  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Rocket className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-400 flex-shrink-0" />
          Introduction to Neuctra Authix
        </h1>

        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          <strong className="text-white">Neuctra Authix</strong> is a serverless
          authentication and user management platform designed to eliminate
          backend complexity. It provides secure login flows, structured JSON
          user data storage, and multi-application control — all powered by a
          scalable cloud API.
        </p>
      </div>

      {/* Core Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-8">
        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
              Secure Authentication
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            JWT-based login, signup, password reset, email verification, and OTP
            security.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
              User Lifecycle Management
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Manage profiles, roles, permissions, sessions, and account updates.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
              Structured User Data
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Store custom JSON data per user — notes, preferences, blogs, or app
            data.
          </p>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          What You'll Learn
        </h2>

        <ul className="space-y-3 sm:space-y-4 text-gray-400">
          <li>
            <strong className="text-white">Setup:</strong> Install and configure
            Neuctra Authix in your application.
          </li>
          <li>
            <strong className="text-white">Authentication:</strong> Implement
            signup, login, logout, and session handling.
          </li>
          <li>
            <strong className="text-white">User Management:</strong> Update
            profiles, manage roles, and handle account settings.
          </li>
          <li>
            <strong className="text-white">Security Features:</strong> Enable
            email verification, password reset, and OTP protection.
          </li>
          <li>
            <strong className="text-white">User Data:</strong> Store and
            retrieve structured user-specific data securely.
          </li>
        </ul>
      </div>

      {/* Requirements */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 sm:mb-4 text-lg sm:text-xl">
          <Wrench className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          Requirements
        </h3>

        <ul className="text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-3">
          <li className="flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400 flex-shrink-0" />
            Your App ID (from Authix dashboard)
          </li>
          <li className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-400 flex-shrink-0" />
            Your API Key (from Authix dashboard)
          </li>
          <li className="flex items-center gap-2 break-all">
            <Link2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
            Base URL:
            <code className="bg-black/30 px-2 py-1 rounded text-xs">
              https://server.authix.neuctra.com/api
            </code>
          </li>
        </ul>
      </div>

      {/* Installation */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
          Install SDK
        </h3>

        <CodeBlock language="bash" code={`npm install @neuctra/authix`} />
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <p className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
          You're ready to integrate Neuctra Authix. Continue to the installation
          guide and create your first authenticated user.
        </p>
      </div>
    </div>
  );
};

export default AuthixSdkIntroduction;
