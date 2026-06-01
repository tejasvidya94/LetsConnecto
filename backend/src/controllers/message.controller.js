import User from "../models/user.model.js"
import Message from "../models/messega.model.js"
import { getReceiverSocketId, io } from "../lib/socket.io.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersforSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json(messages)
    } catch (error) {

        console.log("Error in getMessages controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    try {
        const {
            text,
            imageUrl,
            imagePublicId
        } = req.body;
        if (!text) {
            return res.status(400).json({
                error: "message should not be empty."
            });
        }


        const trimmedText = text?.trim();

        if (!trimmedText && trimmedText.length > 5000 && !imageUrl) {
            return res.status(400).json({
                error: "Message must contain text with less that 5000 characters or image"
            });
        }

        const message = await Message.create({
            senderId,
            receiverId,
            text: trimmedText || "",
            imageUrl: imageUrl || null,
            imagePublicId: imagePublicId || null,
        });


        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // he is online
            io.to(receiverSocketId).emit("newMessageArrived", message)
        }

        return res.status(201).json(message);

    } catch (error) {
        console.error(
            "sendMessage error:",
            error
        );

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};