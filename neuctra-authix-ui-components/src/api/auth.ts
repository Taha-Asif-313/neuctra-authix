import axios from "axios";

interface LoginParams {
  email: string;
  password: string;
  appId: string;
}

interface LoginOptions {
  baseUrl: string;
  apiKey?: string;   // optional, if using API key
  token?: string;    // optional, if using JWT token
}

/**
 * User login API
 */
export const loginUser = async (
  params: LoginParams,
  options: LoginOptions
) => {
  const { email, password, appId } = params;
  const { baseUrl, apiKey, token } = options;

  try {
    const res = await axios.post(
      `${baseUrl}/api/users/login`,
      { email, password, appId },
      {
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    return res.data;
  } catch (err: any) {
    console.error("Login API Error:", err.response?.data || err.message);
    throw err.response?.data || { success: false, message: "Login failed" };
  }
};
