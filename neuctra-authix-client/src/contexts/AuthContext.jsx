import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false); // ✅ new field
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      const storedToken = localStorage.getItem("token");

      if (storedAdmin && storedToken) {
        const parsedAdmin = JSON.parse(storedAdmin);

        setAdmin(parsedAdmin);
        setToken(storedToken);
        setIsAuthenticated(true);

        // ✅ If admin has isVerified key, set it
        if (parsedAdmin?.isVerified !== undefined) {
          setIsVerified(Boolean(parsedAdmin.isVerified));
        }
      }
    } catch (err) {
      console.error("Invalid admin data in localStorage:", err);
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Login
  const login = (adminData, jwtToken) => {
    if (!jwtToken) {
      console.error("JWT Token is missing!");
      return;
    }

    setAdmin(adminData);
    setToken(jwtToken);
    setIsAuthenticated(true);
    setIsVerified(Boolean(adminData?.isVerified)); // ✅ set from admin data

    localStorage.setItem("admin", JSON.stringify(adminData || {}));
    localStorage.setItem("token", jwtToken);
  };

  // ✅ Update Profile
  const updateProfile = (updatedAdmin) => {
    setAdmin(updatedAdmin);
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));

    // Update verification status if included
    if (updatedAdmin?.isVerified !== undefined) {
      setIsVerified(Boolean(updatedAdmin.isVerified));
    }
  };

  // ✅ Logout
  const logout = () => {
    setAdmin(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsVerified(false);

    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        isAuthenticated,
        isVerified, // ✅ exposed to context
        login,
        logout,
        updateProfile,
        setAdmin, // optional
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
