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
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   👤 USER AUTHENTICATION & MANAGEMENT
   =================================================== */

// 🔹 Create a new user (requires admin auth)
router.post("/signup", authMiddleware, signupUser);

// 🔹 Login existing user (requires admin auth)
router.post("/login", authMiddleware, loginUser);

// 🔹 Get profile of logged-in user (requires user token)
router.get("/profile", getProfile);

// 🔹 Get list of users under an app (requires admin auth & appId)
router.post("/list/:appId", authMiddleware, getUsers);

// 🔹 Update user info (requires admin auth)
router.put("/update/:id", authMiddleware, updateUser);

// 🔹 Change user password (requires admin auth)
router.put("/change-password/:id", authMiddleware, changeUserPassword);

// 🔹 Delete user (requires admin auth)
router.delete("/delete/:userId", authMiddleware, deleteUser);

// 🔹 Check user (requires admin auth)
router.get("/check-user/:id", authMiddleware, checkUser);

/* ===================================================
   📂 USER EXTRA DATA ROUTES
   =================================================== */


/* ===================================================
   ✉️ EMAIL VERIFICATION & PASSWORD RESET
   =================================================== */

// -------- Email Verification --------
router.post("/send-verify-otp/:id", authMiddleware, sendUserVerifyOTP); // private
router.post("/verify-email", verifyUserEmail); // public ✅

// -------- Forgot / Reset Password --------
router.post("/forgot-password", userForgotPassword); // public ✅
router.post("/reset-password", userResetPassword); // public ✅

export default router;
