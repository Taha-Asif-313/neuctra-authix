import express from "express";
import {
  getUserData,
  addUserData,
  updateUserData,
  deleteUserData,
  getSingleUserData,
  getAllUsersData,
  searchAllUsersData,
  searchAllUsersDataFromApp,
  searchUserData,
  searchUserDataByKeys,
  searchAllUsersDataByKeys,
} from "../controllers/userDataControllers.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   📂 USER EXTRA DATA ROUTES
   =================================================== */

/* -------- Search Routes -------- */

// 🔹 Search a specific user's data by query params (protected)
router.get("/:userId/data/search", authMiddleware, searchUserData);

// 🔹 Search a single object from user's data array by specific keys (protected)
router.get("/:userId/data/searchbyref", authMiddleware, searchUserDataByKeys);

// 🔹 Search objects from all users' data within an app by keys (protected)
router.get(
  "/:appId/data/searchbyref/all",
  authMiddleware,
  searchAllUsersDataByKeys,
);

// 🔹 Search all users' data by category from a specific app (protected)
router.get(
  "/app/:appId/category/:category",
  authMiddleware,
  searchAllUsersDataFromApp,
);

// 🔹 Search all users' data for a specific app (protected)
router.get("/all-data/:appId/data", authMiddleware, getAllUsersData);

// 🔹 Search all users' data within an app by query params (protected)
router.get("/:appId/data/search", authMiddleware, searchAllUsersData);

/* -------- User Data CRUD Routes -------- */

// 🔹 Get all extra data of a specific user (protected)
router.get("/:id/data", authMiddleware, getUserData);

// 🔹 Get a single object from a user's data array by dataId (protected)
router.get("/:id/data/:dataId", authMiddleware, getSingleUserData);

// 🔹 Add a new object to a user's data array (protected)
router.post("/:id/data", authMiddleware, addUserData);

// 🔹 Update a data object in a user's array (protected)
router.put("/:id/data/:dataId", authMiddleware, updateUserData);

// 🔹 Delete a data object from a user's array (protected)
router.delete("/:id/data/:dataId", authMiddleware, deleteUserData);

export default router;
