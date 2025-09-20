import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// all routes protected by JWT
router.use(authMiddleware);

router.post("/create", createUser);
router.get("/", getUsers);
router.put("/edit/:id", updateUser);
router.delete("/:appid/delete/:id", deleteUser);

export default router;
