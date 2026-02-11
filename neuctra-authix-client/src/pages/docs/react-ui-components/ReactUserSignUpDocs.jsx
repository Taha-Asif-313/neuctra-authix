import React from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import {
  UserPlus,
  Palette,
  Settings,
  Eye,
  Mail,
  Lock,
  User,
  Image,
  CheckCircle,
  Smartphone,
  Code,
  Zap,
  Shield,
  Users
} from "lucide-react";

const ReactUserSignUpDocs = () => {
  const basicUsageCode = `import { ReactUserSignUp } from "@neuctra/authix";

function SignupPage() {
  return (
    <ReactUserSignUp
      onSuccess={(user) => {
        console.log("Signup successful:", user);
      }}
      onError={(error) => {
        console.error("Signup failed:", error);
      }}
    />
  );
}`;

  const fullPropsCode = `import { ReactUserSignUp } from "@neuctra/authix";

function CustomSignupPage() {
  return (
    <ReactUserSignUp
      // Branding
      logoUrl="/logo.png"
      logoLinkUrl="/"
      title="Join Our Platform"
      subtitle="Create your account to get started"
      footerText="Powered by Your Company"

      // Styling
      primaryColor="#00C214"
      gradient="linear-gradient(135deg, #22c55e, #00C214)"
      darkMode={true}

      // Features
      showAvatar={true}
      roles={["user", "admin"]}
      showRoleSelector={true}

      // Navigation
      loginUrl="/login"

      onSuccess={(user) => {
        console.log("User created:", user);
        window.location.href = "/dashboard";
      }}

      onError={(error) => {
        console.error("Signup error:", error);
      }}
    />
  );
}`;

  const propsTable = [
    {
      name: "logoUrl",
      type: "string",
      default: "undefined",
      description: "URL to your logo image"
    },
    {
      name: "logoLinkUrl",
      type: "string",
      default: '"/"',
      description: "URL where logo redirects when clicked"
    },
    {
      name: "title",
      type: "string",
      default: '"Create Your Account"',
      description: "Main heading text"
    },
    {
      name: "subtitle",
      type: "string",
      default: '"Join our platform today"',
      description: "Subtitle below heading"
    },
    {
      name: "footerText",
      type: "string",
      default: '"Secure authentication powered by Neuctra Authix"',
      description: "Footer text"
    },
    {
      name: "primaryColor",
      type: "string",
      default: '"#00C214"',
      description: "Primary brand color"
    },
    {
      name: "gradient",
      type: "string",
      default: '"linear-gradient(135deg, #22c55e, #00C214)"',
      description: "Submit button gradient"
    },
    {
      name: "darkMode",
      type: "boolean",
      default: "true",
      description: "Enable dark or light theme"
    },
    {
      name: "showAvatar",
      type: "boolean",
      default: "false",
      description: "Enable avatar URL field with preview"
    },
    {
      name: "roles",
      type: "string[]",
      default: "[]",
      description: "Available signup roles (e.g. ['user','admin'])"
    },
    {
      name: "showRoleSelector",
      type: "boolean",
      default: "false",
      description: "Enable animated role toggle (requires exactly 2 roles)"
    },
    {
      name: "loginUrl",
      type: "string",
      default: "undefined",
      description: "Login redirect URL"
    },
    {
      name: "onSuccess",
      type: "(user: any) => void",
      default: "undefined",
      description: "Callback on successful signup"
    },
    {
      name: "onError",
      type: "(error: any) => void",
      default: "undefined",
      description: "Callback on signup failure"
    }
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "User Registration",
      description: "Connected to authix.signupUser() backend"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Role Selection",
      description: "Animated role toggle for multi-role apps"
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: "Avatar Support",
      description: "Optional avatar URL with live preview"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Password Visibility",
      description: "Toggle secure password visibility"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Form Validation",
      description: "Real-time validation before submission"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Responsive Design",
      description: "Optimized for all devices"
    }
  ];

  return (
    <div className="space-y-8 text-gray-300">
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <UserPlus className="w-8 h-8 text-green-400" />
          ReactUserSignUp Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A production-ready signup component powered by Neuctra Authix.
          Handles real user registration, validation, optional avatar,
          and role selection — fully connected to your backend.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
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
                  <td className="p-4 font-mono text-yellow-400">{prop.default}</td>
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

      {/* Role Selector Section */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg">
          <Users className="w-5 h-5" />
          Role Selector Feature
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Supports exactly 2 roles
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Animated sliding toggle UI
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Selected role sent to Authix backend
          </li>
        </ul>

        <div className="mt-4">
          <CodeBlock
            code={`<ReactUserSignUp roles={["user","admin"]} showRoleSelector={true} />`}
            language="jsx"
          />
        </div>
      </section>

      {/* Ready Section */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg">
          <CheckCircle className="w-5 h-5" />
          Ready to Use
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Registers users securely via authix.signupUser()
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Real-time validation before submission
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Optional avatar preview support
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Production-ready error & loading states
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserSignUpDocs;
