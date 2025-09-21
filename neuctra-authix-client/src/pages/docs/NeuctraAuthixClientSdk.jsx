import React, { useState } from "react";
import {
  Shield,
  Download,
  Settings,
  UserPlus,
  LogIn,
  User,
  Trash2,
  FileText,
  AlertTriangle,
  Check,
  Code,
  Cpu,
  Database,
  Clock,
  Globe,
  Book,
  Key,
  Server,
  Lock,
  Mail,
  Hash,
  Copy,
  ChevronRight,
  Terminal,
  Zap,
  Package,
} from "lucide-react";
import CodeBlock from "../../components/docs/CodeBlock";

const MethodCard = ({
  icon: Icon,
  title,
  description,
  params,
  returns,
  code,
  iconColor = "#00c420",
}) => (
  <div className="bg-black hover:border-gray-700 transition-colors mb-8">
    <div className="">
      <div className="flex items-center mb-3">
        <div
          className="p-2 rounded-lg mr-3"
          style={{
            backgroundColor: `${iconColor}20`,
            border: `1px solid ${iconColor}40`,
          }}
        >
          <Icon className="text-white" size={20} style={{ color: iconColor }} />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>

    {(params || returns) && (
      <div className="px-6 py-4 my-4 bg-zinc-950 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {params && (
            <div>
              <h4 className="font-medium text-[#00c420] mb-2 flex items-center">
                <Hash size={16} className="mr-1" /> Parameters
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-[#00c420]">
                        Parameter
                      </th>
                      <th className="text-left py-2 px-3 text-[#00c420]">
                        Type
                      </th>
                      <th className="text-left py-2 px-3 text-[#00c420]">
                        Required
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map((param, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-800 last:border-b-0"
                      >
                        <td className="py-2 px-3">
                          <code className="bg-gray-800 px-2 py-1 rounded text-gray-100">
                            {param.name}
                          </code>
                        </td>
                        <td className="py-2 px-3 text-gray-300">
                          {param.type || "any"}
                        </td>
                        <td className="py-2 px-3">
                          {param.required ? (
                            <span className="text-primary">Yes</span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {returns && (
            <div>
              <h4 className="font-medium text-[#00c420] mb-2 flex items-center">
                <Check size={16} className="mr-1" /> Returns
              </h4>
              <div className="bg-gray-900 p-3 rounded-lg">
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 px-2 text-[#00c420] font-medium">
                        Type:
                      </td>
                      <td className="py-1 px-2 text-gray-300">
                        {returns.type || "Object"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 text-[#00c420] font-medium">
                        Description:
                      </td>
                      <td className="py-1 px-2 text-gray-300">
                        {returns.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    <div>
      <CodeBlock code={code} language="javascript" />
    </div>
  </div>
);

const NeuctraAuthixClientSdk = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div>
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00c420] to-[#00a01c] rounded-2xl mb-6">
            <Shield className="text-black" size={40} />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            NeuctraAuthixClient SDK
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Modern authentication library for JavaScript applications with
            axios-powered HTTP client
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
              <Database size={16} className="mr-2 text-[#00c420]" />
              <span className="text-sm">Prisma Backend</span>
            </div>
            <div className="flex items-center bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
              <Key size={16} className="mr-2 text-[#00c420]" />
              <span className="text-sm">JWT Authentication</span>
            </div>
            <div className="flex items-center bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
              <Server size={16} className="mr-2 text-[#00c420]" />
              <span className="text-sm">Express APIs</span>
            </div>
            <div className="flex items-center bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
              <Globe size={16} className="mr-2 text-[#00c420]" />
              <span className="text-sm">Axios HTTP Client</span>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-black mb-12">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-primary/20 rounded-lg mr-3 border border-primary/40">
              <Zap className="text-primary" size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-white">Quick Start</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium  mb-3 flex items-center">
                <Package size={18} className="mr-2 text-primary" />
                Installation
              </h3>
              <CodeBlock
                language="bash"
                code={`npm install neuctra-authix-client axios

# or with yarn
yarn add neuctra-authix-client axios`}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Settings size={18} className="mr-2 text-primary" />
                Initialization
              </h3>
              <CodeBlock
                language="javascript"
                code={`import NeuctraAuthixClient from "neuctra-authix-client";

const client = new NeuctraAuthixClient({
  baseUrl: "http://localhost:5000/api",
  apiKey: "your_admin_api_key", // optional
  appId: "your_app_id",         // optional
});`}
              />
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-950 rounded-lg border border-gray-800">
            <div className="flex items-start">
              <Terminal className="text-[#00c420] mt-1 mr-3" size={18} />
              <div>
                <h4 className="font-medium text-[#00c420] mb-2">
                  Configuration Options
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <code className="text-white bg-gray-800 px-2 py-1 rounded">
                      baseUrl
                    </code>
                    <p className="text-gray-400 mt-1">
                      Your API endpoint (required)
                    </p>
                  </div>
                  <div>
                    <code className="text-white bg-gray-800 px-2 py-1 rounded">
                      apiKey
                    </code>
                    <p className="text-gray-400 mt-1">
                      Admin API key for privileged operations
                    </p>
                  </div>
                  <div>
                    <code className="text-white bg-gray-800 px-2 py-1 rounded">
                      appId
                    </code>
                    <p className="text-gray-400 mt-1">
                      Application identifier for multi-tenant systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Methods */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-white flex items-center">
            <Book className="mr-3 text-primary" size={32} />
            API Reference
          </h2>

          <div className="space-y-8">
            {/* Signup Method */}
            <MethodCard
              icon={UserPlus}
              title="signup()"
              description="Create a new user account with comprehensive profile information."
              iconColor="#00c420"
              params={[
                { name: "name", required: true },
                { name: "email", required: true },
                { name: "password", required: true },
                { name: "phone", required: false },
                { name: "address", required: false },
                { name: "avatarUrl", required: false },
                { name: "isActive", required: false },
                { name: "role", required: false },
                { name: "adminId", required: false },
              ]}
              returns="User object with generated ID and timestamps"
              code={`const newUser = await client.signup({
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123",
  phone: "+1234567890",           // optional
  address: "123 Main St, City",   // optional
  avatarUrl: "https://...",       // optional
  isActive: true,                 // optional, default: true
  role: "user",                   // optional, default: "user"
  adminId: "admin_id_here"        // optional
});

console.log(newUser.id); // Access the new user ID`}
            />

            {/* Login Method */}
            <MethodCard
              icon={LogIn}
              title="login()"
              description="Authenticate a user with email and password. Returns a JWT token for secure API calls."
              iconColor="#3b82f6"
              params={[
                { name: "email", required: true },
                { name: "password", required: true },
                { name: "appId", required: false },
              ]}
              returns="Authentication response with JWT token"
              code={`const authResult = await client.login({
  email: "john@example.com",
  password: "securePassword123",
  appId: "specific_app_id"        // optional, overrides default
});

// Store token securely
localStorage.setItem('authToken', authResult.token);

// Use token for subsequent requests
const userProfile = await client.getProfile({
  token: authResult.token
});`}
            />

            {/* Update User Method */}
            <MethodCard
              icon={User}
              title="updateUser()"
              description="Modify existing user information. Requires admin privileges or user authentication."
              iconColor="#f59e0b"
              params={[
                { name: "userId", required: true },
                { name: "name", required: false },
                { name: "email", required: false },
                { name: "password", required: false },
                { name: "phone", required: false },
                { name: "address", required: false },
                { name: "avatarUrl", required: false },
                { name: "isActive", required: false },
                { name: "role", required: false },
                { name: "appId", required: false },
              ]}
              returns="Updated user object"
              code={`const updatedUser = await client.updateUser({
  userId: "user_123",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+1987654321",
  isActive: false,                // deactivate user
  role: "admin",                  // upgrade to admin
  appId: "specific_app_id"        // optional
});

console.log('User updated:', updatedUser);`}
            />

            {/* Delete User Method */}
            <MethodCard
              icon={Trash2}
              title="deleteUser()"
              description="Permanently remove a user account. This operation is irreversible and requires admin privileges."
              iconColor="#ef4444"
              params={[
                { name: "userId", required: true },
                { name: "appId", required: false },
              ]}
              returns="Deletion confirmation response"
              code={`const deleteResult = await client.deleteUser({
  userId: "user_123",
  appId: "specific_app_id"        // optional
});

console.log('User deleted:', deleteResult.message);`}
            />

            {/* Get Profile Method */}
            <MethodCard
              icon={FileText}
              title="getProfile()"
              description="Fetch the currently authenticated user's profile information using their JWT token."
              iconColor="#10b981"
              params={[{ name: "token", required: true }]}
              returns="Complete user profile object"
              code={`const token = localStorage.getItem('authToken');

const profile = await client.getProfile({
  token: token
});

console.log('User profile:', {
  id: profile.id,
  name: profile.name,
  email: profile.email,
  phone: profile.phone,
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt
});`}
            />
          </div>
        </div>

        {/* Error Handling */}
        <div className="bg-black rounded-xl mb-12">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg mr-3 border border-red-500/40">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-white">
              Error Handling
            </h2>
          </div>

          <p className="text-gray-300 text-sm mb-6">
            The SDK provides comprehensive error handling with detailed error
            messages for debugging and user feedback.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-950 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-3">
                <Globe className="text-[#00c420] mr-2" size={20} />
                <span className="font-medium text-white">Network Errors</span>
              </div>
              <p className="text-sm text-gray-400">
                Connection timeouts, CORS issues, server unavailable
              </p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-3">
                <Lock className="text-yellow-400 mr-2" size={20} />
                <span className="font-medium text-white">Authentication</span>
              </div>
              <p className="text-sm text-gray-400">
                Invalid credentials, expired tokens, unauthorized access
              </p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-3">
                <AlertTriangle className="text-red-400 mr-2" size={20} />
                <span className="font-medium text-white">Validation</span>
              </div>
              <p className="text-sm text-gray-400">
                Missing required fields, invalid data format
              </p>
            </div>
          </div>

          <CodeBlock
            language="javascript"
            code={`try {
  const user = await client.login({
    email: "invalid@example.com",
    password: "wrongpassword"
  });
} catch (error) {
  console.error('Authentication failed:', error.message);
  
  // Handle specific error types
  if (error.message.includes('Network error')) {
    // Network connectivity issues
    showNotification('Cannot connect to server. Check your connection.', 'error');
  } else if (error.message.includes('401')) {
    // Invalid credentials
    showNotification('Invalid email or password.', 'error');
  } else if (error.message.includes('400')) {
    // Validation errors
    showNotification('Please check your input and try again.', 'error');
  } else {
    // Generic error handling
    showNotification('An unexpected error occurred.', 'error');
  }
}`}
          />
        </div>

        {/* Advanced Usage */}
        <div className="bg-black rounded-xl mb-12">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg mr-3 border border-purple-500/40">
              <Code className="text-purple-500" size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-white">
              Advanced Usage
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-[#00c420] mb-4">
                Custom Request Method
              </h3>
              <p className="text-gray-300 mb-4">
                Access the underlying request method for custom API calls with
                headers and error handling.
              </p>
              <CodeBlock
                language="javascript"
                code={`// Custom API request with additional headers
const customData = await client.request(
  'POST',                           // HTTP method
  '/custom/endpoint',               // API path
  { customField: 'value' },         // request body
  { 'X-Custom-Header': 'tracking' } // extra headers
);

// Example: Custom user search endpoint
const searchResults = await client.request(
  'GET',
  '/users/search',
  { query: 'john', limit: 10 },
  { 'X-Search-Context': 'admin-panel' }
);`}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium text-[#00c420] mb-4">
                Axios Configuration
              </h3>
              <p className="text-gray-300 mb-4">
                Customize the underlying axios instance for timeout,
                interceptors, and other configurations.
              </p>
              <CodeBlock
                language="javascript"
                code={`// Access and modify the axios client
client.client.defaults.timeout = 30000; // 30 seconds

// Add request interceptor
client.client.interceptors.request.use((config) => {
  console.log('Making request to:', config.url);
  return config;
});

// Add response interceptor for global error handling
client.client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration globally
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-800">
          <div className="flex items-center justify-center mb-4">
            <Shield className="text-[#00c420] mr-2" size={24} />
            <span className="text-lg font-semibold text-white">
              NeuctraAuthixClient SDK
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Powerful, secure, and developer-friendly authentication for modern
            JavaScript applications
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check size={16} className="mr-1 text-[#00c420]" />
              Type-safe with JSDoc
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-1 text-[#00c420]" />
              Axios-powered HTTP client
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-1 text-[#00c420]" />
              Comprehensive error handling
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-1 text-[#00c420]" />
              JWT authentication
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuctraAuthixClientSdk;
