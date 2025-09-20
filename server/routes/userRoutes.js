import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ All routes protected by JWT
router.use(authMiddleware);

// Create new user
router.post("/create", createUser);

// Fetch users (requires appId in body)
router.post("/list/:appId", getUsers);

// Update user (requires appId in body)
router.put("/edit/:id", updateUser);

// Delete user (requires appId in body)
router.delete("/delete/:id", deleteUser);

export default router;
