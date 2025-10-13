import "dotenv/config";
import express from "express";
import cors from "cors";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appRoutes from "./routes/appRoutes.js";

const app = express();
app.use(express.json());

// 🔹 CORS setup for admin (restricted)
const adminCors = cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
});

// 🔹 CORS setup for users (public, open access)
const userCors = cors({
  origin: "*", // anyone can access
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-KEY"],
});

// 🔹 Apply CORS to each route group
app.use("/api/admin", adminCors, adminAuthRoutes);
app.use("/api/apps", adminCors, appRoutes);
app.use("/api/users", userCors, userRoutes);

// Optional: general OPTIONS preflight handler
app.options("*", cors());

// 🔹 Export the configured app
export default app;
