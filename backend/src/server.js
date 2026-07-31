import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import path from "path"
import { connectDB } from './lib/db.js';
import { ENV } from "./lib/env.js";

const app = express();
const __dirname = path.resolve();

const PORT = Number(ENV.PORT) || 3000;

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log("Server is running on port: " + port);
        connectDB();
    });

    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.warn(`Port ${port} is already in use. Trying ${port + 1}...`);
            server.close(() => startServer(port + 1));
        } else {
            console.error("Server error:", error);
            process.exit(1);
        }
    });
};

startServer(PORT);