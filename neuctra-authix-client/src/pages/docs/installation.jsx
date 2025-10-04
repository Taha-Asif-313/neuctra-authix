import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Installation = () => {
  const installTabs = [
    {
      name: "NPM",
      code: "npm install neuctra-authix",
      language: "bash"
    },
    {
      name: "Yarn",
      code: "yarn add neuctra-authix",
      language: "bash"
    },
    {
      name: "PNPM",
      code: "pnpm add neuctra-authix",
      language: "bash"
    }
  ];

  return (
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">⚙️ Installation</h1>
      <p className="text-gray-400">
        Neuctra Authix is distributed via npm and supports both JavaScript and TypeScript projects.
      </p>

      <CodeBlock tabs={installTabs} />

      <h2 className="text-2xl font-semibold text-white">Set up SDK Config</h2>
      <p className="text-gray-400">
        Use the <code>setSdkConfig()</code> function to globally configure your API credentials.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { setSdkConfig } from "neuctra-authix";

setSdkConfig({
  baseUrl: "https://api.neuctra.com/authix",
  apiKey: "your_api_key_here",
  appId: "your_app_id_here"
});`}
      />
    </div>
  );
};

export default Installation;
