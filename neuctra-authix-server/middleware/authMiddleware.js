import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

/**
 * 🔐 Authentication Middleware
 * Supports:
 *  1️⃣ Cookie JWT (authix_session) → Dashboard
 *  2️⃣ API Key (x-api-key) → SDK / External Requests
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.authix_session; // 👈 Cookie JWT
    const apiKey = req.headers["x-api-key"]?.toLowerCase?.();

    /* ===================================================
       1️⃣ Cookie JWT Authentication (Dashboard)
       =================================================== */
    if (token && !apiKey) {
      let decoded;

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
          success: false,
          message: "Invalid or expired session. Please sign in again.",
        });
      }

      const admin = await prisma.adminUser.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
          apiKey: true,
          isVerified: true,
          subscriptionPackage:true,
        },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Admin not found.",
        });
      }

      // 🚫 Block unverified accounts
      if (!admin.isVerified) {
        return res.status(403).json({
          success: false,
          message: "Please verify your email to access dashboard.",
        });
      }

      req.admin = admin;
      return next();
    }

    /* ===================================================
       2️⃣ API Key Authentication (SDK / App)
       =================================================== */
    if (apiKey) {
      const admin = await prisma.adminUser.findFirst({
        where: { apiKey },
        select: {
          id: true,
          email: true,
          name: true,
          isVerified: true,
          subscriptionPackage:true,
        },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid API key.",
        });
      }

      if (!admin.isVerified) {
        return res.status(403).json({
          success: false,
          message:
            "Your account email is not verified. Please verify to use API.",
        });
      }

      req.admin = admin;
      return next();
    }

    /* ===================================================
       3️⃣ No Auth Provided
       =================================================== */
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No session or API key provided.",
    });

  } catch (err) {
    console.error("AuthMiddleware Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};