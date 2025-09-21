import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      const storedToken = localStorage.getItem("token");

      if (storedAdmin && storedToken) {
        setAdmin(JSON.parse(storedAdmin));
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Invalid admin data in localStorage:", err);
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = (adminData, jwtToken) => {
    if (!jwtToken) {
      console.error("JWT Token is missing!");
      return;
    }

    setAdmin(adminData);
    setToken(jwtToken);
    setIsAuthenticated(true);

    localStorage.setItem("admin", JSON.stringify(adminData || {}));
    localStorage.setItem("token", jwtToken);
  };

  // Logout
  const logout = () => {
    setAdmin(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{ admin, token, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
