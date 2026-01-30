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

const allowedOrigins = [process.env.CLIENT_URL];

const dynamicCors = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, SSR, same-origin)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
});

// 🔹 Routes with specific CORS
app.use("/api/admin", dynamicCors, adminAuthRoutes);
app.use("/api/apps", dynamicCors, appRoutes);
app.use("/api/app", dynamicCors, appDataRoutes);
app.use("/api/users", dynamicCors, userRoutes);
app.use("/api/users", dynamicCors, userDataRoutes);

export default app;
