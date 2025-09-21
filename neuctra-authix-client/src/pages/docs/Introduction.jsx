import React from "react";

const Introduction = () => {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold text-primary border-b border-zinc-800 pb-2">
        Introduction
      </h1>
      <p>
        Welcome to the <strong>Neuctra Authix Client SDK</strong> 🚀.  
        This SDK makes it simple to integrate <strong>user authentication</strong> into your app with the **Neuctra Authix API**.
      </p>

      <h3>✨ Features</h3>
      <ul>
        <li>🔑 Login & Signup</li>
        <li>👤 User management (update, delete, fetch)</li>
        <li>🛡️ JWT-based session handling</li>
        <li>⚡ Built-in error handling</li>
      </ul>

      <p>
        Whether you're building a SaaS, mobile app, or admin dashboard, Authix provides all the tools to manage users securely and efficiently.
      </p>
    </article>
  );
};

export default Introduction;
