import Sidebar from "../components/Sidebar"
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"


const HomePage = () => {
    const selectedUser = useChatStore(state => state.selectedUser);

    return (
        <main className="h-[calc(100vh-80px)] overflow-hidden bg-base-100 shadow-xl w-full">
            <div className="flex h-full overflow-hidden">
                <Sidebar />

                {selectedUser ? (
                    <ChatContainer />
                ) : (
                    <NoChatSelected />
                )}
            </div>
        </main>
    );
}
export default HomePage;
