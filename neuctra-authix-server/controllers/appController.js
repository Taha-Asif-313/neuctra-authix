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

    // 🔐 Check if admin exists and is verified
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
      select: { subscriptionPackage: true, isVerified: true },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!admin.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address before creating apps",
        code: "ADMIN_NOT_VERIFIED",
      });
    }

    // 🚫 Limit apps for free package
    if (admin.subscriptionPackage === "free") {
      const appCount = await prisma.app.count({
        where: { adminId: req.admin.id },
      });

      if (appCount >= 5) {
        return res.status(403).json({
          success: false,
          message:
            "You have reached the maximum number of apps allowed for Free subscription. Please upgrade your package to create more apps.",
          code: "MAX_APPS_REACHED",
        });
      }
    }

    // 🔑 Generate a unique app secret
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
        isActive: true,
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
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            createdAt: true,
          },
        },
        _count: {
          select: { users: true },
        },
      },
    });

    // 🧮 Add total and active user counts
    const enhancedApps = apps.map((app) => {
      const totalUsers = app._count?.users || 0;
      const activeUsers = app.users?.filter((u) => u.isActive).length || 0;

      return {
        ...app,
        totalUsers,
        activeUsers,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Apps fetched successfully",
      data: enhancedApps,
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
        appData: true,
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
   ✏️ UPDATE WHOLE APP DATA (Store JSON in appData Array)
   @route   PUT /api/apps/edit/:id
   @access  Private (Admin only)
   ===================================================== */
export const clearAppData = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔎 Check ownership
    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 🗑 Clear all appData
    const updatedApp = await prisma.app.update({
      where: { id },
      data: {
        appData: [], // 🔥 clear everything
      },
      select: {
        id: true,
        applicationName: true,
        appData: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "All app data cleared successfully",
      data: updatedApp,
    });
  } catch (err) {
    console.error("ClearAppData Error:", err);
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

    // 🔍 Check if app exists and belongs to this admin
    const app = await prisma.app.findFirst({
      where: { id, adminId: req.admin.id },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 🔁 Toggle app active state
    const newStatus = !app.isActive;

    // 🔄 Update app
    const updatedApp = await prisma.app.update({
      where: { id: app.id },
      data: { isActive: newStatus },
      select: {
        id: true,
        applicationName: true,
        category: true,
        isActive: true,
        description: true,
        platform: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 👥 Update all users under this app
    await prisma.user.updateMany({
      where: { appId: app.id },
      data: { isActive: newStatus },
    });

    // 📊 Fetch users count for updated response
    const users = await prisma.user.findMany({
      where: { appId: app.id },
      select: { id: true, name: true, email: true, isActive: true },
    });

    const userCount = users.length;
    const activeCount = users.filter((u) => u.isActive).length;

    return res.status(200).json({
      success: true,
      message: `App and all users set to ${newStatus ? "active" : "inactive"}`,
      data: {
        ...updatedApp,
        users,
        _count: { users: userCount },
        activeUsers: activeCount,
        totalUsers: userCount,
      },
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
