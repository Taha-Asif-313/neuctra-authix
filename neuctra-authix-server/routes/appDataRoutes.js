// appData.routes.js
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

/* 🔥 SEARCH — MUST be before :itemId */
router.post("/:appId/data/search/bykeys", searchAppDataByKeys);

/* 🔹 Get single appData item */
router.get("/:appId/data/:itemId", getSingleAppDataItem);

/* 🔹 Update appData item */
router.patch("/:appId/data/:itemId", updateAppDataItem);

/* 🔹 Delete appData item */
router.delete("/:appId/data/:itemId", deleteAppDataItem);

export default router;
