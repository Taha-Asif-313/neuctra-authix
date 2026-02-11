import CodeBlock from "../../../components/docs/CodeBlock";
import {
  User,
  Shield,
  Mail,
  Key,
  Trash2,
  Camera,
  LogOut,
  Settings,
  Zap,
  CheckCircle,
  Palette,
} from "lucide-react";

const ReactUserProfileDocs = () => {
  const basicUsageCode = `import { ReactUserProfile } from "@neuctra/authix";

function ProfilePage() {
  return (
    <ReactUserProfile
      onLogout={() => {
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
      }}
    />
  );
}`;

  const fullUsageCode = `import { ReactUserProfile } from "@neuctra/authix";

function ProfilePage() {
  return (
    <ReactUserProfile
      darkMode={true}
      primaryColor="#00C212"
      homeUrl="/dashboard"

      onLogout={() => {
        console.log("User logged out");
      }}

      onVerify={(updatedUser) => {
        console.log("Email verified:", updatedUser);
      }}
    />
  );
}`;

  const propsTable = [
    {
      name: "darkMode",
      type: "boolean",
      default: "true",
      description: "Enable dark or light theme",
    },
    {
      name: "primaryColor",
      type: "string",
      default: '"#00C212"',
      description: "Primary brand color for buttons & accents",
    },
    {
      name: "homeUrl",
      type: "string",
      default: "undefined",
      description: "URL for the home icon in profile header",
    },
    {
      name: "onLogout",
      type: "() => void",
      default: "required",
      description: "Callback triggered when user logs out",
    },
    {
      name: "onVerify",
      type: "(user: UserInfo) => void",
      default: "undefined",
      description: "Triggered after successful email verification",
    },
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Full Profile Management",
      description: "Edit name, email, phone & address",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: "Avatar Upload",
      description: "Update profile picture with Authix backend",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Verification",
      description: "OTP-based verification modal integration",
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Change Password",
      description: "Secure password update modal",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: "Delete Account",
      description: "Permanent account deletion with confirmation",
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      title: "Logout Support",
      description: "Custom logout handler via onLogout",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <User className="w-8 h-8 text-[#00C212]" />
          ReactUserProfile Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A complete, production-ready user profile dashboard powered by Neuctra
          Authix. Includes profile editing, avatar updates, email verification,
          password management, account deletion, and logout handling — all fully
          integrated with Authix backend APIs.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2 text-[#00C212]">
              {feature.icon}
              <h3 className="font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Basic Usage */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Zap className="w-6 h-6 text-yellow-400" />
          Basic Usage
        </h2>
        <CodeBlock code={basicUsageCode} language="jsx" />
      </section>

      {/* Props Table */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Settings className="w-6 h-6 text-purple-400" />
          Props & Customization
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
              {propsTable.map((prop, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="p-4 font-mono text-blue-400">{prop.name}</td>
                  <td className="p-4 font-mono text-green-400">{prop.type}</td>
                  <td className="p-4 font-mono text-yellow-400">
                    {prop.default}
                  </td>
                  <td className="p-4 text-gray-300">{prop.description}</td>
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
        <CodeBlock code={fullUsageCode} language="jsx" />
      </section>

      {/* Profile Flow */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg">
          <Shield className="w-5 h-5" />
          Profile Workflow
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Session validation via authix.checkUserSession()
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Fetch profile using authix.getUserProfile()
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Update profile via authix.updateUser()
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Verify email using OTP system
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
          <li>✔ Secure backend integration</li>
          <li>✔ Full responsive layout</li>
          <li>✔ Dark & light theme support</li>
          <li>✔ Built-in notifications</li>
          <li>✔ Safe session validation</li>
          <li>✔ Animated dropdowns & modals</li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserProfileDocs;
