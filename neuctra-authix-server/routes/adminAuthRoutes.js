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
  // ✅ New controllers
  sendVerifyOTP,
  verifyEmail,
  forgotPassword,
  changePassword,
} from "../controllers/adminAuthController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===== Admin Auth Routes =====
router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

// ===== Email Verification =====
router.post("/send-verify-otp", authMiddleware, sendVerifyOTP); // send OTP
router.post("/verify-email", verifyEmail); // verify email with OTP

// ===== Password Reset =====
router.post("/forgot-password", forgotPassword); // send reset OTP
router.post("/change-password", authMiddleware, changePassword); // reset with OTP

// ===== Admin Profile & Management =====
router.get("/profile", authMiddleware, getAdminProfile);
router.put("/edit/:id", authMiddleware, updateAdmin);
router.delete("/:id", authMiddleware, deleteAdmin);

// ===== API Key Management =====
router.post("/api-key/generate", authMiddleware, generateNewApiKey);
router.post("/api-key/revoke", authMiddleware, revokeApiKey);
router.get("/api-key", authMiddleware, getApiKey);

// ===== Reports =====
router.get("/download-report", authMiddleware, generateAdminReport);
router.get("/report", authMiddleware, getAdminReport);

export default router;
