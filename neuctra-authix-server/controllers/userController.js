import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateId, hashOTP, verifyHashedOTP } from "../utils/crypto.js";
import { sendEmail, sendOTPEmail } from "../utils/mailer.js";
import { comparePassword, hashPassword } from "../utils/password.js";

// ------------------------------------------------------------
// @desc    Register a new user for a specific app
// @route   POST /api/users/signup
// @access  Private (App-level, Admin-level)
// ------------------------------------------------------------
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

    // 1️⃣ Basic validation
    if (!name || !email || !password || !appId) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and appId are required.",
      });
    }

    // 2️⃣ Find app (validate ownership if admin)
    const app = await prisma.app.findFirst({
      where: req.admin
        ? { id: appId, adminId: req.admin.id, isActive: true }
        : { id: appId, isActive: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or inactive.",
      });
    }

    if (!req.admin && !app.isActive) {
      return res.status(403).json({
        success: false,
        message: "Signup is disabled for this app.",
      });
    }

    // 3️⃣ Prevent duplicate user
    const existingUser = await prisma.user.findFirst({
      where: req.admin
        ? { email: email.toLowerCase(), adminId: req.admin.id, appId }
        : { email: email.toLowerCase(), appId },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered for this app.",
      });
    }

    // 4️⃣ Secure password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5️⃣ Create user (initial record)
    let user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        token: "",
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

    // 6️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, appId, role: user.role },
      app.appSecret,
      { expiresIn: "7d" }
    );

    // 7️⃣ Save token to user record
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

    // 8️⃣ Return secure success response
    return res.status(201).json({
      success: true,
      message: "Signup successful.",
      user,
    });
  } catch (err) {
    console.error("SignupUser Error:", err);

    // Prisma unique constraint
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(409).json({
        success: false,
        message: "Email already in use.",
      });
    }

    // Fallback error
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      ...(process.env.NODE_ENV === "development" && { error: err.message }),
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

    // ✅ Validate input
    if (!email || !password || !appId) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and appId are required",
      });
    }

    // ✅ 1. Verify app is active
    const app = await prisma.app.findFirst({
      where: { id: appId, isActive: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Invalid or inactive app",
      });
    }

    // ✅ 2. Find active user in this app (and by admin if applicable)
    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        appId,
        isActive: true,
        ...(adminId ? { adminId } : {}),
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or inactive account",
      });
    }

    // ✅ 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ 4. Issue a fresh token
    const newToken = jwt.sign(
      { id: user.id, email: user.email, appId: user.appId, role: user.role },
      app.appSecret,
      { expiresIn: "7d" }
    );

    console.log("User found:", JSON.stringify(user, null, 2));

    // ✅ 5. Save token & update last login
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        token: newToken,
        updatedAt: new Date(), // Prisma handles this automatically, but explicit is fine
        // lastLogin: new Date(), // optional
        // isOnline: true, // optional
      },
    });

    console.log("Updated User:", JSON.stringify(updatedUser, null, 2));

    // ✅ 6. Return user with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        avatarUrl: updatedUser.avatarUrl,
        isActive: updatedUser.isActive,
        isVerified: updatedUser.isVerified, // fixed reference
        role: updatedUser.role,
        appId: updatedUser.appId,
        adminId: updatedUser.adminId,
        token: newToken,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
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
      user: updatedUser,
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
 * @desc    Check if a user exists (and belongs to the logged-in admin & app)
 * @route   GET /api/users/:id/check
 * @access  Private (Admin only)
 */
export const checkUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { appId } = req.query; // ✅ safer for GET requests

    // ✅ 1. Ensure admin context exists
    const adminId = req.admin?.id;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin credentials missing.",
      });
    }

    // ✅ 2. Validate appId presence
    if (!appId) {
      return res.status(400).json({
        success: false,
        message: "App ID is required.",
      });
    }

    // ✅ 3. Verify app ownership by the logged-in admin
    const app = await prisma.app.findFirst({
      where: { id: appId, adminId },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found or does not belong to this admin.",
      });
    }

    // ✅ 4. Check if user exists under this admin and app
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        adminId,
        appId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        isVerified: true,
        avatarUrl: true,
        appId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        exists: false,
        message: "User not found for this app or admin.",
      });
    }

    // ✅ 5. Return success with user info
    return res.status(200).json({
      success: true,
      exists: true,
      message: "User exists and belongs to this app/admin.",
      user,
    });
  } catch (err) {
    console.error("CheckUser Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

/**
 * @desc Send email verification OTP for user
 * @route POST /api/users/send-verify-otp
 * @access Private (User must be logged in + valid apiKey)
 */
export const sendUserVerifyOTP = async (req, res) => {
  try {
    const userId = req.params?.id;
    const appId = req.headers["x-app-id"]; // enforce app context

    if (!userId || !appId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user or appId",
      });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId, appId, isActive: true },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate OTP + expiry
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await hashOTP(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { id: userId },
      data: { otp: otpHash, otpExpiry },
    });

    const emailSent = await sendOTPEmail(user.email, otp);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent to your registered email",
    });
  } catch (err) {
    console.error("SendUserVerifyOTP Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Verify user email with OTP
 * @route POST /api/users/verify-email
 * @access Public (OTP-based)
 */
export const verifyUserEmail = async (req, res) => {
  try {
    const { email, otp, appId } = req.body;
    if (!email || !otp || !appId) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and appId are required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase(), appId, isActive: true },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired, request a new one",
      });
    }

    const validOtp = await verifyHashedOTP(otp, user.otp);
    if (!validOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, otp: null, otpExpiry: null },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("VerifyUserEmail Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Send reset password OTP for user
 * @route POST /api/users/forgot-password
 * @access Public
 */
export const userForgotPassword = async (req, res) => {
  try {
    const { email, appId } = req.body;
    if (!email || !appId) {
      return res.status(400).json({
        success: false,
        message: "Email and appId are required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase(), appId, isActive: true },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await hashOTP(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { otp: otpHash, otpExpiry },
    });

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your password reset OTP is: <b>${otp}</b></p>`,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent",
    });
  } catch (err) {
    console.error("UserForgotPassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc    Reset user password using OTP (after forgotPassword)
 * @route   POST /api/users/reset-password
 * @access  Public
 */
export const userResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, appId } = req.body;

    if (!email || !otp || !newPassword || !appId) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, new password, and appId are required",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase(), appId, isActive: true },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Check OTP validity
    if (!user.otp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not set, request a new one",
      });
    }

    const validOtp = await verifyHashedOTP(otp, user.otp);
    if (!validOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // ✅ Update password & clear OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    console.error("UserResetPassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Change password (requires current password)
 * @route POST /api/users/change-password
 * @access Private (User only)
 */
export const changeUserPassword = async (req, res) => {
  try {
    const adminId = req.admin?.id;
    const userId = req.params?.id;
    const { currentPassword, newPassword, appId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new passwords are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId, adminId: adminId, appId: appId },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Verify old password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // ✅ Hash new password
    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("ChangeUserPassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
        isVerified: true,
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
      (item) =>
        item?.dataCategory?.toLowerCase?.() === normalizedCategory
    );

    // 🔍 Filter by data id
    if (id) {
      allData = allData.filter((item) => item.id === id);
    }

    // 🔎 Keyword search
    if (q) {
      const keyword = String(q).toLowerCase();
      allData = allData.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(keyword)
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
    const { id: userId } = req.params;
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
      where: {
        id: userId,
        adminId: req.admin.id,
      },
      select: { data: true },
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
      (item) =>
        item?.dataCategory?.toLowerCase?.() === normalizedCategory
    );

    // 🔍 Filter by data id
    if (id) {
      data = data.filter((item) => item.id === id);
    }

    // 🔎 Keyword search
    if (q) {
      const keyword = String(q).toLowerCase();
      data = data.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(keyword)
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
    const updatedObject = req.body; // expects JSON object

    const user = await prisma.user.findFirst({
      where: { id, adminId: req.admin.id },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    let dataArray = user.data || [];
    if (!Array.isArray(dataArray)) dataArray = [];

    // find object by its id
    const index = dataArray.findIndex((obj) => obj.id === dataId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Data object not found",
      });
    }

    // keep the same id, update rest
    dataArray[index] = { ...dataArray[index], ...updatedObject };

    await prisma.user.update({
      where: { id },
      data: { data: dataArray },
    });

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: dataArray,
    });
  } catch (err) {
    console.error("UpdateUserData Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc    Delete a JSON object from user's data array by object id
 * @route   DELETE /api/users/:id/data/:dataId
 * @access  Private (Admin only)
 */
export const deleteUserData = async (req, res) => {
  try {
    const { id, dataId } = req.params;

    const user = await prisma.user.findFirst({
      where: { id, adminId: req.admin.id },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    let dataArray = user.data || [];
    if (!Array.isArray(dataArray)) dataArray = [];

    // filter out by id
    const newArray = dataArray.filter((obj) => obj.id !== dataId);
    if (newArray.length === dataArray.length) {
      return res.status(404).json({
        success: false,
        message: "Data object not found",
      });
    }

    await prisma.user.update({
      where: { id },
      data: { data: newArray },
    });

    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: newArray,
    });
  } catch (err) {
    console.error("DeleteUserData Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
