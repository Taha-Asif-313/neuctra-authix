import express from "express";
import {
  createApp,
  getApps,
  getAppById,
  updateApp,
  deleteApp,
  toggleAppStatus,
} from "../controllers/appController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// all routes protected by JWT
router.use(authMiddleware);

// ===== App Routes =====
router.post("/create", createApp); // Create App
router.get("/allapps", getApps); // Get all Apps
router.get("/:id", getAppById); // Get one App
router.put("/edit/:id", updateApp); // Update App
router.delete("/delete/:id", deleteApp); // Delete App
router.patch("/status/:id", toggleAppStatus);


export default router;
