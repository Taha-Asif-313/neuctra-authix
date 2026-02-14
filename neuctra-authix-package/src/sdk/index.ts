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
    withCredentials: boolean = false, // 👈 control here
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
        withCredentials, // 👈 override axios default
      });

      return res.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        throw {
          message:
            err.response?.data?.message || err.message || "Request failed",
          status: err.response?.status ?? 0,
        };
      }

      throw { message: err.message || "Unexpected error occurred" };
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

    return await this.request("POST", "/users/signup", params, {}, true);
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
      return await this.request(
        "POST",
        "/users/login",
        { email, password },
        {},
        true,
      );
    } catch (err: any) {
      // Preserve meaningful backend error
      throw new Error(err.message || "Login failed due to an unknown error");
    }
  }

  /**
   * Logout a user
   * @desc Calls backend logout, clears cookie safely, reloads page (Next.js safe)
   */
  async logoutUser(): Promise<{ success: boolean }> {
    try {
      // 1️⃣ Call backend to clear HTTP-only cookie
      const response = await this.request(
        "POST",
        "/users/logout",
        {},
        {},
        true, // include credentials
      );

      if (response?.success) {
        // 2️⃣ Only run on client (hydration safe)
        if (typeof window !== "undefined") {
          // Clear frontend cookie (if exists)
          document.cookie = "a_s_b=; path=/; Max-Age=0; SameSite=Lax";

          // Optional: Secure flag for HTTPS
          if (window.location.protocol === "https:") {
            document.cookie = "a_s_b=; path=/; Max-Age=0; SameSite=Lax; Secure";
          }

          // 3️⃣ Force full reload (best for auth reset)
          window.location.reload();
        }

        return { success: true };
      }

      return { success: false };
    } catch (err: any) {
      throw new Error(err?.message || "Logout failed due to an unknown error");
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

    return await this.request(
      "PUT",
      `/users/change-password/${userId}`,
      { currentPassword, newPassword },
      {},
      true,
    );
  }

  /**
   * Send email verification OTP for a user
   * @param params requires userId and email
   */
  async requestEmailVerificationOTP(params: { userId: string; email: string }) {
    const { userId, email } = params;

    // ✅ Validate inputs
    if (!userId) {
      throw {
        message: "requestEmailVerificationOTP: 'userId' is required",
        status: 400,
      };
    }

    if (!email) {
      throw {
        message: "requestEmailVerificationOTP: 'email' is required",
        status: 400,
      };
    }

    try {
      // Send POST request to backend
      return await this.request(
        "POST",
        `/users/send-verify-otp/${encodeURIComponent(userId)}`,
        { email },
        {},
        true,
      );
    } catch (err: any) {
      console.error("requestEmailVerificationOTP Error:", err);

      // Friendly error object
      throw {
        message: err?.message || "Failed to send verification OTP",
        status: err?.status || 500,
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
      return await this.request(
        "POST",
        "/users/verify-email",
        { email, otp },
        {},
        true,
      );
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
      return await this.request<CheckSessionResponse>(
        "GET",
        "/users/session",
        undefined,
        {},
        true,
      );
    } catch {
      return { authenticated: false };
    }
  }

  /**
   * Update an existing user
   * @param params fields to update
   */
  async updateUser(params: UpdateUserParams) {
    const { userId } = params;
    if (!userId) throw new Error("updateUser: 'userId' is required");

    return await this.request(
      "PUT",
      `/users/update/${userId}`,
      { ...params },
      {},
      true,
    );
  }

  /**
   * Delete a user
   * @param params requires userId and optionally appId
   */
  async deleteUser(params: DeleteUserParams) {
    const { userId } = params;
    if (!userId) throw new Error("deleteUser: 'userId' is required");

    return await this.request(
      "DELETE",
      `/users/delete/${userId}`,
      {},
      {},
      true,
    );
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
      return await this.request("POST", "/users/profile", { userId }, {}, true);
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

    return await this.request("POST", "/users/forgot-password", {
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

    return await this.request("POST", "/users/reset-password", {
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

    return await this.request<CheckUserResponse>(
      "GET",
      `/users/check-user/${userId}?appId=${this.appId}`,
    );
  }

  // ================= USER EXTRA DATA =================

  async searchUserData(params: {
    userId: string;
    category: string;
    id?: string;
    q?: string;
  }) {
    const { userId, ...queryParams } = params;
    if (!userId) throw new Error("userId required");

    const query = new URLSearchParams(queryParams as any).toString();

    return await this.request(
      "GET",
      `/users/${userId}/data/search?${query}`,
      undefined,
      {},
      false, // 👈 no credentials
    );
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

    return await this.request(
      "GET",
      `/users/${userId}/data/searchbyref?${query}`,
      undefined,
      {},
      false, // 👈 no credentials
    );
  }

  /**
   * Get all data objects for a user
   * @param params requires userId
   */
  async getUserData(params: GetUserDataParams) {
    const { userId } = params;
    if (!userId) throw new Error("getUserData: 'userId' is required");

    return await this.request(
      "GET",
      `/users/${userId}/data`,
      undefined,
      {},
      false, // 👈 no credentials
    );
  }

  /**
   * Get a single data object for a user
   * @param params requires userId and dataId
   */
  async getSingleUserData(params: GetSingleUserDataParams) {
    const { userId, dataId } = params;
    if (!userId || !dataId)
      throw new Error("getSingleUserData: 'userId' and 'dataId' are required");

    return await this.request(
      "GET",
      `/users/${userId}/data/${dataId}`,
      undefined,
      {},
      false, // 👈 no credentials
    );
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

    return await this.request(
      "POST",
      `/users/${userId}/data`,
      {
        dataCategory,
        ...data,
      },
      {},
      false, // 👈 no credentials
    );
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

    return await this.request(
      "PUT",
      `/users/${userId}/data/${dataId}`,
      data,
      {},
      false, // 👈 no credentials
    );
  }

  /**
   * Delete a data object by its id
   * @param params requires userId and dataId
   */
  async deleteUserData(params: DeleteUserDataParams) {
    const { userId, dataId } = params;
    if (!userId || !dataId)
      throw new Error("deleteUserData: 'userId' and 'dataId' are required");

    return await this.request(
      "DELETE",
      `/users/${userId}/data/${dataId}`,
      undefined,
      {},
      false, // 👈 no credentials
    );
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

    return await this.request(
      "GET",
      `/app/${appId}/data${query}`,
      undefined,
      {},
      false, // ✅ include credentials
    );
  }

  /**
   * Get a single data item from app.appData[] by id
   */
  async getSingleAppData(params: { dataId: string }): Promise<AppDataItem> {
    const appId = this.appId;
    if (!appId) throw new Error("getSingleAppData: 'appId' is required");
    if (!params.dataId)
      throw new Error("getSingleAppData: 'dataId' is required");

    return await this.request(
      "GET",
      `/app/${appId}/data/${params.dataId}`,
      undefined,
      {},
      false,
    );
  }

  /**
   * 🔍 Search app data items by dynamic keys (BODY based)
   */
  async searchAppDataByKeys(params: {
    [key: string]: any;
  }): Promise<AppDataItem[]> {
    const appId = this.appId;

    if (!appId) throw new Error("searchAppDataByKeys: 'appId' is required");
    if (!params || typeof params !== "object")
      throw new Error("searchAppDataByKeys: params object is required");

    return await this.request(
      "POST",
      `/app/${encodeURIComponent(appId)}/data/search/bykeys`,
      params,
      {},
      false,
    );
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

    return await this.request(
      "POST",
      `/app/${appId}/data/${encodeURIComponent(dataCategory)}`,
      { item: data },
      {},
      false,
    );
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

    return await this.request(
      "PATCH",
      `/app/${appId}/data/${params.dataId}`,
      params.data,
      {},
      false,
    );
  }

  /**
   * Delete an item from app.appData[] by id
   */
  async deleteAppData(params: { dataId: string }): Promise<AppDataItem> {
    const appId = this.appId;
    if (!appId) throw new Error("deleteAppData: 'appId' is required");
    if (!params.dataId) throw new Error("deleteAppData: 'dataId' is required");

    return await this.request(
      "DELETE",
      `/app/${appId}/data/${params.dataId}`,
      undefined,
      {},
      false,
    );
  }
}
