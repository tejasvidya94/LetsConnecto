import { create } from "zustand";
import { axiosInstance } from "../lib/axios"
import toast from 'react-hot-toast'
import axios from "axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isLoadingUsers: false,
    isLoadingMessages: false,
    isSendingMessage: false,

    getUsers: async () => {
        set({ isLoadingUsers: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            console.error("Error in the getUsers.", error);
            toast.error("Failed to fetch users.");
        } finally {
            set({ isLoadingUsers: false });
        }
    },

    getMessages: async (userId) => {
        if (!userId) return;

        set({ isLoadingMessages: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({
                messages: Array.isArray(res.data) ? res.data : []
            });
        } catch (error) {
            console.error("Error in getMessages: ", error)
            set({ messages: [] });
            toast.error("Failed to fetch messages");
        } finally {
            set({ isLoadingMessages: false });
        }

    },

    sendMessage: async ({ text, image }) => {
        set({ isSendingMessage: true });
        try {
            const { selectedUser } = get();

            if (!selectedUser) {
                toast.error("No user selected");
                return;
            }

            let imageUrl = null;
            let imagePublicId = null;

            // Upload image only if image exists
            if (image) {
                const signatureRes =
                    await axiosInstance.get(
                        "/auth/generate-signature"
                    );

                const {
                    timestamp,
                    signature,
                    cloudName,
                    apiKey,
                    folder,
                } = signatureRes.data;

                const formData = new FormData();

                formData.append("file", image);
                formData.append("api_key", apiKey);
                formData.append("timestamp", timestamp);
                formData.append("signature", signature);
                formData.append("folder", folder);

                const cloudinaryRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formData
                );

                imageUrl =
                    cloudinaryRes.data.secure_url;

                imagePublicId =
                    cloudinaryRes.data.public_id;
            }
            const res =
                await axiosInstance.post(
                    `/messages/send/${selectedUser._id}`,
                    {
                        text,
                        imageUrl,
                        imagePublicId,
                    }
                );

            set((state) => ({
                messages: [
                    ...state.messages,
                    res.data
                ]
            }));

        } catch (error) {
            console.error(
                "Error in sendMessage:",
                error
            );

            toast.error(
                error?.response?.data?.error ||
                "Failed to send message"
            );
        } finally {
            set({ isSendingMessage: false });
        }
    },
    subscribeToMessages: () => {
        const selectedUser = get().selectedUser;
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) {
            return;
        }

        // optimize this one later
        socket.on("newMessageArrived", (newMessage) => {
            if (selectedUser?._id !== newMessage.senderId) {
                return;
            }
            set((state) => ({
                messages: [
                    ...state.messages,
                    newMessage,
                ]
            }));
        });
    },
    unsubscribeFromMessages: () => {

        const socket = useAuthStore.getState().socket;

        // optimize this one later
        socket.off("newMessageArrived");
    },


    // todo: optimize it later.
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));