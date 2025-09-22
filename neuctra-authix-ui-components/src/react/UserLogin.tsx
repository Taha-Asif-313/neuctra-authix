import React, { useState } from "react";
import { loginUser } from "../api/auth.js";

interface LoginFormProps {
  baseUrl: string;
  apiKey?: string;
  appId: string;
}

export const UserLogin: React.FC<LoginFormProps> = ({ baseUrl, apiKey, appId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await loginUser(
        { email, password, appId },
        { baseUrl, apiKey }
      );

      setMessage(`✅ Welcome ${data.user.name}, token: ${data.user.token}`);
    } catch (err: any) {
      setMessage(`❌ ${err.message || "Login failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 p-6 bg-white rounded-xl shadow-md w-96">
      <h2 className="text-xl font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};


