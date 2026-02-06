import CodeBlock from "../docs/CodeBlock";
import { Step } from "./SetupGuides";

export default function NodeGuide({ app }) {
  return (
    <div className="space-y-6 text-sm text-gray-300">
      <Step title="Install SDK">
        <CodeBlock code={`npm install @neuctra/authix-node`} language="bash" />
      </Step>

      <Step title="Verify Token">
        <CodeBlock
          code={`import { verifyAuthixToken } from "@neuctra/authix-node";

app.get("/protected", async (req, res) => {
  const user = await verifyAuthixToken(req.headers.authorization);
  res.json(user);
});`}
          language="js"
        />
      </Step>
    </div>
  );
}
