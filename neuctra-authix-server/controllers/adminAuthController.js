import prisma from "../prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateApiKey, generateId } from "../utils/crypto.js";
import { sendEmail, sendOTPEmail } from "../utils/mailer.js";
import { addMonths } from "date-fns";
import crypto from "crypto";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

/**
 * @desc    Signup new admin
 * @route   POST /api/admin/signup
 * @access  Public
 */
export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email },
    });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
        errors: { email: "Email is already registered" },
      });
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.adminUser.create({
      data: {
        id: generateId(),
        name,
        email,
        password: hashedPassword,
        apiKey: generateApiKey(),
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (err) {
    console.error("SignupAdmin Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
/**
 * @desc    Login admin
 * @route   POST /api/admin/login
 * @access  Public
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find admin by email
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

    // 2. Check if admin exists
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Check password
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate JWT token
    const token = generateToken({ id: admin.id, email: admin.email });

    // 5. Return response (exclude password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      userData: {
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
          createdAt: admin.createdAt,
          apps: admin.apps,
          users: admin.users,
          isVerified:admin.isVerified
        },
      },
    });
  } catch (err) {
    console.error("LoginAdmin Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Update admin details
 * @route   PUT /api/admin/:id
 * @access  Private (Admin only)
 */
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, avatarUrl, password } = req.body;

    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    let updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (address) updatedData.address = address;
    if (avatarUrl) updatedData.avatarUrl = avatarUrl;
    if (password) {
      updatedData.password = await hashPassword(password);
    }

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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc    Delete admin
 * @route   DELETE /api/admin/:id
 * @access  Private (Admin only)
 */
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await prisma.adminUser.findUnique({
      where: { id: id },
    });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await prisma.adminUser.delete({ where: { id: id } });

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (err) {
    console.error("DeleteAdmin Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
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
    const emailSent = await sendOTPEmail(admin.email, otp);
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
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin || admin.otp !== otp || new Date() > admin.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    await prisma.adminUser.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiry: null },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("VerifyEmail Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your reset OTP is: <b>${otp}</b></p>`,
    });

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
    return res.status(500).json({ success: false, message: "Internal server error" });
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
        isVerified:true,
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

/**
 * @desc   Generate Admin Report (CSV, Excel, PDF)
 * @route  GET /api/admin/report?format=csv|excel|pdf
 * @access Private (Admin only)
 */
export const generateAdminReport = async (req, res) => {
  try {
    const adminId = req.admin.id;

    // 1️⃣ Fetch Admin with related data
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
      include: {
        apps: {
          include: {
            users: true,
          },
        },
        users: true,
      },
    });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const format = req.query.format || "json";

    // 2️⃣ JSON (default)
    if (format === "json") {
      return res.json({ success: true, data: admin });
    }

    // 3️⃣ CSV
    if (format === "csv") {
      const parser = new Parser();
      const csv = parser.parse(
        admin.apps.map((app) => ({
          adminId: admin.id,
          adminName: admin.name,
          appId: app.id,
          appName: app.applicationName,
          usersCount: app.users.length,
        }))
      );

      res.header("Content-Type", "text/csv");
      res.attachment(`admin-report-${admin.id}.csv`);
      return res.send(csv);
    }

    // 4️⃣ Excel
    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Admin Report");

      worksheet.columns = [
        { header: "Admin ID", key: "adminId", width: 30 },
        { header: "Admin Name", key: "adminName", width: 25 },
        { header: "App ID", key: "appId", width: 30 },
        { header: "App Name", key: "appName", width: 25 },
        { header: "Users Count", key: "usersCount", width: 15 },
      ];

      admin.apps.forEach((app) => {
        worksheet.addRow({
          adminId: admin.id,
          adminName: admin.name,
          appId: app.id,
          appName: app.applicationName,
          usersCount: app.users.length,
        });
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=admin-report-${admin.id}.xlsx`
      );

      await workbook.xlsx.write(res);
      return res.end();
    }

    // 5️⃣ PDF (pdfkit)
    if (format === "pdf") {
      const doc = new PDFDocument({ margin: 30 });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=admin-report-${admin.id}.pdf`
      );

      doc.pipe(res);

      // Title
      doc.fontSize(18).text("Admin Report", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Admin: ${admin.name} (${admin.email})`);
      doc.text(`Generated: ${new Date().toLocaleString()}`);
      doc.moveDown();

      // Apps
      doc.fontSize(14).text("Apps:", { underline: true });
      admin.apps.forEach((app) => {
        doc.moveDown(0.5);
        doc.fontSize(12).text(`App: ${app.applicationName}`);
        doc.text(`Category: ${app.category}`);
        doc.text(`Platform: ${app.platform}`);
        doc.text(`Users: ${app.users.length}`);
        doc.moveDown();
      });

      // Users
      doc.addPage();
      doc.fontSize(14).text("Users:", { underline: true });
      admin.users.forEach((user) => {
        doc.moveDown(0.5);
        doc.fontSize(12).text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Active: ${user.isActive ? "Yes" : "No"}`);
        doc.moveDown();
      });

      doc.end();
      return;
    }

    return res.status(400).json({
      success: false,
      message: "Invalid format. Use json | csv | excel | pdf",
    });
  } catch (err) {
    console.error("GenerateAdminReport Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * @desc   Fetch Admin Report (JSON) for UI display
 * @route  GET /api/admin/report
 * @access Private (Admin only)
 */
export const getAdminReport = async (req, res) => {
  try {
    const adminId = req.admin.id;

    // Fetch Admin with Apps and Users
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
      include: {
        apps: {
          include: { users: true },
        },
        users: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Transform data if needed (flatten apps/users count etc.)
    const report = {
      adminId: admin.id,
      adminName: admin.name,
      email: admin.email,
      apps: admin.apps.map((app) => ({
        id: app.id,
        name: app.applicationName,
        category: app.category,
        platform: app.platform,
        isActive: app.isActive,
        usersCount: app.users.length,
      })),
      users: admin.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        appId: user.appId,
      })),
    };

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    console.error("GetAdminReport Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
