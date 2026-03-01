import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateApiKey, generateId } from "../utils/crypto.js";
import { sendOtpEmail } from "../utils/mailer.js";
import { addMonths } from "date-fns";
import { Parser } from "json2csv";
import prisma from "../prisma.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

/**
 * @desc Signup new admin
 * @route POST /api/admin/signup
 * @access Public
 */
export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🧩 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 📧 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 🔒 3. Strong password policy
    const strongPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
      });
    }

    // 🚫 4. Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email },
    });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Try signing in instead.",
      });
    }

    // 🔑 5. Hash password
    const hashedPassword = await hashPassword(password);

    // 🧠 6. Create admin in database
    const admin = await prisma.adminUser.create({
      data: {
        id: generateId(),
        name,
        email,
        password: hashedPassword,
        apiKey: generateApiKey(),
        isVerified: false, // 👈 default false
      },
      include: {
        apps: {
          select: { id: true, applicationName: true, isActive: true },
        },
        users: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // 🎟 7. Generate JWT
    const token = generateToken({ id: admin.id, email: admin.email });

    // 🎉 8. Return consistent response (like login)
    return res.status(201).json({
      success: true,
      message: "Signup successful! Please verify your email to continue.",
      userData: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone || null,
          address: admin.address || null,
          avatarUrl: admin.avatarUrl || null,
          apiKey: admin.apiKey,
          isActive: admin.isActive,
          isVerified: admin.isVerified, // 👈 included
          createdAt: admin.createdAt,
          apps: admin.apps,
          users: admin.users,
        },
      },
    });
  } catch (err) {
    console.error("SignupAdmin Error:", err);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating your account. Please try again later.",
    });
  }
};

/**
 * @desc Login admin
 * @route POST /api/admin/login
 * @access Public
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Environment check
    const isProduction = process.env.NODE_ENV === "production";

    // 🔍 Find admin by email
    const admin = await prisma.adminUser.findUnique({
      where: { email },
      include: {
        apps: {
          select: { id: true, applicationName: true, isActive: true },
        },
        users: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 🚫 Block inactive admins
    if (!admin.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "Account is disabled" });
    }

    // 🔑 Validate password
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 🎟 Generate JWT
    const token = generateToken({
      id: admin.id,
      email: admin.email,
    });

    // 🍪 Set secure cookie
    res.cookie("authix_session", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        address: admin.address,
        avatarUrl: admin.avatarUrl,
        apiKey: admin.apiKey,
        isActive: admin.isActive,
        isVerified: admin.isVerified,
        createdAt: admin.createdAt,
        apps: admin.apps,
        users: admin.users,
      },
    });
  } catch (err) {
    console.error("LoginAdmin Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get Admin Session (for auto-login on frontend)
export const getAdminSession = async (req, res) => {
  try {
    // 🍪 Read cookie
    const token = req.cookies?.authix_session;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 🔐 Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session",
      });
    }

    // 🔍 Find admin
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      include: {
        apps: {
          select: { id: true, applicationName: true, isActive: true },
        },
        users: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Session user not found",
      });
    }

    // 🚫 Block inactive admins
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });
    }

    // ✅ Session valid → send admin + token
    return res.status(200).json({
      success: true,
      token, // ✅ include token
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        address: admin.address,
        avatarUrl: admin.avatarUrl,
        apiKey: admin.apiKey,
        isActive: admin.isActive,
        isVerified: admin.isVerified,
        createdAt: admin.createdAt,
        apps: admin.apps,
        users: admin.users,
      },
    });
  } catch (err) {
    console.error("GetAdminSession Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Logout Admin
export const logoutAdmin = (req, res) => {
  try {
    // Environment check
    const isProduction = process.env.NODE_ENV === "production";

    // 🍪 Clear the cookie
    res.cookie("authix_session", "", {
      httpOnly: true, // JS cannot access
      secure: isProduction, // HTTPS in prod
      sameSite: isProduction ? "none" : "lax",
      maxAge: 0, // Expire immediately
      path: "/", // Cookie valid for entire site
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("LogoutAdmin Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to logout. Please try again.",
    });
  }
};

/**
 * @desc Update admin details
 * @route PUT /api/admin/:id
 * @access Private
 */
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, avatarUrl, password } = req.body;

    // 🔍 Check if admin exists
    const admin = await prisma.adminUser.findUnique({ where: { id } });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // 📝 Prepare update data dynamically
    let updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (address) updatedData.address = address;
    if (avatarUrl) updatedData.avatarUrl = avatarUrl;
    if (password) updatedData.password = await hashPassword(password);

    // ✅ Update admin
    const updatedAdmin = await prisma.adminUser.update({
      where: { id },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        avatarUrl: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    console.error("UpdateAdmin Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc Delete admin (and cascade delete apps/users)
 * @route DELETE /api/admin/:adminId
 * @access Private
 */
export const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res
        .status(400)
        .json({ success: false, message: "Admin ID is required" });
    }

    // ✅ Delete all users directly linked to admin
    await prisma.user.deleteMany({ where: { adminId } });

    // ✅ Delete all apps (and their users)
    const apps = await prisma.app.findMany({ where: { adminId } });
    for (const app of apps) {
      await prisma.user.deleteMany({ where: { appId: app.id } });
      await prisma.app.delete({ where: { id: app.id } });
    }

    // ✅ Delete admin
    await prisma.adminUser.delete({ where: { id: adminId } });

    return res.status(200).json({
      success: true,
      message: "Admin, their apps, and users deleted successfully",
    });
  } catch (err) {
    console.error("DeleteAdmin Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc Send email verification OTP
 * @route POST /api/admin/send-verify-otp
 * @access Private (Admin only)
 */
export const sendVerifyOTP = async (req, res) => {
  try {
    // ✅ Secure: Only logged-in admin can request
    const adminId = req.admin?.id;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin ID missing",
      });
    }

    // ✅ Find user by ID, not by email from body
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // ✅ Already verified → don't send OTP
    if (admin.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // ✅ Generate OTP securely
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // ✅ Save OTP securely
    await prisma.adminUser.update({
      where: { id: adminId },
      data: { otp, otpExpiry },
    });

    // ✅ Send OTP email
    const emailSent = await sendOtpEmail(
      admin.email,
      otp,
      "Neuctra Authix",
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
    console.error("SendVerifyOTP Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Verify email with OTP
 * @route POST /api/admin/verify-email
 * @access Public
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 🔍 1. Find admin by email
    const admin = await prisma.adminUser.findUnique({
      where: { email },
      include: {
        apps: {
          select: { id: true, applicationName: true, isActive: true },
        },
        users: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // ⚠️ 2. Validate OTP and expiry
    if (!admin || admin.otp !== otp || new Date() > admin.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // ✅ 3. Mark verified and clear OTP fields
    const updatedAdmin = await prisma.adminUser.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiry: null },
      include: {
        apps: {
          select: { id: true, applicationName: true, isActive: true },
        },
        users: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // 🎟 4. Generate fresh JWT
    const token = generateToken({
      id: updatedAdmin.id,
      email: updatedAdmin.email,
    });

    // 🎉 5. Return same structure as login/signup
    return res.status(200).json({
      success: true,
      message: "Email verified successfully 🎉",
      userData: {
        token,
        admin: {
          id: updatedAdmin.id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          phone: updatedAdmin.phone || null,
          address: updatedAdmin.address || null,
          avatarUrl: updatedAdmin.avatarUrl || null,
          apiKey: updatedAdmin.apiKey,
          isActive: updatedAdmin.isActive,
          isVerified: updatedAdmin.isVerified, // ✅ true now
          createdAt: updatedAdmin.createdAt,
          apps: updatedAdmin.apps,
          users: updatedAdmin.users,
        },
      },
    });
  } catch (err) {
    console.error("VerifyEmail Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

/**
 * @desc Send reset password OTP
 * @route POST /api/admin/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.adminUser.update({
      where: { email },
      data: { otp, otpExpiry },
    });

    await sendOtpEmail(admin.email, otp, "Neuctra Authix", "reset");

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent",
    });
  } catch (err) {
    console.error("ForgotPassword Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * @desc    Reset password using OTP (after forgotPassword)
 * @route   POST /api/admin/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // ✅ Validate OTP & expiry
    if (admin.otp !== otp || !admin.otpExpiry || new Date() > admin.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ✅ Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // ✅ Update password & clear OTP
    await prisma.adminUser.update({
      where: { email },
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
    console.error("ResetPassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @desc Change password (requires current password)
 * @route POST /api/admin/change-password
 * @access Private (Admin only)
 */
export const changePassword = async (req, res) => {
  try {
    const adminId = req.admin?.id;
    const { currentPassword, newPassword } = req.body;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin ID missing",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new passwords are required",
      });
    }

    const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // ✅ Check current password
    const isMatch = await comparePassword(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // ✅ Hash new password
    const hashedPassword = await hashPassword(newPassword);

    await prisma.adminUser.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("ChangePassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const upgradePackage = async (req, res) => {
  try {
    const { id } = req.params; // admin id
    const { packageType } = req.body; // basic | pro

    const startDate = new Date();
    const endDate = addMonths(startDate, 1); // add 1 month

    const updated = await prisma.adminUser.update({
      where: { id },
      data: {
        subscriptionPackage: packageType,
        subscriptionStartDate: startDate,
        subscriptionEndDate: endDate,
        isPackageValid: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Upgraded to ${packageType} package`,
      data: updated,
    });
  } catch (err) {
    console.error("UpgradePackage Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Example check & reset expired subscription
export const checkAndResetPackages = async () => {
  const now = new Date();
  await prisma.adminUser.updateMany({
    where: {
      subscriptionEndDate: { lte: now },
      isPackageValid: true,
    },
    data: {
      subscriptionPackage: "free",
      isPackageValid: false,
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    },
  });
};

/**
 * @desc    Get current admin profile
 * @route   GET /api/admin/profile
 * @access  Private (Admin only)
 */
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id }, // comes from auth middleware
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        avatarUrl: true,
        apiKey: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: { apps: true, users: true },
        },
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: admin,
    });
  } catch (err) {
    console.error("GetAdminProfile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Generate a new API Key for admin
 * @route   POST /api/admin/api-key/generate
 * @access  Private (Admin only)
 */
export const generateNewApiKey = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const newApiKey = generateApiKey();

    const updatedAdmin = await prisma.adminUser.update({
      where: { id: adminId },
      data: { apiKey: newApiKey },
      select: { id: true, email: true, apiKey: true, updatedAt: true },
    });

    return res.status(200).json({
      success: true,
      message: "New API key generated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    console.error("GenerateNewApiKey Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Revoke admin API Key
 * @route   POST /api/admin/api-key/revoke
 * @access  Private (Admin only)
 */
export const revokeApiKey = async (req, res) => {
  try {
    const adminId = req.admin.id;

    await prisma.adminUser.update({
      where: { id: adminId },
      data: { apiKey: null },
    });

    return res.status(200).json({
      success: true,
      message: "API key revoked successfully",
    });
  } catch (err) {
    console.error("RevokeApiKey Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Get current API Key (for copying in UI)
 * @route   GET /api/admin/api-key
 * @access  Private (Admin only)
 */
export const getApiKey = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, apiKey: true },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "API key fetched successfully",
      data: admin,
    });
  } catch (err) {
    console.error("GetApiKey Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
