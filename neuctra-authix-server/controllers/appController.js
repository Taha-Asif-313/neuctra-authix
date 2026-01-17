import prisma from "../prisma.js";
import crypto from "crypto";
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

    // 🔐 Check if admin is verified
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
      select: { isVerified: true },
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

/* =====================================================
   ➕ ADD APP DATA ITEM
   @route   POST /api/apps/:appId/data/:dataCategory
   @access  Private (Admin only)
   @desc    Add a single object into app.appData[].
            Generates a crypto-safe id if not provided.
   @body    { item: object }
   ===================================================== */
export const addAppDataItem = async (req, res) => {
  try {
    const { appId, dataCategory } = req.params;
    const { item } = req.body;

    if (!appId || !item || typeof item !== "object" || !dataCategory) {
      return res.status(400).json({
        success: false,
        message: "appId, dataCategory and item object are required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id, isActive: true },
      select: { appData: true },
    });

    if (!app) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or app not found",
      });
    }

    const newItem = {
      id: item.id || crypto.randomUUID(), // 🔐 crypto ID
      dataCategory, // ✅ add category
      ...item,
    };

    const updatedData = [...(app.appData || []), newItem];

    await prisma.app.update({
      where: { id: appId },
      data: { appData: updatedData },
    });

    return res.status(201).json({
      success: true,
      message: "App data item added successfully",
      data: newItem,
    });
  } catch (err) {
    console.error("AddAppDataItem Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   📦 GET ALL APP DATA ITEMS (OPTIONAL CATEGORY FILTER)
   @route   GET /api/apps/:appId/data
   @access  Private (Admin only)
   @query   category (optional)
   @desc    Retrieve all items in app.appData[].
            If 'category' query param is provided, return only items matching that category.
   ===================================================== */
export const getAllAppData = async (req, res) => {
  try {
    const { appId } = req.params;
    const { category } = req.query; // optional query param

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or unauthorized",
      });
    }

    let data = app.appData || [];

    // ✅ Filter by category if provided
    if (category) {
      data = data.filter((item) => item.dataCategory === category);
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("GetAllAppData Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   🔍 GET SINGLE APP DATA ITEM
   @route   GET /api/apps/:appId/data/:itemId
   @access  Private (Admin only)
   @desc    Retrieve a single item by id
   ===================================================== */
export const getSingleAppDataItem = async (req, res) => {
  try {
    const { appId, itemId } = req.params;

    if (!appId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "appId and itemId are required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or app not found",
      });
    }

    const item = (app.appData || []).find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "App data item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.error("GetSingleAppDataItem Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   🔍 SEARCH APP DATA BY DYNAMIC KEYS
   @route   GET /api/apps/:appId/data/searchByKeys
   @access  Private (Admin only)
   @query   Any dynamic key-value pair (e.g. category, status, shopId, q)
   @desc    Search app.appData[] by dynamic keys (deep match supported)
   ===================================================== */
export const searchAppDataByKeys = async (req, res) => {
  try {
    const { appId } = req.params;
    const { q, ...filters } = req.query; // 🔹 separate keyword search

    const app = await prisma.app.findFirst({
      where: {
        id: appId,
        adminId: req.admin.id,
        isActive: true,
      },
      select: { appData: true },
    });

    if (!app) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or app not found",
      });
    }

    let data = Array.isArray(app.appData) ? app.appData : [];

    /* 🔁 Deep match helper (objects + arrays) */
    const deepMatch = (obj, key, value) => {
      if (obj == null) return false;

      // direct key match
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        String(obj[key]).toLowerCase() === String(value).toLowerCase()
      ) {
        return true;
      }

      // array handling
      if (Array.isArray(obj)) {
        return obj.some((v) => deepMatch(v, key, value));
      }

      // recursive object search
      if (typeof obj === "object") {
        return Object.values(obj).some((v) =>
          typeof v === "object" ? deepMatch(v, key, value) : false,
        );
      }

      return false;
    };

    /* 🔎 Apply key-value filters */
    if (Object.keys(filters).length > 0) {
      data = data.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          deepMatch(item, key, value),
        ),
      );
    }

    /* 🔍 Keyword search (q) */
    if (q) {
      const keyword = String(q).toLowerCase();

      data = data.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(keyword),
      );
    }

    return res.status(200).json({
      success: true,
      totalItems: data.length,
      data,
    });
  } catch (err) {
    console.error("SearchAppDataByKeys Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   ✏️ UPDATE APP DATA ITEM
   @route   PATCH /api/apps/:appId/data/:itemId
   @access  Private (Admin only)
   @desc    Update a single item in app.appData[] by id
   @body    { ...updateFields }
   ===================================================== */
export const updateAppDataItem = async (req, res) => {
  try {
    const { appId, itemId } = req.params;
    const updates = req.body;

    if (!appId || !itemId || !updates || typeof updates !== "object") {
      return res.status(400).json({
        success: false,
        message: "appId, itemId and update data are required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or app not found",
      });
    }

    let found = false;
    const updatedData = (app.appData || []).map((i) => {
      if (i.id === itemId) {
        found = true;
        return { ...i, ...updates };
      }
      return i;
    });

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "App data item not found",
      });
    }

    await prisma.app.update({
      where: { id: appId },
      data: { appData: updatedData },
    });

    return res.status(200).json({
      success: true,
      message: "App data item updated successfully",
    });
  } catch (err) {
    console.error("UpdateAppDataItem Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =====================================================
   🗑️ DELETE APP DATA ITEM
   @route   DELETE /api/apps/:appId/data/:itemId
   @access  Private (Admin only)
   @desc    Remove a single item from app.appData[] by id
   ===================================================== */
export const deleteAppDataItem = async (req, res) => {
  try {
    const { appId, itemId } = req.params;

    if (!appId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "appId and itemId are required",
      });
    }

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized or app not found",
      });
    }

    const filteredData = (app.appData || []).filter((i) => i.id !== itemId);

    if (filteredData.length === (app.appData || []).length) {
      return res.status(404).json({
        success: false,
        message: "App data item not found",
      });
    }

    await prisma.app.update({
      where: { id: appId },
      data: { appData: filteredData },
    });

    return res.status(200).json({
      success: true,
      message: "App data item deleted successfully",
    });
  } catch (err) {
    console.error("DeleteAppDataItem Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
