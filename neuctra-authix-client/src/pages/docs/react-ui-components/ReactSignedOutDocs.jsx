import CodeBlock from "../../../components/docs/CodeBlock";
import {
  ShieldOff,
  EyeOff,
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ReactSignedOutDocs = () => {
  const basicUsage = `import { ReactSignedOut } from "@neuctra/authix";

export default function Page() {
  return (
    <ReactSignedOut>
      <div>
        You are not signed in.
        <a href="/login">Login</a>
      </div>
    </ReactSignedOut>
  );
}`;

  const fallbackExample = `import { ReactSignedOut } from "@neuctra/authix";

export default function Page() {
  return (
    <ReactSignedOut
      fallback={<p>Loading authentication state...</p>}
    >
      <div>
        Please sign in to continue.
      </div>
    </ReactSignedOut>
  );
}`;

  const functionFallbackExample = `import { ReactSignedOut } from "@neuctra/authix";

<ReactSignedOut
  fallback={() => <div>Checking session...</div>}
>
  <LoginComponent />
</ReactSignedOut>`;

  const props = [
    {
      name: "children",
      type: "ReactNode",
      required: "Yes",
      desc: "Content rendered when user is signed out",
    },
    {
      name: "fallback",
      type: "ReactNode | () => ReactNode",
      required: "No",
      desc: "Optional content shown while auth state is resolving or user is signed in",
    },
  ];

  const features = [
    {
      icon: <ShieldOff className="w-5 h-5" />,
      title: "Signout Detection",
      desc: "Renders content only when user is NOT authenticated",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Hydration Safe",
      desc: "Prevents SSR hydration mismatch in Next.js",
    },
    {
      icon: <EyeOff className="w-5 h-5" />,
      title: "Cookie Check",
      desc: "Reads Authix JS-accessible auth cookie",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Flexible Fallback",
      desc: "Supports JSX or function fallback",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <ShieldOff className="w-8 h-8 text-red-500" />
          ReactSignedOut Component
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl">
          A lightweight conditional rendering component that displays its
          children only when the user is signed out. Designed for Next.js
          environments with hydration safety and cookie-based session checks.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2 text-red-400">
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

      {/* Fallback Example */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <AlertCircle className="w-6 h-6 text-blue-400" />
          Using Fallback
        </h2>
        <CodeBlock code={fallbackExample} language="jsx" />
      </section>

      {/* Function Fallback */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-3">
          <Settings className="w-6 h-6 text-purple-400" />
          Function Fallback
        </h2>
        <CodeBlock code={functionFallbackExample} language="jsx" />
      </section>

      {/* Props Table */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Props & API</h2>

        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="p-4 text-left">Prop</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Required</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((p, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="p-4 font-mono text-blue-400">{p.name}</td>
                  <td className="p-4 font-mono text-green-400">{p.type}</td>
                  <td className="p-4 text-yellow-400">{p.required}</td>
                  <td className="p-4 text-gray-300">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Authentication Logic */}
      <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-3 text-lg">
          <CheckCircle className="w-5 h-5" />
          How It Works
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            ✔ Reads the <code>a_s_b</code> authentication cookie
          </li>
          <li>
            ✔ If cookie is missing or not <code>"true"</code> → user is signed
            out
          </li>
          <li>
            ✔ Prevents hydration mismatch using <code>mounted</code> state
          </li>
          <li>✔ Returns fallback while checking session</li>
        </ul>
      </section>

      {/* Production Ready */}
      <section className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-3 text-lg">
          <CheckCircle className="w-5 h-5" />
          Production Ready
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">
          <li>✔ Works with Next.js App Router ("use client")</li>
          <li>✔ Hydration-safe rendering</li>
          <li>✔ Minimal performance overhead</li>
          <li>✔ Simple conditional UI control</li>
        </ul>
      </section>
    </div>
  );
};

export default ReactSignedOutDocs;
