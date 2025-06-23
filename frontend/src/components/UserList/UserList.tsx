import {useEffect, useState} from "react";
import {CircleUserRound} from 'lucide-react';
import {useStyles} from "./UserList.styles.ts";
import type {SocketProps} from "../../App.types.ts";
import {useNavigate} from "react-router-dom";

function UserList({ socket } : SocketProps) {
    const [users, setUsers] = useState<string[]>([]);
    const navigate = useNavigate();
    const styles = useStyles();



    useEffect(() => {
        socket.on('get_users', (data: { users: string[] }) => {
            setUsers(data.users);
        });

        socket.emit('get_users', { room_index: localStorage.getItem("roomIndex") });

        return () => {
            socket.off('get_users');

        };
    });

    function chooseAnotherRoom() {
        const nickname = localStorage.getItem("nickname");
        const roomIndex = localStorage.getItem("roomIndex");
        socket.emit("leave_room", {nickname, roomIndex});
        navigate(`/rooms`);
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.changeRoomButton} onClick={chooseAnotherRoom}>
                ✨ Zmień pokój ✨
            </div>
            <div className={styles.sideContent}>
            <div className={styles.text} onClick={chooseAnotherRoom}>💖 W tym pokoju:
            </div>

            <div className={styles.usersList}>
                {users.map(user => (
                    <div
                        key={user}
                        className={styles.user}
                        onClick={() => setIsUserListVisible(false)}
                    >
                        <CircleUserRound color="#89CFF0" size={24} />
                        <p>{user}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>

    );
}

export default UserList;