// src/pages/docs/UserData.jsx
import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";


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
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">
        💾 User Data & Advanced Features
      </h1>

      <p className="text-gray-400 leading-relaxed text-lg">{introText}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📝</div>
          <h3 className="font-semibold text-white">Notes App</h3>
          <p className="text-xs text-gray-400 mt-1">
            Store user notes with categories
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📰</div>
          <h3 className="font-semibold text-white">Blog Platform</h3>
          <p className="text-xs text-gray-400 mt-1">
            User blog posts with tags
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">⚙️</div>
          <h3 className="font-semibold text-white">Preferences</h3>
          <p className="text-xs text-gray-400 mt-1">
            User settings and preferences
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🛒</div>
          <h3 className="font-semibold text-white">Shopping Cart</h3>
          <p className="text-xs text-gray-400 mt-1">
            User cart items and orders
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-white">Analytics</h3>
          <p className="text-xs text-gray-400 mt-1">User behavior data</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-semibold text-white">Custom Data</h3>
          <p className="text-xs text-gray-400 mt-1">
            Anything you can imagine!
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {/* Storing Data Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            1. Storing User Data
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                📝 Notes Application
              </h3>
              <CodeBlock code={storeNotesCode} language="typescript" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                📰 Blog Posts
              </h3>
              <CodeBlock code={storeBlogCode} language="typescript" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                ⚙️ User Preferences
              </h3>
              <CodeBlock code={storePreferencesCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Retrieving Data */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            2. Retrieving User Data
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Get All Data
              </h3>
              <CodeBlock code={getAllDataCode} language="typescript" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Get Specific Item
              </h3>
              <CodeBlock code={getSingleDataCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Updating & Deleting */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            3. Managing Data
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Update Data
              </h3>
              <CodeBlock code={updateDataCode} language="typescript" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Delete Data
              </h3>
              <CodeBlock code={deleteDataCode} language="typescript" />
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            🚀 Complete Blog App Example
          </h2>
          <p className="text-gray-400 mb-4">
            Here's how you could build a simple blog platform using Authix user
            data:
          </p>
          <CodeBlock code={completeExampleCode} language="typescript" />
        </section>

        {/* Security Features */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            4. Security Features
          </h2>
          <CodeBlock code={securityFeaturesCode} language="typescript" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h4 className="text-green-400 font-semibold mb-2">
                ✅ Email Verification
              </h4>
              <p className="text-sm text-gray-300">
                Verify user emails with OTP codes for added security
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <h4 className="text-blue-400 font-semibold mb-2">
                ✅ Password Reset
              </h4>
              <p className="text-sm text-gray-300">
                Secure password recovery with OTP verification
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            💡 Best Practices
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>Always store the JWT token securely after login</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>
                Include a <code>type</code> field in your data objects for easy
                filtering
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>
                Use consistent data structures for similar items (notes, blogs,
                etc.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>
                Implement email verification for important applications
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
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
