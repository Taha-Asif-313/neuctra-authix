import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
  getProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new user
router.post("/signup", authMiddleware, signupUser);

// Login existing user
router.post("/login", authMiddleware, loginUser);

// Profile of the existing user
router.get("/profile", getProfile);

// Fetch users (requires appId in body)
router.post("/list/:appId", authMiddleware, getUsers);

// Update user (requires appId in body)
router.put("/update/:id", authMiddleware, updateUser);

// Delete user (requires appId in body)
router.delete("/delete/:id", authMiddleware, deleteUser);

export default router;
