import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateId, hashOTP, verifyHashedOTP } from "../utils/crypto.js";
import { sendOtpEmail } from "../utils/mailer.js";
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
      { expiresIn: "7d" },
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

    if (!email || !password || !appId) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and appId are required",
      });
    }

    // 1️⃣ Verify app
    const app = await prisma.app.findFirst({
      where: { id: appId, isActive: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Invalid or inactive app",
      });
    }

    // 2️⃣ Find user
    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        appId,
        isActive: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");

    // 4️⃣ Create JWT (NOT stored)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        appId: user.appId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("authix_session", token, {
      httpOnly: true, // JS cannot access the cookie
      secure: isProduction, // true in prod (HTTPS), false in dev
      sameSite: isProduction ? "none" : "lax", // none for prod cross-origin, lax for dev/local
      maxAge: 24 * 60 * 60 * 1000, // ✅ 24 hours
      path: "/", // cookie valid for entire site
    });

    // 7️⃣ Return SAFE user data
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        appId: user.appId,
        avatarUrl: user.avatarUrl,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("UserLogin Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * 🔐 Check current authentication session (cookie-based)
 **/
export const getSession = async (req, res) => {
  try {
    const token = req.cookies?.authix_session; // ✅ safely access cookie

    if (!token) {
      return res.status(200).json({ authenticated: false });
    }

    // Verify JWT safely
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET); // make sure secret matches login
    } catch (err) {
      return res.status(200).json({ authenticated: false });
    }

    // Return safe user info
    return res.status(200).json({
      authenticated: true,
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        appId: payload.appId,
      },
    });
  } catch (err) {
    console.error("getSession error:", err);
    return res.status(500).json({ authenticated: false });
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
    const { appId } = req.query;

    // 1️⃣ Ensure admin context
    const adminId = req.admin?.id;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        exists: false,
        message: "Unauthorized",
      });
    }

    // 2️⃣ Validate appId
    if (!appId) {
      return res.status(400).json({
        success: false,
        exists: false,
        message: "App ID is required",
      });
    }

    // 3️⃣ Verify app ownership
    const appExists = await prisma.app.findFirst({
      where: { id: appId, adminId },
      select: { id: true },
    });

    if (!appExists) {
      return res.status(404).json({
        success: false,
        exists: false,
        message: "App not found or access denied",
      });
    }

    // 4️⃣ Ultra-light existence check
    const exists = await prisma.user.count({
      where: {
        id: userId,
        adminId,
        appId,
      },
    });

    // 5️⃣ Return boolean ONLY
    return res.status(200).json({
      success: true,
      exists: Boolean(exists),
    });
  } catch (err) {
    console.error("CheckUser Error:", err);
    return res.status(500).json({
      success: false,
      exists: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Send email verification OTP for user
 * @route POST /api/users/send-verify-otp
 * @access Public (requires email + appId)
 */
export const sendUserVerifyOTP = async (req, res) => {
  try {
    const { email, appId } = req.body;
    const userId = req.params.id;

    if (!email || !appId) {
      return res.status(400).json({
        success: false,
        message: "'email' and 'appId' are required in request body",
      });
    }

    // ✅ Check if app exists
    const app = await prisma.app.findFirst({
      where: { id: appId },
      select: { id: true, applicationName: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // ✅ Check if user exists and is active
    const user = await prisma.user.findFirst({
      where: { id: userId, email: email.toLowerCase(), appId, isActive: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or inactive in this app",
      });
    }

    // ✅ Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // ✅ Generate OTP + hash + expiry
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await hashOTP(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { otp: otpHash, otpExpiry },
    });

    // ✅ Send OTP email
    const emailSent = await sendOtpEmail(
      user.email,
      otp,
      app.applicationName,
      "verification",
    );

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
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
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

    // 1. Check if app exists
    const app = await prisma.app.findUnique({
      where: { id: appId },
      select: { id: true, applicationName: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 2. Check if user exists and is active
    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase(), appId, isActive: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Generate OTP + hash + expiry
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await hashOTP(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: { otp: otpHash, otpExpiry },
    });

    // 4. Send OTP email using unified mailer
    const emailSent = await sendOtpEmail(
      user.email,
      otp,
      app.applicationName,
      "reset",
    );

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent",
    });
  } catch (err) {
    console.error("UserForgotPassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
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
    // 1. Extract userId and appId from body
    const { userId, appId } = req.body;
    if (!userId || !appId) {
      return res.status(400).json({
        success: false,
        message: "'userId' and 'appId' are required in the request body",
      });
    }

    // 2. Check if app exists
    const app = await prisma.app.findUnique({
      where: { id: appId },
      select: { id: true, applicationName: true },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // 3. Fetch user securely only if they belong to this app
    const user = await prisma.user.findFirst({
      where: { id: userId, appId: appId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        avatarUrl: true,
        isActive: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for this app",
      });
    }

    // 4. Return secure profile
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
