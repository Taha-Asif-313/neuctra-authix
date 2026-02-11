import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
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
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ChangePassword from "./pages/dashboard/ChangePassword";
import Pricing from "./pages/public/Pricing";
import Features from "./pages/public/Features";
import TermsOfService from "./pages/public/TermsOfService";
import Contact from "./pages/public/Contact";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import AuthixSdkIntroduction from "./pages/docs/sdk/AuthixSdkIntroduction";
import AuthixSdkInstallation from "./pages/docs/sdk/AuthixSdkInstallation";
import AuthUserManagement from "./pages/docs/sdk/AuthUserManagement";
import UserDataManagement from "./pages/docs/sdk/UserDataManagement";
import ReactUserLoginDocs from "./pages/docs/react-ui-components/ReactUserLoginDocs";
import ReactUserSignUpDocs from "./pages/docs/react-ui-components/ReactUserSignUpDocs";
import ReactUserProfileDocs from "./pages/docs/react-ui-components/ReactUserProfileDocs";
import ReactUserButtonDocs from "./pages/docs/react-ui-components/ReactUserButtonDocs";
import ReactSignedOutDocs from "./pages/docs/react-ui-components/ReactSignedOutDocs";
import ReactSignedInDocs from "./pages/docs/react-ui-components/ReactSignedInDocs";
import ReactSetupDocs from "./pages/docs/react-ui-components/ReactSetupDocs";
import Installation from "./pages/docs/installation";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/public/About";
import AppDataManagement from "./pages/docs/sdk/AppDataManagement";
import ReactEmailVerificationDocs from "./pages/docs/react-ui-components/ReactEmailVerificationDocs";

const ProtectedRoute = ({ Component }) => {
  const { isAuthenticated, isVerified, loading } = useAuth();

  // Show loader while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  // ✅ Step 1: Not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Step 2: Logged in but not verified → go to verify email
  if (!isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // ✅ Step 3: Authenticated + verified → show route
  return Component ? (
    <Component>
      <Outlet />
    </Component>
  ) : (
    <Outlet />
  );
};

// ✅ Main AppContent
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App min-h-screen bg-black transition-colors duration-200">
      <ScrollToTop />
      <Routes>
        {/* ===== Public Routes ===== */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Home />} />
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
          <Route
            path="forgot-password"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <ForgotPasswordPage />
              )
            }
          />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* ✅ Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={DashboardLayout} />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="app/:id" element={<AppDetail />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="apikeys" element={<ApiKeysPage />} />
          <Route path="admin-report" element={<AdminReportPage />} />
          <Route path="apps" element={<ApplicationsPage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        {/* ✅ Public Docs */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Introduction />} />
          <Route path="installation" element={<Installation />} />
          <Route
            path="authix-sdk-introduction"
            element={<AuthixSdkIntroduction />}
          />
          <Route
            path="authix-sdk-installation"
            element={<AuthixSdkInstallation />}
          />
          <Route
            path="auth-and-user-management"
            element={<AuthUserManagement />}
          />
          <Route path="app-data-management" element={<AppDataManagement />} />
          <Route path="user-data-management" element={<UserDataManagement />} />
          <Route path="react-setup-docs" element={<ReactSetupDocs />} />
          <Route
            path="react-user-login-docs"
            element={<ReactUserLoginDocs />}
          />
          <Route
            path="react-user-signup-docs"
            element={<ReactUserSignUpDocs />}
          />
          <Route
            path="react-user-verify-docs"
            element={<ReactEmailVerificationDocs />}
          />
          <Route
            path="react-user-profile-docs"
            element={<ReactUserProfileDocs />}
          />
          <Route
            path="react-user-button-docs"
            element={<ReactUserButtonDocs />}
          />
          <Route
            path="react-signin-component-docs"
            element={<ReactSignedInDocs />}
          />
          <Route
            path="react-signout-component-docs"
            element={<ReactSignedOutDocs />}
          />
        </Route>

        {/* ✅ Email Verification Page */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* ✅ Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            className:
              "rounded-xl text-xs font-medium shadow-md !bg-green-600 !text-white",
            style: {
              padding: "10px 14px",
              backdropFilter: "blur(10px)",
            },
            duration: 3000,
          }}
          containerStyle={{
            top: 20,
            right: 20,
            fontSize: 13,
          }}
        />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
