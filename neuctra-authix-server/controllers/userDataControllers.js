import prisma from "../prisma.js";
import { generateId } from "../utils/crypto.js";

/**
 * @desc    Get ALL users' data for a specific app
 * @route   GET /api/users/app/:appId/data
 * @access  Private (Admin only)
 */
export const getAllUsersData = async (req, res) => {
  try {
    const appId = req.params.id;

    // Find all users belonging to this admin + matched appId
    const users = await prisma.user.findMany({
      where: {
        adminId: req.admin.id,
        appId: appId,
      },
      select: {
        id: true,
        data: true,
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this app",
      });
    }

    // Combine all user.data arrays into one array
    const allData = users.flatMap((u) => u.data || []);

    return res.status(200).json({
      success: true,
      message: "All users' data fetched successfully",
      totalUsers: users.length,
      totalItems: allData.length,
      data: allData,
    });
  } catch (err) {
    console.error("GetAllUsersData Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc    Get user's data (array of JSON objects)
 * @route   GET /api/users/:id/data
 * @access  Private (Admin only)
 */
export const getUserData = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: { id, adminId: req.admin.id },
      select: { id: true, data: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: user.data || [],
    });
  } catch (err) {
    console.error("GetUserData Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc    Get a single JSON object from user's data array by object id
 * @route   GET /api/users/:id/data/:dataId
 * @access  Private (Admin only)
 */
export const getSingleUserData = async (req, res) => {
  try {
    const { id, dataId } = req.params;

    const user = await prisma.user.findFirst({
      where: { id, adminId: req.admin.id },
      select: { id: true, data: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    const dataArray = user.data || [];
    const object = dataArray.find((obj) => obj.id === dataId);

    if (!object) {
      return res.status(404).json({
        success: false,
        message: "Data object not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single data object fetched successfully",
      data: object,
    });
  } catch (err) {
    console.error("GetSingleUserData Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc    Search ALL users' data by category from a specific app
 * @route   GET /api/users/app/:appId/data/category/:category
 * @access  Private (Admin only)
 */
export const searchAllUsersDataFromApp = async (req, res) => {
  try {
    const { appId, category } = req.params;

    // ✅ Validate inputs
    if (!appId || !category) {
      return res.status(400).json({
        success: false,
        message: "appId and category are required",
      });
    }

    const normalizedCategory = category.toLowerCase().trim();

    // Fetch all users for this app & admin
    const users = await prisma.user.findMany({
      where: {
        adminId: req.admin.id,
        appId,
      },
      select: {
        id: true,
        data: true,
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this app",
      });
    }

    // Flatten all user data and attach userId for reference
    let allData = users.flatMap((user) =>
      (Array.isArray(user.data) ? user.data : []).map((item) => ({
        ...item,
        userId: user.id,
      })),
    );

    // 🎯 Filter by category
    const filteredData = allData.filter(
      (item) => item?.dataCategory?.toLowerCase?.() === normalizedCategory,
    );

    if (filteredData.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No data found with category: ${category}`,
        category: normalizedCategory,
        totalItems: 0,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `Data found with category: ${category}`,
      category: normalizedCategory,
      totalItems: filteredData.length,
      data: filteredData,
    });
  } catch (err) {
    console.error("SearchAllUsersDataFromApp Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Search ALL users' data for a specific app
 * @route   GET /api/users/app/:appId/data/search
 * @access  Private (Admin only)
 */
export const searchAllUsersData = async (req, res) => {
  try {
    const { appId } = req.params;
    let { id, q, category } = req.query;

    // ✅ Normalize category (string | string[])
    if (Array.isArray(category)) {
      category = category[0];
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({
        success: false,
        message: "category query param is required",
      });
    }

    const normalizedCategory = category.toLowerCase().trim();

    const users = await prisma.user.findMany({
      where: {
        adminId: req.admin.id,
        appId,
      },
      select: { data: true },
    });

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    let allData = users.flatMap((u) => u.data || []);

    // 🎯 Category filter (FIXED)
    allData = allData.filter(
      (item) => item?.dataCategory?.toLowerCase?.() === normalizedCategory,
    );

    // 🔍 Filter by data id
    if (id) {
      allData = allData.filter((item) => item.id === id);
    }

    // 🔎 Keyword search
    if (q) {
      const keyword = String(q).toLowerCase();
      allData = allData.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(keyword),
      );
    }

    return res.status(200).json({
      success: true,
      category: normalizedCategory,
      totalItems: allData.length,
      data: allData,
    });
  } catch (err) {
    console.error("SearchAllUsersData Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Search data for a single user
 * @route   GET /api/users/:id/data/search
 * @access  Private (Admin only)
 */
export const searchUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
    let { id, q, category } = req.query;

    // ✅ Normalize category (string | string[])
    if (Array.isArray(category)) {
      category = category[0];
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({
        success: false,
        message: "category query param is required",
      });
    }

    const normalizedCategory = category.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: { id: userId, adminId: req.admin.id },
      select: { id: true, data: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    let data = user.data || [];

    // 🎯 Category filter
    data = data.filter(
      (item) => item?.dataCategory?.toLowerCase?.() === normalizedCategory,
    );

    // 🔍 Filter by data id
    if (id) {
      data = data.filter((item) => item.id === id);
    }

    // 🔎 Keyword search
    if (q) {
      const keyword = String(q).toLowerCase();
      data = data.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(keyword),
      );
    }

    return res.status(200).json({
      success: true,
      category: normalizedCategory,
      totalItems: data.length,
      data,
    });
  } catch (err) {
    console.error("SearchUserData Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const searchUserDataByKeys = async (req, res) => {
  try {
    const { userId } = req.params;
    let { ...filters } = req.query;

    const deepMatch = (obj, key, value) => {
      if (obj == null) return false;

      // Direct match
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        String(obj[key]) === String(value)
      ) {
        return true;
      }

      // Search nested objects / arrays
      if (typeof obj === "object") {
        return Object.values(obj).some((v) =>
          typeof v === "object" ? deepMatch(v, key, value) : false,
        );
      }

      return false;
    };

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        adminId: req.admin.id,
      },
      select: {
        id: true,
        data: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    let data = Array.isArray(user.data) ? user.data : [];

    // 2️⃣ Dynamic key-value filters (OPTIONAL)
    if (Object.keys(filters).length > 0) {
      data = data.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          deepMatch(item, key, value),
        ),
      );
    }

    return res.status(200).json({
      success: true,
      totalItems: data.length,
      data,
    });
  } catch (error) {
    console.error("SearchUserData Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Search ALL users' data by dynamic keys within a specific app
 * @route   GET /api/users/app/:appId/data/searchByKeys
 * @access  Private (Admin only)
 */
export const searchAllUsersDataByKeys = async (req, res) => {
  try {
    const { appId } = req.params;
    let filters = { ...req.query }; // dynamic key-value filters

    // Fetch all users for this app & admin
    const users = await prisma.user.findMany({
      where: { adminId: req.admin.id, appId },
      select: { id: true, data: true },
    });

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found for this app",
      });
    }

    // Flatten all data and attach userId for context
    let allData = users.flatMap((user) =>
      (Array.isArray(user.data) ? user.data : []).map((item) => ({
        ...item,
        userId: user.id,
      })),
    );

    // Deep match helper for nested objects
    const deepMatch = (obj, key, value) => {
      if (obj == null) return false;

      // Direct match
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        String(obj[key]) === String(value)
      ) {
        return true;
      }

      // Recursively check nested objects / arrays
      if (typeof obj === "object") {
        return Object.values(obj).some((v) =>
          typeof v === "object" ? deepMatch(v, key, value) : false,
        );
      }

      return false;
    };

    // Apply dynamic key-value filters
    if (Object.keys(filters).length > 0) {
      allData = allData.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          deepMatch(item, key, value),
        ),
      );
    }

    return res.status(200).json({
      success: true,
      totalItems: allData.length,
      data: allData,
    });
  } catch (error) {
    console.error("SearchAllUsersDataByKeys Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Add new data to a user's account (only if the user is verified)
 * @route   POST /api/users/:id/data
 * @access  Private (Admin only)
 */
export const addUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { dataCategory, ...payload } = req.body;

    /* ---------------------------------------------------------------------- */
    /* 🧩 VALIDATION */
    /* ---------------------------------------------------------------------- */

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return res.status(400).json({
        success: false,
        message: "Please send valid data in JSON format.",
      });
    }

    if (!dataCategory || typeof dataCategory !== "string") {
      return res.status(400).json({
        success: false,
        message: "dataCategory is required and must be a string.",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔍 USER VALIDATION */
    /* ---------------------------------------------------------------------- */

    const user = await prisma.user.findFirst({
      where: {
        id,
        adminId: req.admin.id,
      },
      select: {
        id: true,
        data: true,
        appId: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "We couldn’t find this user under your account.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify the account from profile",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔥 FREE PLAN LIMIT CHECK (1000 TOTAL USER DOCS) */
    /* ---------------------------------------------------------------------- */

    if (req.admin.subscriptionPackage === "free") {
      const allUsers = await prisma.user.findMany({
        where: {
          appId: user.appId,
          adminId: req.admin.id,
        },
        select: { data: true },
      });

      const totalUserDocs = allUsers.reduce((total, u) => {
        const count = Array.isArray(u.data) ? u.data.length : 0;
        return total + count;
      }, 0);

      if (totalUserDocs >= 1000) {
        return res.status(403).json({
          success: false,
          limitReached: true,
          message:
            "Free plan limit reached (1000 user documents). Please upgrade your plan.",
          current: totalUserDocs,
          max: 1000,
        });
      }
    }

    /* ---------------------------------------------------------------------- */
    /* ✅ SAVE DATA */
    /* ---------------------------------------------------------------------- */

    const objectWithId = {
      id: generateId(),
      dataCategory: dataCategory.toLowerCase(),
      createdAt: new Date().toISOString(),
      ...payload,
    };

    const updatedData = [...(user.data || []), objectWithId];

    await prisma.user.update({
      where: { id },
      data: { data: updatedData },
    });

    return res.status(200).json({
      success: true,
      message: "Your data was added successfully!",
      data: objectWithId,
    });
  } catch (error) {
    console.error("❌ addUserData Error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "The user you are trying to update does not exist.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while saving the data. Please try again later.",
    });
  }
};

/**
 * @desc    Update a JSON object in user's data array by object id
 * @route   PUT /api/users/:id/data/:dataId
 * @access  Private (Admin only)
 */
export const updateUserData = async (req, res) => {
  try {
    const { id, dataId } = req.params;
    const updatedObject = req.body;

    /* ---------------------------------------------------------------------- */
    /* 🧩 VALIDATION */
    /* ---------------------------------------------------------------------- */

    if (
      !updatedObject ||
      typeof updatedObject !== "object" ||
      Array.isArray(updatedObject)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid JSON data to update",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔍 USER VALIDATION */
    /* ---------------------------------------------------------------------- */

    const user = await prisma.user.findFirst({
      where: {
        id,
        adminId: req.admin.id,
      },
      select: {
        id: true,
        data: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "User account must be verified to update data",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔍 DATA VALIDATION & UPDATE */
    /* ---------------------------------------------------------------------- */

    let dataArray = user.data || [];
    if (!Array.isArray(dataArray)) dataArray = [];

    // Find object by its id
    const index = dataArray.findIndex((obj) => obj.id === dataId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Data object not found",
      });
    }

    // Preserve important fields, update others
    const existingObject = dataArray[index];
    const updatedData = {
      ...existingObject,
      ...updatedObject,
      id: existingObject.id, // Preserve original ID
      dataCategory: existingObject.dataCategory, // Preserve category
      createdAt: existingObject.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(), // Add update timestamp
    };

    // Replace the object
    dataArray[index] = updatedData;

    /* ---------------------------------------------------------------------- */
    /* ✅ SAVE UPDATED DATA */
    /* ---------------------------------------------------------------------- */

    await prisma.user.update({
      where: { id },
      data: { data: dataArray },
    });

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedData,
    });
  } catch (err) {
    console.error("❌ UpdateUserData Error:", err);

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "The user you are trying to update does not exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Delete a single JSON object from user's data array by object id
 * @route   DELETE /api/users/:id/data/:dataId
 * @access  Private (Admin only)
 */
export const deleteUserData = async (req, res) => {
  try {
    const { id, dataId } = req.params;

    /* ---------------------------------------------------------------------- */
    /* 🔍 USER VALIDATION */
    /* ---------------------------------------------------------------------- */

    const user = await prisma.user.findFirst({
      where: {
        id,
        adminId: req.admin.id,
      },
      select: {
        id: true,
        data: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "User account must be verified to delete data",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔍 DATA VALIDATION & DELETION */
    /* ---------------------------------------------------------------------- */

    let dataArray = user.data || [];
    if (!Array.isArray(dataArray)) dataArray = [];

    // Check if object exists
    const objectExists = dataArray.some((obj) => obj.id === dataId);
    if (!objectExists) {
      return res.status(404).json({
        success: false,
        message: "Data object not found",
      });
    }

    // Filter out the object to delete
    const newArray = dataArray.filter((obj) => obj.id !== dataId);

    // Get the deleted object for response
    const deletedObject = dataArray.find((obj) => obj.id === dataId);

    /* ---------------------------------------------------------------------- */
    /* ✅ SAVE UPDATED DATA */
    /* ---------------------------------------------------------------------- */

    await prisma.user.update({
      where: { id },
      data: { data: newArray },
    });

    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      deleted: deletedObject,
      remainingCount: newArray.length,
    });
  } catch (err) {
    console.error("❌ DeleteUserData Error:", err);

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "The user you are trying to update does not exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Delete multiple JSON objects from user's data array by object ids
 * @route   DELETE /api/users/:id/data/batch
 * @access  Private (Admin only)
 */
export const deleteMultipleUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { dataIds } = req.body; // Expects array of data IDs

    /* ---------------------------------------------------------------------- */
    /* 🧩 VALIDATION */
    /* ---------------------------------------------------------------------- */

    if (!Array.isArray(dataIds) || dataIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of data IDs to delete",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔍 USER VALIDATION */
    /* ---------------------------------------------------------------------- */

    const user = await prisma.user.findFirst({
      where: {
        id,
        adminId: req.admin.id,
      },
      select: {
        id: true,
        data: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "User account must be verified to delete data",
      });
    }

    /* ---------------------------------------------------------------------- */
    /* 🔍 DATA VALIDATION & DELETION */
    /* ---------------------------------------------------------------------- */

    let dataArray = user.data || [];
    if (!Array.isArray(dataArray)) dataArray = [];

    // Get objects to delete
    const objectsToDelete = dataArray.filter((obj) => dataIds.includes(obj.id));

    if (objectsToDelete.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data objects found with the provided IDs",
      });
    }

    // Filter out the objects to delete
    const newArray = dataArray.filter((obj) => !dataIds.includes(obj.id));

    /* ---------------------------------------------------------------------- */
    /* ✅ SAVE UPDATED DATA */
    /* ---------------------------------------------------------------------- */

    await prisma.user.update({
      where: { id },
      data: { data: newArray },
    });

    return res.status(200).json({
      success: true,
      message: `Successfully deleted ${objectsToDelete.length} data object(s)`,
      deleted: objectsToDelete,
      deletedCount: objectsToDelete.length,
      remainingCount: newArray.length,
    });
  } catch (err) {
    console.error("❌ DeleteMultipleUserData Error:", err);

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "The user you are trying to update does not exist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
