import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import path from "path"
import { connectDB } from './lib/db.js';
import { ENV } from "./lib/env.js";
import { initSocketServer } from "./lib/socket.js";

const app = express();
const __dirname = path.resolve();

const PORT = Number(ENV.PORT) || 3000;
const allowedOrigins = [ENV.CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"];

app.use(express.json({ limit: "5mb" }));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

const startServer = (port) => {
    const httpServer = app.listen(port, () => {
        console.log("Server is running on port: " + port);
        initSocketServer(httpServer);
        connectDB();
    });

    httpServer.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.warn(`Port ${port} is already in use. Trying ${port + 1}...`);
            httpServer.close(() => startServer(port + 1));
        } else {
            console.error("Server error:", error);
            process.exit(1);
        }
    });
};

startServer(PORT);