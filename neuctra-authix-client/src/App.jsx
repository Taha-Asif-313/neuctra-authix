import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/auth/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AppDetail from "./pages/dashboard/AppDetail";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ApiKeysPage from "./pages/dashboard/ApiKeysPage";
import AdminReportPage from "./pages/dashboard/AdminReportPage";
import ApplicationsPage from "./pages/dashboard/ApplicationsPage";
import SupportPage from "./pages/dashboard/SupportPage";
import DocsLayout from "./layouts/DocsLayout";
import Introduction from "./pages/docs/Introduction";
import NeuctraAuthixClientSdk from "./pages/docs/NeuctraAuthixClientSdk";

// ✅ Protected wrapper inside same file
const ProtectedRoute = ({ Component }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-white p-6">Loading...</div>; // spinner/loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return Component ? (
    <Component>
      <Outlet />
    </Component>
  ) : (
    <Outlet />
  );
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App min-h-screen bg-black transition-colors duration-200">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />
            }
          />
          <Route
            path="login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SignupPage />
              )
            }
          />
        </Route>

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={DashboardLayout} />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="app/:id" element={<AppDetail />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="apikeys" element={<ApiKeysPage />} />
          <Route path="admin-report" element={<AdminReportPage />} />
          <Route path="apps" element={<ApplicationsPage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        {/* Public Docs */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route
            index
            element={<Introduction/>}
          />
          <Route path="neuctra-authix-sdk" element={<NeuctraAuthixClientSdk />} />
  
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
          <Toaster
            containerStyle={{ fontSize: 12 }}
            position="top-right"
            reverseOrder={false}
          />
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
