import app from "./app.js";
import prisma from "./prisma.js";

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    // ✅ Check DB connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // ⛔ stop app if DB fails
  }
};

startServer();
