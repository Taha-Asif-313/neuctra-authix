import { useAuth } from "../../contexts/AuthContext";
import CodeBlock from "../docs/CodeBlock";
import { Step } from "./SetupGuides";

export default function ReactGuide({ app }) {
  const { admin } = useAuth();

  return (
    <div className="space-y-10 text-sm text-gray-300">
      {/* Step 1 */}
      <Step
        step={1}
        title="Install Authix SDK"
        description="Install the Authix SDK using your preferred package manager."
      >
        <CodeBlock
          code={`npm install @neuctra/authix

# or
yarn add @neuctra/authix

# or
pnpm add @neuctra/authix`}
          language="bash"
        />
      </Step>

      {/* Step 2 */}
      <Step
        step={2}
        title="Create Authix Init File"
        description="Create a single Authix instance to manage authentication configuration."
      >
        <CodeBlock
          code={`// src/authix.ts
import { NeuctraAuthix } from "@neuctra/authix";

export const Authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "${admin.apiKey}",
  appId: "${app.id}",
});`}
          language="ts"
        />
      </Step>

      {/* Step 3 */}
      <Step
        step={3}
        title="Wrap App with AuthixProvider"
        description="AuthixProvider makes authentication state and UI available throughout your React app."
      >
        <CodeBlock
          code={`// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthixProvider } from "@neuctra/authix";
import { Authix } from "./authix";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthixProvider authix={Authix}>
    <App />
  </AuthixProvider>
);`}
          language="jsx"
        />
      </Step>

      {/* Step 4 */}
      <Step
        step={4}
        title="Use Authix UI Components"
        description="Use built-in Authix components to handle signed-in and signed-out UI states."
      >
        <CodeBlock
          code={`import {
  ReactSignedIn,
  ReactSignedOut,
  ReactUserLogin,
  ReactUserButton
} from "@neuctra/authix";

const AuthTemplate = () => {
  return (
    <>
      <ReactSignedOut>
        <ReactUserLogin />
      </ReactSignedOut>

      <ReactSignedIn>
        <ReactUserButton />
      </ReactSignedIn>
    </>
  );
};

export default AuthTemplate;`}
          language="jsx"
        />
      </Step>
    </div>
  );
}
