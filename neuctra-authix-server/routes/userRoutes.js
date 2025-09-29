import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
  getProfile,
  getUserData,
  addUserData,
  updateUserData,
  deleteUserData,
  getSingleUserData,
  sendUserVerifyOTP,
  verifyUserEmail,
  userForgotPassword,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/adminAuthController.js";

const router = express.Router();

/* -------------------- AUTH & USER ROUTES -------------------- */

// Create new user (requires admin auth)
router.post("/signup", authMiddleware, signupUser);

// Login existing user (requires admin auth)
router.post("/login", authMiddleware, loginUser);

// Profile of logged-in user (requires user token, not admin)
router.get("/profile", getProfile);

// Fetch users (requires admin auth & appId)
router.post("/list/:appId", authMiddleware, getUsers);

// Update user (requires admin auth)
router.put("/update/:id", authMiddleware, updateUser);

// Update user (requires admin auth)
router.put("/change-password/:id", authMiddleware, changePassword);

// Delete user (requires admin auth)
router.delete("/delete/:id", authMiddleware, deleteUser);

/* -------------------- USER DATA ROUTES -------------------- */

// Get all user extra data
router.get("/:id/data", authMiddleware, getUserData);

// Get a single object from user's data array
router.get("/:id/data/:dataId", authMiddleware, getSingleUserData);

// Add a new object to user's data array
router.post("/:id/data", authMiddleware, addUserData);

// Update a data object in user's array
router.put("/:id/data/:dataId", authMiddleware, updateUserData);

// Delete a data object from user's array
router.delete("/:id/data/:dataId", authMiddleware, deleteUserData);

/* -------------------- OTP & EMAIL VERIFICATION -------------------- */

// Send verification OTP (requires logged-in user token)
router.post("/send-verify-otp", authMiddleware, sendUserVerifyOTP);

// Verify email with OTP (public route)
router.post("/verify-email", authMiddleware, verifyUserEmail);

// Forgot password (public route)
router.post("/forgot-password", authMiddleware, userForgotPassword);

export default router;
