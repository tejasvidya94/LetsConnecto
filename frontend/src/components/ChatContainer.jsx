import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Loader, Send, X } from "lucide-react";
import noAvatarLogo from '../assets/noAvatar.png';
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isLoadingMessages,
        selectedUser,
        sendMessage,
        isSendingMessage, subscribeToMessages, unsubscribeFromMessages
    } = useChatStore();
    const { authUser } = useAuthStore();


    const messageEndRef = useRef(null);
    useEffect(() => {
        if (messageEndRef.current && messages)
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
            });
    }, [messages]);

    const [imagePreview, setImagePreview] = useState(null);
    const [text, setText] = useState("");
    const fileInputRef = useRef(null);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Inappropriate file type");
            e.target.value = "";
            return;
        }
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            toast.error("Image size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        try {

            // Generate preview
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            reader.onerror = () => {
                toast.error("Failed to read image.");
                setImagePreview(null);
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Error processing image:", error);

            toast.error("Failed to fetch image.");

            setImagePreview(null);
            e.target.value = "";
        }

    }

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text && !imagePreview) return;
        try {

            await sendMessage({ text: text, image: imagePreview });

            setText("");
            setImagePreview(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to send");
        }
    }


    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            subscribeToMessages();

            return () => unsubscribeFromMessages()
        }
    }, [getMessages, selectedUser._id, subscribeToMessages, unsubscribeFromMessages]);


    if (isLoadingMessages) {
        //skeleton for messages
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">

            {/* Header */}
            <div className="border-b border-base-300 p-4">
                <div className="flex items-center gap-3">

                    <img
                        src={selectedUser.profilePic || noAvatarLogo}
                        alt={selectedUser.fullName}
                        className="size-10 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="font-medium">
                            {selectedUser.fullName}
                        </h3>

                        <p className="text-sm text-base-content/60">
                            Active now
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        {/* chat avatar */}
                        <div className="chat-image avatar">
                            <div className="w-14 rounded-full">
                                <img
                                    alt="profile pic"
                                    src={
                                        message.senderId == authUser._id ? authUser.profilePic || noAvatarLogo : selectedUser.profilePic || noAvatarLogo
                                    }
                                />
                            </div>

                        </div>
                        {/* message time */}
                        <div
                            className="chat-header"
                        >
                            <time className="text-xs opacity-50">
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </time>
                        </div>
                        {/* message */}
                        <div
                            className="
                            rounded-xl
                            overflow-hidden
                            bg-base-200
                            max-w-[320px]
                            "
                        >
                            {message.imageUrl && (
                                <img
                                    src={message.imageUrl}
                                    alt="Attachment"
                                    className="
                                    w-full
                                    max-h-75
                                    object-cover
                                    "
                                />
                            )}

                            {message.text && (
                                <p className="
                                p-3 
                                wrap-break-word
                                text-shadow-sm
                                text-sm
                                "
                                >
                                    {message.text}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>


            {/* Input */}
            <div className="border-t border-base-300 p-4">
                {imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                                type="button"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    </div>
                )}
                <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                    {/* message field */}
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="input input-bordered flex-1"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {/* image upload field */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    {/* image upload button */}
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={26} />
                    </button>
                    {/* send button */}
                    <button
                        type="submit"
                        className="btn btn-circle"
                        disabled={!text.trim() && !imagePreview || isSendingMessage}
                    >
                        <Send size={26} />
                    </button>

                </form>
            </div>

        </div>
    );
};

export default ChatContainer;