import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @desc    User signup for a specific app
 * @route   POST /api/users/signup
 * @access  Private (App-level, Admin-level)
 */
export const signupUser = async (req, res) => {
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

    // 1. Find app (validate by admin if needed)
    const app = await prisma.app.findFirst({
      where: req.admin
        ? { id: appId, adminId: req.admin.id, isActive: true }
        : { id: appId, isActive: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Invalid or inactive app",
      });
    }

    if (!req.admin && !app.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot signup under an inactive app",
      });
    }

    // 2. Check duplicate user
    const existingUser = await prisma.user.findFirst({
      where: req.admin
        ? { email: email.toLowerCase(), adminId: req.admin.id, appId }
        : { email: email.toLowerCase(), appId },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists for this app",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user first (without token)
    let user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        token: "", // temp empty, will update after token generation
        adminId: req.admin ? req.admin.id : app.adminId,
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
        token: true,
        createdAt: true,
      },
    });

    // 5. Generate JWT with user.id (only for public signup)

    const token = jwt.sign(
      { id: user.id, email: user.email, appId, role: user.role },
      app.appSecret
    );

    // update user with token
    user = await prisma.user.update({
      where: { id: user.id },
      data: { token },
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
        token: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user,
    });
  } catch (err) {
    console.error("SignUpUser Error:", err);
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
 * @desc    User login for a specific app
 * @route   POST /api/users/login
 * @access  Private (App-level, Admin-level)
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password, appId } = req.body;
    const adminId = req.admin?.id || null;

    if (!email || !password || !appId) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and appId are required",
      });
    }

    // 1. Verify app
    const app = await prisma.app.findFirst({
      where: { id: appId, isActive: true },
    });
    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Invalid or inactive app",
      });
    }

    // 2. Find user in this app (and admin if provided)
    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        appId,
        isActive: true,
        ...(adminId ? { adminId } : {}), // only restrict to admin if req.admin exists
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Always issue a fresh token
    const newToken = jwt.sign(
      { id: user.id, email: user.email, appId: user.appId, role: user.role },
      app.appSecret,
      { expiresIn: "7d" }
    );

    // 5. Save token to user record
    await prisma.user.update({
      where: { id: user.id },
      data: { token: newToken },
    });

    // 6. Return user with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatarUrl: user.avatarUrl,
        isActive: user.isActive,
        role: user.role,
        appId: user.appId,
        adminId: user.adminId,
        token: newToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error("UserLogin Error:", err);
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
    const userId = req.params.id;
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
      where: { id: userId, adminId: req.admin.id, appId },
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
    const { userId } = req.params;
    const { appId } = req.body;

    if (!appId) {
      return res.status(400).json({
        success: false,
        message: "App ID is required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId, adminId: req.admin.id, appId },
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
 * @desc    Get logged-in user profile
 * @route   GET /api/users/profile
 * @access  Private (App-level, Admin-level)
 */
export const getProfile = async (req, res) => {
  try {
    // 1. Extract token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Decode token without verification to get appId
    let decodedApp;
    try {
      decodedApp = jwt.decode(token);
      console.log(decodedApp);

      if (!decodedApp?.appId) {
        return res.status(400).json({
          success: false,
          message: "Token is missing appId",
        });
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const app = await prisma.app.findUnique({
      where: { id: decodedApp.appId },
      select: { id: true, appSecret: true },
    });
    console.log(app);

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 3. Verify JWT with appSecret
    let decodedUser;
    try {
      decodedUser = jwt.verify(token, app.appSecret);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 4. Fetch user by ID
    const user = await prisma.user.findUnique({
      where: { id: decodedUser.id },
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
        adminId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Return profile
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("GetProfile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
