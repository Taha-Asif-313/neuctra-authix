import express from "express";
import {
  signupAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
  generateNewApiKey,
  revokeApiKey,
  getApiKey,
  generateAdminReport,
  getAdminReport,
  sendVerifyOTP,
  verifyEmail,
  forgotPassword,
  changePassword,
  resetPassword,
} from "../controllers/adminAuthController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================================
   🚀 Admin Authentication Routes
   ================================ */

// 🔹 Register a new admin
router.post("/signup", signupAdmin);

// 🔹 Login existing admin (returns token + apiKey)
router.post("/login", loginAdmin);

/* ================================
   📧 Email Verification
   ================================ */

// 🔹 Send OTP to admin’s email (requires login)
router.post("/send-verify-otp", authMiddleware, sendVerifyOTP);

// 🔹 Verify admin’s email with OTP
router.post("/verify-email", verifyEmail);

/* ================================
   🔑 Password Reset / Change
   ================================ */

// 🔹 Forgot password: send OTP to email
router.post("/forgot-password", forgotPassword);

// 🔹 Reset password using email + OTP
router.post("/reset-password", resetPassword);

// 🔹 Change password (requires login)
router.post("/change-password", authMiddleware, changePassword);

/* ================================
   👤 Admin Profile & Management
   ================================ */

// 🔹 Get logged-in admin profile
router.get("/profile", authMiddleware, getAdminProfile);

// 🔹 Update admin info (e.g., name, email, etc.)
router.put("/edit/:id", authMiddleware, updateAdmin);

// 🔹 Delete an admin (along with apps + users)
router.delete("/:adminId", authMiddleware, deleteAdmin);

/* ================================
   🔑 API Key Management
   ================================ */

// 🔹 Generate a new API key for the admin
router.post("/api-key/generate", authMiddleware, generateNewApiKey);

// 🔹 Revoke (invalidate) an existing API key
router.post("/api-key/revoke", authMiddleware, revokeApiKey);

// 🔹 Get current active API key
router.get("/api-key", authMiddleware, getApiKey);

/* ================================
   📊 Reports
   ================================ */

// 🔹 Download a detailed admin report (e.g. CSV/PDF)
router.get("/download-report", authMiddleware, generateAdminReport);

// 🔹 View admin report in JSON format
router.get("/report", authMiddleware, getAdminReport);

export default router;
