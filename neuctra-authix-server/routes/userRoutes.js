import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
  getProfile,
  sendUserVerifyOTP,
  verifyUserEmail,
  userForgotPassword,
  userResetPassword,
  changeUserPassword,
  checkUser,
  getSession,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   👤 USER AUTHENTICATION & MANAGEMENT
   =================================================== */

// 🔹 Signup a new user (requires admin authorization)
router.post("/signup", authMiddleware, signupUser);

// 🔹 Login an existing user (public route, no admin required typically)
// If you want admin-only login, keep authMiddleware
router.post("/login", authMiddleware, loginUser);

// 🔹 Get current session info (requires user auth token)
router.get("/session", authMiddleware, getSession);

// 🔹 Get profile of logged-in user (requires user auth token)
router.post("/profile", authMiddleware, getProfile);

// 🔹 Get list of users under an app (requires admin auth & appId)
router.get("/list/:appId", authMiddleware, getUsers);

// 🔹 Update a user's info by ID (requires admin auth)
router.put("/update/:id", authMiddleware, updateUser);

// 🔹 Change a user's password by ID (requires admin auth)
router.put("/change-password/:id", authMiddleware, changeUserPassword);

// 🔹 Delete a user by ID (requires admin auth)
router.delete("/delete/:userId", authMiddleware, deleteUser);

// 🔹 Check a specific user by ID (requires admin auth)
router.get("/check-user/:id", authMiddleware, checkUser);

/* ===================================================
   ✉️ EMAIL VERIFICATION & PASSWORD RESET
   =================================================== */

// -------- Email Verification Routes --------
// Send verification OTP to user (requires admin auth)
router.post("/send-verify-otp/:id", authMiddleware, sendUserVerifyOTP);

// Verify user's email (public route, user clicks link or submits OTP)
router.post("/verify-email", verifyUserEmail);

// -------- Forgot / Reset Password Routes --------
// Request password reset (public)
router.post("/forgot-password", userForgotPassword);

// Reset password using token from email (public)
router.post("/reset-password", userResetPassword);

export default router;
