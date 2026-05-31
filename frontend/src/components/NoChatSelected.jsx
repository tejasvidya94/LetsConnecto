import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-base-100 text-base-content/60">
            <div className="max-w-md text-center space-y-4">

                <div className="flex justify-center">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="size-8 text-primary" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold">
                    Welcome to ChatApp
                </h2>

                <p className="text-sm">
                    Select a conversation from the sidebar to start chatting.
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;