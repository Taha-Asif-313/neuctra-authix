import express from "express";
import {
  createApp,
  getApps,
  getAppById,
  updateApp,
  deleteApp,
  toggleAppStatus,
  getAppStatus,
  clearAppData,
} from "../controllers/appController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   🛡️ Protect all App routes with JWT
   =================================================== */
router.use(authMiddleware);

/* ===================================================
   📱 APP MANAGEMENT ROUTES
   =================================================== */

// 🔹 Create a new app (belongs to logged-in admin)
router.post("/create", createApp);

// 🔹 Get all apps belonging to the logged-in admin
router.get("/allapps", getApps);

// 🔹 Get details of a specific app by ID
router.get("/:id", getAppById);

// 🔹 Update app info (name, category, description, etc.) by ID
router.put("/edit/:id", updateApp);

// 🔹 Delete an app by ID (and optionally its users)
router.delete("/delete/:id", deleteApp);

/* ===================================================
   🔄 APP STATUS MANAGEMENT
   =================================================== */

// 🔹 Check if an app is active or inactive
router.get("/:id/status", getAppStatus);

// 🔹 Toggle app status (active ↔ inactive)
router.patch("/status/:id", toggleAppStatus);

// 🔹 Update app data (e.g., name, category, description, platform)
router.patch("/data/clear/:id", clearAppData);

export default router;
