// src/pages/docs/UserData.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Database,
  FileText,
  BookOpen,
  Settings,
  ShoppingCart,
  BarChart3,
  Zap,
  Rocket,
  Shield,
  Mail,
  Key,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Edit3,
  Trash2,
  Eye,
  Search,
  Lock,
  UserCheck,
} from "lucide-react";

const UserDataManagement = () => {
  const introText = `Authix isn't just about authentication! You can also store custom data for each user - perfect for notes, blog posts, user preferences, shopping carts, or any other user-specific information.`;

  const storeNotesCode = `// Store user notes
const noteData = {
  title: "My First Note",
  content: "This is the content of my note",
  category: "personal",
  tags: ["important", "reminder"],
  createdAt: new Date().toISOString()
};

const savedNote = await authix.addUserData({
  userId: "user_id_here",
  data: noteData
});

console.log("Note saved:", savedNote);
// Returns: { dataId: "note_123", ... }`;

  const storeBlogCode = `// Store blog posts
const blogPost = {
  title: "Getting Started with Authix",
  content: "Authix makes authentication easy...",
  status: "published",
  tags: ["auth", "tutorial", "webdev"],
  readTime: "5 min",
  publishedAt: new Date().toISOString()
};

const blog = await authix.addUserData({
  userId: "user_id_here",
  data: blogPost
});`;

  const storePreferencesCode = `// Store user preferences
const userPreferences = {
  theme: "dark",
  language: "en",
  notifications: {
    email: true,
    push: false,
    sms: true
  },
  layout: "compact",
  timezone: "UTC+5"
};

await authix.addUserData({
  userId: "user_id_here",
  data: userPreferences
});`;

  const getAllDataCode = `// Get all user data (notes, blogs, preferences, etc.)
const allUserData = await authix.getUserData({
  userId: "user_id_here"
});

console.log("All user data:", allUserData);
// Returns array of all data objects`;

  const getSingleDataCode = `// Get a specific data item
const specificNote = await authix.getSingleUserData({
  userId: "user_id_here",
  dataId: "note_123"  // ID returned when you created the data
});

console.log("Specific note:", specificNote);`;

  const updateDataCode = `// Update existing data
await authix.updateUserData({
  userId: "user_id_here",
  dataId: "note_123",
  data: {
    title: "Updated Note Title",
    content: "Updated content here...",
    updatedAt: new Date().toISOString()
  }
});`;

  const deleteDataCode = `// Delete specific data
await authix.deleteUserData({
  userId: "user_id_here",
  dataId: "note_123"
});

console.log("Data deleted successfully");`;

  const completeExampleCode = `// Complete example: Blog application
async function createBlogPost(userId, postData) {
  // Add blog post to user's data
  const blog = await authix.addUserData({
    userId: userId,
    data: {
      type: "blog_post",
      ...postData,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0
    }
  });
  return blog;
}

async function getUserBlogPosts(userId) {
  // Get all user data
  const allData = await authix.getUserData({ userId });
  
  // Filter only blog posts
  const blogPosts = allData.filter(item => item.type === "blog_post");
  return blogPosts;
}

// Usage
const blogPost = await createBlogPost("user123", {
  title: "My Authix Experience",
  content: "I love using Authix for my app...",
  tags: ["review", "authix"]
});

const userBlogs = await getUserBlogPosts("user123");`;

  const securityFeaturesCode = `// Security Features

// 1. Email Verification
await authix.sendVerifyOTP({
  token: "user_jwt_token"  // From login
});

await authix.verifyEmail({
  token: "user_jwt_token",
  otp: "123456"  // Received via email
});

// 2. Password Reset (if user forgets)
await authix.forgotPassword({
  email: "user@example.com"
});

// 3. Secure Profile Access
const profile = await authix.getProfile({
  token: "user_jwt_token"  // Required for security
});`;

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Database className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 flex-shrink-0" />
          User Data & Features
        </h1>

        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          {introText}
        </p>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 my-6 sm:my-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
          <div className="flex justify-center mb-2">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white text-sm sm:text-base">
            Notes App
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Store user notes with categories
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
          <div className="flex justify-center mb-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
          </div>
          <h3 className="font-semibold text-white text-sm sm:text-base">
            Blog Platform
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            User blog posts with tags
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
          <div className="flex justify-center mb-2">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
          </div>
          <h3 className="font-semibold text-white text-sm sm:text-base">
            Preferences
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            User settings and preferences
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
          <div className="flex justify-center mb-2">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          </div>
          <h3 className="font-semibold text-white text-sm sm:text-base">
            Shopping Cart
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            User cart items and orders
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
          <div className="flex justify-center mb-2">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
          </div>
          <h3 className="font-semibold text-white text-sm sm:text-base">
            Analytics
          </h3>
          <p className="text-xs text-gray-400 mt-1">User behavior data</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
          <div className="flex justify-center mb-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          </div>
          <h3 className="font-semibold text-white text-sm sm:text-base">
            Custom Data
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Anything you can imagine!
          </p>
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {/* Storing Data Examples */}
        <section className="space-y-6 sm:space-y-8">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
            1. Storing User Data
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                Notes Application
              </h3>
              <CodeBlock code={storeNotesCode} language="typescript" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                Blog Posts
              </h3>
              <CodeBlock code={storeBlogCode} language="typescript" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                User Preferences
              </h3>
              <CodeBlock code={storePreferencesCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Retrieving Data */}
        <section className="space-y-6 sm:space-y-8">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
            2. Retrieving User Data
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                Get All Data
              </h3>
              <CodeBlock code={getAllDataCode} language="typescript" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                Get Specific Item
              </h3>
              <CodeBlock code={getSingleDataCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Updating & Deleting */}
        <section className="space-y-6 sm:space-y-8">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
            3. Managing Data
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                Update Data
              </h3>
              <CodeBlock code={updateDataCode} language="typescript" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold text-white">
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                Delete Data
              </h3>
              <CodeBlock code={deleteDataCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
            Complete Blog App Example
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
            Here's how you could build a simple blog platform using Authix user
            data:
          </p>
          <CodeBlock code={completeExampleCode} language="typescript" />
        </section>

        {/* Security Features */}
        <section className="space-y-6 sm:space-y-8">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
            4. Security Features
          </h2>

          <CodeBlock code={securityFeaturesCode} language="typescript" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 sm:p-4">
              <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Email Verification
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Verify user emails with OTP codes for added security
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4">
              <h4 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                <Key className="w-4 h-4 flex-shrink-0" />
                Password Reset
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Secure password recovery with OTP verification
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
            Best Practices
          </h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
            <li className="flex items-start gap-2 sm:gap-3">
              <Lock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>Always store the JWT token securely after login</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <Database className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Include a{" "}
                <code className="bg-black/30 px-1 py-0.5 rounded text-xs">
                  type
                </code>{" "}
                field in your data objects for easy filtering
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <FileText className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Use consistent data structures for similar items (notes, blogs,
                etc.)
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <UserCheck className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Implement email verification for important applications
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Handle errors gracefully - use try/catch blocks in production
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserDataManagement;
