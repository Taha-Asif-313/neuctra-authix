import { useState } from "react";
import { Atom, Code, Globe, Server } from "lucide-react";
import CodeBlock from "../docs/CodeBlock";
import ReactGuide from "./ReactGuide";
import NextGuide from "./NextjsGuide";
import NodeGuide from "./NodejsGuide";
import PythonGuide from "./PythonGuide";

const frameworks = [
  { id: "react", label: "React", icon: Atom },
  { id: "next", label: "Next.js", icon: Globe },
  { id: "node", label: "Node.js", icon: Server },
  { id: "python", label: "Python", icon: Server },
];

export default function SetupGuides({ app }) {
  const [active, setActive] = useState("react");

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6 overflow-x-auto">
        {frameworks.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition
              ${
                active === id
                  ? "bg-zinc-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {active === "react" && <ReactGuide app={app} />}
      {active === "next" && <NextGuide app={app} />}
      {active === "node" && <NodeGuide app={app} />}
      {active === "python" && <PythonGuide app={app} />}
    </div>
  );
}

export function Step({ step, title, description, children }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="h-7 w-7 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-200 text-sm font-semibold">
          {step}
        </div>

        <div>
          <h3 className="text-white font-semibold">
            {title}
          </h3>

          {description && (
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pl-10">
        {children}
      </div>
    </div>
  );
}

