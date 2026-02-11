import CodeBlock from "../../../components/docs/CodeBlock";
import {
  KeyRound,
  Mail,
  Eye,
  Shield,
  Smartphone,
  Settings,
  Palette,
  CheckCircle,
  Zap,
  User,
} from "lucide-react";

const ReactUserLoginDocs = () => {
  const basicUsageCode = `import { ReactUserLogin } from "@neuctra/authix";

function LoginPage() {
  return (
    <ReactUserLogin
      onSuccess={(user) => {
        console.log("Login successful:", user);
      }}
      onError={(error) => {
        console.error("Login failed:", error);
      }}
    />
  );
}`;

  const fullPropsCode = `import { ReactUserLogin } from "@neuctra/authix";

function CustomLoginPage() {
  return (
    <ReactUserLogin
      // Branding
      logoUrl="/logo.png"
      logoLinkUrl="/"
      title="Welcome Back"
      subtitle="Sign in to continue"

      // Styling
      primaryColor="#00C214"
      gradient="linear-gradient(135deg, #22c55e, #00C214)"
      darkMode={true}

      // Navigation
      signupUrl="/signup"

      // Callbacks
      onSuccess={(user) => {
        console.log("User logged in:", user);
        window.location.href = "/dashboard";
      }}

      onError={(error) => {
        console.error("Login error:", error);
      }}
    />
  );
}`;

  const propsTable = [
    {
      name: "logoUrl",
      type: "string",
      default: "undefined",
      description: "URL of your brand logo",
    },
    {
      name: "logoLinkUrl",
      type: "string",
      default: '"/"',
      description: "URL where logo redirects when clicked",
    },
    {
      name: "title",
      type: "string",
      default: '"Sign In to Your Account"',
      description: "Main heading text",
    },
    {
      name: "subtitle",
      type: "string",
      default: '"Welcome back! Please enter your details"',
      description: "Subheading text",
    },
    {
      name: "primaryColor",
      type: "string",
      default: '"#00C214"',
      description: "Primary brand color",
    },
    {
      name: "gradient",
      type: "string",
      default: '"linear-gradient(135deg, #22c55e, #00C214)"',
      description: "Submit button gradient",
    },
    {
      name: "darkMode",
      type: "boolean",
      default: "true",
      description: "Enable dark or light theme",
    },
    {
      name: "signupUrl",
      type: "string",
      default: "undefined",
      description: "Redirect URL for 'Create new account'",
    },
    {
      name: "onSuccess",
      type: "(user: any) => void",
      default: "undefined",
      description: "Callback fired after successful login",
    },
    {
      name: "onError",
      type: "(error: any) => void",
      default: "undefined",
      description: "Callback fired if login fails",
    },
  ];

  const features = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Secure Login",
      description: "Authenticates users via authix.loginUser()",
    },
    {
      icon: <KeyRound className="w-5 h-5" />,
      title: "Forgot Password Flow",
      description: "OTP-based password reset built-in",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "OTP Email Reset",
      description: "Uses requestResetUserPasswordOTP()",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Password Reset",
      description: "Resets password via resetUserPassword()",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Password Visibility Toggle",
      description: "Show/hide password securely",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Responsive Design",
      description: "Optimized for desktop & mobile",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <KeyRound className="w-8 h-8 text-green-400" />
          ReactUserLogin Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A production-ready authentication component powered by Neuctra Authix.
          Includes secure login, OTP-based password reset, cookie session
          handling, and full UI customization.
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

      {/* Forgot Password Flow */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg">
          <KeyRound className="w-5 h-5" />
          Built-in Forgot Password Flow
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Step 1: Send OTP to user email
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Step 2: Verify OTP + Set new password
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Fully connected to Authix backend
          </li>
        </ul>
      </section>

      {/* Ready Section */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg">
          <CheckCircle className="w-5 h-5" />
          Production Ready
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Authenticates users via authix.loginUser()
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Sets secure session cookie (a_s_b)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Handles loading, success & error states
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Responsive and fully customizable
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactUserLoginDocs;
