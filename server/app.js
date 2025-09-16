import "dotenv/config"
import express from 'express';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import userRoutes from './routes/userRoutes.js';
import appRoutes from './routes/appRoutes.js';
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials:true
}))

// Routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/apps', appRoutes);

export default app;
