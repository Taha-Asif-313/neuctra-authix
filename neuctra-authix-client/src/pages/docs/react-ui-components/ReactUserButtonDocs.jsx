import CodeBlock from "../../../components/docs/CodeBlock";
import {
  User,
  Settings,
  ChevronDown,
  AlertCircle,
  Shield,
  Zap,
  Palette,
  CheckCircle,
} from "lucide-react";

const ReactUserButtonDocs = () => {
  const basicUsage = `import { ReactUserButton } from "@neuctra/authix";

function Navbar() {
  return (
    <ReactUserButton
      onLogout={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}
    />
  );
}`;

  const fullExample = `import { ReactUserButton } from "@neuctra/authix";

function Navbar() {
  return (
    <ReactUserButton
      darkMode={true}
      primaryColor="#00C212"
      varient="modren"

      profileUrl="/profile"
      settingsUrl="/settings"

      showProfileMenuItem={true}
      showSettingsMenuItem={true}
      showViewProfileMenuItem={true}

      profileLabel="My Profile"
      settingsLabel="Account Settings"
      viewProfileLabel="Public Profile"
      logoutLabel="Logout"

      onLogout={() => {
        console.log("User logged out");
      }}
    />
  );
}`;

  const props = [
    {
      name: "darkMode",
      type: "boolean",
      default: "true",
      desc: "Enable dark or light theme",
    },
    {
      name: "primaryColor",
      type: "string",
      default: '"#3b82f6"',
      desc: "Primary accent color",
    },
    {
      name: "varient",
      type: '"classic" | "modren"',
      default: '"classic"',
      desc: "Button layout style",
    },
    {
      name: "onLogout",
      type: "() => void",
      default: "required",
      desc: "Callback when logout is clicked",
    },
    {
      name: "propUser",
      type: "UserInfo",
      default: "null",
      desc: "Override Authix session user",
    },
    {
      name: "profileUrl",
      type: "string",
      default: "undefined",
      desc: "Custom profile redirect URL",
    },
    {
      name: "settingsUrl",
      type: "string",
      default: "undefined",
      desc: "Custom settings redirect URL",
    },
    {
      name: "showProfileMenuItem",
      type: "boolean",
      default: "true",
      desc: "Show profile menu item",
    },
    {
      name: "showSettingsMenuItem",
      type: "boolean",
      default: "true",
      desc: "Show settings menu item",
    },
    {
      name: "showViewProfileMenuItem",
      type: "boolean",
      default: "true",
      desc: "Show public profile item",
    },
    {
      name: "profileLabel",
      type: "string",
      default: '"My Profile"',
      desc: "Custom label for profile item",
    },
    {
      name: "settingsLabel",
      type: "string",
      default: '"Settings"',
      desc: "Custom label for settings item",
    },
    {
      name: "viewProfileLabel",
      type: "string",
      default: '"View Profile"',
      desc: "Custom label for public profile item",
    },
    {
      name: "logoutLabel",
      type: "string",
      default: '"Sign Out"',
      desc: "Custom logout label",
    },
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Session Auto Detection",
      desc: "Automatically resolves user from Authix session",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Cookie-Based Auth",
      desc: "Uses authix.checkUserSession()",
    },
    {
      icon: <ChevronDown className="w-5 h-5" />,
      title: "Smart Dropdown Positioning",
      desc: "Auto-aligns left/right based on viewport",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Customizable Menu Items",
      desc: "Enable/disable individual items",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Dark & Light Mode",
      desc: "Fully theme aware",
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Error Handling",
      desc: "Graceful loading & retry state",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <User className="w-8 h-8 text-[#00C212]" />
          ReactUserButton Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A fully customizable, production-ready user dropdown menu component
          powered by Neuctra Authix. Supports session auto-detection, profile
          links, settings navigation, and logout handling.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2 text-[#00C212]">
              {f.icon}
              <h3 className="font-semibold text-white">{f.title}</h3>
            </div>
            <p className="text-sm text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Basic Usage */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Zap className="w-6 h-6 text-yellow-400" />
          Basic Usage
        </h2>
        <CodeBlock code={basicUsage} language="jsx" />
      </section>

      {/* Props Table */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Settings className="w-6 h-6 text-purple-400" />
          Props & Configuration
        </h2>

        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="p-4 text-left">Prop</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Default</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((p, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="p-4 font-mono text-blue-400">{p.name}</td>
                  <td className="p-4 font-mono text-green-400">{p.type}</td>
                  <td className="p-4 font-mono text-yellow-400">{p.default}</td>
                  <td className="p-4 text-gray-300">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Full Example */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Palette className="w-6 h-6 text-orange-400" />
          Full Customization Example
        </h2>
        <CodeBlock code={fullExample} language="jsx" />
      </section>

      {/* Workflow */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg">
          <Shield className="w-5 h-5" />
          Authentication Flow
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Resolves explicit <code>propUser</code> first
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Falls back to authix.checkUserSession()
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Normalizes backend user object
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Handles loading, error, and retry states
          </li>
        </ul>
      </section>

      {/* Production Ready */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg">
          <CheckCircle className="w-5 h-5" />
          Production Ready
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li>✔ Fully responsive (mobile + desktop)</li>
          <li>✔ Keyboard accessible (Enter / Space / Escape)</li>
          <li>✔ Outside click detection</li>
          <li>✔ Viewport boundary dropdown alignment</li>
          <li>✔ Accessible ARIA roles</li>
          <li>✔ Secure logout handling</li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserButtonDocs;
