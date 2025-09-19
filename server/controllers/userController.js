import prisma from "../prisma.js";
import { generateId } from "../utils/crypto.js";
import bcrypt from "bcrypt";

/**
 * @desc    Create new user under logged-in admin
 * @route   POST /api/users
 * @access  Private (Admin only)
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, appId } = req.body;

    // Check required fields
    if (!name || !email || !password || !appId) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and appId are required",
      });
    }

    // Ensure app belongs to this admin
    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or does not belong to you",
      });
    }

    // Check if email already exists for this admin
    const existingUser = await prisma.user.findFirst({
      where: { email, adminId: req.admin.id },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists under your account",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        id: generateId(),
        name,
        email,
        password: hashedPassword,
        adminId: req.admin.id,
        appId, // 🔹 link user to specific app
      },
      select: {
        id: true,
        name: true,
        email: true,
        appId: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error("CreateUser Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Get all users under logged-in admin
 * @route   GET /api/users
 * @access  Private (Admin only)
 */
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { adminId: req.admin.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("GetUsers Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Update user details (only if belongs to logged-in admin & same app)
 * @route   PUT /api/users/:id
 * @access  Private (Admin only)
 */
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, appId, isActive } = req.body;

    if (!appId) {
      return res.status(400).json({
        success: false,
        message: "App ID is required",
      });
    }

    // Check if user exists under this admin + app
    const user = await prisma.user.findFirst({
      where: {
        id,
        adminId: req.admin.id,
        appId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent duplicate emails inside same admin + app
    if (email && email !== user.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email,
          adminId: req.admin.id,
          appId,
        },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use under your account",
        });
      }
    }

    // Only update allowed fields
    const updateData = {};
    if (typeof name === "string" && name.trim() !== "") {
      updateData.name = name.trim();
    }
    if (typeof email === "string" && email.trim() !== "") {
      updateData.email = email.trim().toLowerCase();
    }
    updateData.isActive = isActive;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        appId: true,
        isActive:true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("UpdateUser Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};


/**
 * @desc    Delete user (only if belongs to logged-in admin & app)
 * @route   DELETE /api/users/delete/:id
 * @access  Private (Admin only)
 */
export const deleteUser = async (req, res) => {
  try {
    const { id, appid } = req.params;

    // Validate
    if (!appid) {
      return res.status(400).json({
        success: false,
        message: "App ID is required",
      });
    }

    // Find user under same admin and app
    const user = await prisma.user.findFirst({
      where: {
        id: id,       // ensure ID is numeric
        adminId: req.admin.id,
        appId: appid,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or not authorized to delete",
      });
    }

    // Delete securely with composite condition
    await prisma.user.delete({
      where: { id: user.id },
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("DeleteUser Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

