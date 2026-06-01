import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js'
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";


// const BASE_URL = "http://localhost:3000";

const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-user");
            const user = res.data;
            set({ authUser: user });
            get().connectSocket(user);
        } catch (error) {
            console.log("Error in chekAuth: ", error);
            toast.error("Unauthorized");
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            const user = res.data;
            set({ authUser: user });
            toast.success("User singup successfully.");
            get().connectSocket(user);
        } catch (error) {
            console.log("Error", error);
            toast.error("error in signup store"); // error is axios error object.
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged Out Successfully.");
            get().disconnectSocket();
        } catch (error) {
            console.log("Error:", error);

            toast.error("Error while logout");
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            const user = res.data;
            set({ authUser: user });
            toast.success("LoggedIn successfully.");
            get().connectSocket(user);
            console.log(res.data);
        } catch (error) {
            console.log("Error:", error);
            toast.error("Incorrect Credentials",);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (file) => {
        set({ isUpdatingProfile: true });
        try {
            const signatureRes = await axiosInstance.get("/auth/generate-signature");
            const {
                timestamp,
                signature,
                cloudName,
                apiKey,
                folder,
            } = signatureRes.data;

            const formData = new FormData();

            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            formData.append("folder", folder);

            const cloudinaryRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const imageUrl = cloudinaryRes.data.secure_url;
            const publicId = cloudinaryRes.data.public_id;

            // 3. SAVE URL TO DATABASE

            const updateRes = await axiosInstance.put(
                "/auth/update-profile-pic",
                {
                    imageUrl,
                    publicId,
                }
            );

            // 4. UPDATE LOCAL USER STATE

            set({
                authUser: updateRes.data,
            });

        } catch (error) {
            console.log("error in useAuthStore/updateProfile", error);
            toast.error("Image upload failed.");

        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: (user) => {
        if (!user || get().socket?.connected) return;

        // const socket = io(BASE_URL);
        const socket = io(BASE_URL, {
            query: {
                userId: user._id,
            },
        });
        set({ socket: socket });

        //set online userIds
        socket.on("onlineUsers", (userIds) => {
            set({ onlineUsers: userIds });

        })

    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
        set({ socket: null });
    }

}));

