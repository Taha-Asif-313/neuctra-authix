// ✅ Import axios only for dev/build
import axios from "axios";

class NeuctraAuthixClient {
  /**
   * @param {Object} config
   * @param {string} config.baseUrl - Base URL of your API
   * @param {string} config.apiKey - Admin API key
   * @param {string} config.appId - Default App ID
   */
  constructor(config) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ""); // remove trailing slash
    this.apiKey = config.apiKey || null;
    this.appId = config.appId || null;

    // Axios instance
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey ? { "x-api-key": this.apiKey } : {}),
      },
    });
  }

  // 🔹 Universal request helper
  async request(method, path, data = {}) {
    try {
      const body = { ...(this.appId ? { appId: this.appId } : {}), ...data };
      const res = await this.client.request({
        url: path,
        method,
        data,
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || "API request failed");
    }
  }

  // ========== USERS CRUD ==========

  async createUser(userData) {
    return this.request("POST", "/users/signup", userData);
  }

  async getUsers() {
    return this.request("GET", "/users");
  }

  async updateUser(userId, updates) {
    return this.request("PUT", `/users/${userId}`, updates);
  }

  async deleteUser(userId) {
    return this.request("DELETE", `/users/${userId}`, {});
  }

  // ========== AUTH ==========

  async login({ email, password }) {
    return this.request("POST", "/users/login", { email, password });
  }

  async me(token) {
    // Send token as Bearer header for auth
    try {
      const res = await this.client.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || "API request failed");
    }
  }
}

export default NeuctraAuthixClient;
