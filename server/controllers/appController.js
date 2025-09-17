import prisma from "../prisma.js";
import { generateId } from "../utils/crypto.js";

/**
 * @desc    Create new App under logged-in Admin
 * @route   POST /api/apps
 * @access  Private (Admin only)
 */
export const createApp = async (req, res) => {
  try {
    const { applicationName, category, description, platform } = req.body;

    if (!applicationName || !category || !description || !platform) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const app = await prisma.app.create({
      data: {
        id: generateId(),
        applicationName,
        category,
        description,
        platform,
        adminId: req.admin.id,
      },
      select: {
        id: true,
        applicationName: true,
        category: true,
        description: true,
        platform: true,
        createdAt: true,
        _count: {
          select: { users: true }
        }
      },
    });

    return res.status(201).json({
      success: true,
      message: "App created successfully",
      data: app,
    });
  } catch (err) {
    console.error("CreateApp Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Get all Apps of logged-in Admin
 * @route   GET /api/apps
 * @access  Private (Admin only)
 */
export const getApps = async (req, res) => {
  try {
    const apps = await prisma.app.findMany({
      where: { adminId: req.admin.id },
      select: {
        id: true,
        applicationName: true,
        category: true,
        description: true,
        isActive: true,
        platform: true,
        updatedAt: true,
        createdAt: true,
        _count: {
          select: { users: true }, // 👈 only return number of users
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Apps fetched successfully",
      data: apps,
    });
  } catch (err) {
    console.error("GetApps Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Get single App by ID
 * @route   GET /api/apps/:id
 * @access  Private (Admin only)
 */
export const getAppById = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await prisma.app.findFirst({
      where: { id: id, adminId: req.admin.id },
      select: {
        id: true,
        applicationName: true,
        category: true,
        description: true,
        platform: true,
        isActive: true,
        updatedAt: true,
        createdAt: true,
        users: true,
      },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "App fetched successfully",
      data: app,
    });
  } catch (err) {
    console.error("GetAppById Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Update App details
 * @route   PUT /api/apps/edit/:id
 * @access  Private (Admin only)
 */
export const updateApp = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationName, category, description, platform } = req.body;

    const app = await prisma.app.findFirst({
      where: { id: id, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    const updatedApp = await prisma.app.update({
      where: { id: app.id },
      data: { applicationName, category, description, platform },
      select: {
        id: true,
        applicationName: true,
        category: true,
        description: true,
        platform: true,
        createdAt: true,
        _count: {
          select: { users: true }, // 👈 only return number of users
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "App updated successfully",
      updatedApp: updatedApp,
    });
  } catch (err) {
    console.error("UpdateApp Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Delete App
 * @route   DELETE /api/apps/delete/:id
 * @access  Private (Admin only)
 */
export const deleteApp = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
      include: { users: true }, // get related users
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // Delete related users first
    if (app.users?.length > 0) {
      await prisma.user.deleteMany({
        where: { appId: app.id },
      });
    }

    // Delete the app
    await prisma.app.delete({ where: { id: app.id } });

    return res.status(200).json({
      success: true,
      message: "App and related users deleted successfully",
    });
  } catch (err) {
    console.error("DeleteApp Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};


/**
 * @desc    Toggle App status (active/inactive)
 * @route   PATCH /api/apps/status/:id
 * @access  Private (Admin only)
 */
export const toggleAppStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the app belonging to the logged-in admin
    const app = await prisma.app.findFirst({
      where: { id: id, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // Toggle the current status
    const updatedApp = await prisma.app.update({
      where: { id: app.id },
      data: { isActive: !app.isActive },
      select: {
        id: true,
        applicationName: true,
        category: true,
        isActive: true,
        description: true,
        platform: true,
        createdAt: true,
        _count: {
          select: { users: true }, // 👈 only return number of users
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: `App status updated to ${
        updatedApp.isActive ? "Active" : "Inactive"
      }`,
      updatedApp: updatedApp,
    });
  } catch (err) {
    console.error("ToggleAppStatus Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
