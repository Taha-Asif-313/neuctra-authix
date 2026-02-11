import CodeBlock from "../../../components/docs/CodeBlock";
import {
  Lock,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Code,
  Zap,
  Settings,
} from "lucide-react";

const ReactSignedInDocs = () => {
  const basicUsageCode = `import { ReactSignedIn } from "@neuctra/authix";

function Dashboard() {
  return (
    <div>
      <h1>Public Content</h1>

      <ReactSignedIn>
        <div>
          <h2>Protected Dashboard</h2>
          <p>This content is only visible when a_s_b cookie is true.</p>
        </div>
      </ReactSignedIn>
    </div>
  );
}`;

  const fallbackUsageCode = `import { ReactSignedIn } from "@neuctra/authix";

function ProfilePage() {
  return (
    <ReactSignedIn
      fallback={
        <div>
          <p>You must sign in to view this page.</p>
          <a href="/login">Go to Login</a>
        </div>
      }
    >
      <div>
        <h2>User Profile</h2>
        <p>Private user data goes here.</p>
      </div>
    </ReactSignedIn>
  );
}`;

  const functionFallbackCode = `import { ReactSignedIn } from "@neuctra/authix";

function Example() {
  return (
    <ReactSignedIn
      fallback={() => (
        <div>
          <h3>Access Denied</h3>
        </div>
      )}
    >
      <div>Secret Content</div>
    </ReactSignedIn>
  );
}`;

  const howItWorksCode = `// Internally, ReactSignedIn:

// 1. Waits for component to mount (prevents hydration mismatch)
// 2. Reads document.cookie
// 3. Looks for: a_s_b=true
// 4. Renders children only if true

const cookies = document.cookie.split(";").map((c) => c.trim());
const authFlag = cookies.find((c) => c.startsWith("a_s_b="));
setSignedIn(authFlag?.split("=")[1] === "true");`;

  const propsTable = [
    {
      name: "children",
      type: "ReactNode",
      required: "Yes",
      default: "-",
      description:
        "Content to render when user is authenticated (a_s_b cookie is true)",
    },
    {
      name: "fallback",
      type: "ReactNode | () => ReactNode",
      required: "No",
      default: "null",
      description: "Content rendered when user is not authenticated",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Cookie-Based Auth Check",
      description: "Reads a_s_b cookie to determine authentication status",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Conditional Rendering",
      description: "Renders children only when user is signed in",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Hydration Safe",
      description: "Prevents SSR hydration mismatch using mounted state",
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Flexible Fallback",
      description: "Supports ReactNode or function-based fallback",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <Lock className="w-8 h-8 text-green-400" />
          ReactSignedIn Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A lightweight authentication guard component that conditionally
          renders content based on the <code>a_s_b</code> cookie. Built
          specifically for Neuctra Authix login sessions.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* Fallback Usage */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <EyeOff className="w-6 h-6 text-orange-400" />
          Using Fallback Content
        </h2>
        <CodeBlock code={fallbackUsageCode} language="jsx" />
      </section>

      {/* Function Fallback */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Code className="w-6 h-6 text-cyan-400" />
          Function-Based Fallback
        </h2>
        <CodeBlock code={functionFallbackCode} language="jsx" />
      </section>

      {/* How It Works */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Settings className="w-6 h-6 text-blue-400" />
          How It Works
        </h2>
        <CodeBlock code={howItWorksCode} language="js" />

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-4">
          <p className="text-sm text-gray-300">
            After a successful login, <code>ReactUserLogin</code> sets:
          </p>
          <code className="block mt-2 text-green-400 font-mono">
            a_s_b=true
          </code>
          <p className="mt-2 text-sm text-gray-300">
            ReactSignedIn checks this cookie to determine authentication state.
          </p>
        </div>
      </section>

      {/* Props Table */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Code className="w-6 h-6 text-purple-400" />
          Props
        </h2>

        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="p-4 text-left">Prop</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Required</th>
                <th className="p-4 text-left">Default</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {propsTable.map((prop, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="p-4 font-mono text-blue-400">{prop.name}</td>
                  <td className="p-4 font-mono text-green-400">{prop.type}</td>
                  <td className="p-4 text-yellow-400">{prop.required}</td>
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

      {/* Security Note */}
      <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-3 text-lg">
          <Shield className="w-5 h-5" />
          Security Note
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            This provides client-side UI protection only
          </li>
          <li className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            Always validate authentication server-side for APIs
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Use HTTPS in production to secure cookies
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReactSignedInDocs;
