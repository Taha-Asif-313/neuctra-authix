import prisma from "../prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateApiKey, generateId } from "../utils/crypto.js";
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
      where: { id: Number(id) },
    });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await prisma.adminUser.delete({ where: { id: Number(id) } });

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
        usersCount: app.users.length,
      })),
      users: admin.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        appId : user.appId
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
