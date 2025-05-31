import {useEffect, useState} from "react";
import {CircleUserRound} from 'lucide-react';
import {useStyles} from "./UserList.styles.ts";
import type {SocketProps} from "../../App.types.ts";
import {useNavigate} from "react-router-dom";

function ChatView({ socket } : SocketProps) {
    const [isUserListVisible, setIsUserListVisible] = useState(true);
    const [users, setUsers] = useState<string[]>([]);
    const styles = useStyles();
    const nickname = localStorage.getItem("nickname");
    const navigate = useNavigate();

    function getUsersList() {
        socket.emit('get_users', {nickname: nickname});

    }

    function choosePersonToSpeakWith(recipient: string) {
        localStorage.setItem("recipient", recipient);
        socket.emit('start_private_chat', { from: nickname, to: recipient });
    }

    useEffect(() => {
        socket.on('return_users', (data: { users: string[] }) => {
            setUsers(data.users);
            if (data.users.length === 0) {
                alert("Póki co nikogo nie ma :<")
            }
        });

        socket.on('chat_started', (data: { thread_name: string[] }) => {
            navigate(`/chat/${data.thread_name}`);
        });

        return () => {
            socket.off('return_users');
            socket.off('chat_started');
        };
    });

    return (
        <>
            <div
                className={styles.searchForUserBar}
                onClick={() => {
                    setIsUserListVisible(true);
                    getUsersList();
                }}>
                Szukaj rozmówcy... ✨
            </div>

            <div className={`${styles.usersList} ${isUserListVisible ? styles.animationStart : styles.animationEnd}`}>
                {users.map(user => (
                    <div
                        key={user}
                        className={styles.user}
                        onClick={() => { setIsUserListVisible(false);
                                                choosePersonToSpeakWith(user)
                        }}>
                        <CircleUserRound color="gray" size={24}/>
                        <p>{user}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ChatView;