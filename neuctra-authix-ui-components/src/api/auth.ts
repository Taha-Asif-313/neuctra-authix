import axios from "axios";

interface LoginParams {
  email: string;
  password: string;
  appId: string;
}

interface LoginOptions {
  baseUrl: string;
  apiKey: string; // required
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  token: string;
  appId: string;
  adminId?: string;
  [key: string]: any; // allow extra fields
}

/**
 * User login API (API Key required)
 */
export const loginUser = async (
  params: LoginParams,
  options: LoginOptions
): Promise<UserInfo> => {
  const { email, password, appId } = params;
  const { baseUrl, apiKey } = options;

  if (!apiKey) {
    throw new Error("❌ API key is required for login");
  }

  try {
    const res = await axios.post(
      `${baseUrl}/api/users/login`,
      { email, password, appId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    // ✅ Store user info in localStorage
    if (res.data?.user) {
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    }

    return res.data.user;
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || err.message || "Login failed";

    console.error("Login API Error:", errorMsg);

    throw {
      success: false,
      message: errorMsg,
      status: err.response?.status || 500,
    };
  }
};

/**
 * Helper to get stored user info
 */
export const getStoredUserInfo = (): UserInfo | null => {
  const stored = localStorage.getItem("userInfo");
  return stored ? JSON.parse(stored) : null;
};
