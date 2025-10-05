// src/pages/docs/Introduction.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";


const AuthixSdkIntroduction = () => {
  return (
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">🚀 Introduction to Authix</h1>
      
      <p className="text-gray-400 leading-relaxed text-lg">
        <strong>Neuctra Authix</strong> is your complete authentication solution that handles user management, security, and data storage in one simple SDK. Think of it as your app's security guard + data manager!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="text-2xl mb-2">🔐</div>
          <h3 className="font-semibold text-white mb-2">Secure Authentication</h3>
          <p className="text-sm text-gray-400">Sign up, login, password reset with enterprise security</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="text-2xl mb-2">👥</div>
          <h3 className="font-semibold text-white mb-2">User Management</h3>
          <p className="text-sm text-gray-400">Update profiles, manage users, handle permissions</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="text-2xl mb-2">💾</div>
          <h3 className="font-semibold text-white mb-2">User Data Storage</h3>
          <p className="text-sm text-gray-400">Store user-specific data like notes, preferences, blogs</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white">🎯 What You'll Learn</h2>
      <ul className="list-disc list-inside space-y-3 text-gray-400">
        <li><strong>Setup:</strong> How to install and configure Authix in your app</li>
        <li><strong>Authentication:</strong> User signup, login, and session management</li>
        <li><strong>User Management:</strong> Update profiles, change passwords, delete accounts</li>
        <li><strong>Security Features:</strong> Password reset, email verification, OTP</li>
        <li><strong>User Data:</strong> Store custom data for each user (notes, blogs, preferences)</li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-blue-400 font-semibold mb-2">📋 What You Need</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Your App ID (get this from your Authix dashboard)</li>
          <li>• API Key (get this from your Authix dashboard)</li>
          <li>• Base URL: <code className="bg-black/30 px-2 py-1 rounded">https://authix.neuctra.com/api</code></li>
        </ul>
      </div>

      <CodeBlock
        language="bash"
        code={`npm install @neuctra/authix`}
        title="Installation Command"
      />

      <p className="text-gray-400">
        Ready to start? Let's begin with the setup and create your first user!
      </p>
    </div>
  );
};

export default AuthixSdkIntroduction;