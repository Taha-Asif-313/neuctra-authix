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
  const introText = `Authix allows you to store, retrieve, update, delete, and search custom user data. Perfect for notes, blog posts, preferences, shopping carts, or any user-specific information.`;

  // --- CODE EXAMPLES ---
  const searchUserDataCode = `// Search user data by category or query
const results = await authix.searchUserData({
  userId: "user123",
  category: "notes",
  q: "important"
});

console.log("Search results:", results);`;

  const searchUserDataByKeysCode = `// Search user data by dynamic keys
const results = await authix.searchUserDataByKeys({
  userId: "user123",
  category: "orders",
  shopId: 12,
  status: "active"
});

console.log("Filtered results:", results);`;

  const getUserDataCode = `// Get all user data
const allData = await authix.getUserData({
  userId: "user123"
});

console.log("All user data:", allData);`;

  const getSingleUserDataCode = `// Get a single data item
const item = await authix.getSingleUserData({
  userId: "user123",
  dataId: "note_123"
});

console.log("Data item:", item);`;

  const addUserDataCode = `// Add new user data
const newData = await authix.addUserData({
  userId: "user123",
  dataCategory: "notes",
  data: {
    title: "My Note",
    content: "This is a note",
    tags: ["important"]
  }
});

console.log("New data added:", newData);`;

  const updateUserDataCode = `// Update existing user data
await authix.updateUserData({
  userId: "user123",
  dataId: "note_123",
  data: {
    title: "Updated Note",
    content: "Updated content"
  }
});`;

  const deleteUserDataCode = `// Delete a data item
await authix.deleteUserData({
  userId: "user123",
  dataId: "note_123"
});

console.log("Data deleted successfully");`;

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Database className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 flex-shrink-0" />
          User Data SDK
        </h1>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          {introText}
        </p>
      </div>

      {/* User Data Functions */}
      <div className="space-y-8 sm:space-y-12">
        {/* Search Data */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white">
            <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            1. Searching User Data
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">searchUserData</h3>
            <CodeBlock code={searchUserDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">
              searchUserDataByKeys
            </h3>
            <CodeBlock code={searchUserDataByKeysCode} language="typescript" />
          </div>
        </section>

        {/* Retrieve Data */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white">
            <Eye className="w-5 h-5 text-purple-400 flex-shrink-0" />
            2. Retrieving User Data
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">getUserData</h3>
            <CodeBlock code={getUserDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">
              getSingleUserData
            </h3>
            <CodeBlock code={getSingleUserDataCode} language="typescript" />
          </div>
        </section>

        {/* Add / Update / Delete */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white">
            <Edit3 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            3. Add, Update & Delete User Data
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">addUserData</h3>
            <CodeBlock code={addUserDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">updateUserData</h3>
            <CodeBlock code={updateUserDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">deleteUserData</h3>
            <CodeBlock code={deleteUserDataCode} language="typescript" />
          </div>
        </section>
        
        {/* Best Practices */}
        <section className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
            Best Practices
          </h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
            <li className="flex items-start gap-2 sm:gap-3">
              <Lock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Always store sensitive user data securely and avoid storing
                plain passwords or tokens.
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <Database className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Include a{" "}
                <code className="bg-black/30 px-1 py-0.5 rounded text-xs">
                  category
                </code>{" "}
                field in user data for easier filtering and organization.
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <FileText className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Keep data structures consistent for similar types of user data
                (notes, blogs, preferences, etc.).
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <UserCheck className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Implement email verification and authentication checks for
                sensitive actions.
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Handle errors gracefully with try/catch and proper user feedback
                in production.
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Update timestamps when modifying user data to track changes and
                history.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserDataManagement;
