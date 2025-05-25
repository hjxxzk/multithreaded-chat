import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";
import { CircleUserRound } from 'lucide-react';
import {useStyles} from "./UserList.styles.ts";

function ChatView({socket}: { socket: Socket }) {

    const [isUserListVisible, setIsUserListVisible] = useState(false);
    const [users, setUsers] = useState<string[]>([]);
    const styles = useStyles();

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
                className={styles.searchForUserBar}
                onClick={() => { setIsUserListVisible(true); handleClick(); }}>
                Szukaj rozmówcy... ✨
            </div>

           <div className={`${styles.usersList} ${isUserListVisible ? styles.animationStart : styles.animationEnd}`}>
                      {users.map(user => (
                    <div
                        key={user}
                        className={styles.user}
                        onClick={() => setIsUserListVisible(false)}
                    >
                        <CircleUserRound color="gray" size={24} />
                        <p>{user}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ChatView;