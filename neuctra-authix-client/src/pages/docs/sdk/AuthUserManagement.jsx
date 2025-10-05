// src/pages/docs/Authentication.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";


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
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">🔐 Authentication & User Management</h1>
      
      <p className="text-gray-400 leading-relaxed">
        Learn how to handle user authentication, manage profiles, and implement security features in your app.
      </p>

      <div className="space-y-12">
        {/* Setup Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. SDK Setup</h2>
          <p className="text-gray-400 mb-4">
            First, initialize the SDK with your app credentials. You'll get these from your Authix dashboard.
          </p>
          <CodeBlock code={setupCode} language="typescript" />
        </section>

        {/* Signup Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. User Signup</h2>
          <p className="text-gray-400 mb-4">
            Create new user accounts. Only <code>name</code>, <code>email</code>, and <code>password</code> are required.
          </p>
          <CodeBlock code={signupCode} language="typescript" />
        </section>

        {/* Login Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. User Login</h2>
          <p className="text-gray-400 mb-4">
            Authenticate users and get a JWT token for secure API calls.
          </p>
          <CodeBlock code={loginCode} language="typescript" />
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-4">
            <h4 className="text-green-400 font-semibold mb-2">💡 Important</h4>
            <p className="text-sm text-gray-300">
              Save the JWT token from login response! You'll need it for all protected API calls.
            </p>
          </div>
        </section>

        {/* Profile Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Get User Profile</h2>
          <p className="text-gray-400 mb-4">
            Fetch the current user's profile using their JWT token.
          </p>
          <CodeBlock code={profileCode} language="typescript" />
        </section>

        {/* Update Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Update User Information</h2>
          <p className="text-gray-400 mb-4">
            Allow users to update their profile information.
          </p>
          <CodeBlock code={updateCode} language="typescript" />
        </section>

        {/* Password Management */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">6. Password Management</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Change Password</h3>
              <p className="text-gray-400 mb-3">Users can change their password when logged in.</p>
              <CodeBlock code={changePasswordCode} language="typescript" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Forgot Password Flow</h3>
              <p className="text-gray-400 mb-3">Two-step process for password recovery.</p>
              <CodeBlock code={forgotPasswordCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Delete Account */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">7. Delete User Account</h2>
          <p className="text-gray-400 mb-4">
            Permanently delete a user account.
          </p>
          <CodeBlock code={deleteCode} language="typescript" />
        </section>

        {/* Complete Flow Example */}
        <section className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">🎯 Complete Authentication Flow</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">1</div>
              <span>User signs up with email and password</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">2</div>
              <span>User logs in and receives JWT token</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">3</div>
              <span>Use token to access protected routes and user data</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">4</div>
              <span>User can update profile, change password, or delete account</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthUserManagement;