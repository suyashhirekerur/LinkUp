import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try{
        // extract token from http-only cookies
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token) {
            console.log("Socket COnnection Rejected: No token provided");
            return next(new Error("Authentication error: No token provided"));
        }

         // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // find the user fromdb
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // Attach user information to the socket object for future use
    socket.user = user; // attach user to socket object for future use
    socket.userId = user._id.toString(); // attach userId to socket object for future use

    console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);
    } catch(error){
        console.log("Error in Socket Authentication: ", error.message);
        next(new Error("Unauthorized - Authentication Failed"));
    }
}