import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Database,
  Search,
  Eye,
  Edit3,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

const AppDataManagement = () => {
  const introText = `Neuctra Authix allows your app to store global data for all users. You can add, retrieve, update, delete, and search app-level data such as settings, content, analytics, or any shared information.`;

  // --- CODE EXAMPLES ---
  const getAppDataCode = `// Get all app data or filter by category
const allAppData = await authix.getAppData();
const settingsData = await authix.getAppData("settings");

console.log("All app data:", allAppData);
console.log("Settings data:", settingsData);`;

  const getSingleAppDataCode = `// Get a single app data item by ID
const item = await authix.getSingleAppData({
  dataId: "setting_123"
});

console.log("Single app data item:", item);`;

  const searchAppDataByKeysCode = `// Search app data using dynamic keys
const results = await authix.searchAppDataByKeys({
  category: "settings",
  key: "theme",
  value: "dark"
});

console.log("Filtered app data:", results);`;

  const addAppDataCode = `// Add new app data item
const newItem = await authix.addAppData({
  dataCategory: "settings",
  data: {
    key: "theme",
    value: "dark",
    description: "Default theme for all users"
  }
});

console.log("New app data added:", newItem);`;

  const updateAppDataCode = `// Update existing app data item
await authix.updateAppData({
  dataId: "setting_123",
  data: {
    value: "light",
    updatedAt: new Date().toISOString()
  }
});

console.log("App data updated successfully");`;

  const deleteAppDataCode = `// Delete an app data item
await authix.deleteAppData({
  dataId: "setting_123"
});

console.log("App data deleted successfully");`;

  return (
    <div className="space-y-6 sm:space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          <Database className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 flex-shrink-0" />
          App Data SDK
        </h1>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-4xl">
          {introText}
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {/* Retrieving App Data */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white">
            <Eye className="w-5 h-5 text-purple-400 flex-shrink-0" />
            1. Retrieving App Data
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">getAppData</h3>
            <CodeBlock code={getAppDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">
              getSingleAppData
            </h3>
            <CodeBlock code={getSingleAppDataCode} language="typescript" />
          </div>
        </section>

        {/* Searching App Data */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white">
            <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            2. Searching App Data
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              searchAppDataByKeys
            </h3>
            <CodeBlock code={searchAppDataByKeysCode} language="typescript" />
          </div>
        </section>

        {/* Managing App Data */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white">
            <Edit3 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            3. Add, Update & Delete App Data
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">addAppData</h3>
            <CodeBlock code={addAppDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">updateAppData</h3>
            <CodeBlock code={updateAppDataCode} language="typescript" />

            <h3 className="text-lg font-semibold text-white">deleteAppData</h3>
            <CodeBlock code={deleteAppDataCode} language="typescript" />
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
                Include a{" "}
                <code className="bg-black/30 px-1 py-0.5 rounded text-xs">
                  category
                </code>{" "}
                for all app data for easy filtering.
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <Database className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Use consistent data structures for similar app data items.
              </span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                Update timestamps when modifying items to track changes.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AppDataManagement;
