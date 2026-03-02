import { useState } from "react";
import { Atom, Globe, Server } from "lucide-react";
import ReactGuide from "./ReactGuide";
import NextGuide from "./NextjsGuide";
import NodeGuide from "./NodejsGuide";
import PythonGuide from "./PythonGuide";

const frameworks = [
  { id: "react", label: "React", icon: Atom },
  { id: "next", label: "Next.js", icon: Globe },
  { id: "node", label: "Node.js", icon: Server },
];

export default function SetupGuides({ app }) {
  const [active, setActive] = useState("react");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 overflow-x-auto py-1">
        {frameworks.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap
              ${
                active === id
                  ? "bg-zinc-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-zinc-700"
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full">
        {active === "react" && <ReactGuide app={app} />}
        {active === "next" && <NextGuide app={app} />}
        {active === "node" && <NodeGuide app={app} />}
      </div>
    </div>
  );
}

// Step Component
export function Step({ step, title, description, children }) {
  return (
    <div className="space-y-3 mb-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-200 text-sm font-semibold">
          {step}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold truncate">{title}</h3>

          {description && (
            <p className="text-xs text-gray-400 mt-1 sm:mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
