import express from "express";
import {
  createApp,
  getApps,
  getAppById,
  updateApp,
  deleteApp,
  toggleAppStatus,
  getAppStatus,
} from "../controllers/appController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================================
   🛡️ Protect all App routes with JWT
   ================================ */
router.use(authMiddleware);

/* ================================
   📱 App Management Routes
   ================================ */

// 🔹 Create a new app (belongs to logged-in admin)
router.post("/create", createApp);

// 🔹 Get all apps of the logged-in admin
router.get("/allapps", getApps);

// 🔹 Get details of a specific app by ID
router.get("/:id", getAppById);

// 🔹 Update app info (name, category, description, etc.)
router.put("/edit/:id", updateApp);

// 🔹 Delete an app (and its users)
router.delete("/delete/:id", deleteApp);

/* ================================
   🔄 App Status Management
   ================================ */

// 🔹 Check if app is active or inactive
router.get("/:id/status", getAppStatus);

// 🔹 Toggle app status (active ↔ inactive)
router.patch("/status/:id", toggleAppStatus);

export default router;
