import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

/**
 * 🔐 Authentication Middleware
 * Supports two modes of authentication:
 *  1. JWT Bearer Token (for admin dashboard access)
 *  2. API Key (for SDK / app-level requests)
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // e.g. "Bearer <token>"
    const apiKey = req.headers["x-api-key"]?.toLowerCase?.(); // normalize case

    /* ===================================================
       1️⃣ JWT Authentication (Bearer token in Authorization header)
       =================================================== */
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]; // extract token

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // verify signature
      } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
          success: false,
          message: "Token is invalid or expired",
        });
      }

      // ✅ Find admin in DB using decoded.id
      const admin = await prisma.adminUser.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, apiKey: true },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Admin not found",
        });
      }

      req.admin = admin; // attach admin to request
      return next();
    }

    /* ===================================================
       2️⃣ API Key Authentication (x-api-key header)
       =================================================== */
    if (apiKey) {
      const admin = await prisma.adminUser.findFirst({
        where: { apiKey }, // ensure apiKey exists in your model
        select: { id: true, email: true, name: true },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid API key",
        });
      }

      req.admin = admin; // attach admin to request
      return next();
    }

    /* ===================================================
       3️⃣ No authentication provided
       =================================================== */
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token or API key provided",
    });
  } catch (err) {
    console.error("AuthMiddleware Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};
