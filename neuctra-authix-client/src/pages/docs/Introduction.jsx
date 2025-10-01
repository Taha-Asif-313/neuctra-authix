import React, { useState } from "react";
import CodeBlock from "../../components/docs/CodeBlock"; // Adjust import path as needed

const Introduction = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Example code snippets
  const reactCode = `
import { AuthProvider, useAuth } from '@neuctra/authix-react';

function App() {
  return (
    <AuthProvider 
      apiKey="your_api_key"
      config={{
        projectId: "your_project_id"
      }}
    >
      <LoginComponent />
    </AuthProvider>
  );
}

function LoginComponent() {
  const { login, user, isLoading } = useAuth();
  
  const handleLogin = async (email, password) => {
    try {
      await login({ email, password });
      console.log('User logged in:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      )}
    </div>
  );
}
`.trim();

  const vueCode = `
<template>
  <div>
    <AuthProvider 
      :api-key="apiKey"
      :config="authConfig"
    >
      <LoginComponent />
    </AuthProvider>
  </div>
</template>

<script setup>
import { AuthProvider, useAuth } from '@neuctra/authix-vue';

const apiKey = 'your_api_key';
const authConfig = {
  projectId: 'your_project_id'
};

const LoginComponent = {
  setup() {
    const { login, user, isLoading } = useAuth();
    
    const handleLogin = async (email, password) => {
      try {
        await login({ email, password });
        console.log('User logged in:', user.value);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    
    return {
      handleLogin,
      user,
      isLoading
    };
  }
};
</script>
`.trim();

  const installationCode = `
# Using npm
npm install @neuctra/authix-react

# Using yarn
yarn add @neuctra/authix-react

# Using pnpm
pnpm add @neuctra/authix-react
`.trim();

  const tabsConfig = [
    { name: "React", code: reactCode, language: "jsx" },
    { name: "Vue", code: vueCode, language: "vue" }
  ];

  return (
    <article className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#00c420]/10 border border-[#00c420]/20 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-[#00c420] rounded-full animate-pulse"></div>
          <span className="text-[#00c420] text-sm font-medium">Latest Version v2.1.0</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Neuctra Authix SDK
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Seamless authentication for modern applications. 
          Secure, scalable, and developer-friendly.
        </p>
      </div>

      {/* Quick Start Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00c420]/10 rounded-lg">
            <div className="w-6 h-6 bg-[#00c420] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Quick Installation</h2>
        </div>
        
        <CodeBlock 
          code={installationCode}
          language="shell"
          className="mt-4"
        />
      </section>

      {/* Framework Integration Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00c420]/10 rounded-lg">
            <div className="w-6 h-6 bg-[#00c420] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Framework Integration</h2>
        </div>
        
        <p className="text-gray-300 text-lg">
          Choose your framework and get started in minutes. The same powerful features across all platforms.
        </p>
        
        <CodeBlock 
          tabs={tabsConfig}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-4"
        />
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00c420]/10 rounded-lg">
            <div className="w-6 h-6 bg-[#00c420] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Why Choose Authix?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🔑",
              title: "Secure Authentication",
              description: "JWT-based sessions with built-in security best practices and encryption."
            },
            {
              icon: "⚡",
              title: "Lightning Fast",
              description: "Optimized for performance with minimal bundle size and fast initialization."
            },
            {
              icon: "🛡️",
              title: "Enterprise Ready",
              description: "Scalable architecture that grows with your user base and business needs."
            },
            {
              icon: "🔧",
              title: "Easy Integration",
              description: "Simple API design with comprehensive documentation and examples."
            },
            {
              icon: "🌐",
              title: "Multi-Platform",
              description: "Consistent experience across React, Vue, Angular, and more."
            },
            {
              icon: "📊",
              title: "Advanced Analytics",
              description: "Built-in user analytics and session monitoring for better insights."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-[#00c420]/30 transition-all duration-300 group hover:transform hover:-translate-y-1"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive deeper into our documentation to explore all features, 
            advanced configurations, and best practices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button className="px-6 py-3 bg-[#00c420] hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1">
              Get API Keys
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 border border-gray-600">
              View Full Documentation
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Introduction;