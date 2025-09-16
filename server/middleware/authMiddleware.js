import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers["x-api-key"]; // 👈 support API key in header

    // 1. If JWT is provided (Bearer <token>)
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid or expired",
        });
      }

      const admin = await prisma.adminUser.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true },
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

    // 2. If API key is provided
    if (apiKey) {
      const admin = await prisma.adminUser.findUnique({
        where: { apiKey }, // ✅ make sure apiKey field exists in `User` model
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid API key",
        });
      }

      req.admin = admin; // attach user from API key
      return next();
    }

    // 3. If neither JWT nor API key is present
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token or API key provided",
    });
  } catch (err) {
    console.error("AuthMiddleware Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};
