import React from "react";
import CodeBlock from "../../components/docs/CodeBlock";


const Introduction = () => {
  return (
    <div className="p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-white">🚀 Introduction</h1>
      <p className="text-gray-400 leading-relaxed">
        <strong>Neuctra Authix</strong> is a modern authentication SDK designed to simplify 
        user management, session handling, and secure access for web and mobile apps.  
        It integrates seamlessly with any frontend or backend stack.
      </p>

      <h2 className="text-2xl font-semibold text-white">✨ Why Neuctra Authix?</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-400">
        <li>Built-in signup, login, password reset, and email verification.</li>
        <li>Secure token-based authentication.</li>
        <li>Developer-friendly TypeScript SDK.</li>
        <li>Works with any frontend (React, Vue, etc.).</li>
        <li>Custom user data management API.</li>
      </ul>

      <CodeBlock
        language="bash"
        code={`npm install neuctra-authix`}
      />

      <p className="text-gray-400">
        After installing, configure your API key and App ID using the SDK config utilities.
      </p>
    </div>
  );
};

export default Introduction;
