import axios, { AxiosInstance, Method } from "axios";
import {
  AddUserDataParams,
  AppDataItem,
  ChangePasswordParams,
  CheckSessionResponse,
  CheckUserResponse,
  DeleteUserDataParams,
  DeleteUserParams,
  GetProfileParams,
  GetSingleUserDataParams,
  GetUserDataParams,
  LoginParams,
  NeuctraAuthixConfig,
  SignupParams,
  UpdateUserDataParams,
  UpdateUserParams,
} from "./interfaces.js";

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
      timeout: 30000, // 10s timeout
      withCredentials: true, // 🔥 REQUIRED FOR SESSION COOKIES
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
      if (axios.isAxiosError(err)) {
        // Just throw a simple object with message & status
        throw {
          message:
            err.response?.data?.message || err.message || "Request failed",
          status: err.response?.status ?? 0,
        };
      }

      // Non-Axios errors
      throw {
        message: err.message || "Unexpected error occurred",
      };
    }
  }

  // ================= USERS =================

  /**
   * Register a new user
   * @param params user details
   */
  async signupUser(params: SignupParams) {
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
  async loginUser(params: LoginParams) {
    const { email, password } = params;

    if (!email || !password) {
      throw new Error("login: 'email' and 'password' are required");
    }

    try {
      const response = await this.request("POST", "/users/login", {
        email,
        password,
      });

      return response; // 👈 THIS is what you were “not seeing”
    } catch (err: any) {
      // Preserve meaningful backend error
      throw new Error(err.message || "Login failed due to an unknown error");
    }
  }

  /**
   * Change a user's password (Admin only)
   * @param params requires userId, currentPassword, newPassword
   */
  async changePassword(params: ChangePasswordParams) {
    const { userId, currentPassword, newPassword } = params;

    if (!userId) throw new Error("changePassword: 'userId' is required");
    if (!currentPassword || !newPassword) {
      throw new Error(
        "changePassword: both 'currentPassword' and 'newPassword' are required",
      );
    }

    return this.request("PUT", `/users/change-password/${userId}`, {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Send email verification OTP for a user
   * @param params requires email and appId
   */
  async requestEmailVerificationOTP(params: { email: string }) {
    const { email } = params;

    if (!email) {
      throw new Error(
        "sendEmailVerificationRequest: 'email' and 'appId' are required",
      );
    }

    try {
      return await this.request("POST", "/users/send-verify-otp", {
        email,
      });
    } catch (err: any) {
      // Friendly error object
      throw {
        message: err.message || "Failed to send verification OTP",
        status: err.status || 500,
      };
    }
  }

  /**
   * Verify email with OTP
   * @param params requires email, otp, and appId
   */
  async verifyEmail(params: { email: string; otp: string }) {
    const { email, otp } = params;

    if (!email) throw new Error("verifyEmail: 'email' is required");
    if (!otp) throw new Error("verifyEmail: 'otp' is required");

    try {
      return await this.request("POST", "/users/verify-email", {
        email,
        otp,
      });
    } catch (err: any) {
      throw {
        message: err.message || "Failed to verify email",
        status: err.status || 500,
      };
    }
  }

  /**
   * 🔐 Check current authentication session (cookie-based)
   * Automatically detects logged-in / logged-out state
   */
  async checkUserSession(): Promise<CheckSessionResponse> {
    // On server-side, return false immediately
    if (typeof window === "undefined") {
      return { authenticated: false };
    }

    try {
      // Make a request to check the session (cookie-based)
      return await this.request<CheckSessionResponse>("GET", "/users/session");
    } catch {
      // If request fails, session is invalid
      return { authenticated: false };
    }
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
   * Get the profile of a user for a specific app
   * @param params requires userId and appId
   */
  async getUserProfile(params: { userId: string }) {
    const { userId } = params;

    if (!userId) {
      throw new Error("getProfile: 'userId' and 'appId' are required");
    }

    try {
      // Send POST request with userId and appId in the body
      const response = await this.request("POST", "/users/profile", {
        userId,
      });

      return response; // { success, message, user }
    } catch (err: any) {
      // Friendly error object
      throw {
        message: err.message || "Failed to fetch profile",
        status: err.status || 500,
      };
    }
  }

  // ================= USERS SECURITY =================

  /**
   * Forgot password (public route)
   * @param params requires email
   */
  async requestResetUserPasswordOTP(params: { email: string }) {
    const { email } = params;
    if (!email) throw new Error("forgotPassword: 'email' is required");

    return this.request("POST", "/users/forgot-password", {
      email,
    });
  }

  /**
   * Reset password (public route)
   * @param params requires email, otp, newPassword
   */
  async resetUserPassword(params: {
    email: string;
    otp: string;
    newPassword: string;
  }) {
    const { email, otp, newPassword } = params;
    if (!email || !otp || !newPassword) {
      throw new Error(
        "resetPassword: 'email', 'otp' and 'newPassword' are required",
      );
    }

    return this.request("POST", "/users/reset-password", {
      email,
      otp,
      newPassword,
    });
  }

  /**
   * Check if a user exists for this app (lightweight)
   * @param userId user id to check
   * @returns { exists: boolean }
   */
  async checkIfUserExists(userId: string): Promise<CheckUserResponse> {
    if (!userId) {
      throw new Error("checkUser: 'userId' is required");
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
