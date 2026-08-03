import { Server } from "socket.io";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

export function initSocketServer(server) {
    const io = new Server(server, {
        cors: {
            origin: [ENV.CLIENT_URL || "http://localhost:5173", "http://127.0.0.1:5173"],
            credentials: true,
        },
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        const userId = socket.userId;
        userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return io;
}

export const io = null;
