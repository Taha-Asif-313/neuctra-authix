import axios from "axios";

interface SignupParams {
  name: string;
  email: string;
  password: string;
  appId: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  isActive?: boolean;
  role?: string;
}

interface SignupOptions {
  baseUrl: string;
  apiKey: string; // required
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  token: string;
  appId: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  isActive: boolean;
  role: string;
  adminId?: string;
  createdAt: string;
  [key: string]: any; // allow extra fields
}

/**
 * User signup API (API Key required)
 */
export const signupUser = async (
  params: SignupParams,
  options: SignupOptions
): Promise<UserInfo> => {
  const { name, email, password, appId, phone, address, avatarUrl, isActive = true, role = "user" } = params;
  const { baseUrl, apiKey } = options;

  if (!apiKey) {
    throw new Error("❌ API key is required for signup");
  }

  if (!name || !email || !password || !appId) {
    throw new Error("❌ Name, email, password, and appId are required");
  }

  try {
    const res = await axios.post(
      `${baseUrl}/users/signup`,
      { 
        name, 
        email, 
        password, 
        appId, 
        phone, 
        address, 
        avatarUrl, 
        isActive, 
        role 
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    // ✅ Store user info in localStorage if signup is successful
    if (res.data?.user) {
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    }

    return res.data.user;
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || err.message || "Signup failed";

    console.error("Signup API Error:", errorMsg);

    // Handle specific error cases
    if (err.response?.status === 400) {
      if (errorMsg.includes("already exists")) {
        throw {
          success: false,
          message: "User with this email already exists for this app",
          status: 400,
        };
      }
      if (errorMsg.includes("inactive")) {
        throw {
          success: false,
          message: "Cannot signup under an inactive app",
          status: 400,
        };
      }
    }

    if (err.response?.status === 404) {
      throw {
        success: false,
        message: "Invalid or inactive app",
        status: 404,
      };
    }

    throw {
      success: false,
      message: errorMsg,
      status: err.response?.status || 500,
    };
  }
};

/**
 * Helper to get stored user info (same as login)
 */
export const getStoredUserInfo = (): UserInfo | null => {
  const stored = localStorage.getItem("userInfo");
  return stored ? JSON.parse(stored) : null;
};

/**
 * Helper to clear stored user info
 */
export const clearStoredUserInfo = (): void => {
  localStorage.removeItem("userInfo");
};

/**
 * Helper to check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const userInfo = getStoredUserInfo();
  return !!(userInfo && userInfo.token);
};