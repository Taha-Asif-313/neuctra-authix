import express from "express";
import {
  addAppDataItem,
  getAllAppData,
  getSingleAppDataItem,
  updateAppDataItem,
  deleteAppDataItem,
  searchAppDataByKeys,
} from "../controllers/appDataItemControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   🛡️ Protect all App Data routes with JWT
   =================================================== */
router.use(authMiddleware);

/* ===================================================
   📦 APP DATA MANAGEMENT ROUTES
   =================================================== */

/* 🔹 Add a new appData item under a specific category */
router.post("/:appId/data/:dataCategory", addAppDataItem);

/* 🔹 Get all appData items for a specific app */
router.get("/:appId/data", getAllAppData);

/* 🔥 SEARCH — must be before :itemId route to avoid conflicts */
/* 🔹 Search appData items by specific keys */
router.post("/:appId/data/search/bykeys", searchAppDataByKeys);

/* 🔹 Get a single appData item by its ID */
router.get("/:appId/data/:itemId", getSingleAppDataItem);

/* 🔹 Update an existing appData item by ID */
router.patch("/:appId/data/:itemId", updateAppDataItem);

/* 🔹 Delete an appData item by ID */
router.delete("/:appId/data/:itemId", deleteAppDataItem);

export default router;
