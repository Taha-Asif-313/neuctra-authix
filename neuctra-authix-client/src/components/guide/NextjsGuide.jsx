import CodeBlock from "../docs/CodeBlock";
import { Step } from "./SetupGuides";

export default function NextGuide({ app }) {
  return (
    <div className="space-y-6 text-sm text-gray-300">
      <Step title="Install SDK">
        <CodeBlock code={`npm install @neuctra/authix-next`} language="bash" />
      </Step>

      <Step title="Init Authix">
        <CodeBlock
          code={`// app/authix.ts
import { initAuthix } from "@neuctra/authix-next";

export const authix = initAuthix({
  apiKey: process.env.AUTHIX_API_KEY!,
  appId: "${app.id}"
});`}
          language="ts"
        />
      </Step>

      <Step title="Middleware Protection">
        <CodeBlock
          code={`import { authixMiddleware } from "@neuctra/authix-next";

export default authixMiddleware();`}
          language="ts"
        />
      </Step>
    </div>
  );
}
