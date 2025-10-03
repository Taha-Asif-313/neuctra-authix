import prisma from "../prisma.js";
import { generateId } from "../utils/crypto.js";

/* =====================================================
   📱 CREATE A NEW APP
   @route   POST /api/apps
   @access  Private (Admin only)
   @desc    Create a new application under the logged-in admin account
   ===================================================== */
export const createApp = async (req, res) => {
  try {
    const { applicationName, category, description, platform } = req.body;

    // 🔎 Validate required fields
    if (!applicationName || !category || !description || !platform) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔑 Generate a unique app secret (used for SDK/API auth)
    const appSecret = generateId();

    // 📁 Create the new app record
    const app = await prisma.app.create({
      data: {
        id: generateId(),
        applicationName,
        category,
        description,
        platform,
        adminId: req.admin.id,
        appSecret,
      },
      select: {
        id: true,
        applicationName: true,
        category: true,
        description: true,
        platform: true,
        appSecret: true,
        createdAt: true,
        isActive:true,
        _count: { select: { users: true } },
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

/* =====================================================
   📂 GET ALL APPS
   @route   GET /api/apps
   @access  Private (Admin only)
   @desc    Fetch all applications owned by the logged-in admin
   ===================================================== */
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
        _count: { select: { users: true } },
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

/* =====================================================
   📄 GET SINGLE APP BY ID
   @route   GET /api/apps/:id
   @access  Private (Admin only)
   @desc    Retrieve details of a specific app
   ===================================================== */
export const getAppById = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
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

/* =====================================================
   ✏️ UPDATE APP DETAILS
   @route   PUT /api/apps/edit/:id
   @access  Private (Admin only)
   @desc    Update application information
   ===================================================== */
export const updateApp = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationName, category, description, platform } = req.body;

    // 🔎 Validate app ownership
    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 🛠️ Update app
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
        _count: { select: { users: true } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "App updated successfully",
      updatedApp,
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

/* =====================================================
   🗑️ DELETE APP
   @route   DELETE /api/apps/delete/:id
   @access  Private (Admin only)
   @desc    Delete an application and all related users
   ===================================================== */
export const deleteApp = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔎 Validate app ownership
    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
      include: { users: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 🧹 Delete related users before deleting the app
    if (app.users?.length > 0) {
      await prisma.user.deleteMany({ where: { appId: app.id } });
    }

    // 🗑️ Delete the app itself
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

/* =====================================================
   🔄 TOGGLE APP STATUS
   @route   PATCH /api/apps/status/:id
   @access  Private (Admin only)
   @desc    Activate or deactivate an app
   ===================================================== */
export const toggleAppStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔎 Validate app ownership
    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 🔁 Toggle isActive
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
        _count: { select: { users: true } },
      },
    });

    return res.status(200).json({
      success: true,
      message: `App status updated to ${
        updatedApp.isActive ? "Active" : "Inactive"
      }`,
      updatedApp,
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

/* =====================================================
   📊 GET APP STATUS
   @route   GET /api/apps/:id/status
   @access  Private (Admin only)
   @desc    Return an app’s name and whether it's active
   ===================================================== */
export const getAppStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
      select: {
        id: true,
        applicationName: true,
        isActive: true,
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
      message: "App status fetched successfully",
      data: {
        name: app.applicationName,
        isActive: app.isActive,
      },
    });
  } catch (err) {
    console.error("GetAppStatus Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
