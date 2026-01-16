import "dotenv/config";
import express from "express";
import cors from "cors";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import appDataRoutes from "./routes/appDataRoutes.js";

const app = express();
app.use(express.json());

// 🔹 CORS configs
const adminCors = cors({
  origin: [process.env.CLIENT_URL], // only admin client
  credentials: true,
});

const userCors = cors(); // allow all origins (default: reflects request origin)

// 🔹 Routes with specific CORS
app.use("/api/admin", adminCors, adminAuthRoutes);
app.use("/api/apps", adminCors, appRoutes);
app.use("/api/app", userCors, appDataRoutes);
app.use("/api/users", userCors, userRoutes);

export default app;
