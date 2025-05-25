import {Socket} from "socket.io-client";
import UserList from "../UserList/UserList.tsx";

function ChatView({ socket }: { socket: Socket }) {
    return (
        <div className="flex items center justify-center bg-pink-100 bg-opacity-30 w-screen h-screen">
            <div className="flex bg-pink-400 h-screen w-1/3 justify-start flex-col pr-7 pl-7">
                <UserList socket={socket}></UserList>
            </div>
            <div className="flex bg-pink-300 h-screen w-2/3"></div>
        </div>
    );
}

export default ChatView;