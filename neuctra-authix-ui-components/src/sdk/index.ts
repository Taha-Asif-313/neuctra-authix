import axios, { AxiosInstance, Method } from "axios";

interface NeuctraAuthixConfig {
  baseUrl: string;
  apiKey?: string;
  appId?: string;
}

interface SignupParams {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  address?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  role?: string;
  adminId?: string | null;
}

interface LoginParams {
  email: string;
  password: string;
  appId?: string | null;
}

interface UpdateUserParams {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string | null;
  address?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  role?: string;
  appId?: string | null;
}

interface DeleteUserParams {
  userId: string;
  appId?: string | null;
}

interface GetProfileParams {
  token: string;
}

export class NeuctraAuthix {
  private baseUrl: string;
  private apiKey: string | null;
  private appId: string | null;
  private client: AxiosInstance;

  constructor(config: NeuctraAuthixConfig) {
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
  private async request<T = any, D extends object = Record<string, unknown>>(
    method: Method,
    path: string,
    data?: D,
    extraHeaders: Record<string, string> = {}
  ): Promise<T> {
    if (!method) throw new Error("HTTP method is required");
    if (!path) throw new Error("Request path is required");

    try {
      const body = {
        ...(this.appId ? { appId: this.appId } : {}),
        ...(data || {}),
      };

      const res = await this.client.request<T>({
        url: path,
        method,
        data: body,
        headers: extraHeaders,
      });

      return res.data;
    } catch (err: any) {
      if (err.isAxiosError && !err.response) {
        throw new Error(`Network error: ${err.message}`);
      }
      if (err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || err.response.statusText;
        throw new Error(`API Error (${status}): ${msg}`);
      }
      throw new Error(
        err.message || "Unknown error occurred during API request"
      );
    }
  }

  // ================= USERS =================

  async signup(params: SignupParams) {
    const { name, email, password } = params;
    if (!name || !email || !password) {
      throw new Error("signup: 'name', 'email', and 'password' are required");
    }

    return this.request("POST", "/users/signup", params);
  }

  async login(params: LoginParams) {
    const { email, password, appId } = params;
    if (!email || !password) {
      throw new Error("login: 'email' and 'password' are required");
    }

    return this.request("POST", "/users/login", {
      email,
      password,
      appId: appId || this.appId,
    });
  }

  async updateUser(params: UpdateUserParams) {
    const { userId, appId } = params;
    if (!userId) throw new Error("updateUser: 'userId' is required");

    return this.request("PUT", `/users/update/${userId}`, {
      ...params,
      appId: appId || this.appId,
    });
  }

  async deleteUser(params: DeleteUserParams) {
    const { userId, appId } = params;
    if (!userId) throw new Error("deleteUser: 'userId' is required");

    return this.request("DELETE", `/users/delete/${userId}`, {
      appId: appId || this.appId,
    });
  }

  async getProfile(params: GetProfileParams) {
    const { token } = params;
    if (!token) throw new Error("getProfile: 'token' is required");

    return this.request(
      "GET",
      "/profile",
      {},
      { Authorization: `Bearer ${token}` }
    );
  }
}
