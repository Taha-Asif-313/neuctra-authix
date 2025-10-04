import React from "react";
import CodeBlock from "../../components/docs/CodeBlock";


const NeuctraAuthixSdk = () => {
  const sdkInit = `
import { NeuctraAuthix } from "neuctra-authix";

const authix = new NeuctraAuthix({
  baseUrl: "https://api.neuctra.com",
  apiKey: "your-api-key",
  appId: "your-app-id"
});
`;

  const signupExample = `
await authix.signup({
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123"
});
`;

  const loginExample = `
const user = await authix.login({
  email: "john@example.com",
  password: "securePassword123",
  appId: "your-app-id"
});
`;

  return (
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">🧩 Neuctra Authix SDK</h1>
      <p className="text-gray-400">
        The <strong>NeuctraAuthix</strong> class is the heart of the SDK. It handles user authentication, 
        profile management, and user data operations through simple async methods.
      </p>

      <h2 className="text-2xl font-semibold text-white">Initialize the SDK</h2>
      <CodeBlock code={sdkInit} language="typescript" />

      <h2 className="text-2xl font-semibold text-white">Signup Example</h2>
      <CodeBlock code={signupExample} language="typescript" />

      <h2 className="text-2xl font-semibold text-white">Login Example</h2>
      <CodeBlock code={loginExample} language="typescript" />

      <p className="text-gray-400">
        All SDK methods return Promises that resolve to structured API responses or throw 
        detailed error messages for failed requests.
      </p>
    </div>
  );
};

export default NeuctraAuthixSdk;
