import axios, { AxiosInstance, Method } from "axios";

/**
 * SDK configuration options
 */
interface NeuctraAuthixConfig {
  /** Base URL of the Authix API (required) */
  baseUrl: string;
  /** API key for authentication */
  apiKey: string;
  /** App ID for scoping user operations */
  appId: string;
}

/**
 * Parameters for signing up a new user
 */
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

/**
 * Parameters for logging in a user
 */
interface LoginParams {
  email: string;
  password: string;
  appId: string;
}

/**
 * Parameters for updating an existing user
 */
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

/**
 * Parameters for changing a user password (Admin action)
 */
interface ChangePasswordParams {
  userId: string;
  currentPassword: string;
  newPassword: string;
  appId?: string | null;
}

/**
 * Parameters for deleting a user
 */
interface DeleteUserParams {
  userId: string;
  appId?: string | null;
}

/**
 * Parameters for fetching a user profile
 */
interface GetProfileParams {
  /** JWT access token */
  token: string;
}

// ================= USER EXTRA DATA =================

/**
 * Fetch all extra data objects for a user
 */
interface GetUserDataParams {
  userId: string;
}

/**
 * Fetch a single data object from a user's extra data
 */
interface GetSingleUserDataParams {
  userId: string;
  dataId: string;
}

/**
 * Add a new object to a user's extra data
 */
interface AddUserDataParams {
  userId: string;
  dataCategory: string;
  /** The object to add */
  data: Record<string, any>;
}

/**
 * Update an existing object in a user's extra data
 */
interface UpdateUserDataParams {
  userId: string;
  dataId: string;
  /** Fields to update */
  data: Record<string, any>;
}

/**
 * Delete an object from a user's extra data
 */
interface DeleteUserDataParams {
  userId: string;
  dataId: string;
}

interface CheckUserResponse {
  success: boolean;
  exists: boolean;
}

/* ================================
   📦 APP DATA SDK FUNCTIONS
   ================================ */

export interface AppDataItem {
  id: string;
  [key: string]: any;
}

export interface AddAppDataParams {
  data: Record<string, any>;
}

export interface UpdateAppDataParams {
  dataId: string;
  data: Record<string, any>;
}

export interface DeleteAppDataParams {
  dataId: string;
}

/**
 * Main SDK class for interacting with Neuctra Authix API
 */
export class NeuctraAuthix {
  private baseUrl: string;
  private apiKey: string | null;
  private appId: string | null;
  private client: AxiosInstance;

  /**
   * Initialize the SDK client
   * @param config configuration object with baseUrl, apiKey, and appId
   */
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

  /**
   * 🌐 Universal request helper with structured responses and error handling
   * @param method HTTP method (GET, POST, PUT, DELETE)
   * @param path API endpoint path
   * @param data Optional request body
   * @param extraHeaders Optional custom headers
   */
  private async request<T = any, D extends object = Record<string, unknown>>(
    method: Method,
    path: string,
    data?: D,
    extraHeaders: Record<string, string> = {},
  ): Promise<T> {
    if (!method) throw new Error("HTTP method is required");
    if (!path) throw new Error("Request path is required");

    try {
      // 🧩 Merge appId into request body if available
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

      // ✅ Return only response data
      return res.data;
    } catch (err: any) {
      console.error("❌ [Request Error]:", err);

      // 🔍 Handle Axios and network errors properly
      if (err.isAxiosError) {
        const status = err.response?.status || 0;
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unknown Axios error occurred";

        throw new Error(`Request failed (${status}): ${message}`);
      }

      // 🔄 Handle unexpected runtime errors
      throw new Error(`Unexpected error: ${err.message || "Unknown failure"}`);
    }
  }

  // ================= USERS =================

  /**
   * Register a new user
   * @param params user details
   */
  async signup(params: SignupParams) {
    const { name, email, password } = params;
    if (!name || !email || !password) {
      throw new Error("signup: 'name', 'email', and 'password' are required");
    }

    return this.request("POST", "/users/signup", params);
  }

  /**
   * Login a user
   * @param params login details
   */
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

  /**
   * Update an existing user
   * @param params fields to update
   */
  async updateUser(params: UpdateUserParams) {
    const { userId, appId } = params;
    if (!userId) throw new Error("updateUser: 'userId' is required");

    return this.request("PUT", `/users/update/${userId}`, {
      ...params,
      appId: appId || this.appId,
    });
  }

  /**
   * Change a user's password (Admin only)
   * @param params requires userId, currentPassword, newPassword
   */
  async changePassword(params: ChangePasswordParams) {
    const { userId, currentPassword, newPassword, appId } = params;

    if (!userId) throw new Error("changePassword: 'userId' is required");
    if (!currentPassword || !newPassword) {
      throw new Error(
        "changePassword: both 'currentPassword' and 'newPassword' are required",
      );
    }

    return this.request("PUT", `/users/change-password/${userId}`, {
      currentPassword,
      newPassword,
      appId: appId || this.appId,
    });
  }

  /**
   * Delete a user
   * @param params requires userId and optionally appId
   */
  async deleteUser(params: DeleteUserParams) {
    const { userId, appId } = params;
    if (!userId) throw new Error("deleteUser: 'userId' is required");

    return this.request("DELETE", `/users/delete/${userId}`, {
      appId: appId || this.appId,
    });
  }

  /**
   * Get the profile of the authenticated user
   * @param params requires JWT token
   */
  async getProfile(params: GetProfileParams) {
    const { token } = params;
    if (!token) throw new Error("getProfile: 'token' is required");

    return this.request(
      "GET",
      "/users/profile",
      {},
      { Authorization: `Bearer ${token}` },
    );
  }

  // ================= USERS SECURITY =================

  /**
   * Send verification OTP (requires logged-in user token)
   * @param params requires token
   */
  async sendVerifyOTP(params: { token: string; appId?: string }) {
    const { token, appId } = params;
    if (!token) throw new Error("sendVerifyOTP: 'token' is required");

    return this.request(
      "POST",
      "/users/send-verify-otp",
      { appId: appId || this.appId },
      { Authorization: `Bearer ${token}` },
    );
  }

  /**
   * Verify email with OTP (requires logged-in user token)
   * @param params requires token + otp
   */
  async verifyEmail(params: { token: string; otp: string; appId?: string }) {
    const { token, otp, appId } = params;
    if (!token) throw new Error("verifyEmail: 'token' is required");
    if (!otp) throw new Error("verifyEmail: 'otp' is required");

    return this.request(
      "POST",
      "/users/verify-email",
      { otp, appId: appId || this.appId },
      { Authorization: `Bearer ${token}` },
    );
  }

  /**
   * Forgot password (public route)
   * @param params requires email
   */
  async forgotPassword(params: { email: string; appId?: string }) {
    const { email, appId } = params;
    if (!email) throw new Error("forgotPassword: 'email' is required");

    return this.request("POST", "/users/forgot-password", {
      email,
      appId: appId || this.appId,
    });
  }

  /**
   * Reset password (public route)
   * @param params requires email, otp, newPassword
   */
  async resetPassword(params: {
    email: string;
    otp: string;
    newPassword: string;
    appId?: string;
  }) {
    const { email, otp, newPassword, appId } = params;
    if (!email || !otp || !newPassword) {
      throw new Error(
        "resetPassword: 'email', 'otp' and 'newPassword' are required",
      );
    }

    return this.request("POST", "/users/reset-password", {
      email,
      otp,
      newPassword,
      appId: appId || this.appId,
    });
  }

  /**
   * Check if a user exists for this app (lightweight)
   * @param userId user id to check
   * @returns { exists: boolean }
   */
  async checkUser(userId: string): Promise<CheckUserResponse> {
    if (!userId) {
      throw new Error("checkUser: 'userId' is required");
    }

    if (!this.appId) {
      throw new Error("checkUser: SDK 'appId' is missing in config");
    }

    return this.request<CheckUserResponse>(
      "GET",
      `/users/check-user/${userId}?appId=${this.appId}`,
    );
  }

  // ================= USER EXTRA DATA =================

  async searchAllUsersData(params: {
    category: string;
    id?: string;
    q?: string;
  }) {
    if (!this.appId) throw new Error("searchAllUsersData: appId missing");

    const query = new URLSearchParams(params as any).toString();

    return this.request("GET", `/users/${this.appId}/data/search?${query}`);
  }

  async searchUserData(params: {
    userId: string;
    category: string;
    id?: string;
    q?: string;
  }) {
    const { userId, ...queryParams } = params;
    if (!userId) throw new Error("userId required");

    const query = new URLSearchParams(queryParams as any).toString();

    return this.request("GET", `/users/${userId}/data/search?${query}`);
  }

  /**
   * Search user's extra data by dynamic reference keys
   * @example
   * searchUserDataByKeys({
   *   userId: "123",
   *   category: "orders",
   *   shopId: 12,
   *   productId: 99,
   *   status: "active"
   * })
   */
  async searchUserDataByKeys(params: {
    userId: string;
    q?: string;
    [key: string]: any; // 🔥 allow ANY dynamic key
  }) {
    const { userId, ...queryParams } = params;

    if (!userId) {
      throw new Error("searchUserDataByKeys: 'userId' is required");
    }

    const query = new URLSearchParams(
      Object.entries(queryParams).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    ).toString();

    return this.request("GET", `/users/${userId}/data/searchbyref?${query}`);
  }

  /**
   * 🌐 Search ALL users' data by dynamic keys for the current app
   * @example
   * sdk.searchAllUsersDataByKeys({
   *   category: "orders",
   *   shopId: 12,
   *   productId: 99,
   *   status: "active",
   *   q: "iphone"          // optional keyword search
   * })
   */
  async searchAllUsersDataByKeys(params: {
    q?: string; // optional keyword search
    [key: string]: any; // 🔥 allow ANY dynamic key
  }) {
    const appId = this.appId;

    if (!appId) {
      throw new Error(
        "searchAllUsersDataByKeys: 'appId' is required on SDK initialization",
      );
    }

    // Build query string dynamically from keys
    const query = new URLSearchParams(
      Object.entries(params).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    ).toString();

    // 🔹 Request endpoint for all users' data within this app
    return this.request(
      "GET",
      `/users/${encodeURIComponent(appId)}/data/searchbyref/all?${query}`,
    );
  }

  /**
   * Fetch ALL users' merged data for a specific app
   * @param params requires appId
   */
  async getAllUsersData() {
    if (!this.appId)
      throw new Error("getAllUsersData: SDK 'appId' is missing in config");

    return this.request("GET", `/users/all-data/${this.appId}/data`);
  }

  /**
   * Get all data objects for a user
   * @param params requires userId
   */
  async getUserData(params: GetUserDataParams) {
    const { userId } = params;
    if (!userId) throw new Error("getUserData: 'userId' is required");

    return this.request("GET", `/users/${userId}/data`);
  }

  /**
   * Get a single data object for a user
   * @param params requires userId and dataId
   */
  async getSingleUserData(params: GetSingleUserDataParams) {
    const { userId, dataId } = params;
    if (!userId || !dataId)
      throw new Error("getSingleUserData: 'userId' and 'dataId' are required");

    return this.request("GET", `/users/${userId}/data/${dataId}`);
  }

  /**
   * Add a new data object to a user
   * @param params requires userId and data object
   */
  async addUserData(params: AddUserDataParams) {
    const { userId, dataCategory, data } = params;

    if (!userId) throw new Error("addUserData: 'userId' is required");
    if (!dataCategory)
      throw new Error("addUserData: 'dataCategory' is required");
    if (!data) throw new Error("addUserData: 'data' is required");

    return this.request("POST", `/users/${userId}/data`, {
      dataCategory,
      ...data,
    });
  }

  /**
   * Update a data object by its id
   * @param params requires userId, dataId, and updated fields
   */
  async updateUserData(params: UpdateUserDataParams) {
    const { userId, dataId, data } = params;
    if (!userId || !dataId)
      throw new Error("updateUserData: 'userId' and 'dataId' are required");
    if (!data) throw new Error("updateUserData: 'data' is required");

    return this.request("PUT", `/users/${userId}/data/${dataId}`, data);
  }

  /**
   * Delete a data object by its id
   * @param params requires userId and dataId
   */
  async deleteUserData(params: DeleteUserDataParams) {
    const { userId, dataId } = params;
    if (!userId || !dataId)
      throw new Error("deleteUserData: 'userId' and 'dataId' are required");

    return this.request("DELETE", `/users/${userId}/data/${dataId}`);
  }

  // ================= APP DATA =================

  /**
   * Get all app data items for the current app
   * @param category optional filter by dataCategory
   */
  async getAppData(category?: string): Promise<AppDataItem[]> {
    const appId = this.appId;
    if (!appId) throw new Error("getAppData: 'appId' is required");

    const query = category ? `?category=${encodeURIComponent(category)}` : "";

    const res = await this.request<{ success: boolean; data: AppDataItem[] }>(
      "GET",
      `/app/${appId}/data${query}`,
    );

    return res?.data || [];
  }

  /**
   * Get a single data item from app.appData[] by id
   */
  async getSingleAppData(params: { dataId: string }): Promise<AppDataItem> {
    const appId = this.appId;
    if (!appId) throw new Error("getSingleAppData: 'appId' is required");
    if (!params.dataId)
      throw new Error("getSingleAppData: 'dataId' is required");

    const res = await this.request<{ success: boolean; data: AppDataItem }>(
      "GET",
      `/app/${appId}/data/${params.dataId}`,
    );

    return res?.data;
  }

/**
 * 🔍 Search app data items by dynamic keys (BODY based)
 * @example
 * sdk.searchAppDataByKeys({
 *   dataCategory: "order",
 *   buyerId: "user123",
 *   status: "Processing",
 *   q: "iphone"
 * })
 */
async searchAppDataByKeys(params: {
  [key: string]: any; // 🔥 allow ANY dynamic key
}): Promise<AppDataItem[]> {
  const appId = this.appId;

  if (!appId) {
    throw new Error("searchAppDataByKeys: 'appId' is required");
  }

  if (!params || typeof params !== "object") {
    throw new Error("searchAppDataByKeys: params object is required");
  }

  const res = await this.request<{
    success: boolean;
    data: AppDataItem[];
    totalItems?: number;
  }>(
    "POST", // ✅ FIX: POST (body-based search)
    `/app/${encodeURIComponent(appId)}/data/search/bykeys`, // ✅ FIX: correct route
    params, // ✅ BODY
  );

  return res?.data || [];
}


  /**
   * Add a new item to app.appData[] under a specific category
   */
  async addAppData(params: {
    dataCategory: string;
    data: Record<string, any>;
  }): Promise<AppDataItem> {
    const appId = this.appId;
    if (!appId) throw new Error("addAppData: 'appId' is required");

    const { dataCategory, data } = params;

    if (!dataCategory)
      throw new Error("addAppData: 'dataCategory' is required");
    if (!data || typeof data !== "object")
      throw new Error("addAppData: 'data' is required");

    const res = await this.request<{ success: boolean; data: AppDataItem }>(
      "POST",
      `/app/${appId}/data/${encodeURIComponent(dataCategory)}`,
      {
        item: data, // ✅ matches controller
      },
    );

    return res?.data;
  }

  /**
   * Update an item in app.appData[] by id
   */
  async updateAppData(params: {
    dataId: string;
    data: Record<string, any>;
  }): Promise<AppDataItem> {
    const appId = this.appId;
    if (!appId) throw new Error("updateAppData: 'appId' is required");
    if (!params.dataId) throw new Error("updateAppData: 'dataId' is required");
    if (!params.data) throw new Error("updateAppData: 'data' is required");

    const res = await this.request<{ success: boolean; data: AppDataItem }>(
      "PATCH",
      `/app/${appId}/data/${params.dataId}`,
      params.data,
    );

    return res?.data;
  }

  /**
   * Delete an item from app.appData[] by id
   */
  async deleteAppData(params: { dataId: string }): Promise<AppDataItem> {
    const appId = this.appId;
    if (!appId) throw new Error("deleteAppData: 'appId' is required");
    if (!params.dataId) throw new Error("deleteAppData: 'dataId' is required");

    const res = await this.request<{ success: boolean; data: AppDataItem }>(
      "DELETE",
      `/app/${appId}/data/${params.dataId}`,
    );

    return res?.data;
  }
}
