import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ All routes protected by JWT
router.use(authMiddleware);

// Create new user
router.post("/signup", signupUser);

// Login existing user
router.post("/login", loginUser);

// Fetch users (requires appId in body)
router.post("/list/:appId", getUsers);

// Update user (requires appId in body)
router.put("/update/:id", updateUser);

// Delete user (requires appId in body)
router.delete("/delete/:id", deleteUser);

export default router;
