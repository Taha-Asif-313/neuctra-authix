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
app.use(express.json());
app.use(cookieParser());

// 🔹 CORS configs
const adminCors = cors({
  origin: [process.env.CLIENT_URL], // only admin client
  credentials: true,
});

const userCors = cors({
  origin: (origin, callback) => {
    // Allow all browser origins dynamically
    callback(null, true);
  },
  credentials: true, // ✅ allow cookies
});

// 🔹 Routes with specific CORS
app.use("/api/admin", adminCors, adminAuthRoutes);
app.use("/api/apps", adminCors, appRoutes);
app.use("/api/app", userCors, appDataRoutes);
app.use("/api/users", userCors, userRoutes);
app.use("/api/users", userCors, userDataRoutes);

export default app;
