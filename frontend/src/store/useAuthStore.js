import { create } from 'zustand';
import { axiosInstance } from "../lib/axios.js";
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check",)
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in authCheck: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            toast.success("Account Created Successfully!")
        } catch (error) {
            toast.error(error.resposne.data.message);
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            toast.success("Logged In Successfully")
        } catch (error) {
            toast.error(error.resposne.data.message);
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logged Out Successfully!");
        } catch (error) {
            toast.error("Error Logging Out");
            console.log("Logout Error: ", error);
        }
    }
}));

export default useAuthStore;