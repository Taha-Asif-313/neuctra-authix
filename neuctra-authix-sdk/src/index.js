import axios from "axios";

export default class NeuctraAuthixClient {
  /**
   * @param {Object} config
   * @param {string} config.baseUrl - Base URL of your API
   * @param {string} [config.apiKey] - Admin API key
   * @param {string} [config.appId] - Default App ID
   */
  constructor(config) {
    if (!config || !config.baseUrl) {
      throw new Error("NeuctraAuthixClient: 'baseUrl' is required in config");
    }

    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.apiKey = config.apiKey || null;
    this.appId = config.appId || null;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey ? { "x-api-key": this.apiKey } : {}),
      },
      timeout: 10000, // 10s timeout
    });
  }

  // 🔹 Universal request helper with error handling
  async request(method, path, data = {}, extraHeaders = {}) {
    if (!method) throw new Error("HTTP method is required");
    if (!path) throw new Error("Request path is required");

    try {
      const body = { ...(this.appId ? { appId: this.appId } : {}), ...data };

      const res = await this.client.request({
        url: path,
        method,
        data: body,
        headers: extraHeaders,
      });

      return res.data;
    } catch (err) {
      if (err.isAxiosError && !err.response) {
        throw new Error(`Network error: ${err.message}`);
      }
      if (err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || err.response.statusText;
        throw new Error(`API Error (${status}): ${msg}`);
      }
      throw new Error(err.message || "Unknown error occurred during API request");
    }
  }

  // ================= USERS =================

  async signup({
    name,
    email,
    password,
    phone = null,
    address = null,
    avatarUrl = null,
    isActive = true,
    role = "user",
    adminId = null,
  } = {}) {
    if (!name || !email || !password) {
      throw new Error("signup: 'name', 'email', and 'password' are required");
    }

    return this.request("POST", "/users/signup", {
      name,
      email,
      password,
      phone,
      address,
      avatarUrl,
      isActive,
      role,
      adminId,
    });
  }

  async login({ email, password, appId = null } = {}) {
    if (!email || !password) {
      throw new Error("login: 'email' and 'password' are required");
    }

    return this.request("POST", "/users/login", {
      email,
      password,
      appId: appId || this.appId,
    });
  }

  async updateUser({
    userId,
    name,
    email,
    password,
    phone = null,
    address = null,
    avatarUrl = null,
    isActive = true,
    role = "user",
    appId = null,
  } = {}) {
    if (!userId) throw new Error("updateUser: 'userId' is required");

    return this.request("PUT", `/users/update/${userId}`, {
      name,
      email,
      password,
      phone,
      address,
      avatarUrl,
      isActive,
      role,
      appId: appId || this.appId,
    });
  }

  async deleteUser({ userId, appId = null } = {}) {
    if (!userId) throw new Error("deleteUser: 'userId' is required");

    return this.request("DELETE", `/users/delete/${userId}`, {
      appId: appId || this.appId,
    });
  }

  async getProfile({ token } = {}) {
    if (!token) throw new Error("getProfile: 'token' is required");

    return this.request(
      "GET",
      "/profile",
      {},
      { Authorization: `Bearer ${token}` }
    );
  }
}
