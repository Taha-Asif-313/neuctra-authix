// src/pages/docs/Authentication.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Shield,
  Settings,
  UserPlus,
  LogIn,
  User,
  Key,
  Lock,
  Trash2,
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";

const AuthUserManagement = () => {
  const setupCode = `import { NeuctraAuthix } from "@neuctra/authix";

// Initialize the SDK with your credentials
const authix = new NeuctraAuthix({
  baseUrl: "https://authix.neuctra.com/api",
  apiKey: "your_api_key_here",  // Get from Authix dashboard
  appId: "your_app_id_here"     // Get from Authix dashboard
});`;

  const signupCode = `// Step 1: User signs up
const newUser = await authix.signup({
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123",
  phone: "+1234567890",        // Optional
  role: "user"                 // Optional: user, admin, etc.
});

console.log("User created:", newUser);
// Returns: { userId: "123", email: "john@example.com", ... }`;

  const loginCode = `// Step 2: User logs in
const loginResult = await authix.login({
  email: "john@example.com",
  password: "securePassword123",
  appId: "your_app_id_here"
});

console.log("Login successful:", loginResult);
// Returns: { token: "jwt_token_here", user: { ... } }

// Save this token for future requests!`;

  const profileCode = `// Step 3: Get user profile using the token
const userProfile = await authix.getProfile({
  token: "jwt_token_from_login"  // Use token from login response
});

console.log("User profile:", userProfile);
// Returns complete user information`;

  const updateCode = `// Update user information
const updatedUser = await authix.updateUser({
  userId: "user_id_here",
  name: "John Smith",           // New name
  phone: "+1987654321",         // New phone
  avatarUrl: "https://example.com/avatar.jpg"
});

console.log("User updated:", updatedUser);`;

  const changePasswordCode = `// User changes their password
await authix.changePassword({
  userId: "user_id_here",
  currentPassword: "oldPassword123",
  newPassword: "newSecurePassword456"
});

console.log("Password changed successfully!");`;

  const forgotPasswordCode = `// User forgot password - Step 1: Request OTP
await authix.forgotPassword({
  email: "john@example.com"
});
// Sends OTP to user's email

// Step 2: Reset password with OTP
await authix.resetPassword({
  email: "john@example.com",
  otp: "123456",               // OTP received via email
  newPassword: "brandNewPassword789"
});

console.log("Password reset successfully!");`;

  const deleteCode = `// Delete user account
await authix.deleteUser({
  userId: "user_id_here"
});

console.log("User account deleted");`;

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
          Auth & User Management
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          Learn how to handle user authentication, manage profiles, and implement security features in your app.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {/* Setup Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
            1. SDK Setup
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            First, initialize the SDK with your app credentials. You'll get these from your Authix dashboard.
          </p>
          <CodeBlock code={setupCode} language="typescript" />
        </section>

        {/* Signup Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
            2. User Signup
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Create new user accounts. Only <code className="text-sm">name</code>, <code className="text-sm">email</code>, and <code className="text-sm">password</code> are required.
          </p>
          <CodeBlock code={signupCode} language="typescript" />
        </section>

        {/* Login Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
            3. User Login
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Authenticate users and get a JWT token for secure API calls.
          </p>
          <CodeBlock code={loginCode} language="typescript" />
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 sm:mt-4">
            <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Important
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Save the JWT token from login response! You'll need it for all protected API calls.
            </p>
          </div>
        </section>

        {/* Profile Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
            4. Get User Profile
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Fetch the current user's profile using their JWT token.
          </p>
          <CodeBlock code={profileCode} language="typescript" />
        </section>

        {/* Update Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
            5. Update User Information
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Allow users to update their profile information.
          </p>
          <CodeBlock code={updateCode} language="typescript" />
        </section>

        {/* Password Management */}
        <section className="space-y-6 sm:space-y-8">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Key className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
            6. Password Management
          </h2>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                Change Password
              </h3>
              <p className="text-sm sm:text-base text-gray-400">Users can change their password when logged in.</p>
              <CodeBlock code={changePasswordCode} language="typescript" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                Forgot Password Flow
              </h3>
              <p className="text-sm sm:text-base text-gray-400">Two-step process for password recovery.</p>
              <CodeBlock code={forgotPasswordCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Delete Account */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
            7. Delete User Account
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Permanently delete a user account.
          </p>
          <CodeBlock code={deleteCode} language="typescript" />
        </section>

        {/* Complete Flow Example */}
        <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
            Complete Authentication Flow
          </h2>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300">
            {/* Step 1 */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="flex-1">User signs up with email and password</span>
            </div>
            
            {/* Arrow 1 */}
            <div className="flex justify-center sm:justify-start">
              <ArrowRight className="w-4 h-4 text-purple-400 transform rotate-90 ml-0 sm:ml-2" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <LogIn className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="flex-1">User logs in and receives JWT token</span>
            </div>
            
            {/* Arrow 2 */}
            <div className="flex justify-center sm:justify-start">
              <ArrowRight className="w-4 h-4 text-purple-400 transform rotate-90 ml-0 sm:ml-2" />
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="flex-1">Use token to access protected routes and user data</span>
            </div>
            
            {/* Arrow 3 */}
            <div className="flex justify-center sm:justify-start">
              <ArrowRight className="w-4 h-4 text-purple-400 transform rotate-90 ml-0 sm:ml-2" />
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="flex-1">User can update profile, change password, or delete account</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthUserManagement;