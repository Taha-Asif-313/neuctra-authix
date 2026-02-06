import CodeBlock from "../docs/CodeBlock";
import { Step } from "./SetupGuides";

export default function PythonGuide({ app }) {
  return (
    <div className="space-y-6 text-sm text-gray-300">
      <Step title="Install SDK">
        <CodeBlock code={`pip install neuctra-authix`} language="bash" />
      </Step>

      <Step title="Verify Token">
        <CodeBlock
          code={`from authix import verify_token

@app.get("/protected")
def protected(user = Depends(verify_token)):
    return user`}
          language="python"
        />
      </Step>
    </div>
  );
}
