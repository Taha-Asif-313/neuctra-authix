class UserSdk {
  constructor({ appId, apiKey, token, baseUrl = "http://localhost:5000/api" }) {
    if (!appId) throw new Error("App ID is required");
    if (!apiKey) throw new Error("API Key is required");
    if (!token) throw new Error("JWT Token is required");

    this.appId = appId;
    this.apiKey = apiKey;
    this.token = token;
    this.baseUrl = `${baseUrl}/users`;
  }

  // 🔹 internal request handler
  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
      "x-api-key": this.apiKey,
      ...options.headers,
    };

    const res = await fetch(url, { ...options, headers });
    let body;
    try {
      body = await res.json();
    } catch {
      body = {};
    }

    if (!res.ok) {
      throw new Error(body.message || `Request failed: ${res.status}`);
    }
    return body;
  }

  // 👤 Create User
  createUser({ name, email, password }) {
    return this.request("/create", {
      method: "POST",
      body: JSON.stringify({ name, email, password, appId: this.appId }),
    });
  }

  // 👥 Get All Users
  getUsers() {
    return this.request("/", { method: "GET" });
  }

  // ✏️ Update User
  updateUser(userId, updates) {
    return this.request(`/edit/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ ...updates, appId: this.appId }),
    });
  }

  // ❌ Delete User
  deleteUser(userId) {
    return this.request(`/${this.appId}/delete/${userId}`, {
      method: "DELETE",
    });
  }
}

export default UserSdk;
