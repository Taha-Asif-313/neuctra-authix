import express from "express";
import {
  getUserData,
  addUserData,
  updateUserData,
  deleteUserData,
  getSingleUserData,
  getAllUsersData,
  searchAllUsersData,
  searchUserData,
  searchUserDataByKeys,
  searchAllUsersDataByKeys,
} from "../controllers/userDataControllers.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================================
   📂 USER EXTRA DATA ROUTES
   =================================================== */

// GET all users' data for specific app
router.get("/:userId/data/search", authMiddleware, searchUserData);

// 🔹 Get a single object from user's data array by keys
router.get("/:userId/data/searchbyref", authMiddleware, searchUserDataByKeys);

// 🔹 Get a single object from all user's from app data array by keys
router.get("/:appId/data/searchbyref/all", authMiddleware, searchAllUsersDataByKeys);

// GET all users' data for specific app
router.get("/all-data/:id/data", authMiddleware, getAllUsersData);

// GET all users' data for specific app
router.get("/:id/data/search", authMiddleware, searchAllUsersData);

// 🔹 Get all extra data of a user
router.get("/:id/data", authMiddleware, getUserData);

// 🔹 Get a single object from user's data array
router.get("/:id/data/:dataId", authMiddleware, getSingleUserData);

// 🔹 Add a new object to user's data array
router.post("/:id/data", authMiddleware, addUserData);

// 🔹 Update a data object in user's array
router.put("/:id/data/:dataId", authMiddleware, updateUserData);

// 🔹 Delete a data object from user's array
router.delete("/:id/data/:dataId", authMiddleware, deleteUserData);


export default router;
