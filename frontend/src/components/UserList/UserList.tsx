import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";

function ChatView({socket}: { socket: Socket }) {

    const [isUserListVisible, setIsUserListVisible] = useState(false);
    const [users, setUsers] = useState<string[]>([]);

    function handleClick() {
        const nickname = localStorage.getItem("nickname");
        socket.emit('get_users', { nickname: nickname });
    }

    useEffect(() => {
        socket.on('return_users', (data: { users: string[] })  => {
            setUsers(data.users);
            if(data.users.length === 0) {
                alert("Póki co nikogo nie ma :<")
            }
        });

        return () => {
            socket.off('return_users');
        };
    }, [socket]);

    return (
        <>
            <div
                className="bg-pink-100 mt-10 rounded-2xl h-15 w-full flex items-center justify-start px-6 opacity-80"
                onClick={() => { setIsUserListVisible(true); handleClick(); }}>
                Szukaj rozmówcy... ✨
            </div>

            {isUserListVisible && (
                <>
                    {users.map(user => (
                        <div key={user}>{user}</div>
                    ))}
                </>
            )}
        </>
    );
}

export default ChatView;