import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Mail,
  Key,
  Shield,
  CheckCircle,
  Zap,
  Settings,
  Palette,
  Verified,
  User,
} from "lucide-react";

const ReactEmailVerificationDocs = () => {
  const basicUsageCode = `import { ReactEmailVerification } from "@neuctra/authix";

function VerifyPage({ user }) {
  return (
    <ReactEmailVerification
      user={user}
      onVerify={(updatedUser) => {
        console.log("Email verified:", updatedUser);
      }}
    />
  );
}`;

  const fullPropsCode = `import { ReactEmailVerification } from "@neuctra/authix";

function CustomVerifyPage({ user }) {
  return (
    <ReactEmailVerification
      user={user}
      
      // Theme
      darkMode={true}
      primaryColor="#00C212"

      // Callback
      onVerify={(updatedUser) => {
        console.log("Verified user:", updatedUser);
        window.location.href = "/dashboard";
      }}
    />
  );
}`;

  const propsTable = [
    {
      name: "user",
      type: "UserInfo | null",
      default: "undefined",
      description: "User object containing id, name, and email (required)",
    },
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
      description: "Primary brand color used for buttons & accents",
    },
    {
      name: "onVerify",
      type: "(updatedUser: UserInfo) => void",
      default: "undefined",
      description: "Callback triggered after successful verification",
    },
  ];

  const features = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "OTP Email Verification",
      description: "Sends secure verification code to user email",
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "OTP Validation",
      description: "Verifies email using authix.verifyEmail()",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Backend Integration",
      description: "Fully connected to Authix verification APIs",
    },
    {
      icon: <User className="w-5 h-5" />,
      title: "User-Aware Component",
      description: "Requires user.id and user.email for verification",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Custom Branding",
      description: "Supports custom primary color & dark mode",
    },
    {
      icon: <Verified className="w-5 h-5" />,
      title: "Auto Success Handling",
      description: "Triggers onVerify callback after confirmation",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <Verified className="w-8 h-8 text-green-400" />
          ReactEmailVerification Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A secure, production-ready email verification component powered by
          Neuctra Authix. Sends OTP to user email and verifies it instantly
          using Authix backend APIs.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2 text-green-400">
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

      {/* Full Customization */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Palette className="w-6 h-6 text-orange-400" />
          Full Customization
        </h2>
        <CodeBlock code={fullPropsCode} language="jsx" />
      </section>

      {/* Verification Flow */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg">
          <Mail className="w-5 h-5" />
          Email Verification Flow
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Step 1: User clicks "Send OTP"
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Step 2: Authix sends OTP to user email
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Step 3: User enters OTP
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Step 4: Email verified via authix.verifyEmail()
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
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Secure OTP verification
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Built-in loading & error states
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Fully customizable theme
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Clean, responsive UI
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactEmailVerificationDocs;
