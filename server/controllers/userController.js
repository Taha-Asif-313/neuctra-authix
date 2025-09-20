import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import { generateId } from "../utils/crypto.js";

/**
 * @desc    Create new user under logged-in admin
 * @route   POST /api/users
 * @access  Private (Admin only)
 */
export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      appId,
      phone,
      address,
      avatarUrl,
      isActive,
      role,
    } = req.body;

    if (!name || !email || !password || !appId) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and appId are required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
    });
    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or does not belong to you",
      });
    }
    if (!app.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot create user for an inactive app",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email, adminId: req.admin.id },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists under your account",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        id: generateId(),
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        adminId: req.admin.id,
        appId,
        phone: phone || null,
        address: address || null,
        avatarUrl: avatarUrl || null,
        isActive: typeof isActive === "boolean" ? isActive : true,
        role: role || "user",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        avatarUrl: true,
        isActive: true,
        role: true,
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
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

/**
 * @desc    Get all users under a specific app (must belong to logged-in admin)
 * @route   POST /api/users/list
 * @access  Private (Admin only)
 */
export const getUsers = async (req, res) => {
  try {
    const { appId } = req.params;

    if (!appId) {
      return res.status(400).json({
        success: false,
        message: "App ID is required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
    });
    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or does not belong to you",
      });
    }

    const users = await prisma.user.findMany({
      where: { adminId: req.admin.id, appId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        avatarUrl: true,
        isActive: true,
        role: true,
        appId: true,
        createdAt: true,
      },
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
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
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
    const {
      name,
      email,
      password,
      appId,
      phone,
      address,
      avatarUrl,
      isActive,
      role,
    } = req.body;

    if (!appId) {
      return res.status(400).json({
        success: false,
        message: "App ID is required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
    });
    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or does not belong to you",
      });
    }
    if (!app.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot update user under an inactive app",
      });
    }

    const user = await prisma.user.findFirst({
      where: { id, adminId: req.admin.id, appId },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (email && email !== user.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
          adminId: req.admin.id,
          appId,
          NOT: { id: user.id },
        },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use under your account",
        });
      }
    }

    const updateData = {};
    if (typeof name === "string" && name.trim()) updateData.name = name.trim();
    if (typeof email === "string" && email.trim())
      updateData.email = email.toLowerCase();
    if (typeof phone === "string" && phone.trim())
      updateData.phone = phone.trim();
    if (typeof address === "string" && address.trim())
      updateData.address = address.trim();
    if (typeof avatarUrl === "string" && avatarUrl.trim())
      updateData.avatarUrl = avatarUrl.trim();
    if (typeof role === "string" && role.trim()) updateData.role = role.trim();
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (typeof password === "string" && password.trim())
      updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        avatarUrl: true,
        isActive: true,
        role: true,
        appId: true,
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
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

/**
 * @desc    Delete user (only if belongs to logged-in admin & app)
 * @route   DELETE /api/users/:id
 * @access  Private (Admin only)
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { appId } = req.body;

    if (!appId) {
      return res.status(400).json({
        success: false,
        message: "App ID is required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { id, adminId: req.admin.id, appId },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or not authorized to delete",
      });
    }

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
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
