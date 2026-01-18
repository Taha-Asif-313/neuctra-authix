import prisma from "../prisma.js";
import { generateId } from "../utils/crypto.js";

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
    const body = req.body;

    // accept both { item } or direct object
    const item = body.item || body;

    if (!appId || !dataCategory || !item || typeof item !== "object") {
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
      id: item.id || generateId(), // ✅ single ID source
      dataCategory,
      createdAt: new Date().toISOString(),
      ...item,
    };

    const updatedData = [...(app.appData || []), newItem];

    await prisma.app.update({
      where: { id: appId },
      data: { appData: updatedData },
    });

    return res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (err) {
    console.error("AddAppDataItem Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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
    const { category } = req.query;

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id, isActive: true },
      select: { appData: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or unauthorized",
      });
    }

    let data = Array.isArray(app.appData) ? app.appData : [];

    if (category) {
      data = data.filter((item) => item.dataCategory === category);
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("GetAllAppData Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized or app not found" });
    }

    const item = (app.appData || []).find((i) => i.id === itemId);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error("GetSingleAppDataItem Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/* =====================================================
   🔍 SEARCH APP DATA BY DYNAMIC KEYS (BODY BASED)
   @route   POST /api/apps/:appId/data/searchByKeys
   @access  Private (Admin only)
   @body    { sellerId, buyerId, status, ... any field }
   @desc    Deep search appData array - finds ALL objects 
            where ANY filter key matches at ANY nesting level
   ===================================================== */
export const searchAppDataByKeys = async (req, res) => {
  try {
    const { appId } = req.params;
    const filters = req.body || {};

    // ❌ No filters provided
    if (!filters || Object.keys(filters).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one search filter is required",
      });
    }

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

    const data = Array.isArray(app.appData) ? app.appData : [];

    /* =====================================================
       🔁 DEEP SEARCH HELPER (ANY LEVEL, ANY KEY)
       ===================================================== */
    const searchData = (params, data) => {
      const validParams = Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      );

      if (validParams.length === 0) return [];

      const hasMatch = (obj, key, value) => {
        if (obj == null) return false;

        // direct key match
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const target = obj[key];

          // number → exact match
          if (typeof target === "number") {
            return target === Number(value);
          }

          // string → partial match
          if (typeof target === "string") {
            return target
              .toLowerCase()
              .includes(String(value).toLowerCase());
          }
        }

        // deep search
        if (typeof obj === "object") {
          return Object.values(obj).some((v) =>
            typeof v === "object"
              ? hasMatch(v, key, value)
              : typeof v === "string"
                ? v.toLowerCase().includes(String(value).toLowerCase())
                : false,
          );
        }

        return false;
      };

      return data.filter((item) =>
        validParams.some(([key, value]) =>
          hasMatch(item, key, value),
        ),
      );
    };

    // ✅ APPLY FILTERS (FIX)
    const searchedData = searchData(filters, data);

    return res.status(200).json({
      success: true,
      totalItems: searchedData.length, // ✅ FIX
      data: searchedData,
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

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized or app not found" });
    }

    let updatedItem = null;

    const updatedData = (app.appData || []).map((item) => {
      if (item.id === itemId) {
        updatedItem = {
          ...item,
          ...updates,
          id: item.id, // 🔒 protect
          dataCategory: item.dataCategory,
          updatedAt: new Date().toISOString(),
        };
        return updatedItem;
      }
      return item;
    });

    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    await prisma.app.update({
      where: { id: appId },
      data: { appData: updatedData },
    });

    return res.status(200).json({ success: true, data: updatedItem });
  } catch (err) {
    console.error("UpdateAppDataItem Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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

    const app = await prisma.app.findFirst({
      where: { id: appId, adminId: req.admin.id },
      select: { appData: true },
    });

    if (!app) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized or app not found" });
    }

    const item = (app.appData || []).find((i) => i.id === itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const updatedData = (app.appData || []).filter((i) => i.id !== itemId);

    await prisma.app.update({
      where: { id: appId },
      data: { appData: updatedData },
    });

    return res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error("DeleteAppDataItem Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
