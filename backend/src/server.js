import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path"
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
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