import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ENV.CORS_ORIGIN,
        credentials: true,
    }
});

// Apply Authentication Middleware to all socket connections
io.use(socketAuthMiddleware);

//  we will use this function to check if a user is online or not, by checking if the userId exists in the userSocketMap
export function getReceiverSocketId (userId) {
    return userSocketMap[userId];
}

// this is for storing online users
const userSocketMap = {};  // {userId: socketId}

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.userId; // Assuming userId is set in the middleware
    userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients
    io.emit("geOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("geOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io, app, server};
