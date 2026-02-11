import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomLoader from "../components/utils/CustomLoader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API = import.meta.env.VITE_SERVER_URL;

  const [admin, setAdmin] = useState(null);
  const [token, settoken] = useState(null);
  const [loading, setLoading] = useState(true); // session loading
  const [authLoading, setAuthLoading] = useState(false); // login/logout loading
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  /* ===============================
     ✅ Load session on app start
  ================================ */
  const loadSession = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/session`, {
        withCredentials: true,
      });

      if (res.data?.success && res.data.admin) {
        setAdmin(res.data.admin);
        settoken(res.data.token);
        setIsAuthenticated(true);
        setIsVerified(Boolean(res.data.admin.isVerified));
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
        setIsVerified(false);
      }
    } catch {
      setAdmin(null);
      setIsAuthenticated(false);
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  /* ===============================
     ✅ Login
  ================================ */
  const login = async (formData) => {
    try {
      setAuthLoading(true);

      const res = await axios.post(`${API}/api/admin/login`, formData, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setAdmin(res.data.admin);
        settoken(res.data.token);
        setIsAuthenticated(true);
        setIsVerified(Boolean(res.data.admin?.isVerified));

        toast.success("Login successful");
        return true;
      }

      toast.error(res.data?.message || "Login failed");
      return false;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid login credentials");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  /* ===============================
     ✅ Update profile (local only)
  ================================ */
  const updateProfile = (updatedAdmin) => {
    setAdmin(updatedAdmin);

    if (updatedAdmin?.isVerified !== undefined) {
      setIsVerified(Boolean(updatedAdmin.isVerified));
    }
  };

  /* ===============================
     ✅ Logout
  ================================ */
  const logout = async () => {
    if (authLoading) return;

    try {
      setAuthLoading(true);

      const res = await axios.get(`${API}/api/admin/logout`, {
        withCredentials: true,
      });

      if (!res.data?.success) {
        toast.error(res.data?.message || "Logout failed");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Unable to logout. Please try again.",
      );
    } finally {
      // 🔐 Always clear client state
      setAdmin(null);
      settoken(null);
      setIsAuthenticated(false);
      setIsVerified(false);
      setAuthLoading(false);

      toast.success("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        authLoading,
        isAuthenticated,
        isVerified,
        login,
        logout,
        updateProfile,
        setAdmin,
      }}
    >
      {/* Show loader while session is being checked */}
      {loading ? (
        <div className="h-screen flex items-center justify-center w-full bg-black" >
          <CustomLoader text="Checking session..." />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

/* ===============================
   ✅ Hook
================================ */
export const useAuth = () => useContext(AuthContext);
