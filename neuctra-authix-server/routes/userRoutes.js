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
  userResetPassword,
  changeUserPassword,
  checkUser,
  getAllUsersData,
  searchAllUsersData,
  searchUserData,
  searchUserDataByKeys,
  searchAllUsersDataByKeys,
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

// GET all users' data for specific app
router.get("/:userId/data/search", authMiddleware, searchUserData);

// 🔹 Get a single object from user's data array by keys
router.get("/:userId/data/searchbyref", authMiddleware, searchUserDataByKeys);

// 🔹 Get a single object from all user's from app data array by keys
router.get("/:appId/data/searchbyref/all", authMiddleware, searchAllUsersDataByKeys);

// GET all users' data for specific app
router.get("/all-data/:id/data", authMiddleware, getAllUsersData);

// GET all users' data for specific app
router.get("/:id/data/search", authMiddleware, searchAllUsersData);

// 🔹 Get all extra data of a user
router.get("/:id/data", authMiddleware, getUserData);

// 🔹 Get a single object from user's data array
router.get("/:id/data/:dataId", authMiddleware, getSingleUserData);

// 🔹 Add a new object to user's data array
router.post("/:id/data", authMiddleware, addUserData);

// 🔹 Update a data object in user's array
router.put("/:id/data/:dataId", authMiddleware, updateUserData);

// 🔹 Delete a data object from user's array
router.delete("/:id/data/:dataId", authMiddleware, deleteUserData);

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
