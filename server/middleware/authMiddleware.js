import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers["x-api-key"]?.toLowerCase?.(); // normalize

    // 1️⃣ JWT Authentication
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
          success: false,
          message: "Token is invalid or expired",
        });
      }

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

      req.admin = admin;
      return next();
    }

    // 2️⃣ API Key Authentication
    if (apiKey) {
      const admin = await prisma.adminUser.findFirst({
        where: { apiKey }, // ensure apiKey column exists in your model
        select: { id: true, email: true, name: true },
      });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid API key",
        });
      }

      req.admin = admin;
      return next();
    }

    // 3️⃣ No JWT or API key provided
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
