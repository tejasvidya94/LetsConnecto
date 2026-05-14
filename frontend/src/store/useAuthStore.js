import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js'
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in chekAuth: ", error.response.data.message);
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
            toast.success("User singup successfully.");
        } catch (error) {
            toast.error("error in signup store", error?.response?.data?.message); // error is axios error object.
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
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("LoggedIn successfully.")
            console.log(res.data);
        } catch (error) {
            toast.error("error in useAuthStore: login", error.response.data.message);
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
            toast.error("Image upload failed.", error.response.data.message);

        } finally {
            set({ isUpdatingProfile: false });
        }
    }

}));

