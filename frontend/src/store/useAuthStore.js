import { create } from 'zustand';
import { axiosInstance } from "../lib/axios.js";
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            const user = res.data.user ?? res.data;
            set({ authUser: user });

            if (user) get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            toast.success("Account Created Successfully!");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            toast.success("Logged In Successfully");

            get().connectSocket(); // Connect to the socket after successful login
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged Out Successfully!");
            get().disconnectSocket();
        } catch (error) {
            toast.error("Error Logging Out");
            console.log("Logout Error: ", error);
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            const updatedUser = res.data.user ?? res.data;
            set({ authUser: updatedUser });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Profile update failed.");
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser) return;

        const existingSocket = get().socket;
        if (existingSocket?.connected) return;

        if (existingSocket) {
            existingSocket.removeAllListeners();
            existingSocket.disconnect();
        }

        const socket = io(BASE_URL, {
            withCredentials: true,
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionAttempts: 10,
        });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

        set({ socket });
        socket.connect();
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.removeAllListeners();
            socket.disconnect();
        }
        set({ socket: null, onlineUsers: [] });
    }
}));

export default useAuthStore;