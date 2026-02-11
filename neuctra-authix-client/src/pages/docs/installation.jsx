"use client";

import React from "react";
import CodeBlock from "../../components/docs/CodeBlock";
import {
  Download,
  Package,
  Settings,
  Key,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Installation = () => {
  const installTabs = [
    {
      name: "NPM",
      code: "npm install @neuctra/authix",
      language: "bash",
    },
    {
      name: "Yarn",
      code: "yarn add @neuctra/authix",
      language: "bash",
    },
    {
      name: "PNPM",
      code: "pnpm add @neuctra/authix",
      language: "bash",
    },
  ];

  const createAuthixFileCode = `// src/authixInit.js

import { NeuctraAuthix } from "@neuctra/authix";

export const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "YOUR_NEUCTRA_AUTHIX_API_KEY",
  appId: "YOUR_NEUCTRA_AUTHIX_APP_ID",
});`;

  const usageExampleCode = `import { authix } from "./authixInit";

// Login Example
export const login = async (email, password) => {
  try {
    const res = await authix.loginUser({
      email,
      password,
    });

    console.log("Login response:", res);
    return res;
  } catch (err) {
    console.error("Login error:", err?.message || err);
    throw err;
  }
};

// Signup Example
export const signup = async (
  name,
  email,
  password,
  role = "user",
  avatarUrl = null
) => {
  try {
    const res = await authix.signupUser({
      name,
      email,
      password,
      role,
      avatarUrl,
    });

    console.log("Signup response:", res);
    return res;
  } catch (err) {
    console.error("Signup error:", err?.message || err);
    throw err;
  }
};`;

  const pythonExampleCode = `# Python Example using requests

import requests

BASE_URL = "https://server.authix.neuctra.com/api"
API_KEY = "YOUR_NEUCTRA_AUTHIX_API_KEY"
APP_ID = "YOUR_NEUCTRA_AUTHIX_APP_ID"

headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "x-app-id": APP_ID
}

# Login
login_payload = {
    "email": "tahaasifaqwe@gmail.com",
    "password": "taha123"
}

login_res = requests.post(f"{BASE_URL}/login", json=login_payload, headers=headers)
print("Login Response:", login_res.json())

# Signup
signup_payload = {
    "name": "Taha Asif",
    "email": "tahaasif12309@gmail.com",
    "password": "taha123",
    "role": "user",
    "avatarUrl": None
}

signup_res = requests.post(f"{BASE_URL}/signup", json=signup_payload, headers=headers)
print("Signup Response:", signup_res.json())`;

  const configStructure = [
    {
      field: "baseUrl",
      type: "string",
      required: true,
      description:
        "Official Authix API endpoint (https://server.authix.neuctra.com/api)",
    },
    {
      field: "apiKey",
      type: "string",
      required: true,
      description: "Your Neuctra Authix API key from dashboard",
    },
    {
      field: "appId",
      type: "string",
      required: true,
      description: "Unique application ID from dashboard",
    },
  ];

  return (
    <div className="space-y-8 text-gray-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Download className="w-8 h-8 text-[#00c420]" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Installation
          </h1>
        </div>

        <p className="text-lg text-gray-400 leading-relaxed">
          Install the Neuctra Authix SDK and create a centralized instance. This
          ensures authentication and user management can be accessed anywhere in
          your application.
        </p>
      </div>

      {/* Package Installation */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-[#00c420]" />
          <h2 className="text-2xl font-semibold text-white">
            Package Installation
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <CodeBlock tabs={installTabs} />
        </div>
      </section>

      {/* Create Authix File */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-[#00c420]" />
          <h2 className="text-2xl font-semibold text-white">
            Create Authix Instance
          </h2>
        </div>

        <p className="text-gray-400">
          Create a dedicated <code>authixInit.js</code> file and initialize
          Neuctra Authix once. Import this instance wherever needed.
        </p>

        <CodeBlock code={createAuthixFileCode} language="javascript" />
      </section>

      {/* Usage Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Usage Example (JavaScript)
        </h2>

        <CodeBlock code={usageExampleCode} language="javascript" />
      </section>

 

      {/* Configuration Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Configuration Parameters
        </h2>

        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 font-semibold text-white">
                  Parameter
                </th>
                <th className="text-left p-3 font-semibold text-white">Type</th>
                <th className="text-left p-3 font-semibold text-white">
                  Required
                </th>
                <th className="text-left p-3 font-semibold text-white">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {configStructure.map((field, index) => (
                <tr key={index}>
                  <td className="p-3 font-mono text-white text-xs">
                    {field.field}
                  </td>
                  <td className="p-3 font-mono text-primary text-xs">
                    {field.type}
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      Required
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 text-xs">
                    {field.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00c420]" />
            Next Steps
          </h4>
          <p className="text-gray-400 text-sm">
            You can now integrate login, signup, user data management, and
            session handling in your application using the Authix instance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Installation;
