import React, { useState } from "react";
import {
  Search,
  BookOpen,
  HelpCircle,
  Code,
  Lock,
} from "lucide-react";
import {marked} from 'marked'

const DocsPage = () => {
  const docs = [
    {
      category: "Getting Started",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          content: `
# Introduction

Welcome to **Authix** 👋  

Authix is a modern authentication platform designed to help developers easily integrate secure login, signup, and identity management into their applications.

With Authix, you can:
- Set up authentication in minutes
- Enable social logins (Google, GitHub, etc.)
- Add Two-Factor Authentication (2FA)
- Securely manage user sessions
          `,
        },
        {
          title: "Quickstart",
          content: `
# Quickstart

Follow these steps to get started:

1. **Install SDK**
\`\`\`bash
npm install @authix/sdk
\`\`\`

2. **Initialize Authix**
\`\`\`javascript
import { Authix } from "@authix/sdk";

const auth = new Authix({ apiKey: "your-api-key" });
\`\`\`

3. **Add Login Button**
\`\`\`jsx
<button onClick={() => auth.login()}>Login with Authix</button>
\`\`\`

You're ready to go 🚀
          `,
        },
      ],
    },
    {
      category: "Authentication",
      icon: Lock,
      items: [
        {
          title: "Login & Signup",
          content: `
# Login & Signup

Authix provides a **secure login and signup flow** with support for:
- Email/Password
- Social logins
- Magic Links

Example:
\`\`\`javascript
auth.signup({ email: "user@example.com", password: "123456" });
\`\`\`
          `,
        },
        {
          title: "Two-Factor Auth",
          content: `
# Two-Factor Authentication (2FA)

Strengthen security with **2FA**.  

Users can enable:
- SMS-based OTP
- Email OTP
- Authenticator Apps (Google Authenticator)

Example:
\`\`\`javascript
auth.enable2FA({ method: "sms" });
\`\`\`
          `,
        },
      ],
    },
    {
      category: "API Reference",
      icon: Code,
      items: [
        {
          title: "REST API",
          content: `
# REST API

Authix REST endpoints:

- \`POST /auth/login\` — User login  
- \`POST /auth/signup\` — Create account  
- \`POST /auth/2fa\` — Verify 2FA  

All requests must include your **API Key** in headers.
          `,
        },
        {
          title: "Webhooks",
          content: `
# Webhooks

Authix sends events to your server:

- \`user.created\`
- \`user.logged_in\`
- \`user.2fa_verified\`

Example payload:
\`\`\`json
{
  "event": "user.created",
  "data": { "id": "123", "email": "test@example.com" }
}
\`\`\`
          `,
        },
      ],
    },
    {
      category: "Troubleshooting",
      icon: HelpCircle,
      items: [
        {
          title: "Common Issues",
          content: `
# Common Issues

❌ Login fails — Check API key  
❌ 2FA not working — Ensure SMS/email service is configured  
❌ Webhooks not firing — Verify your webhook endpoint is public  
          `,
        },
        {
          title: "Contact Support",
          content: `
# Contact Support

Need help? Reach out:

📧 Email: support@authix.com  
💬 Chat: In-app live chat  
📖 Docs: You're already here 😉
          `,
        },
      ],
    },
  ];

  // state for active doc
  const [query, setQuery] = useState("");
  const [activeDoc, setActiveDoc] = useState(docs[0].items[0]);

  // Filter docs for sidebar search
  const filteredDocs = docs.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <div className="flex h-[calc(100vh-80px)] bg-zinc-950 text-gray-200 rounded-xl overflow-hidden border border-zinc-800">
      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-800 p-4 bg-zinc-900">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-primary" /> Docs Navigation
        </h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Categories */}
        <div className="space-y-4 overflow-y-auto h-[calc(100%-90px)] pr-1">
          {filteredDocs.map(
            ({ category, icon: Icon, items }) =>
              items.length > 0 && (
                <div key={category}>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <Icon size={16} className="text-primary" />
                    {category}
                  </div>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li
                        key={item.title}
                        onClick={() => setActiveDoc(item)}
                        className={`px-3 py-2 rounded-md cursor-pointer text-sm hover:bg-zinc-800 transition ${
                          activeDoc?.title === item.title
                            ? "bg-zinc-800 text-primary"
                            : "text-gray-300"
                        }`}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </aside>

      {/* Content Reader */}
      <main className="flex-1 p-6 overflow-y-auto prose prose-invert max-w-4xl">
        {activeDoc ? (
          <article>
            <div
              className="prose prose-invert"
              dangerouslySetInnerHTML={{ __html: marked(activeDoc.content) }}
            />
          </article>
        ) : (
          <div className="text-gray-500">Select a document to read</div>
        )}
      </main>
    </div>
  );
};

export default DocsPage;
