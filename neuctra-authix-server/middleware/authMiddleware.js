import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

/**
 * 🔐 Authentication Middleware
 * Supports:
 *  1️⃣ JWT Bearer Token (for dashboard access)
 *  2️⃣ API Key (for SDK/app-level requests)
 * Now also enforces verified email for both.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // e.g. "Bearer <token>"
    const apiKey = req.headers["x-api-key"]?.toLowerCase?.(); // normalize case

    /* ===================================================
       1️⃣ JWT Authentication (Bearer token)
       =================================================== */
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token. Please sign in again.",
        });
      }

      // ✅ Find admin user by decoded.id
      const admin = await prisma.adminUser.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
          apiKey: true,
          isVerified: true, // new field in your schema
        },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Admin not found.",
        });
      }

   

      req.admin = admin;
      return next();
    }

    /* ===================================================
       2️⃣ API Key Authentication (x-api-key)
       =================================================== */
    if (apiKey) {
      const admin = await prisma.adminUser.findFirst({
        where: { apiKey },
        select: {
          id: true,
          email: true,
          name: true,
          isVerified: true,
        },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid API key.",
        });
      }

      // 🚫 Block unverified email API access
      if (!admin.isVerified) {
        return res.status(403).json({
          success: false,
          message:
            "Your account email is not verified. Please verify your email to use the API.",
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
      message: "Unauthorized: No token or API key provided.",
    });
  } catch (err) {
    console.error("AuthMiddleware Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};
