// appData.routes.js
import express from "express";
import {
  addAppDataItem,
  getAllAppData,
  getSingleAppDataItem,
  updateAppDataItem,
  deleteAppDataItem,
  searchAppDataByKeys,
} from "../controllers/appController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================================
   🛡️ Protect all App routes with JWT
   ================================ */
router.use(authMiddleware);

/* ================================
   📦 App Data Management
   ================================ */

/* 🔹 Add appData item with category */
router.post("/:appId/data/:dataCategory", addAppDataItem);

/* 🔹 Get all appData items */
router.get("/:appId/data", getAllAppData);

/* 🔹 Get single appData item */
router.get("/:appId/data/:itemId", getSingleAppDataItem);

/* 🔹 Search appData by dynamic keys */
router.get("/:appId/data/searchByKeys", searchAppDataByKeys);

/* 🔹 Update appData item */
router.patch("/:appId/data/:itemId", updateAppDataItem);

/* 🔹 Delete appData item */
router.delete("/:appId/data/:itemId", deleteAppDataItem);

export default router;
