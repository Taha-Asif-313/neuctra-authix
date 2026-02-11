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
} from "lucide-react";

const AuthUserManagement = () => {
  const setupCode = `import { NeuctraAuthix } from "@neuctra/authix";

const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "your_api_key_here",
  appId: "your_app_id_here"
});`;

  const signupCode = `await authix.signupUser({
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123",
  phone: "+1234567890", // optional
  role: "user" // optional
});`;

  const loginCode = `await authix.loginUser({
  email: "john@example.com",
  password: "securePassword123"
});

// 🔥 Authix uses secure HTTP-only cookies
// No need to manually store tokens`;

  const logoutCode = `await authix.logoutUser();
// Clears backend session + frontend cookie`;

  const sessionCode = `const session = await authix.checkUserSession();

if (session.authenticated) {
  console.log("User is logged in:", session.user);
} else {
  console.log("User is not authenticated");
}`;

  const profileCode = `await authix.getUserProfile({
  userId: "user_id_here"
});`;

  const updateCode = `await authix.updateUser({
  userId: "user_id_here",
  name: "Updated Name",
  phone: "+1987654321",
  avatarUrl: "https://example.com/avatar.jpg"
});`;

  const changePasswordCode = `await authix.changePassword({
  userId: "user_id_here",
  currentPassword: "oldPassword123",
  newPassword: "newSecurePassword456"
});`;

  const verifyEmailCode = `// Step 1: Send OTP
await authix.requestEmailVerificationOTP({
  userId: "user_id_here",
  email: "john@example.com"
});

// Step 2: Verify OTP
await authix.verifyEmail({
  email: "john@example.com",
  otp: "123456"
});`;

  const forgotPasswordCode = `// Step 1: Request Reset OTP
await authix.requestResetUserPasswordOTP({
  email: "john@example.com"
});

// Step 2: Reset Password
await authix.resetUserPassword({
  email: "john@example.com",
  otp: "123456",
  newPassword: "newSecurePassword789"
});`;

  const deleteCode = `await authix.deleteUser({
  userId: "user_id_here"
});`;

  const checkUserCode = `const result = await authix.checkIfUserExists("user_id_here");

if (result.exists) {
  console.log("User exists");
}`;

  return (
    <div className="space-y-8 text-gray-300">
      <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
        <Shield className="w-7 h-7 text-blue-400" />
        Authentication & Security
      </h1>

      <p className="text-gray-400 max-w-3xl">
        Neuctra Authix provides secure, cookie-based authentication with
        built-in session handling. No manual token storage required.
      </p>

      {/* Setup */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          SDK Setup
        </h2>
        <CodeBlock code={setupCode} language="typescript" />
      </section>

      {/* Signup */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-green-400" />
          Signup User
        </h2>
        <CodeBlock code={signupCode} language="typescript" />
      </section>

      {/* Login */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <LogIn className="w-5 h-5 text-blue-400" />
          Login User
        </h2>
        <CodeBlock code={loginCode} language="typescript" />
      </section>

      {/* Logout */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Logout User</h2>
        <CodeBlock code={logoutCode} language="typescript" />
      </section>

      {/* Check Session */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          Check Authentication Session
        </h2>
        <CodeBlock code={sessionCode} language="typescript" />
      </section>

      {/* Profile */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          Get User Profile
        </h2>
        <CodeBlock code={profileCode} language="typescript" />
      </section>

      {/* Update */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Update User</h2>
        <CodeBlock code={updateCode} language="typescript" />
      </section>

      {/* Change Password */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <Key className="w-5 h-5 text-yellow-400" />
          Change Password
        </h2>
        <CodeBlock code={changePasswordCode} language="typescript" />
      </section>

      {/* Email Verification */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Email Verification (OTP)
        </h2>
        <CodeBlock code={verifyEmailCode} language="typescript" />
      </section>

      {/* Forgot Password */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-orange-400" />
          Forgot / Reset Password
        </h2>
        <CodeBlock code={forgotPasswordCode} language="typescript" />
      </section>

      {/* Check User Exists */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          Check If User Exists
        </h2>
        <CodeBlock code={checkUserCode} language="typescript" />
      </section>

      {/* Delete */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-400" />
          Delete User
        </h2>
        <CodeBlock code={deleteCode} language="typescript" />
      </section>

      {/* Security Note */}
      <section className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-2">
          <CheckCircle className="w-4 h-4" />
          Security Model
        </h3>
        <p className="text-sm text-gray-300">
          Neuctra Authix uses secure HTTP-only cookies for authentication.
          Sessions are automatically handled via{" "}
          <code>withCredentials: true</code>. No manual token management
          required.
        </p>
      </section>
    </div>
  );
};

export default AuthUserManagement;
