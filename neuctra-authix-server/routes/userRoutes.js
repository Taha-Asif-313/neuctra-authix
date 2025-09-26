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
  getSingleUserData, // 👈 added
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new user (requires admin auth)
router.post("/signup", authMiddleware, signupUser);

// Login existing user (requires admin auth)
router.post("/login", authMiddleware, loginUser);

// Profile of the existing user (requires token)
router.get("/profile", getProfile);

// Fetch users (requires appId in body)
router.post("/list/:appId", authMiddleware, getUsers);

// Update user (requires appId in body)
router.put("/update/:id", authMiddleware, updateUser);

// Delete user (requires appId in body)
router.delete("/delete/:id", authMiddleware, deleteUser);

// Get user's extra data array (requires userId in params)
router.get("/:id/data", authMiddleware, getUserData);

// Get a single data object for a user
router.get("/:id/data/:dataId", authMiddleware, getSingleUserData);

// Add a new object to user's data array (requires userId in params)
router.post("/:id/data", authMiddleware, addUserData);

// Update a data object in user's array (requires userId + dataId in params)
router.put("/:id/data/:dataId", authMiddleware, updateUserData);

// Delete a data object from user's array (requires userId + dataId in params)
router.delete("/:id/data/:dataId", authMiddleware, deleteUserData);

export default router;
