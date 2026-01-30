import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import appDataRoutes from "./routes/appDataRoutes.js";

const app = express();

/**
 * 🔹 Single source of truth (browser origin)
 */
const allowedOrigin = process.env.CLIENT_URL;

if (!allowedOrigin) {
  throw new Error("CLIENT_URL is not defined in environment variables");
}

/**
 * 🔹 Strict CORS (browser only)
 */
const corsConfig = cors({
  origin: (origin, callback) => {
    // ❌ Block requests without Origin (non-browser)
    if (!origin) {
      return callback(new Error("CORS blocked: missing origin"));
    }

    // ✅ Allow only the configured client
    if (origin === allowedOrigin) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
});

/**
 * 🔹 IMPORTANT: Preflight must be handled BEFORE routes
 */
app.options("*", corsConfig);

/**
 * 🔹 Middlewares
 */
app.use(corsConfig); // 👈 must be global
app.use(express.json());
app.use(cookieParser());

/**
 * 🔹 Routes
 */
app.use("/api/admin", adminAuthRoutes);
app.use("/api/apps", appRoutes);
app.use("/api/app", appDataRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", userDataRoutes);

export default app;
