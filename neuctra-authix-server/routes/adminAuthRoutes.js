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
  sendVerifyOTP,
  verifyEmail,
  forgotPassword,
  changePassword,
  resetPassword,
  getAdminSession,
  logoutAdmin,
  getUserDataById,
  clearUserDataById,
} from "../controllers/adminAuthController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   🚀 ADMIN AUTHENTICATION ROUTES
   =================================================== */

// 🔹 Register a new admin (public)
router.post("/signup", signupAdmin);

// 🔹 Login existing admin (returns JWT token + API key) (public)
router.post("/login", loginAdmin);

router.get("/session", getAdminSession);

router.get("/logout", logoutAdmin)

/* ===================================================
   📧 EMAIL VERIFICATION
   =================================================== */

// 🔹 Send verification OTP to logged-in admin's email (protected)
router.post("/send-verify-otp", authMiddleware, sendVerifyOTP);

// 🔹 Verify admin's email using OTP (public)
router.post("/verify-email", verifyEmail);

/* ===================================================
   🔑 PASSWORD RESET & CHANGE
   =================================================== */

// 🔹 Forgot password: send OTP to email (public)
router.post("/forgot-password", forgotPassword);

// 🔹 Reset password using email + OTP (public)
router.post("/reset-password", resetPassword);

// 🔹 Change password (requires admin login) (protected)
router.post("/change-password", authMiddleware, changePassword);

/* ===================================================
   👤 ADMIN PROFILE & MANAGEMENT
   =================================================== */

// 🔹 Get the profile of the logged-in admin (protected)
router.get("/profile", authMiddleware, getAdminProfile);

// 🔹 Update admin info by ID (e.g., name, email, etc.) (protected)
router.put("/edit/:id", authMiddleware, updateAdmin);

// 🔹 Delete an admin by ID (along with associated apps & users) (protected)
router.delete("/:adminId", authMiddleware, deleteAdmin);

/* ===================================================
   🔑 API KEY MANAGEMENT
   =================================================== */

// 🔹 Generate a new API key for the admin (protected)
router.post("/api-key/generate", authMiddleware, generateNewApiKey);

// 🔹 Revoke (invalidate) an existing API key (protected)
router.post("/api-key/revoke", authMiddleware, revokeApiKey);

// 🔹 Get the current active API key for the admin (protected)
router.get("/api-key", authMiddleware, getApiKey);


router.get("/user/data/:userId", authMiddleware, getUserDataById);
router.patch("/user/data/clear/:userId", authMiddleware, clearUserDataById )

export default router;
