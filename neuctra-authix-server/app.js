import "dotenv/config";
import express from "express";
import cors from "cors";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appRoutes from "./routes/appRoutes.js";

const app = express();
app.use(express.json());

// 🔹 Global CORS middleware (applies to all routes)
app.use(
  cors({
    origin: "*", // public access
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-KEY"],
  })
);

// ❌ Remove app.options("*", cors()); — not needed and causes crash in Express 5

// 🔹 Mount all routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/apps", appRoutes);
app.use("/api/users", userRoutes);

export default app;
