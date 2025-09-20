// sdk/neuctra-authix-client.js
class NeuctraAuthixClient {
  constructor(config) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ""); // strip trailing slash
    this.apiKey = config.apiKey || null;             // 🔹 use API key
    this.appId = config.appId || null;
  }

  // 🔹 Universal request handler
  async request(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey ? { "x-api-key": this.apiKey } : {}), // use API key
    };

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  }

  // ========== USERS ==========
  async createUser({ name, email, password }) {
    return this.request(`/users`, {
      method: "POST",
      body: JSON.stringify({ name, email, password, appId: this.appId }),
    });
  }

  async getUsers() {
    return this.request(`/users`, { method: "GET" });
  }

  async updateUser(userId, updates) {
    return this.request(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ ...updates, appId: this.appId }),
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/delete/${userId}?appid=${this.appId}`, {
      method: "DELETE",
    });
  }

  // ========== AUTH (optional) ==========
  async login({ email, password }) {
    return this.request(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async me() {
    return this.request(`/auth/me`, { method: "GET" });
  }
}

export default NeuctraAuthixClient;
